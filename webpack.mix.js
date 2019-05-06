let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .stylus('resources/stylus/app.styl', 'public/css');

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js'),
      '$comp': path.join(__dirname, './resources/js/components')
    }
  }
})

mix.browserSync(process.env.APP_URL)
