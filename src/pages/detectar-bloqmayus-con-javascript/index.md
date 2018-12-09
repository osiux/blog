---
title: "Detectar BloqMayus con Javascript"
category: Programación
date: 2007-10-12T06:18:14-0500
---

El otro día tuve una pequeña y sencilla entrevista de trabajo (en la que creo me fue bastante bien), y una de las cosas que me pidieron era que detectara si el usuario tenia la tecla BloqMayus activada, lo cual en dados momentos puede causar un error en un sistema de identificación de usuarios. En fin, eso no supe hacerlo (xD) pero aqui pongo lo que encontré despúes de buscar, ya que en el futuro me puede servir =P Primero la funcion en JavaScript:

function capLock(e){
    kc = e.keyCode ? e.keyCode : e.which ;
    sk = e.shiftKey ? e.shiftKey: ( (kc == 16) ? true : false ) ;
    if(((kc &gt;= 65 &amp;&amp; kc &lt;= 90) &amp;&amp; !sk ) || ((kc &gt;= 97 &amp;&amp; kc &lt;= 122 ) &amp;&amp; sk)) document.getElementById(&#39;caplock&#39;).style.visibility = &#39;visible&#39;;
    else document.getElementById(&#39;caplock&#39;).style.visibility = &#39;hidden&#39;;
}

Luego, en el campo del formulario debemos agregar un evento que llame a la función cada que escribamos algo en ese campo, esto lo hacemos con el evento \_onkeypress\_:

&lt;input type=&#34;text&#34; name=&#34;nombre&#34; onkeypress=&#34;capLock(event)&#34; /&gt;

Y por último, el div que muestra el mensaje de advertencia.

&lt;div id=&#34;caplock&#34; style=&#34;visibility: hidden&#34;&gt;Tienes la tecla BloqMayus activada.&lt;/div&gt;

En fin, como es fácil encontrar lo mismo en otros lados y aqui lo pongo solo como apunte personal, no me pondré a comentar el código xD **Fuente:** [http://www.programacionweb.net/articulos/articulo/?num=315](http://www.programacionweb.net/articulos/articulo/?num=315)