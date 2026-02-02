# 🏎️ Arcade Racing Game - CORE Prototype

Prototipo funcional de un juego de carreras arcade desarrollado con **Three.js** y **JavaScript vanilla**.

## 🎮 Características

✅ **Física arcade realista**: Aceleración progresiva, fricción natural, giro dependiente de velocidad  
✅ **Cámara cinemática**: Tercera persona con interpolación suave (lerp) y efecto de velocidad  
✅ **Sistema de input escalable**: Arquitectura preparada para teclado, gamepad y touch  
✅ **Código modular**: Separación clara de responsabilidades (MVC pattern)  
✅ **Optimizado para extensión**: Fácil de añadir pistas, enemigos, power-ups, etc.

---

## 📁 Estructura del Proyecto

```
arcade-racing-game/
│
├── index.html          # Documento HTML principal
├── styles.css          # Estilos del juego
├── main.js             # Punto de entrada y game loop
│
└── core/
    ├── car.js          # Lógica del vehículo y renderizado
    ├── physics.js      # Motor de física arcade
    ├── input.js        # Sistema de input unificado
    └── camera.js       # Cámara en tercera persona
```

---

## 🚀 Cómo Ejecutar

### Opción 1: Servidor Local (Recomendado)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

### Opción 2: Extensión de VS Code

1. Instala la extensión **Live Server**
2. Click derecho en `index.html` → "Open with Live Server"

### ⚠️ Importante

**NO abras el archivo directamente** (`file://`) debido a las políticas CORS de los módulos ES6.

---

## 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **W** / **↑** | Acelerar |
| **S** / **↓** | Reversa |
| **A** / **←** | Girar izquierda |
| **D** / **→** | Girar derecha |

### 🎯 Gamepad (Experimental)

- **Stick izquierdo**: Movimiento completo
- **Botón A/X**: Freno

---

## 📚 Explicación de Módulos

### 🏗️ **main.js**
Archivo principal que:
- Inicializa Three.js (escena, cámara, renderer)
- Crea la pista y decoración (carretera, árboles, iluminación)
- Orquesta el game loop a 60 FPS
- Maneja el resize de ventana
- Actualiza la UI (velocímetro)

**Responsabilidades**: Configuración inicial y coordinación general.

---

### 🚗 **core/car.js**
Representa el vehículo del jugador:
- **Renderizado**: Crea el modelo 3D del carro (carrocería, ruedas, luces)
- **Actualización**: Procesa el input y aplica la física cada frame
- **Animaciones**: Rota las ruedas según la velocidad
- **Estado**: Mantiene posición, rotación y velocidad

**Métodos clave**:
- `update(input, deltaTime)`: Actualiza movimiento y física
- `getSpeedKmh()`: Convierte velocidad a km/h para UI
- `reset()`: Reinicia el carro a posición inicial

---

### ⚙️ **core/physics.js**
Motor de física arcade puro:
- **Aceleración progresiva**: Rampa suave de 0 a velocidad máxima
- **Fricción**: Desaceleración natural cuando no hay input
- **Frenado**: Fuerza de parada más intensa que la fricción
- **Giro dinámico**: La efectividad del giro depende de la velocidad

**Parámetros ajustables**:
```javascript
this.acceleration = 0.8;        // Qué tan rápido acelera
this.maxSpeed = 12;             // Velocidad máxima
this.friction = 0.95;           // Fricción (0.95 = pierde 5% por frame)
this.turnSpeed = 0.05;          // Velocidad de giro base
```

**Filosofía**: Sensación arcade (ágil y responsivo), no simulador realista.

---

### 🎮 **core/input.js**
Sistema de input unificado y escalable:
- **Teclado**: Implementación completa con WASD y flechas
- **Gamepad**: Detección automática y soporte para sticks
- **Touch**: Arquitectura preparada (pendiente de implementar)

**Características**:
- Detección automática de gamepad al conectar
- Deadzone configurable para sticks analógicos
- Abstracción limpia: devuelve estado normalizado

**Métodos útiles**:
- `getInputState()`: Estado completo de todos los controles
- `getTurnDirection()`: Devuelve -1, 0 o 1
- `isAccelerating()`: Boolean para lógica simplificada
- `reset()`: Limpia todos los inputs (útil para pausas)

---

