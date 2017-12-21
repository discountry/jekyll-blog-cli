'use strict';

const {h, Component, Text} = require('ink');
const TextInput = require('ink-text-input');

const TextList = ({title, categories, tags}) => (
  <div>
      {title && (
        <div>
          <br/>
          <Text yellow>
            Blog title: {title}
          </Text>
        </div>
    )}
      {categories && (
        <div>
          <br/> 
          <Text red>
            Blog category: {`['${categories}']`}
          </Text>
        </div>
      )}
      {tags && (
        <div>
          <br/>
          <Text pink>
            Blog tags: {`['${tags.split(',').reduce((prev,next)=>`${prev}','${next}`)}']`}
          </Text>
        </div>
      )}
  </div>
);

module.exports = TextList;