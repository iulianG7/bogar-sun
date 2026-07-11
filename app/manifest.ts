import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bogar Sun",
    short_name: "Bogar Sun",
    description: "Bogar Sun Management",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#facc15",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}