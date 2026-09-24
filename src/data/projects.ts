export interface Project {
  slug: string;
  tag: string;
  title: string;
  /** feature tile: spans 2 columns and 2 rows in the bento grid */
  wide?: boolean;
  /** optional live URL — when set, the tile becomes a link */
  href?: string;
}

/**
 * Bento maths: 4 wide tiles (4 cells each) + 8 standard tiles = 24 cells,
 * which fills 4 columns x 6 rows exactly. Change the mix and you must
 * update `grid-template-rows` and `aspect-ratio` in 07-projects.css.
 */
export const projects: Project[] = [
  { slug: 'kassa',            tag: 'Product Site',  title: 'kassa — offline-first POS',      wide: true },
  { slug: 'carepoint',        tag: 'Healthcare',    title: 'CarePoint appointment platform' },
  { slug: 'arokisah',         tag: 'Side Project',  title: 'arokisah scent storytelling' },
  { slug: 'xplore',           tag: 'Media',         title: 'X-PLORE article reader' },
  { slug: 'imaginify',        tag: 'AI SaaS',       title: 'Imaginify image editing' },
  { slug: 'sumz',             tag: 'AI Tool',       title: 'Sumz article summarizer' },
  { slug: 'ethsend',          tag: 'Web3',          title: 'ETHSEND crypto transfers' },
  { slug: 'petta',            tag: 'News Portal',   title: 'Petta',                          wide: true },
  { slug: 'lestari-grid',     tag: 'Editorial',     title: 'Lestari — Grid Network' },
  { slug: 'kassa-pos',        tag: 'POS System',    title: 'kassa cashier dashboard' },
  { slug: 'dpmptsp',          tag: 'Government',    title: 'Bank Data DPMPTSP Mimika',       wide: true },
  { slug: 'festival-lestari', tag: 'Event',         title: 'Festival Lestari 5',             wide: true },
];
