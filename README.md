# Test api (node.js)

Para empezar con el test es necesario clonar el repositorio e instalar las librerías necesarias usando el comando:

`npm install`

Luego levantar el servidor haciendo 

`npm run dev`

### Introducción
Cuando se carga un nuevo auto a la plataforma, se obtiene un precio aproximado devuelto por un cotizador externo, necesitamos saber que *margen* de precio manejar y que *fee* cobrar en base a ese monto.

Esta información esta alojada en un archivo `precios.json` dentro del servidor, la idea es  a partir de un precio cotizado devolver los valores de *margen* y *fee* correspondientes.

### Tarea 
Darle funcionalidad al método de la ruta `/calculatePrice`

Se debe mandar una request donde en el cuerpo este el precio cotizado (ej: $5.580.000) y devolver los valores de margen y fee
como se muestra en el ejemplo:

![Ejemplo request](/example.png)
