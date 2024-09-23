import nodeHtmlToImage from 'node-html-to-image';

import { html } from './template/template';
import { TData } from '../types';

const imageGenerator = (data: TData) =>
  nodeHtmlToImage({
    html: html(data),
  });

export default imageGenerator;
