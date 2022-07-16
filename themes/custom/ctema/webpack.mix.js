const mix = require("laravel-mix");

mix.setPublicPath("assets").disableNotifications();

mix.js("src/js/main.js", "js");

mix.sass("src/scss/main.scss", "css").options({
     processCssUrls: false,
     autoprefixer: {
     options: {
          browsers: ["last 3 versions"],
          },
     },
});