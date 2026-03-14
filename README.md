# Tetris Multijugador con API de Puntuaciones

Este proyecto consiste en una aplicación de Tetris que permite la sincronización de estados de partida entre varios usuarios y la persistencia de puntuaciones en un ranking histórico. Se ha desarrollado como parte de la asignatura de Desarrollo Avanzado de Aplicaciones Web.

## Descripción del Proyecto

El sistema se divide en dos componentes principales que interactúan para ofrecer una experiencia multijugador:

1. **Frontend (React):** Gestiona la lógica del juego, la interfaz de usuario y la comunicación en tiempo real. Utiliza Firebase para sincronizar eventos globales como el inicio de la partida, pausas y el estado de fin de juego (Game Over) entre todos los clientes conectados.
2. **Backend (Spring Boot):** Una API REST encargada de recibir las puntuaciones finales de los jugadores, procesarlas y almacenarlas en una base de datos para generar un ranking consultable.

## Stack Tecnológico

**Cliente:**
* React.js con Vite.
* Firebase Realtime Database (Sincronización de estado).
* CSS para el motor visual del tablero.

**Servidor:**
* Java con Spring Boot.
* Base de Datos H2 (Persistencia en memoria).
* Maven para la gestión de dependencias.

## Funcionalidades Implementadas

* **Sistema de Lobby:** Identificación de usuarios antes de entrar a la sala común.
* **Sincronización Global:** Implementación de eventos compartidos mediante Firebase para que la partida sea simultánea para todos los jugadores.
* **Gestión de Ranking:** Registro de récords personales y consulta de las mejores puntuaciones mediante llamadas a la API REST.
* **Validación de Endpoints:** Pruebas realizadas con Postman para asegurar el correcto funcionamiento del intercambio de datos JSON.

## Instalación y Uso

### Requisitos previos
* Node.js y npm
* Java JDK 17 o superior
* Maven

### Configuración del Backend
1. Entrar en el directorio `Tetris_API`.
2. Ejecutar el servidor:
   `mvn spring-boot:run`
3. La API estará disponible en `http://localhost:8080`.

### Configuración del Frontend
1. Entrar en el directorio `Tetris_GAME`.
2. Instalar las dependencias necesarias:
   `npm install`
3. Iniciar la aplicación en modo desarrollo:
   `npm run dev`

## Estructura del Proyecto

* `/Tetris_GAME`: Contiene los componentes de React, lógica del Tetris y configuración de Firebase.
* `/Tetris_API`: Contiene los controladores, servicios y entidades de la API en Java.