Muy buenos dias! Muy buenas tardes! Muy buenas noches! Espero que se encuentren muy bien.

No pude terminar todo el proyecto por cuestiones personales. 
Trate de avanzar hasta lo que pude. No logre desplegarlo en las paginas mencionadas. 
Hasta el momento no habia utilziado ninguna de ellas. Lamento no respetar el diseño de la maqueta al 100%. Priorice las funcionalidades ante la vista.

Para comenzar: Se debe crear una base de datos postgreSQL para poder utilizar el proyecto. 
Para poder cambiar la configuracion del backend y poder acceder a la base, hay que completar el archivo que se encuentra en: 
\prueba-tecnica-proyecto\backend\src\main\resources\application.properties
Dentro se encontraran con lo siguiente: 
spring.application.name=prueba-tecnica 
spring.jpa.hibernate.ddl-auto=update 
spring.datasource.url= jdbc:postgresql://localhost:5432/nombreDeLaBD?useSSL=false&serverTimezone=UTC 
spring.datasource.username=postgres 
spring.datasource.password=contraseña

el cual deben completar con los datos correspondientes.

Para iniciar el servicio de Angular/cli, a traves de la consola de comandos nos debemos encontrar parados adentro de la carpeta de 'frontend'. 
Una vez alli, escribir en la consola 'ng serve' y el servicio comenzara. En cuanto levantar el servicio de backend, yo utilizo las extensiones de Springboot que ofrece VisualStudioCode y con ello se puede levantar muy facil.

A partir de aca estaré dando ejemplos de las rutas que utilizo para los servicion y tambien un ejemplo de una instancia de un objeto para poder hacerlo a traves de, en mi caso, Postman.
No pude crear el formulario de registro en el frontend. Pero si estan el endpoint. 
Un ejemplo:
  POST Endpoint: http://localhost:8080/auth/register

  Ejemplo: { "username": "ejemplo@gmail.com", "password":"123456789", "lastname":"Ejemplo", "firstname":"Usuario", "country":"Argentina" }


Si pude crear el logeo.
Cuando se loguea con el usuario y contraseña con el que se registro se lo lleva a la pantalla principal, donde encontraran la informacion de las plantas y las lecturas. 
  POST endpoint: http://localhost:8080/auth/login

Ejemplo login: { "username":"ejemplo@gmail.com", "password":"123456789" }

Devolvera el token que se debe utilizar para pedir los datos de las demas consultas.

Un pais para poder trabajar las plantas por el modelo que se utiliza. POST endpoint: http://localhost:8080/pais Ejemplo: { "nombre":"Argentina" }

No pude crear el formulario de creacion de las Plantas. Si se pueden eliminar. El CRUD de la Planta estan creados con sus respectivos endpoints. POST Endpoint: http://localhost:8080/plantas Ejemplo: { "nombre":"Chubut", "pais":{ "id":1 }, "cantLecturasOK":300, "cantAlertasMedias":50, "cantAlertasRojas":10 }
