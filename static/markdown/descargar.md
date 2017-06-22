<p align="center">
  <br/>
  <img src="http://prognoid.com/static/img/politiquerio.png">
  <br/>
</p>

# ¿Como descargar politiquer.io?

Politiquer.io está escrito en node y angularjs, con una base de datos MySQL. Si quieres correrlo en tu servidor local, sigue las siguientes instrucciones:

- [Para linux](#linux)

# Linux
### 1. Instala las dependencias
Para correr politiquer.io, necesitas tener el siguiente software instalado:

- <a href="https://nodejs.org/">Node.js</a>
- <a href="https://bower.io/">Bower</a>
- <a href="https://www.mysql.com/">MySQL</a>
- <a href="https://git-scm.com/">git</a>

### 2. Clona el proyecto

Una vez que tengas los pre-requisitos instalados, puede clonar el proyecto a tu máquina local:
~~~~
$ cd /directorio-donde-quieres-poner-politiquerio/
$ git clone https://github.com/npanalytica/politiquerio.git
~~~~

### 3. Instala los módulos de npm y de bower
Politiquer.io depende de varias dependencias (descritas en bower.json y package.json) que no se descargaron al clonar el sitio. Para instalarlas, corre
~~~~
$ cd politiquerio
$ npm install
$ bower install
~~~~

### 4. Descarga la base de datos
Dirígete al <a href="http://politiquer.io/descargas/">sitio de politiquerio</a> y descarga:
- <a href="http://politiquer.io/descargas/database_v_01.sql">database_v_01.sql</a>

Dirígete al directorio donde descargaste ésos archivos y corre:
~~~~
$ mysql source database_v_01.sql
~~~~

### 5. Configura la conexión a la base de datos

Por default, politiquerio va a tratar de conectarse a 127.0.0.1 con el usuario 'root' y el password 'root'. En caso de que tu base de datos no se encuentre accessible en localhost, o tus credenciales de entrada sean distintas, edita esa información en:
~~~~
$ cd /path-a-politiquerio/server/config.js
~~~~
y cambia los valores en:
~~~~
database: {
	connectionLimit: 100,
	host: <<EL_HOST_DE_MYSQL>>,
	user: <<EL_USUARIO_DE_MYSQL>>,
	password: <<EL_PASSWORD_DE_TU_USUARIO>>,
	database: 'politiquerio',
	charset: 'utf8'
}
~~~~
### 6. Corre politiquerio
Desde el directorio donde instalaste politiquer.io, corre:
~~~~
$ node server/app.js
~~~~
y deberías de ver un mensaje que dice:
~~~~
Politiquerio está corriendo en el puerto 8000
~~~~
Para visitar el sitio, dirígete a: http://localhost:8000.

Si te salió un mensaje de error, es posible que éste documento esté mal hecho... Háznoslo saber en <a href="mailto:labs@prognoid.com">sergio@prognoid.com</a>
