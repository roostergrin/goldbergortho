# Rooster Grin's Vue.js Build and Guidelines

# Table of Contents
1. [Simple Build Setup](#setup)
2. [Documentation Getting Started](#documentation)
  - 2a. [Forms](#forms)
  - 2b. [GitHub](#github)
  - 2c. [WP_Pusher](#wp_pusher)
  - 2d. [SendGrid](#sendgrid)
  - 2e. [Blogs](#blogs)
  - 2f. [API](#api)
3. [References and Tools](#reference)  
4. [Folder Tree Structure](#folder)
5. [Component Structure](#third-example)
6. [Information For Requests](#requests)
7. [Security](#security)

### TODOS:
  <ol>
    <li>Add Above the fold and below the fold asyc lazy loading</li>
    <li>Need to add write up how to handle form submissions - save to db from php file</li>
    <li>Need to finish working on style guide guidelines</li>
    <li>Ortho Chat | Google Analytics | Facebook Pixel</li>
  </ol>  

Technologies
  - Vue.js
  - Vue Router
  - Vue Cache
  - VueX
  - Sass
  - Pug
  - Webpack & Gulp
  - Bootstrap 3 *(mixins only, not using most of the library)*
  - Wordpress
  - Wordpress API
  - Wordpress API CACHE
  - SendGrid
  - *These will be changed out once new plugins are created*
    - Contact Form Database Submissions
    - Contact From 7

## Simple Build Setup <a id='setup' />

``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
npm start
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
# run unit tests
npm run unit
# run e2e tests
npm run e2e
# run all tests
npm test
```

## Instructions on How to make a component <a id='documentation' />

For this build you should only have pages and posts in the correct locations of WordPress. YOU WILL NOT be putting components page level. The way that this will work is that you will be creating components with Advanced Custom Fields and assigning them to the pages that they will belong to.

- Create instructions for how to make a proper component
- Create instructions on how we are handling forms
  - Need to create how to's on both the contact form 7 and the php ways

#### Steps

  1. Naming Convention Utility - Page - Section
    - Example: Form-Contact-Request
    - This would mean that the component name would be form-contact-request.vue & form-contact-request.pug & form-contact-request.sass
    - You will be reflecting the naming convention in Advanced Custom Fields as well.

  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-1.jpg' width='600px' />
  <br>
  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-2.jpg' width='600px' />
  <br>
  <br>

  2. For step 2 in the image you will notice that we will be assigning the Advanced Custom Field to the page. This will give us access to the data in our front end through the ACF to API plugin that we are using.
    - If you are going to use the same component throughout the page you will either need to make the component a repeater or you will need to make duplicates of the ACF. The better practice is to create a copy of the ACF and rename to form_contac_request_option. This way you will be able to follow the page flow in placing the components on the page.

  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-3.jpg' width='600px' />
  <br>
  <br>

  3. The next step we will just be creating a text area to see how everything should be connected

  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-4.jpg' width='600px' />
  <br>
  <br>

  4. This is how the component should be seen on the page

  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-5.jpg' width='600px' />
  <br>
  <br>

  5. Finalized Page and Vue file
    - Notice how things match up across the WordPress page and the Vue.Js Page. This is extremely important working across teams. We want to make sure that there is an easy way to share where components are located and what they do.

  <br>
  <img src='https://github.com/roostergrin/rg-vue/blob/master/documentation/Step-6.jpg' width='600px' />
  <br>
  <br>

## Instructions on How to make a Form <a id='forms' />

## Git Messages<a id='github' />
#### Git messages are based of Angular's standard Git Message

#### Type
<strong>Must be one of the following:</strong>
Git Messages should be written in present tense - with git message describing the update / change

 - feat(feat-name): creates new feature
 - fix(feat-name): fixes bug
 - docs(doc-name): updates documentation
 - style(feat-name): changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
 - refactor(feat-name): a code change that neither fixes a bug or adds a feature
 - perf(feat-name): a code change that improves performance
 - test(feat-name): adds missing tests
 - chore(feat-name): changes to the build process or auxiliary tools and libraries such as documentation generation

## Development Environment Gotcha's
  - For our dev eco system you will be using index.html during development
    - Our main ```<div id='app'>``` lives here
    - You can place google fonts / typekit here as well
      - The location of the asyc script can be found right before the `</body>` tag
      - *NOTE:* You will want to make sure that any additional contents that have been added to the html file are reflected in the php file
  - We have also created a route that opens up the WordPress's menu options if you would like to call it
    - No longer will you have to use the plugin
    - You will need to register the menu in the ```enqueue.php``` file

      ```php
      function get_menu() {
          # Change 'menu' to your own navigation slug.
          # You will need to register each menu if you'd like to use multiple.
          return wp_get_nav_menu_items('menu');
      }

      add_action( 'rest_api_init', function () {
              register_rest_route( 'api', '/menu', array(
              'methods' => 'GET',
              'callback' => 'get_menu',
          ) );
      } );
      ```

  - In API.js you will find a script tha contains both a development and production route, be sure when you goto production and no longer need the development site, that you change the endpoint for development

    ```javascript
    const route = '//api.roostertest3.com/wp-json'

    // NOTE: This will change per new project

    const api = () => {
      return document.location.hostname === 'localhost' || document.location.href.indexOf('roostertest3') > -1 ? route : document.location.protocol + '/wp-json'
    }

    export default api()

    ```

## Production Environment Gotcha's
  - For production you will want to move any dependencies / header footer updates for SEO to index.php
    - This will be used for our production state in WordPress
    - For google fonts / typekit you will want to place theses into index.php to be asynchronously injected to the header

  - The files that are necessary for WordPress are ```[ index.php, style.css, functions.php and screenshot.png ]```
    - We have these in the dist folder already so all you would need to do is have wp_pusher look at that subdirectory.

  - Before you push live you will want make sure that you have the correct .htaccess file
    - The one in here has been customized to allow better caching

  - We have removed the text editor in the WordPress backend. This can be edited in the editor.php file  

## Production, Optimizations and Moving Site Live Todos

  1. Install necessary dependencies if not already installed
      - SendGrid
      - Contact Form Submissions
      - Contact From 7
      - BlogVault
      - All In One SEO
      - W3 Total Cache
      - API Rest Cache
  2. Set up W3 Total Cache
      - Set up g-zipping
      - Set up page caching
      - Set up database caching
      - Set up minification
      - Set up browser caching
  3. After Website has been transferred double check .htaccess file to make sure the one in this repo is on it
      - Be careful not to delete W3 Total cache's part
  4. Optimize images (try to get images as close to 150kb as possible)
      - Photoshop compression
      - Gulp compression
      - TinyPng compression
  5. Setup automatic updater in php
      - These can be found in filters.php
      - Turn off automatic emailer
      - Turn on automatic core updates
  6. Update this readme's for future requests section  

## Getting a new project started <a id='documentation' />

  1. Create Wordpress Backend via Blog Vault
      - You will be using {{ new project name }}.roostertest3.com
  2. Change API endpoint in api.js file
      - You will be updating your api to {{ new project name }}.roostertest3.com/wp-json

## Documentation

#### How to Get Component connected from WordPress to front end      

Steps:
  - Created component template in front end code
    - You will need to create a new directory in the components folder
      - Ex: form => form-contact
    - You will then need to create the 3 files
      - form-contact.vue
      - form-contact.pug
      - form-contact.sass
    - Next you will need to import the vue file into the parent component
    - Here you can pass the props set by the parent
      - You can refer to this from the props object in the parent
      - Props will be the content that is sent from wordpress
      - These will be build with Advanced Custom fields

#### Documentation for Advanced Custom field and other necessary dependencies

  - https://vuejs.org
  - https://www.advancedcustomfields.com/

## Folder Tree Structure <a id='folder' />

To make website update you will only want to work in the src folder.

```
+------------------------
+ src
+   | assets  
+   | base
+   | components
+       | - form
+           | - form.pug
+           | - form.vue
+           | - form.sass
+   | pages
+       | - home
+           | - home.pug
+           | - home.vue
+           | - home.sass
+   | router
+       | - index.js
+   | sass
+       | - base
+           | - base.sass
+       | - units
+       | - utilities
+       | - vendors
+   | shared
+       | - api
+       | - filters
+       | - store
+       | - templates
+   - main.js
+   - main.sass
+------------------------
```

## Component Structure and Naming Convention <a id='component' />

### Example namespace convention

#### Global -> Page Level -> Section Level
#### Slider -> About Us -> Testimonials

We have been using a name spacing naming convention in Pug with a BEM styling for Sass. Below is a piece of pug that can be reused.

Pug File
```pug
.custom-home-intro
  .custom-home-intro__bg
    .custom-home-intro__container
      .custom-home-intro__body
        .custom-home-intro__title
          | Title
        .custom-home-intro__text
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Sass File
```sass
.pages-home
  &__bg
    background: $black

  &__container
    @extend .container-fluid

  &__body
    @extend .col-sm-6
    @extend .col-sm-offset-6  
```      

## Information For Requests <a id='requests' />

This section is dedicated to the request team. Please share any information that the request team may need while making updates to this site. For example if you are using an api endpoint for the menu. Please write down the necessary steps someone would need to take to make updates to the menu.


## Security - What you need to do to make WordPress more secure <a id='security' />

  1. If you would like to access the Appearance Editor, you will need to goto the wp-config.php file in the root directory. This has been disable to to not allow people to inject php code to our core themes. If you notice a hack on the build you will need to update the theme to the most up to date version on github.

  2. We have also disabled PHP scripts - in order to add anything server side you will need to allow PHP scripts. You will update this in the .htaccess file in the root directory on the server. DO NOT edit the .htaccess file on the github account. This is just a version and is not used in production.

  3. We have added a login to access the wp-admin page. This is just an extra layer of protection from the server. You will still be using the normal Screen Name and Password.






For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
