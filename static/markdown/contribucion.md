# Como contribuir código a politiquer.io

Este archivo explica como bajar el código de politiquer.io, hacerle cambios, y subirlo al repo principal. También es un tutorial para contribuir a proyectos open source en general.

- [Requerimientos](#requerimientos)
- [Generar un fork](#forkear)
- [Descargar politiquerio](#descargar)
- [Branching](#branching)
- [Pull requests](#pull-requests)

# Requerimientos

Para correr politiquer.io, necesitas tener el siguiente software instalado:

- <a href="https://nodejs.org/">node.js</a>
- <a href="https://bower.io/">bower</a>
- <a href="https://www.mysql.com/">mySql</a>
- <a href="https://git-scm.com/">git</a>

También necesitas una cuenta de <a href="https://github.com">github</a>.

# Forkear

Todo el código de politiquer.io se encuentra libre en github. La página principal del proyecto muestra la versión estable más reciente en la que se encuentra el código.

Para evitar que todo mundo haga un zafarrancho con el código principal, tú puedes crear tu propia versión de politiquerio en tu cuenta de github, donde puedes hacerle los cambios que quieras sin miedo de darle en la torre a nada. Para hacer esto, dirígete a la página <a href="https://github.com/npanalytica/politiquerio">principal del proyecto</a>, y pícale al botón de "Fork", a mano superior derecha:

<p align="center">
  <br/>
  <img src="http://politiquer.io/static/images/fork.png">
  <br/>
</p>

Ahora cuentas con tu propia versión de politiquerio. A éste repositorio le puedes hacerle lo que quieras, cuando como quieras y como quieras, sin miedo de afectar el repo principal.

# Descargar

Ahora que tienes tu propia versión del proyecto, la puedes descargar a tu máquina local para hacerle cambios. Para hacer esto, ve a tu terminal y corre:

~~~
# dírigete a donde quieras poner los archivos
$ cd ~/MIS-PROYECTOS-O-LO-QUE-SEA
# clona politiquer.io a tu máquina local
$ git clone git@github.com:EL-NOMBRE-TU-CUENTA/politiquerio.git
~~~

Aunque ya puedes empezar a hacerle cambios a politiquerio, todavía no puedes correrlo localmente. Politiquerio mantiene ordenadas sus dependencias con npm (para las dependencias del servidor) y bower (para las dependencias del front-end). Éstas dependencias están descritas en package.json y bower.json, respectivamente, pero no están instaladas en el archivo que descargaste. Para instalarlas, corre:

~~~
# dirígete al root del proyecto
$ cd ~/MIS-PROYECTOS-O-LO-QUE-SEA/politiquerio/
# instala las dependencias de node
$ npm install
# instala las dependencias del front-end
$ bower install
~~~

Finalmente, tienes que tener una versión local de la base de datos. Como la base de datos de politiquerio es gigantesca, puedes bajar una base de datos que solamente contiene los datos de la INEGI. Este archivo lo puedes encontrar aquí:

- <a href="http://politiquer.io/descargas/database_v_01.sql">http://politiquer.io/descargas/database_v_01.sql</a>

Una vez que hayas descargado el archivo sql, tienes que instalarlo en tu base de datos local. Si quieres, puedes correr éste archivo utilizando una herramienta como <a href="https://www.mysql.com/products/workbench/">mysql workbench</a>, o puedes hacerlo en tu terminal corriendo:

~~~
# dirígete a donde hayas descargado el archivo sql
$ cd ~/MIS-DESCARGAS/
# entra a mysql
$ mysql -u TU-USUARIO-MYSQL -p
$ TU-PASSWORD-MYSQL
$ mysql> source database_v_01.sql
~~~

Por default, politiquerio busca la base de datos en 127.0.0.1, y trata de accesar la db "politiquerio" con usuario "root" y password "root". En caso de que quieras cambiar éstos valores, lo puedes hacer editando el archivo politiquerio/server/config.js.

Ahora puedes correr una versión local de politiquer.io corriendo:

~~~
$ node server/app.js
Inicializando politiquer.io. Esto puede tardar unos minutos...
Politiquerío está corriendo en el puerto 8000
~~~

# Branching

Antes de empujet tu código a politiquerio, tienes que agregar el proyecto principal como un *upstream*:

~~~
# Agrega 'upstream' a la lista de remotes
$ git remote add upstream https://github.com/npanalytica/politiquerio.git

# Verifica que exista un repo llamado 'upstream'
$ git remote -v
# Asegúrate de tener los cambios más recientes
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
~~~

Cada vez que quieras hacer un cambio, es importante que crees un nuevo branch en tu proyecto. Esto permitirá que tu master se mantenga apegado a la versión más reciente del proyecto general.

Para hacer un branch, corre:

~~~
# Checkout el master branch
git checkout master
# Crea un nuevo branch -> nuevofeature (¡Dále un nombre muy descriptivo a tu branch!)
git branch nuevofeature

# Cámbiate a ése branch
git checkout newfeature
~~~

# Pull requests

Una vez que hayas hecho un cambio que quieras compartir, puedes empujar tus cambios al proyecto principal haciendo un *pull request*. Para esto, empieza asegurándote de tener la versión más reciente de master:

~~~
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
~~~

Si hubo nuevos commits, has un rebase de tu branch:

~~~
$ git checkout nuevofeature
$ git rebase master
~~~

Una vez que tus cambios sean aceptados por npanalytica, tu código se volverá parte de politiquer.io.
