# Digimon 🌟


## Backend 🚀

Este proyecto incluye una API desarrollada en Laravel 10 que actúa como un wrapper para la API de Digimos. El backend se diseñó de esta manera para un mejor control de errores y para gestionar los timeouts en casos específicos. Además, se implementó el registro, login y la autenticación de usuarios utilizando Laravel y JWT. La estructura de carpetas se organiza de manera modular, con cada módulo dentro de la carpeta `app`. Cada módulo tiene sus propios modelos para garantizar el crecimiento individual y facilitar futuras modificaciones.

### Configuración del Backend ⚙️

Antes de comenzar, asegúrese de modificar las siguientes variables en el archivo `.env` del backend:

```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nombre_de_la_base_de_datos
DB_USERNAME=nombre_de_usuario
DB_PASSWORD=contraseña

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_correo@gmail.com
MAIL_PASSWORD=tu_contraseña
MAIL_ENCRYPTION=ssl
```

### Instalación 🛠️

Siga estos pasos para instalar el proyecto:

1. Clonar el repositorio: `https://github.com/j4dev/digimon-laravel-react`
2. Instalar dependencias: [Descargar Composer](https://getcomposer.org/download/) y luego ejecutar `composer install`
3. Configurar el archivo `.env` con la información de la base de datos y otras configuraciones necesarias todas las variables necesarias ya se encuentan en el archivo env.example.
4. Ejecutar migraciones: `php artisan migrate`
5. Ejecutar el servidor: `php artisan serve`

### Despliegue ☁️

El backend se desplegó en Render, un servicio de hosting. Asegúrese de configurar las variables de entorno adecuadas para el entorno de producción.

## Frontend 🌐

El frontend está desarrollado en React utilizando MUI 5 para las interfaces. La autenticación se gestiona con React-Router y React-Auth-Kit, y toda la lógica de los componentes se ha separado en custom hooks únicos para cada componente, implementados en TypeScript (TSX). El proyecto se construyó con Vite.

## Configuración del Frontend ⚙️
Antes de comenzar, asegúrese de modificar la siguiente variable en el archivo .env.local del frontend con la url de la api que se desplego localmente:

```env
VITE_API_URL="http://127.0.0.1:8000/api"
```
### Instalación 🚀

Siga estos pasos para instalar el frontend:

1. Navegue a la carpeta `frontend`: `cd frontend`
2. Instale las dependencias: `npm install`
3. Configure las variables de entorno en un archivo `.env.local` según sea necesario.
4. Ejecute el servidor de desarrollo: `npm run dev`

### Despliegue ☁️

El frontend también se desplegó en Render. Asegúrese de configurar las variables de entorno adecuadas para el entorno de producción.

## Base de Datos 🗃️

La base de datos está desplegada en AWS. Asegúrese de tener las credenciales y configuraciones adecuadas en el archivo `.env` del backend.

## Servidor de Correos 📧
Como servidor de correos, se está utilizando el SMTP de Gmail. Asegúrese de configurar las variables MAIL_* en el archivo .env del backend con los valores correspondientes.