export const site = {
  name: 'Aldy',
  fullName: 'Aldy Azarya',
  email: 'azarya.dev@gmail.com',
  whatsapp: '6285183203971',
  website: 'aldyazarya.dev',
  location: 'Jakarta, Indonesia',
  stats: [
    { value: '6+',  lines: ['Years', 'Experience'] },
    { value: '20+', lines: ['Projects', 'Completed'] },
  ],
  ribbon: ['Usable', 'Reliable', 'Accessible', 'Interactive', 'Clarity', 'Consistency'],
  nav: [
    { href: '#top',      label: 'Home' },
    { href: '#about',    label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact',  label: 'Contact' },
  ],
  socials: ['x', 'facebook', 'linkedin', 'instagram'] as const,
};
