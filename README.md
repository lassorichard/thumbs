# Richard Lasso - Thumbs

> Developed by Richard Lasso Ledesma

## Repository

1. Download:
>You will find two branches apart from main one: layout and interaction.

Main Branch:
```bash
git clone https://github.com/lassorichard/thumbs
```

layout Branch:
```bash
git clone https://github.com/lassorichard/thumbs/tree/layout
```

layout Branch:
```bash
git clone https://github.com/lassorichard/thumbs/tree/interaction
```


### Installation

[Node.js](https://nodejs.org/) v12.17.0+ its required to start development.

Install Gulp.js
```bash
$ npm install --global gulp-cli
```

Install dependencies/devDependencies and start a local server.

```bash
$ cd thumbs
$ npm i || npm install
$ npm start || gulp
```


## Relevant information

1. Mobile First as a fundamental basis in the development of the project.
2. Used semantic tags based on HTML5 standards
3. SCSS was used as style preprocessor
4. Mixins used:

> Breakpoints:

```bash
$bp-mobile: 400px;
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-huge: 1200px;
```
> Breakpoint example:

```bash
@inlude from(tablet) {
 //styles
}
```

```bash
$base-font-size: 16px;
```
> Mixins fonts, convert px to rem:

```bash
@inlude font-size(20px)
rendered: font-size: 20px; and font-size: 1.25rem;
```

5. The methodology used for the sass preprocessor was BEM (Block, Element, Modifier)
6. In the project CSS Flexbox was used and in small proportions CSS Gridbox was also used.
7. The items in the "portfolio layout" were loaded by a Json in the following location dist/info.json
8. The menu animation was developed thanks to the integration of CSS and JS.
9. Clicking on links of the main menu redirects the user to the other pages according instructions given, although pages are in some Lorem information, they contain main template that includes Header, Hero and Footer components. 
10. Gulp as a toolkit to automate & enhance the workflow.
  Toolkits
  > Gulp Sass => Is a Gulp plugin for compiling Sass to CSS.
  > Autoprefixer => CSS file to have vendor prefixes automatically.
  > PostCSS - mq4 => PostCSS is a gulp plugin to pipe CSS through several plugins, but parse CSS only once.
  > CSSnano => CSSnano takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment.
  > pxtorem => Convert px to rem.
  > ect => Gulp plugin to compile ect.js template engine
  > cleanDir => Removes files and folders.
  > rename => Rename files and folders.
  > sourcemaps => To run debbuger correctly
  > imagemin => Reduce the size of images


## Tech stack

HTML5

CSS3

SASS

ES6

JS

GULP

EJS


### I appreciate your time reading this document.
