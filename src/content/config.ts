import { defineCollection, z } from 'astro:content';

const callToActionSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const heroSchema = z.object({
  component: z.literal('hero'),
  eyebrow: z.string().optional(),
  title: z.string(),
  content: z.string(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  primaryCta: callToActionSchema.optional(),
  secondaryCta: callToActionSchema.optional(),
});

const featureGridSchema = z.object({
  component: z.literal('feature-grid'),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  features: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      }),
    )
    .min(1),
});

const testimonialSchema = z.object({
  component: z.literal('testimonials'),
  title: z.string(),
  description: z.string().optional(),
  testimonials: z
    .array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      }),
    )
    .min(1),
});

const markdownSchema = z.object({
  component: z.literal('markdown'),
  title: z.string().optional(),
});

const ctaSchema = z.object({
  component: z.literal('cta'),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  primaryCta: callToActionSchema,
  secondaryCta: callToActionSchema.optional(),
});

const sectionSchema = z.discriminatedUnion('component', [
  heroSchema,
  featureGridSchema,
  testimonialSchema,
  markdownSchema,
  ctaSchema,
]);

const sections = defineCollection({
  type: 'content',
  schema: sectionSchema,
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().optional(),
    sections: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
});

export const collections = {
  pages,
  sections,
};
