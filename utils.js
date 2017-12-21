'use strict';

const exec = require('child_process').exec;

const formatNumber = number => number < 10 ? '0' + number : number;

const createPost = (results,open) => {
  let now = new Date();
  let date = `${now.getFullYear()}-${formatNumber(now.getMonth()+1)}-${formatNumber(now.getDate())}`;
  let filename = date + '-' + results.title.split(' ').join('-') + '.md';

  let content = `---
layout: \"post\"
title: \"${results.title}\"
date: \"${date} ${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}\"
categories: ['${results.categories}']
tags: [\'${results.tags.split(',').reduce((prev,next)=>`${prev}','${next}`)}\']
published: True
---

<!--more-->

`;

  let command = `echo "${content}" >> ${filename}`;

  if (open) {
    command += ` && open ${filename}`;
  }

  exec(command);
}

module.exports = {formatNumber, createPost}