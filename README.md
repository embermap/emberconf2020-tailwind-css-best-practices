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

## 2: Extract components, not classes

Padding trick for fixed aspect ratio.

```hbs
<div class="relative bg-red-500 pb-2/3">
  <img
    class="absolute object-cover w-full h-full"
    src="https://source.unsplash.com/_Dogn_h7Qek"
  />
</div>
```

How to think about abstracting + sharing? Might reach for @apply.

Problem is you still have to duplicate html structure. Need a wrapper + child. Other problme is you have to go to css file and break html-first workflow.

Instead, use components.

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

## 4: Layout with Flexbox

Old school button group here. Buttons are foated left, parent is inline-block. How to center?

Use text-center.

This is weird - we're using `text-align: center` to lay out a component?

With Tailwind + modern css you'll get very familiar with flexbox. Its great because it works in many more contexts and you usually don't need to worry about whether the child you're laying out is block or inline. The layout is kept more separate from the thing you're laying out. Also floats are super weird. Also the height of our group is different from the buttons – because of line-height. Again, inline elements are kinda weird.

[ **Exercise**: Once you have it using flexbox, copy + paste the button group so there are two. Play with the justify-* classes on the parent. ]

## 5: Exercise: Practice Layout with Flexbox

Match the layout on the right. Notice the behavior if you shrink the viewport. You'll need to look up the "Flex Shrink" utilities on tailwindcss.com.

## 6: More layout - measured text

Try to encapsulate the measured text in a component. Notice how you can lay it out with flexbox.

## 7: Layout with Grid

Build with flexbox first. Then refactor to grid.

Grid is amazing. Gap is amazing.

## 8: Exercise: Practice with Grid

## 9: Working with SVG

Copy svgs in, get rid of hard-coded widths and heights. Set fill or stroke to currentColor.

## 10: Exercise: Practice with SVG

Copy svgs in, get rid of hard-coded widths and heights. Set fill or stroke to currentColor.

## 11: Form styling library

Forms by default aren't very "utility-friendly". There's also lots of inconsistencies across browsers.

The Custom forms plugin smoothes these out. Let's see how it works.

- https://github.com/tailwindcss/custom-forms
- Make sure you have autoprefixer

## 12: Writing a plugin to match letter spacing, font size and line height

Import plugin

```js
const plugin = require("tailwindcss/plugin");
```

Then add your own utilities with an inline plugin:

```js
plugins: [
  plugin(function({ addUtilities, theme }) {
    const fontSizes = theme("fontSize", {});

    Object.keys(fontSizes).forEach(key => {
      let fontSize = fontSizes[key];
      let pixels = +fontSize.replace("rem", "") * 16;
      let tracking = -0.0223 + 0.185 * Math.exp(-0.1745 * pixels);

      addUtilities(
        {
          [`.text-${key}`]: {
            "font-size": fontSize,
            "letter-spacing": `${tracking}rem`
          }
        },
        ["responsive"]
      );
    });
  })
];
```

## 13: Focus-visible polyfill

Polyfill: https://github.com/WICG/focus-visible

Download & import the polyfill

Write the plugin.

```js
plugin(function({ addVariant, e }) {
  addVariant("focus-visible", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `focus-visible${separator}${className}`
      )}[data-focus-visible-added]`;
    });
  });
});
```

Add the `focus-visible` variant to the relevant plugins:

```js
variants: {
  borderColor: ["responsive", "hover", "focus", "focus-visible"],
  boxShadow: ["responsive", "hover", "focus", "focus-visible"],
  zIndex: ["responsive", "focus", "focus-visible"]
},
```

## 14: Responsive designs for very different layouts

Finishing off with a hard lesson learned.

First, if a layout is very different between two breakpoints, just split it up.

Avoid JS device viewport width. Use CSS media queries. Robust to SSR.

## Resources

- [Tailwind Custom forms plugin](https://github.com/tailwindcss/custom-forms)
- [Heroicons: Free SVG icons](https://heroicons.dev/)
- [Focus-visible polyfill](https://github.com/WICG/focus-visible)
