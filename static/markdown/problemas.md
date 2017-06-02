<p align="center">
  <br/>
  <img src="http://prognoid.com/static/img/politiquerio.png">
  <br/>
</p>

# Problemas de politiquer.io

Aquí puedes encontrar los problemas más serios que enfrenta nuestro proyecto. Si estás considerando écharnos una mano, ésta es la página que quieres consultar.

- [Interpretar texto](#interpretar-texto)
- [Mejorar queries en db](#mejorar-queries-en-db)
- [Simplificar resultados](#simplificar-resultados)
- [Limpiar datasets](#limpiar-datasets)
- [Correr la voz](#correr-la-voz)

# Interpretar texto

_¿Qué carajo está pidiendo el usuario?_

**EL PROBLEMA** de politiquer.io. Se necesita crear (o implementar) toda una librería de NLP que llene las siguientes especificaciones:

1. Entiende sinónimos. (e.g, _homicidio_ debe de ser lo mismo que _asesinatos_)
2. Extrae conceptos clave (e.g, ¿Cuantos asesinatos hubo en Jalisco el año pasado? -> _Jalisco_, _homicidios_, _"año pasado" = 2016_).
3. _Entiende_ la intención del usuario (e.g, ¿Cual es la ciudad más segura de México? -> _segura = crimen, ciudad, acción:comparacion->jerarquía_).
4. Mapea éstos conceptos a nuestro API.

**Éste problema es el que va a determinar qué tan bueno es el sitio**

_Por favor considera contribuír si eres: Analista de NLP, sabes de inteligencia artificial, eres un super genio_.

# Mejorar queries en DB

_¿Cual es la manera más eficiente de extraer la información de la base de datos?_

Un vistazo a server/model/v1 convence a quien sea de que nuestros queries no son los más eficientes. Considerando el volumen de información y de pre-procesamiento que se espera, un volumen relativamente pequeño de tráfico tronaría el sitio.

Se necesita generar un patrón de diseño para nuestros queries, considerando que éstos:
1. Son casi siempre relacionados, muchas veces tomando información de hasta ocho o nueve tablas.
2. Son asincrónicos.
3. Viven en tablas gigantescas (>10 GB)

_Por favor considera contribuír si eres: Administrador de bases de datos, wizard de SQL_.

# Simplificar resultados

_¿Como le presentamos la información al usuario?_

Los resultados de entrenar redes bayesianas o análisis de regresión tienden a ser números prácticamente indescifrables para las personas que no saben de matemáticas.

Necesitamos crear una estética **simple, visual y elegante** de mostrarle resultados al usuario. Este problema es especialmente importante para queries más complejos, como los que piden regresiones o segmentaciones.

_Por favor considera contribuír si eres: Medio artista, diseñador web, experto en Chart.js, d3js, o librerías relacionadas_.

# Limpiar datasets

_¿Como obtenemos "**todos**" los datos públicos de México?_

Considerando la enorme cantidad de datos que esperamos recolectar, se necesita una buena manera de estandarizarlos. Los datos no solamente tienen que apegarse al formato de politiquer.io descrito en las <a href="https://github.com/npanalytica/politiquerio/blob/master/static/markdown/db.md">guidelines para la base de datos</a>, sino que tienen que relacionarse con el resto de la db. Un comunicado de prensa, por ejemplo, tiene que relacionarse con _gobernantes_ y _keywords_, y un dataset de homicidios con _estados_, _municipios_ y _estadisticas_.

Necesitamos un procedimiento para:
1. Obtener
2. Limpiar
3. Estandarizar
4. Subir

los datasets encontrados/recibidos.

_Por favor considera contribuír si eres: Bueno haciendo scripts desechables (bash, python, etc...), experto en programas de hojas de cálculo, conoces librerías como numpy o pandas, estás desempleado_.

# Correr la voz

_¿Como hacemos que politiquer.io llegue a las personas que lo necesitan?_

Poco importa que resolvamos el resto de los problemas aquí descritos si **NADIE USA EL MENTADO SITIO**. Tenemos que _reach out_ a periodistas y analistas, bloggers y demás personas que puedan aprovechar nuestro proyecto, pegarle duro al SEO, y ayudar a fomentar una cultura de datos en México.

_Por favor considera contribuír si eres: proponente del open data o del big data, te gustan todas ésas tarugadas del facebook y twitter, conoces gente en la prensa, sabes de SEO_
