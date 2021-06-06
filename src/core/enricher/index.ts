import { JSDOM } from 'jsdom';

type EnricherT = (html: string) => {
  getTitle: () => string | null;
  getDescription: () => string | null;
  getImage: () => string | null;
  getAuthor: () => string | null;
};

/**
 * Usage:
 *
 * (async function () {
 *   const c = await rp('https://medium.com/@ilegra/the-dark-side-of-rust-language-4fe2b9c2faf3');
 *   console.log(enricher(c).getTitle());
 *   console.log(enricher(c).getDescription());
 *   console.log(enricher(c).getImage());
 *   console.log(enricher(c).getAuthor());
 * })();
 *
 */
const Enricher: EnricherT = (html) => {
  const { window } = new JSDOM(html);

  const metaProperty = (property: string): string | null =>
    window.document.querySelector(`meta[property='${property}']`)?.getAttribute('content');
  const metaName = (property: string): string | null =>
    window.document.querySelector(`meta[name='${property}']`)?.getAttribute('content');

  return {
    getTitle: () => {
      const fbTitle = metaProperty('og:title');
      const twitterTitle = metaProperty('twitter:title');
      const pageTitle = window.document.querySelector('title')?.text;
      const h1 = window.document.querySelector('h1')?.textContent;

      return fbTitle || twitterTitle || pageTitle || h1;
    },
    getDescription: () => {
      return metaProperty('og:description') || metaProperty('twitter:description');
    },
    getImage: () => {
      return metaProperty('og:image') || metaProperty('twitter:image');
    },
    getAuthor: () => {
      return metaProperty('author') || metaName('author');
    },
  };
};

export default Enricher;
