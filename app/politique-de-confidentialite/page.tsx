import type { Metadata } from "next";
import Link from "next/link";
import ConsentSettingsButton from "../_components/ConsentSettingsButton";
import { SectionHeader } from "../_components/Services";

const DESCRIPTION =
  "Politique de confidentialité de Lavoie Digital, conforme à la Loi 25 du Québec : renseignements recueillis, témoins, finalités, consentement, conservation, droits et recours.";

/** Date de la dernière révision de fond. À mettre à jour à chaque modification. */
const LAST_UPDATED = "19 août 2026";

export const metadata: Metadata = {
  // Pas de nom de marque ici — le template racine ajoute déjà " — Lavoie Digital".
  title: "Politique de confidentialité",
  description: DESCRIPTION,
  alternates: { canonical: "/politique-de-confidentialite" },
  keywords: [
    "politique de confidentialité Loi 25",
    "protection des renseignements personnels Québec",
    "Loi 25 site web",
    "confidentialité agence web Québec",
  ],
  openGraph: {
    title: "Politique de confidentialité — Lavoie Digital",
    description: DESCRIPTION,
    url: "/politique-de-confidentialite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité — Lavoie Digital",
    description: DESCRIPTION,
  },
};

const SUMMARY = [
  {
    title: "Rien avant votre accord",
    body: "Aucun témoin de mesure ni de publicité n'est déposé tant que vous n'avez pas accepté. Refuser prend un clic et ne retire aucune fonctionnalité.",
  },
  {
    title: "Ce que vous nous donnez",
    body: "Uniquement ce que vous inscrivez au formulaire ou nous écrivez : nom, courriel, entreprise, téléphone, contexte du projet.",
  },
  {
    title: "Jamais revendu",
    body: "Vos renseignements servent à vous répondre et à cadrer votre projet. Aucune vente, aucune location, aucun échange.",
  },
  {
    title: "Vos droits",
    body: "Accès, rectification, retrait du consentement, suppression, portabilité. Réponse en 30 jours au maximum.",
  },
];

