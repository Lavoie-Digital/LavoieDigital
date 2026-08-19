"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Point d'entrée permanent vers les préférences de témoins.
 *
 * L'article 8.1 de la Loi 25 suppose que le choix reste modifiable : un
 * consentement qu'on ne peut plus retirer n'en est pas un. Ce bouton vit dans le
 * pied de page et dans la politique de confidentialité, donc joignable depuis
 * n'importe quelle page.
 */
export default function ConsentSettingsButton({
  className = "link-underline text-white/55 hover:text-white",
  children = "Gérer les témoins",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openPanel } = useConsent();

  return (
    <button type="button" onClick={openPanel} className={className}>
      {children}
    </button>
  );
}
