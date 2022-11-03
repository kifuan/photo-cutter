# Photo Cutter

[中文](./README-ZH.MD)

## Introduction

It can cut a large image into smaller pieces.

I had written it in pure JS before, but it ended up with a mess.

So I use `Vue.js` deployed by `GitHub Actions` for now.

## Features

1. Multiple modes to choose from, and non-intrusive addition of new modes.

   A new cutting mode can be added by simply adding a `key-value` pair for the `strategies` object in `src/stores/strategy.ts`.

2. Cropping the image proportionally, without leaving any whitespace.

3. Based on `Vue3` + `TS` + `Pinia` + `Tailwind CSS`, only default styles were used.

   So it's friendly for beginners.


## Usage

Download the fragments of your image after selecting arguments.
