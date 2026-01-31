# Add Video Background to Hero

To add a video background to the hero section:

1. Add an MP4 video file to `public/hero-bg.mp4`
2. Update `HeroSection.tsx` to include:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-30"
>
  <source src="/hero-bg.mp4" type="video/mp4" />
</video>
```

Place it inside the background div, before the gradient overlay. Use short, lightweight videos (under 5MB) for best performance.
