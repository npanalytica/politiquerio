<p align="center">
  <br/>
  <img src="http://prognoid.com/static/img/politiquerio.png">
  <br/>
</p>

## Guidelines para APIs

_Todas las versiones del API de politiquer.io que terminen en x.0.0 van a quedar archivadas por siempre y para siempre en internet. Esto lo hacemos para que terceros puedan utilizarlas en sus proyectos_

- [Formatos](#formatos)
- [Datos anidados](#datos-anidados)
- [Estructura de una búsqueda](#estructura-de-una-búsqueda)
- [Sintaxis](#sintaxis)

# Formatos

El API está basado en REST y tiene payloads de JSON.

# Datos anidados

La mayor parte de los datos de politiquer.io son datos anidados. Considerando el volumen de información que se maneja, **cualquier llamada al API regresa un nivel de la anidación solamente**. La única excepción a ésta regla es la llamada

~~~~
GET http://politiquer.io/apiv1/estados?municipios=true
~~~~

# Estructura de una búsqueda

Los parámetros de la búsqueda determinan qué se está buscando, mientras que el query determina como se quieren presentar los datos. Por ejemplo, si están buscando todos los datasets de la estadística "Población total" (id = 1), la llamada es:

~~~~
GET http://politiquer.io/apiv1/estadisticas/1/datasets
~~~~

Si se quieren editar éstos resultados y obtener también el nombre de sus fuentes, la llamada se vuelve:
~~~~
GET http://politiquer.io/apiv1/estadisticas/1/datasets?nombreFuentes=true
~~~~

# Sintaxis

Todos los APIs de politiquer.io siguen las siguientes cuatro reglas:

- Todos los sustantivos se encuentran en plural. E.g, estados, subgrupos, estadisticas.

~~~~
GET http://politiquer.io/apiv1/grupos
~~~~

- Los hijos inmediatos de un concepto deben de ser accesibles a través de nombre_padre/id/nombre_hijos

~~~~
GET http://politiquer.io/apiv1/grupos/1/subgrupos
~~~~

- Las funciones especiales deben de tener nombres claros y consisos:

~~~~
GET http://politiquer.io/apiv1/estadisticas/search/:needle
~~~~

- Todas las versiones del API deben de contar con:
	1. Documentación clara
	2. Constructor de queries
