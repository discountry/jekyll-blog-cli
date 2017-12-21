'use strict';

const {h, Text} = require('ink');
const TextInput = require('ink-text-input');
const PropTypes = require('prop-types');

const Greeting = () => (
  <div>
    <Text blue>Welcome to use jekyll-blog-cli!</Text>
    <br/>
  </div>
);

module.exports = Greeting;