import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1108"/>
      <stop offset="55%" stop-color="#2d1d0e"/>
      <stop offset="100%" stop-color="#0b0705"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#F59A3E" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#F59A3E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="12%" y1="8%" x2="88%" y2="92%">
      <stop offset="0%" stop-color="#F59A3E"/>
      <stop offset="100%" stop-color="#C9671C"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <rect x="80" y="80" width="84" height="84" rx="26" fill="url(#mark)"/>
  <text x="122" y="134" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, sans-serif" font-weight="800" font-size="34" fill="#180D04">&lt;/&gt;</text>

  <text x="80" y="290" font-family="Arial, sans-serif" font-weight="800" font-size="64" fill="#ffffff">Aldy Azarya</text>
  <text x="80" y="355" font-family="Arial, sans-serif" font-weight="700" font-size="42" fill="#F7B979">Full Stack Developer &amp; UI/UX Designer</text>
  <text x="80" y="410" font-family="Arial, sans-serif" font-weight="400" font-size="26" fill="#C9BFB2">Custom websites, web apps, and production-grade builds.</text>

  <g font-family="Arial, sans-serif" font-weight="700" font-size="24" fill="#180D04">
    <rect x="80" y="470" width="150" height="56" rx="28" fill="url(#mark)"/>
    <text x="155" y="504" text-anchor="middle">6+ Years</text>
    <rect x="248" y="470" width="190" height="56" rx="28" fill="rgba(255,255,255,0.08)"/>
    <text x="343" y="504" text-anchor="middle" fill="#ffffff">20+ Projects</text>
  </g>

  <text x="80" y="580" font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="#8a7c6c">hire.aldyazarya.dev</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('og-image.png generated');
