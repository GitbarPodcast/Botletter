import React = require('react');
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import juice from 'juice';

import { NewsletterContent } from '../entities';

type TemplateT = React.FC<{ data: NewsletterContent }>;

const declassify = (html: string): string => html.replace(/( )?class="[a-zA-Z0-9:;.\s()\-,]*"/g, '');

const renderer = (data: NewsletterContent, template: TemplateT): string | undefined => {
  const sheet = new ServerStyleSheet();
  try {
    const element = sheet.collectStyles(React.createElement(template, { data: data }));
    const html = renderToStaticMarkup(element);
    const styleTags = sheet.getStyleTags();
    const htmlWithInlineStyles = juice(`${styleTags}${html}`);
    return declassify(htmlWithInlineStyles);
  } finally {
    sheet.seal();
  }
};

export default renderer;
