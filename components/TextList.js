'use strict';

const {h, Component, Text} = require('ink');
const TextInput = require('ink-text-input');

const TextList = ({title, categories, tags}) => (
  <div>
      {title && (
        <div>
          <Text yellow>
            Post title: {title}
          </Text>
        </div>
      )}
      {categories && (
        <div>
          <br/>
          <Text cyan>
            Post category: {`['${categories}']`}
          </Text>
        </div>
      )}
      {tags && (
        <div>
          <br/>
          <Text magenta>
            Post tags: {`['${tags.split(',').reduce((prev,next)=>`${prev}','${next}`)}']`}
          </Text>
        </div>
      )}
      {(title || categories || tags) && <div><br/><br/></div>}
  </div>
);

module.exports = TextList;
