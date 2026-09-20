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
    faqPage: singleton({
      label: '360 Feedback FAQ',
      path: 'src/content/faq-page',
      format: { data: 'json' },
      schema: faqFields,
    }),
  },
});
