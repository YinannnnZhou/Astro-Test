import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    faqPage: singleton({
      label: '360 Feedback FAQ',
      path: 'src/content/faq-page',
      format: { data: 'json' },
      schema: {
        label: fields.text({
          label: 'Section label',
          description: 'Small label shown above the FAQ heading.',
        }),
        heading: fields.text({
          label: 'Heading',
          validation: { isRequired: true },
        }),
        introduction: fields.text({
          label: 'Introduction',
          multiline: true,
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({
              label: 'Question',
              validation: { isRequired: true },
            }),
            answer: fields.text({
              label: 'Answer',
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'FAQ items',
            itemLabel: (props) => props.fields.question.value || 'New question',
          },
        ),
      },
    }),
  },
});
