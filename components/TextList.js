'use strict';

const {h, Component, Text} = require('ink');
const TextInput = require('ink-text-input');

const TextList = ({title, categories, tags}) => (
  <div>
      {title && (
        <div>
          <Text yellow>
            Blog title: {title}
          </Text>
        </div>
      )}
      {categories && (
        <div>
          <br/>
          <Text cyan>
            Blog category: {`['${categories}']`}
          </Text>
        </div>
      )}
      {tags && (
        <div>
          <br/>
          <Text magenta>
            Blog tags: {`['${tags.split(',').reduce((prev,next)=>`${prev}','${next}`)}']`}
          </Text>
        </div>
      )}
      {(title || categories || tags) && <br/>}
  </div>
);

module.exports = TextList;
