import React = require('react');
import { renderToStaticMarkup } from 'react-dom/server';
import index from '../../assets/htmlTemplate';

const renderer = () => {
  return renderToStaticMarkup(React.createElement(index, { pippo: 'ciao' }));
};

export default renderer;
