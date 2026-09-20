import { config, fields, singleton } from '@keystatic/core';

const faqFields = {
  label: fields.text({ label: 'Section label' }),
  heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
  introduction: fields.text({ label: 'Introduction', multiline: true }),
  faqs: fields.array(
    fields.object({
      question: fields.text({ label: 'Question', validation: { isRequired: true } }),
      answer: fields.text({ label: 'Answer', multiline: true, validation: { isRequired: true } }),
    }),
    { label: 'FAQ items', itemLabel: (props) => props.fields.question.value || 'New question' },
  ),
};

export default config({
  storage: { kind: 'local' },
  singletons: {
    product360: singleton({
      label: '360 Feedback Page',
      path: 'src/content/360-page',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Hero eyebrow' }),
        title: fields.text({ label: 'Hero title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Hero description', multiline: true }),
        heroImageUrl: fields.text({ label: 'Hero image URL', validation: { isRequired: true } }),
        heroImageAlt: fields.text({ label: 'Hero image alt text', validation: { isRequired: true } }),
        proofHeading: fields.text({ label: 'Proof section heading', validation: { isRequired: true } }),
        proofDescription: fields.text({ label: 'Proof section description', validation: { isRequired: true } }),
        proofCtaLabel: fields.text({ label: 'Proof section CTA', validation: { isRequired: true } }),
        proofStats: fields.array(fields.object({
          value: fields.text({ label: 'Statistic', validation: { isRequired: true } }),
          description: fields.text({ label: 'Explanation', multiline: true, validation: { isRequired: true } }),
        }), { label: 'Proof statistics', itemLabel: (props) => props.fields.value.value || 'New statistic' }),
        primaryCta: fields.text({ label: 'Primary CTA' }),
        secondaryCta: fields.text({ label: 'Secondary CTA' }),
        aiLabel: fields.text({ label: 'AI section label' }),
        aiHeading: fields.text({ label: 'AI section heading' }),
        aiDescription: fields.text({ label: 'AI section description', multiline: true }),
        finalHeading: fields.text({ label: 'Final CTA heading' }),
        finalDescription: fields.text({ label: 'Final CTA description', multiline: true }),
        metaTitle: fields.text({ label: 'SEO title' }),
        metaDescription: fields.text({ label: 'SEO description', multiline: true }),
      },
    }),
    capabilities360: singleton({
      label: '360 Feedback Capabilities',
      path: 'src/content/360-capabilities',
      format: { data: 'json' },
      schema: {
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Title', validation: { isRequired: true } }),
            description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
            imageUrl: fields.text({ label: 'Image URL', validation: { isRequired: true } }),
            imageAlt: fields.text({ label: 'Image alt text', validation: { isRequired: true } }),
            reverse: fields.checkbox({ label: 'Image on the left (desktop)' }),
          }),
          { label: 'Capability modules', itemLabel: (props) => props.fields.title.value || 'New capability' },
        ),
      },
    }),
    smart360: singleton({
      label: 'Smart 360',
      path: 'src/content/smart-360',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        intro: fields.text({ label: 'Introduction' }),
        featureList: fields.text({ label: 'Feature list', multiline: true }),
        slides: fields.array(fields.object({
          imageUrl: fields.text({ label: 'Image URL', validation: { isRequired: true } }),
          imageAlt: fields.text({ label: 'Image alt text', validation: { isRequired: true } }),
          title: fields.text({ label: 'Slide title', validation: { isRequired: true } }),
          description: fields.text({ label: 'Slide description', multiline: true }),
        }), { label: 'Slides', itemLabel: (props) => props.fields.title.value || 'New slide' }),
      },
    }),
    faqPage: singleton({
      label: '360 Feedback FAQ',
      path: 'src/content/faq-page',
      format: { data: 'json' },
      schema: faqFields,
    }),
  },
});
