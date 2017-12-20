#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Greeting = importJsx('./greeting');

const Ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ jekyll-blog-cli [input]

	Options
	  --name  Lorem ipsum [Default: false]

	Examples
	  $ jekyll-blog-cli
	  I love Ink
	  $ jekyll-blog-cli --name=ponies
	  I love ponies
`);

const unmount = render(h(Greeting));

render(h(Ui, {...cli.flags,unmount}));
