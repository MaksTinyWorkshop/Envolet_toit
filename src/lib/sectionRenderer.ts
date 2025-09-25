import type { CollectionEntry } from 'astro:content';

import CtaBanner from '@components/CtaBanner.astro';
import FeatureGrid from '@components/FeatureGrid.astro';
import HeroSection from '@components/HeroSection.astro';
import MarkdownSection from '@components/MarkdownSection.astro';
import TestimonialSection from '@components/TestimonialSection.astro';

const componentMap = {
  hero: HeroSection,
  'feature-grid': FeatureGrid,
  testimonials: TestimonialSection,
  markdown: MarkdownSection,
  cta: CtaBanner,
} as const;

type SectionComponentName = keyof typeof componentMap;

type ResolvedSection = {
  Component: (typeof componentMap)[SectionComponentName];
  props: Record<string, unknown>;
};

export async function resolveSection(
  section: CollectionEntry<'sections'>,
): Promise<ResolvedSection> {
  const Component = componentMap[section.data.component as SectionComponentName];

  if (!Component) {
    throw new Error(`Section inconnue: ${section.id}`);
  }

  switch (section.data.component) {
    case 'hero':
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          content: section.data.content,
          primaryCta: section.data.primaryCta,
          secondaryCta: section.data.secondaryCta,
          image: section.data.image,
        },
      };
    case 'feature-grid':
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          description: section.data.description,
          features: section.data.features,
        },
      };
    case 'testimonials':
      return {
        Component,
        props: {
          title: section.data.title,
          description: section.data.description,
          testimonials: section.data.testimonials,
        },
      };
    case 'markdown': {
      const { Content } = await section.render();
      return {
        Component,
        props: {
          title: section.data.title,
          Content,
        },
      };
    }
    case 'cta':
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          description: section.data.description,
          primaryCta: section.data.primaryCta,
          secondaryCta: section.data.secondaryCta,
        },
      };
    default:
      throw new Error(`Section non gérée: ${section.id}`);
  }
}
