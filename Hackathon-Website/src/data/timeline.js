import { Users, Send, Lightbulb, Cpu, MonitorPlay, Trophy } from 'lucide-react';
import { REGISTER_URL } from '../constants';
import { PPT_TEMPLATE } from './downloads';

// The six stages every team goes through. Content comes from the official Rules & Guidelines
// and the idea-submission template. Anything not yet announced says so instead of guessing.
//
// action kinds: 'link' (external), 'download', 'scroll' (to a section id), 'schedule' (opens the schedule popup)
export const STEPS = [
  {
    num: '01',
    slug: 'register',
    title: 'REGISTER',
    summary: 'Sign up as a team of 3–4 members',
    when: 'BEFORE THE EVENT',
    icon: Users,
    points: [
      'Register through the official registration form.',
      'Teams must have 3–4 members. Each participant can be part of only one team.',
      'Team composition is locked at registration. No member swaps once a team is shortlisted.'
    ],
    note: 'The registration closing date will be shared with registered teams.',
    actions: [{ kind: 'link', label: 'Register now', href: REGISTER_URL, primary: true }]
  },
  {
    num: '02',
    slug: 'submit-ppt',
    title: 'SUBMIT PPT',
    summary: 'Pick a domain and problem statement, then submit your idea PPT',
    when: 'BEFORE THE EVENT',
    icon: Send,
    points: [
      'Choose a domain and one official problem statement.',
      'Use the official template: maximum 6 slides, including the title slide.',
      'The title slide needs your problem statement ID and title, domain name, team name and team leader name.',
      'Upload your PPT on the BUILDATHON registration form.'
    ],
    note: 'The PPT submission deadline will be shared with registered teams.',
    actions: [
      {
        kind: 'download',
        label: PPT_TEMPLATE.label,
        href: PPT_TEMPLATE.href,
        filename: PPT_TEMPLATE.filename,
        primary: true
      },
      { kind: 'scroll', label: 'Browse problem statements', target: 'challenges' }
    ]
  },
  {
    num: '03',
    slug: 'shortlist',
    title: 'SHORTLIST',
    summary: 'About 50 teams are shortlisted. Confirm your seat when selected',
    when: 'BEFORE THE EVENT',
    icon: Lightbulb,
    points: [
      'Organisers screen every idea for problem understanding, innovation, feasibility and clarity.',
      'About 50 teams are shortlisted for the build day.',
      'Shortlisted teams receive a confirmation email with payment instructions.',
      'Complete the payment to confirm your spot.'
    ],
    note: 'The screening window, shortlist date and payment details will be shared with registered teams.',
    actions: [{ kind: 'scroll', label: 'Read the rules', target: 'rules', primary: true }]
  },
  {
    num: '04',
    slug: 'build-day',
    title: 'BUILD DAY',
    summary: 'Build live, with reviews at 12 PM and 4:30 PM',
    when: '5 OCT - 8:00 AM',
    icon: Cpu,
    points: [
      '8:00 AM check-in, 8:45 opening and rules, 9:00 AM building starts.',
      '12:00 PM Progress Review: a checkpoint, not an elimination round.',
      '2:00 PM second building sprint, after lunch.',
      '4:30–6:00 PM Final Review: all 50 teams are evaluated and the Top 10 are selected.',
      'All code is written live on the day. Share your GitHub link at both reviews.'
    ],
    actions: [{ kind: 'schedule', label: 'View full schedule', primary: true }]
  },
  {
    num: '05',
    slug: 'top-10',
    title: 'TOP 10',
    summary: 'The Top 10 finalists are announced',
    when: '5 OCT - EVENING',
    icon: MonitorPlay,
    points: [
      'Scores are finalized and the Top 10 finalists are announced at the wrap-up.',
      'Finalists receive their Grand Finale instructions the same evening.'
    ],
    actions: [{ kind: 'scroll', label: 'Read the rules', target: 'rules', primary: true }]
  },
  {
    num: '06',
    slug: 'grand-finale',
    title: 'GRAND FINALE',
    summary: 'Finalists present their prototype to the judges',
    when: '6 OCT',
    icon: Trophy,
    points: [
      'Finalists set up and submit their final materials.',
      'Present your final PPT and demo the working prototype live.',
      'Answer the judges’ questions. Winners are then announced and prizes distributed.'
    ],
    note: 'Grand Finale timings will be shared with the finalists.',
    actions: [
      { kind: 'scroll', label: 'See the prizes', target: 'prizes', primary: true },
      { kind: 'schedule', label: 'View full schedule' }
    ]
  }
];
