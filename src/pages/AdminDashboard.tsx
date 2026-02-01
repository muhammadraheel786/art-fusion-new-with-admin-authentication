import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchPaintings,
  createPainting,
  updatePainting,
  deletePainting,
  hasSupabase,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Palette,
  ArrowLeft,
  Upload,
} from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

const CATEGORIES = [
  // By Medium/Technique
  "Oil Painting",
  "Acrylic Painting",
  "Watercolor Painting",
  // By Style
  "Abstract",
  "Realism",
  "Impressionism",
  "Expressionism",
  "Surrealism",
  "Cubism",
  "Minimalism",
  "Pop Art",
  "Futurism",
  // By Subject
  "Portrait",
  "Landscape",
  "Still Life",
  "Figurative",
  "Religious",
  "Historical",
  "Mythological",
  // Special Techniques/Textures
  "Textured Art",
  "Palette Knife Painting",
  "Mixed Media",
  "Resin Art",
  "3D Paintings",
  "Calligraphy Art",
  // Additional
  "Sketch",
  "Customized",
];

type Painting = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  category?: string;
};

const emptyForm = () => ({
  title: "",
  description: "",
  price: "Contact for a personalized quote",
  image: "",
  featured: false,
  category: "Landscape",
});

const AdminDashboard = () => {
  const { isAdmin, token, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Painting | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate("/admin/login", { replace: true });
      return;
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (!token || !hasSupabase) {
      setLoading(false);
      return;
    }
    fetchPaintings()
      .then(setPaintings)
      .catch(() => toast({ variant: "destructive", title: "Failed to load paintings" }))
      .finally(() => setLoading(false));
  }, [token, toast]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setImageFile(null);
    setDialogOpen(true);
  };

  const openEdit = (p: Painting) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      price: p.price,
      image: p.image,
      featured: p.featured ?? false,
      category: p.category ?? "Landscape",
    });
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      if (imageFile) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("featured", String(form.featured));
        fd.append("category", form.category);
        fd.append("image", imageFile);

        if (editing) {
          const updated = await updatePainting(token, editing.id, fd);
          setPaintings((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
        } else {
          const created = await createPainting(token, fd);
          setPaintings((prev) => [...prev, created]);
        }
      } else {
        const data = {
          ...form,
          image: form.image || (editing?.image ?? ""),
        };
        if (editing) {
          const updated = await updatePainting(token, editing.id, data);
          setPaintings((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
        } else {
          if (!form.image) throw new Error("Please add an image URL or upload a file");
          const created = await createPainting(token, data);
          setPaintings((prev) => [...prev, created]);
        }
      }
      toast({ title: editing ? "Updated!" : "Added!" });
      setDialogOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || deleteId == null) return;
    try {
      await deletePainting(token, deleteId);
      setPaintings((prev) => prev.filter((p) => p.id !== deleteId));
      toast({ title: "Deleted" });
      setDeleteId(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Could not delete",
      });
    }
  };

  if (isLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to site
            </Link>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            </div>
          </div>
          <Button onClick={openAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Painting
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-muted-foreground">Loading paintings...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paintings.map((p) => (
              <div
                key={p.id}
                className="bg-card rounded-xl border overflow-hidden group"
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{p.category}</p>
                  <p className="text-sm font-medium text-primary mt-1 truncate">{formatPrice(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Painting" : "Add Painting"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Painting title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <div>
              <Label>Price (Rs. is added automatically)</Label>
              <Input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="e.g. 5,000 or Contact for quote"
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featured: e.target.checked }))
                }
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div>
              <Label>Image (upload or URL)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={form.image}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, image: e.target.value }));
                    setImageFile(null);
                  }}
                  placeholder="/paintings/1.png or URL"
                />
                <label className="flex items-center gap-1 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setImageFile(f);
                        setForm((prev) => ({ ...prev, image: "" }));
                      }
                    }}
                  />
                </label>
              </div>
              {imageFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  New file: {imageFile.name}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId != null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete painting?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