type Section = {
  id: string;
  num: string;
  title: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "responsable",
    num: "01",
    title: "Qui nous sommes et qui est responsable",
    body: (
      <>
        <P>
          Lavoie Digital est un studio de conception et de développement web
          établi à Québec, exploité par Xavier Lavoie. Nous concevons des sites
          web et des applications sur mesure pour des entreprises, surtout au
          Québec.
        </P>
        <P>
          Conformément à l&apos;article 3.1 de la <em>Loi sur la protection des
          renseignements personnels dans le secteur privé</em>, modifiée par la
          Loi 25, la personne ayant la plus haute autorité au sein de
          l&apos;entreprise exerce la fonction de responsable de la protection
          des renseignements personnels. Cette fonction est assumée par :
        </P>
        <ContactCard />
        <P>
          La présente politique explique quels renseignements personnels nous
          recueillons, pourquoi, avec qui nous les partageons, combien de temps
          nous les conservons et quels droits vous pouvez exercer. Elle
          s&apos;applique au site lavoiedigital.ca et à toutes les
          communications que vous entretenez avec nous.
        </P>
      </>
    ),
  },
  {
    id: "renseignements",
    num: "02",
    title: "Les renseignements que nous recueillons",
    body: (
      <>
        <P>
          Nous appliquons le principe de la collecte minimale : nous ne
          recueillons que les renseignements nécessaires aux fins décrites à la
          section 03. Vous n&apos;avez pas à créer de compte pour consulter le
          site.
        </P>

        <SubTitle>Formulaire de réservation</SubTitle>
        <P>
          Lorsque vous remplissez le formulaire de la page{" "}
          <Link href="/booking" className="link-underline text-white/85">
            Réserver
          </Link>
          , nous recueillons :
        </P>
        <List
          items={[
            "Votre nom complet (obligatoire)",
            "Votre adresse courriel (obligatoire)",
            "Le nom de votre entreprise (facultatif)",
            "Votre numéro de téléphone (facultatif)",
            "Le type de projet, la fourchette budgétaire et l'échéancier souhaité",
            "Le message décrivant votre projet, ainsi que tout renseignement que vous choisissez d'y inclure",
          ]}
        />
        <P>
          Les champs marqués comme obligatoires sont les seuls nécessaires pour
          traiter votre demande. Nous vous invitons à ne pas inscrire de
          renseignements sensibles dans le champ de message.
        </P>

        <SubTitle>Communications directes</SubTitle>
        <P>
          Si vous nous écrivez à info@lavoiedigital.ca, nous téléphonez ou nous
          contactez par nos réseaux sociaux, nous conservons le contenu de
          l&apos;échange et vos coordonnées afin d&apos;assurer le suivi. Les
          plateformes sociales (Instagram, LinkedIn, Facebook) sont exploitées
          par des tiers dont les pratiques leur sont propres et échappent à
          notre contrôle.
        </P>

        <SubTitle>Renseignements techniques</SubTitle>
        <P>
          Comme tout site web, notre hébergeur inscrit automatiquement dans ses
          journaux certaines données techniques nécessaires à la livraison des
          pages et à la sécurité : adresse IP, type de navigateur, système
          d&apos;exploitation, page demandée, date et heure, page de
          provenance. Ces journaux servent uniquement au diagnostic et à la
          protection contre les abus. Nous ne les utilisons pas pour vous
          identifier, ni pour construire un profil.
        </P>

        <SubTitle>Données de navigation — seulement si vous acceptez</SubTitle>
        <P>
          Si, et seulement si, vous acceptez la catégorie correspondante dans la
          bannière de témoins, Google Analytics 4 et Google Ads recueillent des
          données de navigation : pages consultées, durée de la visite, page de
          provenance, campagne publicitaire d&apos;origine, type d&apos;appareil,
          navigateur, langue et localisation approximative (ville ou région,
          déduite de l&apos;adresse IP puis tronquée par Google). Ces données
          sont associées à un identifiant technique aléatoire, pas à votre nom.
        </P>
        <P>
          Le détail des témoins, de leur durée et du fonctionnement du refus se
          trouve à la{" "}
          <a href="#temoins" className="link-underline text-white/85">
            section 05
          </a>
          . Tant que vous n&apos;avez pas accepté, rien de tout cela
          n&apos;est recueilli.
        </P>

        <SubTitle>Ce que nous ne recueillons pas</SubTitle>
        <P>
          Nous ne recueillons aucun renseignement de paiement sur ce site,
          aucune donnée de santé, aucun renseignement biométrique et aucune
          donnée de géolocalisation précise. Nous n&apos;achetons pas de listes
          de contacts et nous ne récoltons pas de renseignements auprès de
          tiers à votre sujet.
        </P>
      </>
    ),
  },
  {
    id: "finalites",
    num: "03",
    title: "Pourquoi nous recueillons ces renseignements",
    body: (
      <>
        <P>
          Chaque renseignement recueilli sert à une finalité précise et
          déterminée avant la collecte :
        </P>
        <List
          items={[
            "Répondre à votre demande, planifier un appel découverte et préparer une proposition adaptée à votre projet.",
            "Vous transmettre le courriel de confirmation qui accuse réception de votre demande.",
            "Assurer le suivi de la relation d'affaires : échéancier, livrables, facturation et soutien après la mise en ligne.",
            "Respecter nos obligations légales, fiscales et comptables.",
            "Maintenir la sécurité du site, prévenir la fraude et les envois automatisés abusifs.",
            "Avec votre consentement seulement : mesurer la fréquentation du site pour l'améliorer, et évaluer l'efficacité de nos annonces publicitaires.",
          ]}
        />
        <P>
          Les deux dernières finalités reposent sur des bases différentes : la
          sécurité relève de notre intérêt légitime à protéger le site, tandis
          que la mesure d&apos;audience et la publicité dépendent uniquement de
          votre consentement, demandé séparément pour chacune et révocable en
          tout temps (voir la{" "}
          <a href="#temoins" className="link-underline text-white/85">
            section 05
          </a>
          ).
        </P>
        <P>
          Nous n&apos;utilisons jamais vos renseignements à d&apos;autres fins
          que celles-ci sans obtenir au préalable votre consentement distinct.
          Si une nouvelle finalité devait apparaître, nous vous en informerions
          et vous demanderions votre accord avant de procéder.
        </P>
        <P>
          Nous ne vendons pas, ne louons pas et n&apos;échangeons pas vos
          renseignements personnels. Nous ne vous inscrivons à aucune
          infolettre sans une demande explicite de votre part.
        </P>
      </>
    ),
  },
  {
    id: "consentement",
    num: "04",
    title: "Votre consentement et son retrait",
    body: (
      <>
        <P>
          Nous recueillons vos renseignements sur la base de votre consentement
          libre et éclairé, donné de manière expresse : en remplissant et en
          soumettant le formulaire de réservation, ou en nous écrivant
          directement. Ce consentement est demandé pour des fins précises, il
          est donné à des fins spécifiques et il vaut le temps nécessaire à
          l&apos;atteinte de ces fins.
        </P>
        <P>
          Certains renseignements sont plutôt nécessaires à l&apos;exécution du
          contrat qui nous lie, ou à l&apos;exécution d&apos;une obligation
          légale : dans ces cas, leur traitement se poursuit tant que le
          contrat ou l&apos;obligation subsiste.
        </P>
        <P>
          Le consentement aux témoins de mesure d&apos;audience et de publicité
          est distinct de celui-ci : il se donne, se refuse et se retire dans la
          bannière prévue à cette fin, catégorie par catégorie. Remplir le
          formulaire n&apos;autorise pas les traceurs, et accepter les traceurs
          ne nous autorise pas à vous démarcher. Voir la{" "}
          <a href="#temoins" className="link-underline text-white/85">
            section 05
          </a>
          .
        </P>
        <P>
          Vous pouvez retirer votre consentement en tout temps, sans
          justification, en écrivant à info@lavoiedigital.ca — ou, pour les
          témoins, par le lien{" "}
          <strong className="text-white/90">Gérer les témoins</strong> du pied de
          page. Le retrait ne compromet pas la légalité du traitement effectué
          avant celui-ci. Si le retrait nous empêche de poursuivre un mandat en
          cours, nous vous en informerons clairement avant d&apos;y donner suite.
        </P>
      </>
    ),
  },
  {
    id: "temoins",
    num: "05",
    title: "Témoins, traceurs et consentement",
    body: (
      <>
        <Callout>
          Aucun témoin de mesure d&apos;audience ou de publicité n&apos;est
          déposé avant que vous ayez accepté. Tant que vous n&apos;avez pas
          choisi, ou si vous refusez, aucune requête ne part vers les serveurs
          de Google : la balise n&apos;est pas simplement bridée, elle
          n&apos;est pas chargée du tout.
        </Callout>

        <SubTitle>Les trois catégories</SubTitle>
        <P>
          Conformément à l&apos;article 8.1 de la Loi, toute technologie
          permettant de vous identifier, de vous localiser ou d&apos;effectuer un
          profilage est désactivée par défaut. Conformément à l&apos;article 14,
          chaque finalité vous est présentée séparément et se refuse séparément :
          accepter la mesure d&apos;audience ne déclenche pas la balise
          publicitaire.
        </P>
        <Table
          head={["Catégorie", "À quoi elle sert", "Par défaut"]}
          rows={[
            [
              "Strictement nécessaire",
              "Mémoriser le choix que vous faites dans la bannière. Sans cette catégorie, la question vous serait reposée à chaque page.",
              "Actif — aucun consentement requis",
            ],
            [
              "Mesure d'audience",
              "Compter les visites, savoir quelles pages sont consultées et par quel canal vous êtes arrivé, pour améliorer le site.",
              "Refusé",
            ],
            [
              "Publicité",
              "Savoir quelles annonces mènent à une demande de soumission, afin de ne pas payer pour de la publicité inefficace.",
              "Refusé",
            ],
          ]}
        />

        <SubTitle>Les témoins concernés</SubTitle>
        <Table
          head={["Témoin", "Déposé par", "Finalité", "Durée"]}
          rows={[
            [
              "ld_consent",
              "Lavoie Digital (première partie)",
              "Conserve votre décision et sa date. Ne contient aucun identifiant unique et ne permet pas de vous reconnaître.",
              "6 mois",
            ],
            [
              "_ga, _ga_*",
              "Google Analytics 4",
              "Distingue les appareils afin de ne pas compter deux fois la même visite. Déposé seulement si vous acceptez la mesure d'audience.",
              "24 mois",
            ],
            [
              "_gcl_au",
              "Google Ads",
              "Attribue une demande de soumission au clic publicitaire qui l'a précédée. Déposé seulement si vous acceptez la publicité.",
              "90 jours",
            ],
          ]}
        />
        <P>
          Au terme de six mois, le témoin de consentement expire et la question
          vous est reposée : nous ne présumons pas d&apos;un accord donné
          indéfiniment.
        </P>

        <SubTitle>Comment votre choix est appliqué</SubTitle>
        <P>
          Le refus n&apos;est pas déclaratif, il est technique. Concrètement :
        </P>
        <List
          items={[
            "La librairie de Google (gtag.js) n'est ajoutée à la page qu'après une acceptation. Un refus signifie zéro connexion à googletagmanager.com.",
            "Le mode Consentement v2 de Google est initialisé avec tous les signaux refusés — stockage publicitaire, données publicitaires, personnalisation, stockage de mesure — avant toute autre commande.",
            "La suppression des données publicitaires (ads_data_redaction) est activée : les identifiants publicitaires sont retirés des requêtes tant que la publicité est refusée.",
            "Les signaux Google (allow_google_signals) et la personnalisation publicitaire restent désactivés sans accord explicite pour la publicité : aucun recoupement entre vos appareils, aucune audience de remarketing.",
            "Votre adresse IP est tronquée par Google avant d'être stockée. Nous ne recevons jamais d'adresse IP dans nos rapports.",
            "Un retrait supprime immédiatement les témoins déjà déposés par Google, en plus de couper les envois.",
          ]}
        />

        <SubTitle>Modifier ou retirer votre consentement</SubTitle>
        <P>
          Votre choix est révocable en tout temps, sans justification et sans
          conséquence sur votre utilisation du site. Le lien{" "}
          <strong className="text-white/90">Gérer les témoins</strong> figure
          dans le pied de page de chaque page, ou utilisez le bouton
          ci-dessous :
        </P>
        <div className="mt-5">
          <ConsentSettingsButton className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-[14px] font-medium tracking-tight text-white/85 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
            Gérer mes préférences de témoins
          </ConsentSettingsButton>
        </div>
        <P>
          Vous pouvez aussi bloquer ou effacer les témoins depuis les réglages de
          votre navigateur. Si vous supprimez le témoin{" "}
          <code className="font-mono text-[13px] text-white/70">ld_consent</code>
          , la bannière réapparaîtra à votre prochaine visite.
        </P>

        <SubTitle>Ce que nous n&apos;utilisons pas</SubTitle>
        <List
          items={[
            "Aucun pixel Meta (Facebook, Instagram), aucune balise LinkedIn, aucune régie publicitaire tierce.",
            "Aucun outil d'enregistrement de session ni de carte de chaleur : nous ne rejouons pas vos mouvements de souris ni vos frappes au clavier.",
            "Aucune segmentation comportementale, aucun score, aucun profil publicitaire constitué à votre sujet.",
            "Aucun mur de témoins : le contenu du site est intégralement accessible que vous acceptiez ou non.",
            "Aucune vente ni location de données de navigation.",
          ]}
        />
        <P>
          Les polices de caractères sont hébergées directement sur notre serveur.
          Votre navigateur n&apos;effectue donc aucune requête vers les serveurs
          de Google pour afficher une page, même après acceptation.
        </P>
      </>
    ),
  },
  {
    id: "partage",
    num: "06",
    title: "Avec qui nous partageons vos renseignements",
    body: (
      <>
        <P>
          Vos renseignements restent confidentiels. Nous les communiquons
          uniquement aux prestataires strictement nécessaires au
          fonctionnement du site et au traitement de votre demande, et
          seulement dans la mesure requise pour le service rendu. Ces
          prestataires agissent à titre de mandataires : ils ne peuvent pas
          utiliser vos renseignements à leurs propres fins.
        </P>
        <Table
          rows={[
            [
              "Twilio SendGrid",
              "Envoi des courriels transactionnels : notification de votre demande et accusé de réception qui vous est destiné.",
              "États-Unis",
            ],
            [
              "Google LLC — Firebase App Hosting",
              "Hébergement du site, diffusion des pages par le réseau mondial de Google et journaux techniques de sécurité. Nécessaire à l'affichage du site : cette communication n'est pas soumise au consentement.",
              "États-Unis (réseau mondial)",
            ],
            [
              "Google LLC — Analytics 4",
              "Mesure de la fréquentation du site. Uniquement si vous avez accepté la catégorie « mesure d'audience ». Aucune donnée nominative ne lui est transmise.",
              "États-Unis (réseau mondial)",
            ],
            [
              "Google LLC — Ads",
              "Mesure des conversions publicitaires. Uniquement si vous avez accepté la catégorie « publicité ». Aucune donnée nominative ne lui est transmise.",
              "États-Unis (réseau mondial)",
            ],
          ]}
        />
        <P>
          Les deux dernières lignes ne s&apos;activent qu&apos;avec votre
          consentement : en son absence, aucune donnée ne quitte votre navigateur
          en direction de Google. Nous ne transmettons jamais votre nom, votre
          courriel ni votre numéro de téléphone à ces outils — même après
          acceptation, seules les caractéristiques non nominatives de la demande
          (type de projet, fourchette budgétaire, échéancier) accompagnent
          l&apos;événement de conversion.
        </P>
        <P>
          Nous pouvons également communiquer des renseignements personnels sans
          votre consentement lorsque la loi l&apos;exige ou le permet :
          réponse à une ordonnance d&apos;un tribunal, à une demande valide
          d&apos;une autorité compétente, ou pour faire valoir nos droits en
          cas de litige. Le cas échéant, nous limitons la communication au
          strict nécessaire.
        </P>
        <P>
          En cas de transaction commerciale visant l&apos;entreprise (vente,
          fusion, transfert d&apos;actifs), vos renseignements pourraient être
          communiqués à l&apos;autre partie dans le cadre encadré par
          l&apos;article 18.4 de la Loi, sous entente de confidentialité
          préalable et pour la seule fin de conclure la transaction.
        </P>
      </>
    ),
  },
  {
    id: "hors-quebec",
    num: "07",
    title: "Communication à l'extérieur du Québec",
    body: (
      <>
        <P>
          Certains de nos prestataires sont établis aux États-Unis. Vos
          renseignements peuvent donc être hébergés ou traités à
          l&apos;extérieur du Québec, dans une juridiction dont le régime de
          protection diffère du droit québécois et où des autorités
          gouvernementales pourraient, dans certaines circonstances, y avoir
          accès.
        </P>
        <P>
          Comme l&apos;exige l&apos;article 17 de la Loi, nous avons évalué
          avant toute communication hors Québec les facteurs relatifs à la vie
          privée en tenant compte de la sensibilité des renseignements
          (coordonnées d&apos;affaires et données de navigation, faible
          sensibilité), de la finalité de leur utilisation, des mesures de
          protection en place et du régime juridique applicable. Nous avons
          conclu que les renseignements bénéficient d&apos;une protection
          adéquate. Chaque communication est par ailleurs encadrée par une
          entente écrite prévoyant des obligations de confidentialité et de
          sécurité.
        </P>
        <P>
          Google LLC intervient à deux titres distincts, qu&apos;il importe de ne
          pas confondre :
        </P>
        <List
          items={[
            "Comme hébergeur (Firebase App Hosting), en permanence : afficher une page suppose que votre navigateur communique avec ses serveurs. Cette communication est nécessaire à la livraison du site et se limite aux journaux techniques décrits à la section 02.",
            "Comme outil de mesure et de publicité (Analytics 4, Ads), seulement si vous y avez consenti. Refuser, ou ne rien choisir, signifie qu'aucune donnée de navigation vous concernant n'est transmise à ces deux outils.",
          ]}
        />
        <P>
          Vous pouvez revenir sur le second choix en tout temps à la{" "}
          <a href="#temoins" className="link-underline text-white/85">
            section 05
          </a>
          . Le premier n&apos;est pas révocable autrement qu&apos;en cessant de
          consulter le site — c&apos;est la contrepartie inévitable de tout
          hébergement web, quel qu&apos;en soit le fournisseur.
        </P>
        <P>
          Cette évaluation est révisée lorsque nous changeons de prestataire ou
          que la nature des renseignements transmis évolue.
        </P>
      </>
    ),
  },
  {
    id: "conservation",
    num: "08",
    title: "Durée de conservation et destruction",
    body: (
      <>
        <P>
          Nous conservons vos renseignements uniquement le temps nécessaire à
          l&apos;atteinte des fins pour lesquelles ils ont été recueillis. Une
          fois ce délai écoulé, ils sont détruits de façon sécuritaire ou
          anonymisés.
        </P>
        <Table
          head={["Type de renseignement", "Durée", "Ensuite"]}
          rows={[
            [
              "Demande sans suite commerciale",
              "24 mois après le dernier échange",
              "Destruction",
            ],
            [
              "Dossier client actif",
              "Durée du mandat",
              "Passe en conservation légale",
            ],
            [
              "Dossier client terminé (contrats, factures)",
              "7 ans après la fin du mandat",
              "Destruction",
            ],
            [
              "Correspondance courriel",
              "36 mois",
              "Destruction",
            ],
            [
              "Journaux techniques du serveur",
              "12 mois au maximum",
              "Suppression automatique",
            ],
            [
              "Choix de consentement aux témoins",
              "6 mois",
              "Expiration du témoin, la question est reposée",
            ],
            [
              "Données de mesure d'audience (Google Analytics 4)",
              "14 mois — la durée la plus courte offerte par l'outil",
              "Suppression automatique par Google",
            ],
          ]}
        />
        <P>
          Ces délais peuvent être prolongés si une obligation légale, une
          vérification fiscale ou un litige en cours l&apos;exige. Dans ce cas,
          la conservation est limitée à ce qui est strictement nécessaire et
          reprend son cours normal une fois la situation résolue.
        </P>
      </>
    ),
  },
  {
    id: "securite",
    num: "09",
    title: "Mesures de sécurité",
    body: (
      <>
        <P>
          Nous prenons des mesures de sécurité raisonnables, proportionnelles à
          la sensibilité des renseignements, pour les protéger contre la perte,
          le vol, l&apos;accès non autorisé, la divulgation, la copie ou la
          modification :
        </P>
        <List
          items={[
            "Chiffrement de bout en bout des communications avec le site (HTTPS/TLS obligatoire).",
            "Aucune base de données de prospects exposée publiquement : les demandes du formulaire sont acheminées par courriel, sans stockage sur le site.",
            "Accès aux boîtes courriel et aux outils protégé par mots de passe robustes et authentification à deux facteurs.",
            "Clés d'accès aux services tiers conservées en variables d'environnement chiffrées, jamais dans le code source.",
            "Validation et échappement des données soumises par formulaire pour prévenir les injections.",
            "Accès aux renseignements limité aux seules personnes qui en ont besoin pour accomplir leur travail.",
            "Mises à jour régulières des dépendances logicielles et surveillance des vulnérabilités connues.",
          ]}
        />
        <P>
          Aucun système n&apos;est infaillible. Nous ne pouvons garantir une
          sécurité absolue, mais nous nous engageons à réagir rapidement et à
          vous informer conformément à la section 13 si un incident devait
          survenir.
        </P>
      </>
    ),
  },
  {
    id: "droits",
    num: "10",
    title: "Vos droits en vertu de la Loi 25",
    body: (
      <>
        <P>
          La loi québécoise vous reconnaît plusieurs droits sur les
          renseignements personnels que nous détenons à votre sujet. Vous
          pouvez les exercer gratuitement, en tout temps.
        </P>
        <Rights />
      </>
    ),
  },
  {
    id: "exercer",
    num: "11",
    title: "Comment exercer vos droits",
    body: (
      <>
        <P>
          Adressez votre demande par écrit au responsable de la protection des
          renseignements personnels, en précisant le droit que vous souhaitez
          exercer et, si possible, les renseignements visés.
        </P>
        <ContactCard />
        <P>
          Nous pourrions devoir vérifier votre identité avant de donner suite,
          afin de nous assurer que vos renseignements ne sont pas communiqués à
          une autre personne. Nous demanderons alors le minimum d&apos;éléments
          nécessaires à cette vérification.
        </P>
        <P>
          Nous répondons à toute demande dans un délai maximal de{" "}
          <strong className="text-white/90">30 jours</strong> suivant sa
          réception, comme le prévoit l&apos;article 32 de la Loi. Si nous
          refusons en tout ou en partie de donner suite, nous vous expliquerons
          le motif du refus, la disposition de la loi sur laquelle il repose,
          et les recours dont vous disposez, y compris le délai pour les
          exercer.
        </P>
      </>
    ),
  },
  {
    id: "automatise",
    num: "12",
    title: "Décisions automatisées et intelligence artificielle",
    body: (
      <>
        <P>
          Nous ne prenons aucune décision vous concernant qui soit fondée
          exclusivement sur un traitement automatisé de vos renseignements
          personnels. Chaque demande reçue est lue et évaluée par une personne.
        </P>
        <P>
          Nous intégrons des fonctionnalités d&apos;intelligence artificielle
          dans certains projets réalisés pour nos clients. Ces outils traitent
          les données du client concerné selon les modalités convenues avec lui
          par contrat, et non les renseignements des visiteurs de ce site.
        </P>
        <P>
          Si nous devions un jour recourir à une décision exclusivement
          automatisée, nous vous en informerions au moment de la décision et
          vous pourriez, comme le prévoit l&apos;article 12.1 de la Loi,
          connaître les renseignements utilisés, les principaux facteurs ayant
          mené au résultat, faire corriger les renseignements utilisés et
          présenter vos observations à une personne en mesure de réviser la
          décision.
        </P>
      </>
    ),
  },
  {
    id: "incidents",
    num: "13",
    title: "Incidents de confidentialité",
    body: (
      <>
        <P>
          Un incident de confidentialité est un accès, une utilisation ou une
          communication non autorisés de renseignements personnels, leur perte
          ou toute autre atteinte à leur protection.
        </P>
        <P>
          Si un tel incident survenait, nous prendrions sans délai les mesures
          raisonnables pour en limiter les conséquences et éviter qu&apos;il ne
          se reproduise. Lorsque l&apos;incident présente un risque de
          préjudice sérieux, nous en aviserions avec diligence la{" "}
          <strong className="text-white/90">
            Commission d&apos;accès à l&apos;information du Québec
          </strong>{" "}
          ainsi que chaque personne concernée, en décrivant l&apos;incident, les
          renseignements visés et les mesures à prendre pour réduire le risque.
        </P>
        <P>
          Nous tenons un registre de tous les incidents de confidentialité,
          conformément à l&apos;article 3.8 de la Loi. Ce registre est
          communiqué à la Commission sur demande.
        </P>
      </>
    ),
  },
  {
    id: "mineurs",
    num: "14",
    title: "Renseignements concernant les mineurs",
    body: (
      <>
        <P>
          Nos services s&apos;adressent à des entreprises et à des personnes
          majeures. Nous ne recueillons pas sciemment de renseignements
          personnels concernant un enfant de moins de 14 ans.
        </P>
        <P>
          Si vous constatez qu&apos;un mineur nous a transmis des
          renseignements, écrivez-nous : nous les détruirons rapidement.
          Lorsque la loi l&apos;exige, le consentement d&apos;un titulaire de
          l&apos;autorité parentale ou du tuteur est requis pour tout mineur de
          moins de 14 ans.
        </P>
      </>
    ),
  },
  {
    id: "donnees-clients",
    num: "15",
    title: "Données confiées par nos clients",
    body: (
      <>
        <P>
          Dans le cadre de nos mandats, nous concevons des sites et des
          applications qui traitent des renseignements personnels appartenant à
          nos clients ou à leurs propres utilisateurs. Pour ces
          renseignements-là, notre client demeure la personne qui exerce le
          contrôle : nous intervenons à titre de mandataire, uniquement selon
          ses instructions et pour les fins prévues au contrat.
        </P>
        <P>
          Ces mandats sont encadrés par une entente écrite qui prévoit les
          obligations de confidentialité, les mesures de sécurité, la durée du
          traitement et la destruction ou la remise des renseignements à la fin
          du mandat. Nous n&apos;utilisons jamais les données d&apos;un client
          à nos propres fins.
        </P>
        <P>
          Si vous êtes utilisateur d&apos;un service que nous avons développé
          pour une entreprise, adressez vos demandes d&apos;accès ou de
          rectification directement à cette entreprise, qui est responsable de
          vos renseignements. Nous l&apos;assisterons dans le traitement de
          votre demande.
        </P>
      </>
    ),
  },
  {
    id: "modifications",
    num: "16",
    title: "Modifications de cette politique",
    body: (
      <>
        <P>
          Nous pouvons modifier cette politique pour refléter un changement
          dans nos pratiques, dans nos outils ou dans le cadre légal
          applicable. La date de dernière mise à jour affichée en haut de la
          page indique toujours la version en vigueur.
        </P>
        <P>
          Lorsqu&apos;une modification touche de façon importante la manière
          dont nous traitons vos renseignements, nous vous en informerons par
          un moyen raisonnable et, si la loi l&apos;exige, nous recueillerons
          de nouveau votre consentement avant d&apos;appliquer le changement.
        </P>
      </>
    ),
  },
  {
    id: "plainte",
    num: "17",
    title: "Questions, plaintes et recours",
    body: (
      <>
        <P>
          Toute question ou plainte relative à la protection de vos
          renseignements personnels doit d&apos;abord nous être adressée. Nous
          en accusons réception, nous l&apos;examinons et nous vous
          communiquons notre réponse motivée dans les 30 jours.
        </P>
        <ContactCard />
        <P>
          Si notre réponse ne vous satisfait pas, ou si nous ne donnons pas
          suite à votre demande, vous pouvez déposer une plainte ou une demande
          d&apos;examen de mésentente auprès de l&apos;autorité de surveillance
          québécoise :
        </P>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-[15px] font-medium text-white">
            Commission d&apos;accès à l&apos;information du Québec
          </p>
          <div className="mt-4 grid gap-4 text-[14px] leading-relaxed text-white/55 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Québec
              </p>
              <p className="mt-2">
                525, boul. René-Lévesque Est, bureau 2.36
                <br />
                Québec (Québec) G1R 5S9
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Montréal
              </p>
              <p className="mt-2">
                2045, rue Stanley, bureau 900
                <br />
                Montréal (Québec) H3A 2V4
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            <a href="tel:+18885287741" className="link-underline text-white/80">
              1 888 528-7741
            </a>
            <span className="text-white/15">·</span>
            <a
              href="https://www.cai.gouv.qc.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-white/80"
            >
              cai.gouv.qc.ca
            </a>
          </div>
        </div>
        <P>
          Le dépôt d&apos;une plainte auprès de la Commission est gratuit et
          n&apos;a pas à être précédé d&apos;une démarche judiciaire.
        </P>
      </>
    ),
  },
];

