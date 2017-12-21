#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Greeting = importJsx('./components/Greeting');

const App = importJsx('./components/App');

const cli = meow(`
	Usage
	  $ jekyll-blog-cli [input]

	Options
	  --open  Open post file after created. [Default: false]

	Examples
	  $ jekyll-blog-cli
	  Your post title: 
	  $ jekyll-blog-cli --open
		Your post title: 
		// This will open the file automatically after created.
`);

const unmount = render(h(Greeting));

render(h(App, {...cli.flags,unmount}));
