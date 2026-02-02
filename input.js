/**
 * Input.js
 * Sistema de input unificado para teclado, gamepad y touch
 * Arquitectura preparada para múltiples tipos de input
 */

export class InputManager {
    constructor() {
        // Estado de las teclas
        this.keys = {
            forward: false,   // W
            backward: false,  // S
            left: false,      // A
            right: false,     // D
            brake: false      // Espacio (opcional)
        };

        // Mapeo de teclas
        this.keyMap = {
            'w': 'forward',
            'W': 'forward',
            'ArrowUp': 'forward',
            
            's': 'backward',
            'S': 'backward',
            'ArrowDown': 'backward',
            
            'a': 'left',
            'A': 'left',
            'ArrowLeft': 'left',
            
            'd': 'right',
            'D': 'right',
            'ArrowRight': 'right',
            
            ' ': 'brake'
        };

        // Preparado para gamepad (futuro)
        this.gamepadIndex = null;
        this.gamepadDeadzone = 0.15;

        // Preparado para touch (futuro)
        this.touchControls = {
            enabled: false,
            joystick: { x: 0, y: 0 }
        };

        this.setupEventListeners();
    }

    /**
     * Configura los event listeners del teclado
     */
    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Detectar gamepad conectado
        window.addEventListener('gamepadconnected', (e) => {
            console.log('🎮 Gamepad conectado:', e.gamepad.id);
            this.gamepadIndex = e.gamepad.index;
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            console.log('🎮 Gamepad desconectado');
            this.gamepadIndex = null;
        });
    }

    /**
     * Maneja la pulsación de teclas
     */
    handleKeyDown(event) {
        const action = this.keyMap[event.key];
        if (action) {
            this.keys[action] = true;
            event.preventDefault(); // Prevenir scroll con flechas
        }
    }

    /**
     * Maneja la liberación de teclas
     */
    handleKeyUp(event) {
        const action = this.keyMap[event.key];
        if (action) {
            this.keys[action] = false;
            event.preventDefault();
        }
    }

    /**
     * Lee el estado del gamepad (preparado para futuro)
     */
    updateGamepad() {
        if (this.gamepadIndex === null) return;

        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) return;

        // Eje izquierdo: movimiento
        const axisX = gamepad.axes[0]; // Horizontal
        const axisY = gamepad.axes[1]; // Vertical

        // Aplicar deadzone
        this.keys.left = axisX < -this.gamepadDeadzone;
        this.keys.right = axisX > this.gamepadDeadzone;
        this.keys.forward = axisY < -this.gamepadDeadzone;
        this.keys.backward = axisY > this.gamepadDeadzone;

        // Botones
        this.keys.brake = gamepad.buttons[0]?.pressed || false; // A/X
    }

    /**
     * Obtiene el estado actual del input
     * @returns {Object} Estado de controles
     */
    getInputState() {
        // Actualizar gamepad si está conectado
        if (this.gamepadIndex !== null) {
            this.updateGamepad();
        }

        return {
            forward: this.keys.forward,
            backward: this.keys.backward,
            left: this.keys.left,
            right: this.keys.right,
            brake: this.keys.brake
        };
    }

    /**
     * Obtiene la dirección de giro (-1, 0, 1)
     */
    getTurnDirection() {
        if (this.keys.left && !this.keys.right) return -1;
        if (this.keys.right && !this.keys.left) return 1;
        return 0;
    }

    /**
     * Verifica si está acelerando
     */
    isAccelerating() {
        return this.keys.forward && !this.keys.backward;
    }

    /**
     * Verifica si está en reversa
     */
    isReversing() {
        return this.keys.backward && !this.keys.forward;
    }

    /**
     * Verifica si está frenando activamente
     */
    isBraking() {
        return this.keys.brake || (this.keys.forward && this.keys.backward);
    }

    /**
     * Limpia todos los inputs (útil para pausas)
     */
    reset() {
        Object.keys(this.keys).forEach(key => {
            this.keys[key] = false;
        });
    }
}
