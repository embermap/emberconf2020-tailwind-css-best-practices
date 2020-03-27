# EmberConf 2020: Tailwind CSS Best Practices

Welcome!

You can view the training on YouTube:

youtube.com

Follow along using the instruactions below.

## Getting help

If you have any questions,

- Ask us (@samselikoff or @ryanto) in the `#topic-media` channel in the Ember Community Discord
- Email us at hello@embermap.com

## Running the training app on your computer

From a directory,

```sh
git clone git@github.com:embermap/emberconf-2020-tailwindcss-best-practices.git
cd emberconf-2020-tailwindcss-best-practices
yarn install
ember s
```

## Intro

Assume already familiar with tailwind. We'll do a quick overview

## Useful VSCode plugins

- Tailwind intellisense
- Headwind

## 1: Basic Tailwind

- Style a blog post
- Pseudo states
- Responsive design

## 2: Composing with components

Padding trick for fixed aspect ratio.

```hbs
<div class="relative bg-red-500 pb-2/3">
  <img
    class="absolute object-cover w-full h-full"
    src="https://source.unsplash.com/_Dogn_h7Qek"
  />
</div>
```

How to think about abstracting + sharing? Might reach for @apply. Instead, use components.

```hbs
<AspectRatio @ratio='16:9'>
  <img>
</AspectRatio>
```

This is going to be a theme of this training. Components like this keep us in the html. That should be a goal with the abstractions you make: html-first workflow. Keeps you productive.

## 3: Tailwind-friendly Component APIs

`<Link>` takes activeClass arg. Let's make it work.

Our styles are stomping each other. We need to think of an API that's Tailwind-friendly.

What we really want is `<Link class='' @activeClass='' @inactiveClass=''>`. Let's make it work.

---

- Rely on the default theme, extend as necessary
  - stick with Tailwind's scales to make your extensions predictable
- Tailwind-friendly component APIs
  - <LinkTo @activeClass=''>. But what about @inactiveClass? Show why you want this.
- Flexbox for layout
  - Use cases
  - Negative margin for gaps
  - Negative margin to remove outer space on list of pills so they can wrap
- Grid for layout
  - Use cases
- Grid + flex layout combo (<List />)
- px() function for fontSize
- New line-height pixel values instead of 1.5
- Writing a plugin to link letter-spacing and text-size
- <Text /> component with built-in measure (max-width). Must use something like flex parent to lay out.
- SVG example (maybe tui toggle)
- Form plugin
- Max width + grid vs. weird width values (`xxl:w-440` from embermap)
  - The default values are extremely well thought out. Try to embrace them.
- Escape hatches, e.g. css modules
- key-focus polyfill
- When layouts are extremely different at responsive breakpoints, just make a new block and hide with `sm:hidden`. No reason to overcomplicate the HTML just because the content is the same. Duplicating content is way simpler than making one single uber-layout.
  - Also, don't use JS to change layout based on viewport size => not SSR-able. Stick with css media queries.
