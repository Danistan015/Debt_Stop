Debt Stop: Toma el Control de tus Finanzas

1. Crear una API Key

Primero, necesitas generar una clave de API para acceder a los servicios de Google Generative AI. Sigue estos pasos para obtenerla:

Ve a la consola de Google Cloud: Google Cloud Console.

Crea un nuevo proyecto o selecciona uno existente.

Activa la API de Google Generative AI desde la biblioteca de APIs.

Genera una clave de API desde la sección de credenciales.

Guarda la clave de API generada, ya que la necesitarás en el siguiente paso.

2. Manejar el Modelo



3. Instalar Dependencias

Ejecuta los siguientes comandos en tu terminal para instalar las dependencias necesarias:

Para Google Generative AI

npm install @google/generative-ai

4. Configura tu API Key como Variable de Entorno

Crea un archivo .env en la raíz de tu proyecto (si aún no lo tienes).

Agrega tu clave de API en el archivo .env en el siguiente formato:

API_KEY=tu_clave_de_api_aquí

Esto garantiza que tu clave de API no esté expuesta directamente en el código fuente.

5. Instalar dotenv

Para poder cargar las variables de entorno desde el archivo .env, instala el paquete dotenv:

npm install dotenv

6. Instalar Dependencias del Proyecto

Asegúrate de haber instalado todas las dependencias necesarias para el proyecto. Si aún no lo has hecho, ejecuta:

npm install

Esto instalará las dependencias esenciales como Express, Socket.io y @google/generative-ai.

7. Instalar CORS

Si no tienes instalado el paquete cors, instálalo para permitir solicitudes entre diferentes orígenes (cross-origin requests):

npm install cors

8. Instalar Node Fetch

Instala la versión 2.x de node-fetch, que es necesaria para realizar solicitudes HTTP:

npm install node-fetch@2

9. Ejecutar el Servidor

Finalmente, asegúrate de estar en el directorio correcto y ejecuta el servidor:

node server.js

Resumen de Pasos

Crear la API Key en la consola de Google Cloud.

Instalar las dependencias necesarias:

npm install @google/generative-ai dotenv cors node-fetch@2

Configurar la API Key como variable de entorno en el archivo .env.

Asegurarse de haber instalado las dependencias con npm install.

Ejecutar el servidor con node server.js.

Información General

Nombre del Proyecto: Debt Stop: toma el control de tus finanzas

Fecha: 12/12/2024

Nombres de los integrantes del equipo:

Daniela Soto

Valeria Aristizabal

Descripción del Proyecto

La aplicación tiene como propósito facilitar el manejo y seguimiento de deudas personales, ofreciendo una herramienta sencilla y práctica para registrar deudas, realizar pagos y organizar las finanzas de los usuarios.

El alcance incluye funcionalidades como:

Registro de usuarios

Login

Seguimiento de deudas activas

Historial de pagos

Recordatorios automáticos

Todo esto está integrado con una interfaz intuitiva y un sistema de almacenamiento local.

Requisitos Funcionales

ID

Descripción

RF-1

El usuario puede hacer login.

RF-2

El usuario puede registrar nuevas deudas.

RF-3

El usuario puede ver el historial de pagos.

RF-4

La aplicación muestra recordatorios de pago.

RF-5

El usuario puede marcar como pagada una deuda registrada.

RF-6

La aplicación calcula automáticamente el saldo total de las deudas activas.

RF-7

El usuario puede filtrar las deudas por estado (pendientes o pagadas) y ordenarlas por fecha o monto.

RF-8

La aplicación permite establecer metas de ahorro.

RF-9

Chatbot que da consejos.

RF-10

La aplicación permite generar reportes del historial y los balances.

