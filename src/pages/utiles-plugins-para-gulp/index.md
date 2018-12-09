---
title: "Útiles plugins para gulp"
category: Programación
date: 2014-12-12T00:30:42-0600
tags:
    - gulp.js
    - plugins
---

Cada día amo un poco más usar [gulp](http://gulpjs.com/). Poder automatizar un gran rango de tareas a un solo comando en la consola simplifica mucho el desarrollo. Aquí dejo una lista de plugins que estoy usando en casi todo proyecto: [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) En lugar de tener que estar cargando cada plugin a mano, este se encarga de hacerlo automáticamente.

var plugins = require(&#39;gulp-load-plugins&#39;)();

gulp.task(&#39;js&#39;, function() {
    gulp.src(&#39;file.js&#39;)
        .pipe( plugins.uglify() )
        .pipe( gulp.dest(&#39;file.min.js&#39;) );
});

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) Minifica javascript para tener un código más ligero para ponerlo en producción. [gulp-sass](https://www.npmjs.com/package/gulp-sass) / [gulp-less](https://www.npmjs.com/package/gulp-less) Los nombres lo dicen, ¿no? Compila [Less](http://lesscss.org/) o [Sass](http://sass-lang.com/) al CSS de todos los días. [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) Deja de escribir a mano los prefijos para estilos en distintos navegadores, tampoco uses mixins de sass o less. ¡Mejor aplica [Autoprefixer](https://github.com/postcss/autoprefixer-core) a tu CSS y olvídate de problemas!

gulp.task(&#39;css&#39;, function() {
    gulp.src(&#39;file.css&#39;)
        .pipe( plugins.autoprefixer({
            browsers: \[&#39;last 3 versions&#39;, &#39;&gt; 1%&#39;, &#39;ie &gt;= 8&#39;\],
            cascade: false
        }) )
        .pipe( gulp.dest(&#39;file.build.css&#39;) )
});

[gulp-combine-media-queries](https://www.npmjs.com/package/gulp-combine-media-queries) No me gusta tener muchos @media en mi archivo CSS final, una manía. El otro día encontré este plugin que nos junta los media queries que tengamos y que se repitan. Pase de 81 @media a solamente 11. Un poco menos de peso :D [gulp-csso](https://www.npmjs.com/package/gulp-csso) Minifica CSS de una forma un poco diferente a otros plugins. Ver [CSSO](http://bem.info/tools/optimizers/csso/description/) para mas información. [gulp-if](https://www.npmjs.com/package/gulp-if) Simple condiciones para decidir que tareas realizar en base a variables.

.pipe( plugins.if(production, plugins.csso()) )

[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) Nos permite generar [sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) en base a los archivos fuente, sin importar el procesado (compilar, autoprefixer, minificar, etc) que hagamos. Útil para debug. [gulp-concat](https://www.npmjs.com/package/gulp-concat) Para juntar varios archivos en uno mismo. ¡Menos peticiones al servidor! [gulp-watch](https://www.npmjs.com/package/gulp-watch) Se queda observando cambios a nuestros archivos para compilarlos de nuevo de forma automática.   Al final, un ejemplo de mi gulpfile.js podría ser algo así:

var gulp    = require(&#39;gulp&#39;),
    plugins = require(&#39;gulp-load-plugins&#39;)(),
    production = plugins.util.env.\_\[0\] === &#39;build&#39;;

var paths = {
    css: {
        src: \[ &#39;./src/less/\*\*.\*&#39; \],
        dist: &#39;./assets/css/&#39;
    },
    js: {
        src: \[ &#39;./src/js/\*\*.\*&#39; \],
        dist: &#39;./assets/js/&#39;
    }
};

gulp.task(&#39;css&#39;, function() {
    gulp.src( paths.css.src )
        .pipe( plugins.if(!production, plugins.sourcemaps.init()) )
        .pipe( plugins.less() )
        .pipe( plugins.autoprefixer({
            browsers: \[&#39;last 3 versions&#39;, &#39;&gt; 1%&#39;, &#39;ie &gt;= 8&#39;\],
            cascade: false
        }) )
        .pipe( plugins.combineMediaQueries({ log: false }) )
        .pipe( plugins.concat(&#39;style.css&#39;) )
        .pipe( plugins.if(production, plugins.csso()) )
        .pipe( plugins.if(!production, plugins.sourcemaps.write()) )
        .pipe( gulp.dest( paths.css.dist ) )
        .on(&#39;error&#39;, plugins.util.log);
});

gulp.task(&#39;js&#39;, function() {
    gulp.src( paths.js.src )
        .pipe( plugins.if(!production, plugins.sourcemaps.init()) )
        .pipe( plugins.concat(&#39;app.js&#39;) )
        .pipe( plugins.if(production, plugins.uglify()) )
        .pipe( plugins.if(!production, plugins.sourcemaps.write()) )
        .pipe( gulp.dest(paths.js.dist) )
        .on(&#39;error&#39;, plugins.util.log);
});

gulp.task(&#39;watch&#39;, function() {
    gulp.watch(paths.css.src, \[&#39;css&#39;\]);
    gulp.watch(paths.js.src, \[&#39;js&#39;\]);
});

gulp.task(&#39;build&#39;, \[&#39;css&#39;, &#39;js&#39;\]);

gulp.task(&#39;default&#39;, \[&#39;build&#39;, &#39;watch&#39;\]);