import enricher from '../index';

describe('enricher', () => {
  describe('title', () => {
    const titleHtml = (titleFb = false, titleTw = false, title = false, titleH1 = false) => `
    <html>
    <head>
    ${title && `<title>title</title>`}
    ${titleFb && `<meta property="og:title" content="og title" />`}
    ${titleTw && `<meta property="twitter:title" content="tw title" />`}
    </head>
    <body>
    ${titleH1 && `<h1>titleH1</h1>`}
    </body>
    </html>
    `;

    it('return undefined when title is null', () => {
      expect(enricher(titleHtml()).getTitle()).toBe(undefined);
    });
    it('return facebook title by default', () => {
      expect(enricher(titleHtml(true, true, true, true)).getTitle()).toBe('og title');
    });
    it('return twitter title if facebook title is null', () => {
      expect(enricher(titleHtml(false, true, true, true)).getTitle()).toBe('tw title');
    });
    it('return title tag when other facebook title and twitter title are null', () => {
      expect(enricher(titleHtml(false, false, true, true)).getTitle()).toBe('title');
    });
    it('return h1 when other title is null', () => {
      expect(enricher(titleHtml(false, false, false, true)).getTitle()).toBe('titleH1');
    });
  });

  describe('author', () => {
    const authorHtml = (authorProperty = false, authorName = false) => `
    <html>
    <head>
    ${authorName && `<meta name="author" content="author name" />`}
    ${authorProperty && `<meta property="author" content="author property" />`}
    </head>å
    <body>
    </body>
    </html>
    `;

    it('return undefined when author is null', () => {
      expect(enricher(authorHtml()).getAuthor()).toBe(undefined);
    });
    it('return author property by default', () => {
      expect(enricher(authorHtml(true, true)).getAuthor()).toBe('author property');
    });
    it('return author name if author property is null', () => {
      expect(enricher(authorHtml(false, true)).getAuthor()).toBe('author name');
    });
  });

  describe('image', () => {
    const imageHtml = (fbImage = false, twitterImage = false) => `
    <html>
    <head>
    ${fbImage && `<meta property="og:image" content="facebook image" />`}
    ${twitterImage && `<meta property="twitter:image" content="twitter image" />`}
    </head>
    <body>
    </body>
    </html>
    `;

    it('return undefined when author is null', () => {
      expect(enricher(imageHtml()).getImage()).toBe(undefined);
    });
    it('return facebook image by default', () => {
      expect(enricher(imageHtml(true, true)).getImage()).toBe('facebook image');
    });
    it('return twitter image if facebbok image is null', () => {
      expect(enricher(imageHtml(false, true)).getImage()).toBe('twitter image');
    });
  });

  describe('description', () => {
    const descHtml = (fbDesc = false, twitterDesc = false) => `
      <html>
      <head>
      ${fbDesc && `<meta property="og:description" content="facebook desc" />`}
      ${twitterDesc && `<meta property="twitter:description" content="twitter desc" />`}
      </head>
      <body>
      </body>
      </html>
      `;

    it('return undefined when desc is null', () => {
      expect(enricher(descHtml()).getDescription()).toBe(undefined);
    });
    it('return desc image by default', () => {
      expect(enricher(descHtml(true, true)).getDescription()).toBe('facebook desc');
    });
    it('return twitter desc if facebbok desc is null', () => {
      expect(enricher(descHtml(false, true)).getDescription()).toBe('twitter desc');
    });
  });
});