const RIGHTS = [
  {
    title: "Droit d'accès",
    body: "Obtenir confirmation que nous détenons des renseignements à votre sujet, en recevoir une copie et savoir comment ils sont utilisés et à qui ils ont été communiqués.",
  },
  {
    title: "Droit de rectification",
    body: "Faire corriger un renseignement inexact, incomplet ou équivoque, ou faire supprimer un renseignement dont la collecte n'était pas autorisée.",
  },
  {
    title: "Retrait du consentement",
    body: "Retirer en tout temps le consentement que vous avez donné, ce qui met fin au traitement pour l'avenir.",
  },
  {
    title: "Droit à la portabilité",
    body: "Recevoir dans un format technologique structuré et couramment utilisé les renseignements informatisés que vous nous avez fournis, ou en demander le transfert à un tiers.",
  },
  {
    title: "Désindexation et cessation de diffusion",
    body: "Exiger que cesse la diffusion d'un renseignement vous concernant, ou que soit désindexé un hyperlien y donnant accès, lorsque les conditions de l'article 28.1 sont réunies.",
  },
  {
    title: "Décision automatisée",
    body: "Être informé si une décision vous concernant repose exclusivement sur un traitement automatisé, en connaître les facteurs et faire réviser la décision par une personne.",
  },
  {
    title: "Droit de plainte",
    body: "Porter plainte auprès de nous, puis auprès de la Commission d'accès à l'information si notre réponse ne vous satisfait pas.",
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <div className="h-24" />

      <section className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            titleAs="h1"
            eyebrow="Confidentialité"
            title="Politique de confidentialité."
            sub="Ce qu'on recueille, pourquoi, avec qui on le partage et comment reprendre la main. Écrit en français clair, conforme à la Loi 25 du Québec."
          />

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
            <span>Mise à jour — {LAST_UPDATED}</span>
            <span className="hidden text-white/15 sm:inline">·</span>
            <span>Loi 25 · RLRQ c. P-39.1</span>
            <span className="hidden text-white/15 sm:inline">·</span>
            <span>Lecture — 11 min</span>
          </div>

          {/* Résumé en langage clair — la Loi 25 exige une politique rédigée en
              termes simples ; ce bloc donne l'essentiel avant le détail. */}
          <div
            className="mt-12 overflow-hidden rounded-[2rem] border border-white/12 p-6 sm:p-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              backdropFilter: "blur(28px) saturate(180%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              En résumé
            </p>
            <div className="mt-7 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {SUMMARY.map((s) => (
                <div key={s.title}>
                  <p className="text-[15px] font-medium text-white">
                    {s.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/8 pt-6 text-[13px] leading-relaxed text-white/40">
              Ce résumé est fourni par commodité. Seul le texte intégral
              ci-dessous fait foi.
            </p>
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* Sommaire */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Sommaire
              </p>
              <nav className="mt-4">
                <ol className="space-y-2 text-[13px] leading-snug">
                  {SECTIONS.map((s) => (
                    <li key={s.id} className="flex gap-2.5">
                      <span className="font-mono text-[11px] text-white/25">
                        {s.num}
                      </span>
                      <a
                        href={`#${s.id}`}
                        className="link-underline text-white/55 hover:text-white"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Corps de la politique */}
            <div className="min-w-0 space-y-16">
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {s.num}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.35rem,2.6vw,1.85rem)] font-semibold tracking-tight text-white">
                    {s.title}
                  </h2>
                  <div className="mt-5 border-t border-white/8 pt-6">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Rappel de contact */}
          <div className="mt-20 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6 text-center backdrop-blur-md sm:flex-row sm:text-left">
            <div>
              <p className="text-sm text-white/80">
                Une question sur vos renseignements personnels ?
              </p>
              <p className="text-[13px] text-white/50">
                On répond à toute demande dans un maximum de 30 jours.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[13px]">
              <a
                href="mailto:info@lavoiedigital.ca?subject=Protection%20des%20renseignements%20personnels"
                className="link-underline text-white/90"
              >
                info@lavoiedigital.ca
              </a>
              <span className="hidden text-white/15 sm:inline">·</span>
              <a href="tel:+15142901648" className="link-underline text-white/90">
                +1 (514) 290-1648
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Primitives de mise en page du texte légal ---------- */

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-[1.75] text-white/60 first:mt-0">
      {children}
    </p>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[15px] font-medium text-white">{children}</h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[15px] leading-[1.7] text-white/60"
        >
          <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-white/30" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-[15px] leading-[1.7] text-white/75">
      {children}
    </div>
  );
}

function Table({
  head = ["Prestataire", "Rôle", "Emplacement"],
  rows,
}: {
  head?: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-white/40"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? "border-b border-white/8 px-5 py-4 text-[14px] font-medium text-white/90"
                      : "border-b border-white/8 px-5 py-4 text-[14px] leading-relaxed text-white/55"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Rights() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {RIGHTS.map((r) => (
        <div
          key={r.title}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
        >
          <p className="text-[15px] font-medium text-white">{r.title}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/55">
            {r.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
        Responsable de la protection des renseignements personnels
      </p>
      <p className="mt-3 text-[15px] font-medium text-white">Xavier Lavoie</p>
      <p className="text-[14px] text-white/50">
        Fondateur — Lavoie Digital, Québec (Québec), Canada
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
        <a
          href="mailto:info@lavoiedigital.ca?subject=Protection%20des%20renseignements%20personnels"
          className="link-underline text-white/85"
        >
          info@lavoiedigital.ca
        </a>
        <span className="text-white/15">·</span>
        <a href="tel:+15142901648" className="link-underline text-white/85">
          +1 (514) 290-1648
        </a>
      </div>
    </div>
  );
}
