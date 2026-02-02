/**
 * Physics.js
 * Maneja la física arcade del vehículo: aceleración, fricción, velocidad
 */

export class Physics {
    constructor() {
        // Constantes de física arcade
        this.acceleration = 0.8;        // Aceleración al presionar W
        this.reverseAcceleration = 0.4; // Aceleración en reversa (S)
        this.friction = 0.95;            // Fricción natural (0.95 = 5% de pérdida por frame)
        this.brakingForce = 0.88;        // Fuerza de frenado activo
        this.maxSpeed = 12;              // Velocidad máxima hacia adelante
        this.maxReverseSpeed = 4;        // Velocidad máxima en reversa
        
        // Parámetros de giro
        this.turnSpeed = 0.05;           // Velocidad base de giro
        this.minSpeedForTurn = 0.5;      // Velocidad mínima para poder girar
    }

    /**
     * Aplica aceleración al vehículo
     * @param {number} currentSpeed - Velocidad actual
     * @param {boolean} isForward - true si acelera hacia adelante
     * @returns {number} Nueva velocidad
     */
    accelerate(currentSpeed, isForward = true) {
        const accel = isForward ? this.acceleration : this.reverseAcceleration;
        const maxLimit = isForward ? this.maxSpeed : this.maxReverseSpeed;
        
        if (isForward) {
            currentSpeed += accel;
            return Math.min(currentSpeed, maxLimit);
        } else {
            currentSpeed -= accel;
            return Math.max(currentSpeed, -maxLimit);
        }
    }

    /**
     * Aplica fricción natural al vehículo
     * @param {number} currentSpeed - Velocidad actual
     * @returns {number} Nueva velocidad con fricción aplicada
     */
    applyFriction(currentSpeed) {
        currentSpeed *= this.friction;
        
        // Detener completamente si la velocidad es muy baja
        if (Math.abs(currentSpeed) < 0.01) {
            return 0;
        }
        
        return currentSpeed;
    }

    /**
     * Aplica frenado activo (más fuerte que la fricción)
     * @param {number} currentSpeed - Velocidad actual
     * @returns {number} Nueva velocidad con frenado aplicado
     */
    applyBraking(currentSpeed) {
        currentSpeed *= this.brakingForce;
        
        if (Math.abs(currentSpeed) < 0.1) {
            return 0;
        }
        
        return currentSpeed;
    }

    /**
     * Calcula la velocidad de giro basada en la velocidad actual
     * El giro es más efectivo a velocidades medias/altas
     * @param {number} currentSpeed - Velocidad actual
     * @returns {number} Factor de giro (0 a 1)
     */
    getTurnFactor(currentSpeed) {
        const speed = Math.abs(currentSpeed);
        
        // No girar si está muy lento
        if (speed < this.minSpeedForTurn) {
            return 0;
        }
        
        // Normalizar la velocidad (0 a 1)
        const normalizedSpeed = Math.min(speed / this.maxSpeed, 1);
        
        // Curva de giro: más efectivo a velocidades medias-altas
        // Usa una función suave para evitar giros bruscos
        return normalizedSpeed * 0.8 + 0.2; // Mínimo 20%, máximo 100%
    }

    /**
     * Calcula el ángulo de giro por frame
     * @param {number} currentSpeed - Velocidad actual
     * @param {number} direction - Dirección (-1 izquierda, 1 derecha)
     * @returns {number} Ángulo de rotación en radianes
     */
    calculateTurnAngle(currentSpeed, direction) {
        const turnFactor = this.getTurnFactor(currentSpeed);
        
        // Invertir la dirección de giro si vamos en reversa
        const reverseMultiplier = currentSpeed < 0 ? -1 : 1;
        
        return this.turnSpeed * turnFactor * direction * reverseMultiplier;
    }
}
