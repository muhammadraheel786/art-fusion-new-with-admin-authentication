import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "data", "paintings.json");
const PAINTINGS_DIR = path.join(__dirname, "..", "public", "paintings");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Ensure paintings directory exists
await fs.mkdir(PAINTINGS_DIR, { recursive: true });

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PAINTINGS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    const name = `upload-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|webp|gif)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

// Helpers
async function readPaintings() {
  const data = await fs.readFile(DATA_PATH, "utf-8").catch(() => "[]");
  return JSON.parse(data);
}

async function writePaintings(paintings) {
  await fs.writeFile(DATA_PATH, JSON.stringify(paintings, null, 2));
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "secret");
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ========== Public Routes ==========

// GET all paintings (public)
app.get("/api/paintings", async (req, res) => {
  try {
    const paintings = await readPaintings();
    res.json(paintings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body || {};
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
  res.json({ token, username });
});

// ========== Protected Admin Routes ==========

// POST new painting (with optional image upload)
app.post("/api/admin/paintings", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const paintings = await readPaintings();
    const maxId = paintings.length ? Math.max(...paintings.map((p) => p.id)) : 0;
    const body = req.body;

    let imagePath = body.image || "";
    if (req.file) {
      imagePath = `/paintings/${req.file.filename}`;
    }

    const painting = {
      id: maxId + 1,
      title: body.title || "Untitled",
      description: body.description || "",
      price: body.price || "Contact for a personalized quote",
      image: imagePath,
      rating: parseFloat(body.rating) || 4,
      featured: body.featured === "true" || body.featured === true,
      category: body.category || "Landscape",
    };

    paintings.push(painting);
    await writePaintings(paintings);
    res.status(201).json(painting);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update painting
app.put("/api/admin/paintings/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const paintings = await readPaintings();
    const idx = paintings.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Painting not found" });

    const body = req.body;
    let imagePath = paintings[idx].image;
    if (req.file) {
      imagePath = `/paintings/${req.file.filename}`;
    } else if (body.image) {
      imagePath = body.image;
    }

    paintings[idx] = {
      ...paintings[idx],
      title: body.title ?? paintings[idx].title,
      description: body.description ?? paintings[idx].description,
      price: body.price ?? paintings[idx].price,
      image: imagePath,
      rating: body.rating !== undefined ? parseFloat(body.rating) : paintings[idx].rating,
      featured: body.featured !== undefined ? (body.featured === "true" || body.featured === true) : paintings[idx].featured,
      category: body.category ?? paintings[idx].category,
    };

    await writePaintings(paintings);
    res.json(paintings[idx]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE painting
app.delete("/api/admin/paintings/:id", authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const paintings = await readPaintings();
    const filtered = paintings.filter((p) => p.id !== id);
    if (filtered.length === paintings.length) return res.status(404).json({ error: "Painting not found" });
    await writePaintings(filtered);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Verify token
app.get("/api/auth/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ArtFusion API running at http://localhost:${PORT}`);
});
