export interface Service {
  title: string;
  body: string;
  icon: 'monitor' | 'flow' | 'code';
}

export const services: Service[] = [
  {
    title: 'Website Design',
    body: 'I build visually striking, user-friendly websites that capture your brand identity and keep your audience engaged from first scroll to conversion.',
    icon: 'monitor',
  },
  {
    title: 'Application Design',
    body: 'Mobile and web app interfaces designed around real user flows, so the product feels intuitive, fast, and worth coming back to.',
    icon: 'flow',
  },
  {
    title: 'Custom Development',
    body: 'From front-end to back-end, I build powerful, scalable digital products using the latest technologies.',
    icon: 'code',
  },
];
