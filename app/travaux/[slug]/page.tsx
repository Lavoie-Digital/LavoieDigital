import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "../../_components/CaseStudy";
import { PROJECTS, getProject } from "../../_components/projectsData";

const SITE_URL = "https://lavoiedigital.ca";

// A known, finite set of projects — prerender them all, nothing is resolved at
// request time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// `params` is a Promise in Next 16 and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `/travaux/${project.slug}`;
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: url },
    keywords: [
      `site web ${project.sector.toLowerCase()}`,
      `site web ${project.location}`,
      `réalisation web ${project.location}`,
      project.client,
      "étude de cas site web Québec",
    ],
    openGraph: {
      title: `${project.client} — Lavoie Digital`,
      description: project.metaDescription,
      url,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1440,
          height: 900,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} — Lavoie Digital`,
      description: project.metaDescription,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/travaux/${project.slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Travaux",
            item: `${SITE_URL}/travaux`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.client,
            item: `${SITE_URL}/travaux/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/travaux/${project.slug}#work`,
        name: project.title,
        description: project.metaDescription,
        url: `${SITE_URL}/travaux/${project.slug}`,
        image: `${SITE_URL}${project.image}`,
        dateCreated: project.year,
        inLanguage: "fr-CA",
        creator: { "@id": `${SITE_URL}#studio` },
        // The delivered site itself, credited back to the studio.
        about: {
          "@type": "WebSite",
          name: project.client,
          url: project.url,
        },
        keywords: [project.sector, project.location, project.tag].join(", "),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudy project={project} />
    </>
  );
}
