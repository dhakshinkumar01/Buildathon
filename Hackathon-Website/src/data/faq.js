// Rules and regulations, taken from the official Rules & Guidelines document.
// Each entry: q (question), a (paragraph, optional), list (bullet/step points, optional), ordered (numbered list).
export const FAQ = [
  {
    q: 'How big can a team be?',
    a: 'Teams must have 3–4 members. Each participant may be part of only one team. Team composition is locked in at registration, so no member swaps are allowed once a team is shortlisted.'
  },
  {
    q: 'How does selection work?',
    ordered: true,
    list: [
      'Register through the official registration form.',
      'Select a domain that fits your team.',
      'Choose one official problem statement.',
      'Submit your idea PPT using the official template.',
      'Organisers screen every submission for problem understanding, innovation, feasibility and clarity.',
      'The strongest ideas are shortlisted for the build day. About 50 teams are shortlisted.',
      'Shortlisted teams receive a confirmation email with payment instructions.',
      'Complete payment to confirm your spot.'
    ]
  },
  {
    q: 'What do I need to submit, and when?',
    list: [
      'Idea stage: your idea PPT on the official template, before shortlisting. Maximum 6 slides including the title slide. Use points, diagrams or pictures rather than paragraphs, and keep the template headings unchanged.',
      'Build day: a GitHub repository link, shared at both the Progress Review and the Final Review.',
      'Grand Finale: an updated PPT and a working live demo of your prototype.'
    ]
  },
  {
    q: 'What are the code rules?',
    a: 'All code must be written live, during the build day. This is the most strictly enforced rule of the event.',
    list: [
      'No forked, cloned or previously-built GitHub projects, yours or anyone else’s.',
      'Ideation, wireframes and research done before the build day are fine. Implementation is not.',
      'Judges check your commit history against the event timeline.'
    ]
  },
  {
    q: 'Can I use AI coding tools?',
    a: 'Yes. ChatGPT, GitHub Copilot, Claude or any other AI tool is fully allowed, with no restrictions and no disclosure required. The one boundary: pulling in someone else’s already-finished project, AI-assisted or not, is still not allowed.'
  },
  {
    q: 'Can I pick my own tech stack? Are datasets provided?',
    a: 'You choose your own stack. No dataset is provided by the organisers. Use public datasets, APIs, or your own synthetic or simulated data to build and demo your prototype.'
  },
  {
    q: 'How do the reviews and the finale work?',
    list: [
      'Progress Review (12:00 PM on build day): a checkpoint, not an elimination round. Every team continues to the Final Review.',
      'Final Review (4:30–6:00 PM on build day): all 50 teams are evaluated and the Top 10 finalists are selected.',
      'Grand Finale (next day): the Top 10 present their PPT and live prototype demo, answer judge questions, and winners are announced.'
    ]
  },
  {
    q: 'Are the judges impartial?',
    a: 'Yes. A judge does not score a team that includes their own student(s) or advisee(s).'
  },
  {
    q: 'What can get a team disqualified?',
    list: [
      'Submitting a forked, cloned or previously-built project.',
      'A no-show at the Progress Review, the Final Review or the Grand Finale presentation, without prior notice.',
      'Unauthorized team member swaps.',
      'Plagiarism of any kind.',
      'Violating the code of conduct.'
    ]
  },
  {
    q: 'What is the code of conduct?',
    a: 'All participants, judges, mentors and volunteers are expected to treat each other with respect. Harassment, discrimination or abusive behavior of any kind toward another participant, judge or volunteer will not be tolerated and may result in removal from the event.'
  },
  {
    q: 'Who owns what we build?',
    a: 'Teams retain ownership of what they build during the event. The organising college reserves the right to showcase, publicize or feature submitted projects (for example on the event website or social media) for promotional purposes.'
  },
  {
    q: 'When will the deadlines be announced?',
    a: 'The registration closing date, PPT submission deadline, payment details and Grand Finale timings will be shared with all registered teams before the event.'
  }
];
