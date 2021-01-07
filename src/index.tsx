import { render, h } from 'preact';
import './index.scss'
import { DefaultLayout } from './layouts/default.layout';


render(
  <DefaultLayout></DefaultLayout>,
  document.getElementById('root')
);