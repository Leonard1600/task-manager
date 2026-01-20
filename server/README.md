# Task Manager - Backend

Este es el backend de la aplicación de gestión de tareas, construido con **Node.js** y **Express**. Proporciona una API RESTful para interactuar con las tareas del usuario.

## Requisitos

- **Node.js** (v14.x o superior)
- **MongoDB** (usa MongoDB Atlas para la base de datos)

## Instalación y configuración

### 1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
2. Ir a la carpeta del backend:
bash
Copiar código
cd backend
3. Instalar las dependencias:
bash
Copiar código
npm install
4. Crear un archivo .env en la raíz del proyecto con las siguientes variables:
ini
Copiar código
MONGO_URI=<tu_conexion_a_mongodb_atlas>
JWT_SECRET=<tu_secreto_de_jwt>
PORT=5000
5. Iniciar el servidor de desarrollo:
bash
Copiar código
npm run dev
El servidor backend debería estar corriendo en http://localhost:5000.

Rutas de la API
POST /api/tasks: Crear una nueva tarea

GET /api/tasks: Obtener todas las tareas

PUT /api/tasks/:id: Actualizar una tarea

DELETE /api/tasks/:id: Eliminar una tarea