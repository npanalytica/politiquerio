<p align="center">
  <br/>
  <img src="http://prognoid.com/static/img/politiquerio.png">
  <br/>
</p>

# Wishlist

_**NOTA**: Nada de ésto existe todavía. Ésta es la lista de navidad de politiquer.io. Aquí se describen las partes más importantes que nos gustaría tener. Esta lista está sujeta a **muchos** cambios_

- [Datos](#datos)
- [Página de inicio](#página-de-inicio)
- [Visualizaciones complejas](#visualizaciones-complejas)
- [API](#api)

# Datos

Politiquer.io tiene _todos los datos públicos de México_. Éstos datos los dividimos en seis, cada uno con su propia casita en el sitio:

- **1. Datasets.** Si los datos se pueden mostrar en una hoja de excel, son datasets (e.g, presupuesto estatal de Veracruz en 1997, número de plurinominales por partido en el 2012).
- **2. Geodata.** Datasets que están atados a estados o municipios (e.g, índice de homicidio en los municipios de Jalisco en el 2007, nivel de precipitación en los estados en 1993)
- **3. Blobs.** Comunicados de prensa, discursos, entrevistas, y todo lo que diga o haga un servidor público en México.
- **4. _Streaming data_**, como el clima, la precipitación, resultados preeliminares de alguna elección _mientras la elección está en curso_, etc...
- **5. Gobernantes**. Todos los políticos, actuales y pasados de México, sus biografías, su <a href="https://www.politicalcompass.org/">compás político</a>, sus posiciones, su agenda, y sus afiliaciones.
- **6. Organizaciones**. Empresas, NGOs y todas las organizaciones no-gubernamentales que tienen algo que decir sobre el funcionamiento del país.

# Página de inicio

**El reto más importante de todo politiquer.io es responder preguntas textuales.**

La página de inicio le permite a los usuarios formular cualquier pregunta que se les ocurra, y esperar que el sitio les regrese una respuesta más o menos sensata. Se pueden preguntar cosas como:

- ¿Cuantas personas murieron a causa de desastres naturales en Veracruz el año pasado?
- ¿Qué miembros del congreso han sido los más opuestos a la reforma energética?
- ¿Va a llover mañana en Monterrey?
- ¿Que relación existe entre el salario promedio y el índice de crimen?

Así como preguntas mucho más difíciles, como las especificadas en [visualizaciones complejas](#visualizaciones-complejas).

# Visualizaciones complejas

La enorme mayoría de la gente no tiene el conocimiento técnico para explotar los datos públicos del país. Politiquer.io ayuda a simplificar el análisis de éstos datos.

Por ejemplo, supongamos que Pepe se dirige a la página de inicio y escribe algo como: _¿Es incrementar el presupuesto de espacios públicos una buena manera de reducir el crimen?_

El backend de politiquer.io:

1. Encuentra todos los datasets relacionados con _presupuesto_, _espacios públicos_ y _crimen_.
2. Genera _un solo dataset_ con éstos datos, mezclándo información en base a fechas, y el id de estados y municipios.
3. En base a su búsqueda, determina que Pepe quiere saber el _efecto_ que un parámetro tiene sobre otro: _espacios públicos_ -> _crimen_.
4. Determina que _crimen_ es un concepto que engloba conceptos más pequeños (_robos_, _secuestros_, _homicidios_, etc...)
5. Corre una serie de análisis de correlación (e.g, regresión, bayes ingenuo, etc...)
6. Le responde a Pepe de la manera más sencilla posible:
	- "_presupuesto de espacios públicos_ tiene un efecto significativo en _robos a mano armada_ y efectos muy pequeños en _asaltos_ y _secuestros_"
	- Le muestra el dataset que creó para responder su pregunta
	- Le muestra un scatterplot de presupuesto de espacios públicos vs robos a mano armada, asaltos, y secuestros.

Como a Pepe lo asaltaron con un picahielo, le gusta la idea de subirle el presupuesto a los espacios públicos. Entonces escribe una segunda pregunta: _¿Qué políticos apoyan más los espacios públicos?_

El backend de politiquer.io:

1. Determina que a Pepe le interesa saber de _gobernantes actuales_ y la relación que tienen con _espacios públicos_.
2. Utilizando una tabla pre-calculada de análisis de sentimiento, corre por todos los **blobs** y encuentra los que muestran mayor afinidad por _espacios públicos_.
3. Utilizando su id, correlaciona éstos blobs con gobernantes en específico, y les asigna una calificación de más positivo a menos positivo.
4. Finalmente, le muestra a Pepe una lista con los gobernantes _actuales_ que han dicho las mejores cosas del tema "_espacios públicos_".

# API

Para las personas que _sí_ tengan el conocimiento técnico para hacer análisis estadístico o de ML, politiquer.io cuenta con un API simple, constante, y fácil de usar.

Las versiones enteras (1.0.0, 2.0.0) se mantienen funcionales y en línea, y se apegan a nuestro <a href="#">guideline para APIs</a>.
