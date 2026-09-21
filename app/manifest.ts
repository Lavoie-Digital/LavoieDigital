import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lavoie Digital — Studio code & web",
    short_name: "Lavoie Digital",
    description:
      "Studio de développement full-stack à Québec. Applications, sites web et plateformes sur mesure pour les PME.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "fr-CA",
    orientation: "portrait",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Android recadre les icônes adaptatives : la variante maskable a le
      // fond pleine page et le monogramme réduit, pour survivre au masque.
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
