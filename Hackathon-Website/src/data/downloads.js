// Public files offered for download. Files live in /public/downloads.
// To add one, copy the file there and add an entry below.
export const DOWNLOADS = [
  {
    id: 'ppt-template',
    label: 'Download PPT template',
    title: 'IDEA SUBMISSION TEMPLATE',
    description: 'The official BUILDATHON 2026 idea-submission template. Max 6 slides, including the title slide.',
    href: `${import.meta.env.BASE_URL}downloads/buildathon-2026-idea-template.pptx`,
    filename: 'BUILDATHON-2026-Idea-Template.pptx'
  }
];

export const PPT_TEMPLATE = DOWNLOADS[0];
