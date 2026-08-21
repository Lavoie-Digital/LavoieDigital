import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Next 16 n'autorise plus que la qualité 75 par défaut, et ramène en
     * silence toute autre valeur à la plus proche de cette liste — un
     * `quality={95}` sur un composant devenait donc 75 sans avertissement.
     *
     * 95 est déclaré pour le portrait du fondateur : sur un visage, les
     * artéfacts de compression se voient autour des yeux et du contour du
     * menton bien avant de se voir sur le reste du site. 75 reste la valeur par
     * défaut pour tout le monde.
     */
    qualities: [75, 95],
  },
};

export default nextConfig;
