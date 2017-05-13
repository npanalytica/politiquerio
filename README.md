<p align="center">
  <br/>
  <img src="http://prognoid.com/static/img/politiquerio.png">
  <br/>
</p>


# ¿Qué es politiquer.io?

Politiquerío es un repositorio de datos públicos mexicanos. El sitio pretende ser un portal abierto, gratuito y confiable para buscar información mensurable de colonias, municipios, estados, gobernantes y partidos políticos. El ideal del sitio es que si existe un dato en el registro público, desde algún almacén polvoriento en un ayuntamiento municipal hasta un tweet del presidente, éste se vuelva fácilmente accesible.

### ¿Porqué es necesario?

Nuestra visión de México está fundamentada en lo que sabemos de México, y es fácil tener una idea distorsionada del país cuando ignoramos sus datos objetivos y mensurables. Tener una percepción incorrecta del estado del país tiene ramificaciones dañinas para la economía y para la democracia. Politiquerío pretender ayudar a formar una idea más clara de la realidad en la que vivimos.

### ¿Qué son datos públicos?

En México, hay una enorme cantidad de datos “públicos”. Éstos datos viven en archivos mal hechos en recovecos del Internet, detrás de sitios innavegables o incluso en papel, lejos de los ojos del público en general. Encontrar ésta información y convertirla a un formato útil es una patada en las bolas que no debería ser necesaria.

### ¿Para quién está hecho?

Aunque Politiquerío es accesible a todo el mundo, tiene tres grupos de personas en mente:

1. Ciudadanos con dudas. ¿Cómo se compara México a otros países, tu estado a otros estados, tu municipio al resto del país? ¿Qué efecto tienen políticas económicas sobre el crimen o la pobreza? ¿Qué factores tienen el mayor impacto en la producción de migrantes, o sobre el consumo de Frutsis? Sin necesidad de saber estadística o algoritmos de aprendizaje automático, politiquerío pretende responder las dudas que tiene la gente sobre su país.

2. Periodistas. Politiquerío pretende no ser solamente un repositorio de datos, sino un repositorio de datos confiables. La prensa puede encontrar información numérica, y tener la seguridad de que la información no es puro choro. 

3. Programadores, analistas, y toda clase de ñoños. Lo más interesante de los datos no son los datos, sino lo que los datos quieren decir. Politiquerío es una especie de Guantánamo para datasets, donde nerds pueden ir a torturarlos y hacerlos hablar. A éste fin, politiquerío pretende tener un API sencillo para csv, json, y arff.

### Filosofía

Contrario a lo que el nombre indica, politiquerío es un portal **violenta, radical y absolutamente apolítico**. El único propósito que tiene éste proyecto es facilitar el acceso a datos que ya existen en el registro público. 

# Desarrollo

Politiquerío está en su infancia, y necesitamos toda la ayuda que podamos encontrar.

### Compártenos tus datos

La manera más sencilla de ayudar al proyecto es encontrando bases de datos en cualquier formato, de cualquier lugar, de cualquier cosa, y hacérnosla llegar. No somos para nada mamilas en ésto: Nos interesa todo desde tasas de asesinatos a la cantidad de gente que ve anime. Solo recuerda que **no somos wikileaks**. Por favor asegúrate de tener permiso de compartir la información con nosotros.

Si quieres tener un rol más involucrado con el proyecto, hay un lugar bajo nuestro techo si eres:

**Periodista, abogado, encuestador, etc...** El trabajo más importante del sitio es corroborar la veracidad de nuestros datos. Si tienes experiencia (o crees que puedas) echarnos una mano examinando datasets, tal vez haciendo llamadas y comparando información, nos caerías como lluvia en sequía (Hay un friego de datos).

**Experto de R, numpy, o analista de Big Data.** La enorme mayoría de los datos que tenemos están sucios, y hay que migrarlos a nuestra base de datos. Necesitamos gente que pueda crear archivos sql de exceles, csv, rtf, etc... Lo único que nos interesa es el archivo sql. De lo demás no hacemos preguntas.

**Desarrollador de front-end**. El front-end del sitio está hecho con Angularjs, y trata de apegarse al estándar de javascript de [AirBnB](https://github.com/airbnb/javascript) (excluyendo lo de los espacios, aquí indentamos con tabs duros a cuatro espacios porque no somos unos degenerados). Los estilos están hechos con sass, y seguimos el estándar XHTML para el mark-up.

**Wizard de bases de datos o desarrollador de nodejs**. Considerando el tamaño de la información que manejamos, necesitamos a gente que pueda diseñar queries eficientes y con carga mínima al servidor. 

Si te interesa ser parte de politiquerío, mándanos un mail contándonos algo de ti y diciéndonos lo que quieres hacer a labs@prognoid.com. 

Si te interesa un trabajo técnico, échale un ojo a la documentación técnica del sitio.