### 📹 **core/camera.js**
Cámara en tercera persona con feeling profesional:
- **Lerp (interpolación)**: Transiciones suaves sin snapping
- **Offset dinámico**: Se aleja y sube con la velocidad
- **Look-ahead**: Mira adelante del carro para sensación de velocidad
- **Delay intencional**: La cámara "persigue" al carro ligeramente

**Parámetros clave**:
```javascript
this.positionLerpFactor = 0.1;  // Suavidad de posición (0.1 = muy suave)
this.rotationLerpFactor = 0.08; // Suavidad de rotación
this.offset = { x: 0, y: 4, z: 8 }; // Posición relativa al carro
```

**Efecto arcade**: A mayor velocidad, la cámara se distancia más, dando sensación de velocidad extrema.

---

## 🎨 Personalización

### Cambiar la sensación de manejo

En `core/physics.js`:
```javascript
// Carro más ágil
this.acceleration = 1.2;
this.turnSpeed = 0.08;

// Carro más pesado/realista
this.acceleration = 0.4;
this.friction = 0.98;
this.turnSpeed = 0.03;
```

### Ajustar la cámara

En `core/camera.js`:
```javascript
// Cámara más pegada (acción intensa)
this.offset = { x: 0, y: 3, z: 5 };
this.positionLerpFactor = 0.15;

// Cámara más cinemática (suave)
this.offset = { x: 0, y: 5, z: 10 };
this.positionLerpFactor = 0.05;
```

### Cambiar el color del carro

En `core/car.js`, línea ~33:
```javascript
const bodyMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x0000ff  // Azul en vez de rojo
});
```

---

## 🔧 Próximos Pasos (Extensiones Sugeridas)

### Nivel 1 - Gameplay Básico
- [ ] Cronómetro y sistema de vueltas
- [ ] Checkpoints en la pista
- [ ] Menú de inicio/pausa
- [ ] Sonidos (motor, derrape, ambiente)

### Nivel 2 - Pista
- [ ] Pista circular con curvas
- [ ] Límites de pista (muros/barreras)
- [ ] Power-ups (boost, monedas)
- [ ] Diferentes texturas de terreno

### Nivel 3 - Competencia
- [ ] IA básica para oponentes
- [ ] Sistema de posiciones
- [ ] Colisiones básicas
- [ ] Pantalla de victoria/derrota

### Nivel 4 - Polish
- [ ] Efectos de partículas (humo, polvo)
- [ ] Estela de velocidad
- [ ] Mejores modelos 3D (importar .gltf)
- [ ] Múltiples cámaras (cockpit, cenital)
- [ ] Mobile controls (joystick virtual)

---

## 🐛 Troubleshooting

**El juego no carga**
- Verifica que estés usando un servidor local (no `file://`)
- Abre la consola del navegador (F12) y busca errores

**El carro no se mueve**
- Verifica que la ventana del juego tenga el foco
- Revisa la consola para errores de JavaScript

**La cámara está rara**
- Ajusta los parámetros en `core/camera.js`
- Prueba llamar `gameCamera.reset()` desde la consola

**Rendimiento bajo**
- Reduce la cantidad de árboles en `main.js`
- Desactiva las sombras: `renderer.shadowMap.enabled = false`

---

## 📝 Notas del Desarrollador

### Arquitectura

El código sigue principios **SOLID**:
- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Fácil de extender sin modificar código existente
- **D**ependency Inversion: Los módulos dependen de abstracciones

### Performance

- El game loop corre a ~60 FPS
- Three.js optimiza el renderizado automáticamente
- El sistema de física es extremadamente ligero (puro JS)

### Escalabilidad

Para añadir enemigos:
```javascript
// En main.js
this.enemies = [];
for (let i = 0; i < 3; i++) {
    const enemy = new Car(this.scene);
    enemy.setPosition(Math.random() * 10 - 5, 0, -20 - i * 10);
    this.enemies.push(enemy);
}

// En el game loop
this.enemies.forEach(enemy => {
    enemy.update(aiInput, 1); // aiInput sería lógica de IA
});
```

---

## 🎯 Objetivo Cumplido

✅ Movimiento arcade fluido y responsivo  
✅ Cámara profesional con sensación de velocidad  
✅ Input limpio y preparado para múltiples dispositivos  
✅ Código modular, comentado y escalable  
✅ Prototipo 100% funcional

**¡El core está listo para ser expandido!**

---

## 📄 Licencia

Este es un proyecto educacional. Úsalo libremente para aprender y experimentar.

---

**Desarrollado con ❤️ para aprender desarrollo de videojuegos**
