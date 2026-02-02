/**
 * Camera.js
 * Cámara en tercera persona con seguimiento suave (lerp)
 * Proporciona sensación de velocidad con ligero delay
 */

export class GameCamera {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target; // El objeto THREE.js del carro
        
        // Offset de la cámara respecto al carro
        this.offset = {
            x: 0,      // Centrado horizontalmente
            y: 4,      // Altura sobre el carro
            z: 8       // Distancia detrás del carro
        };

        // Punto al que mira la cámara (adelante del carro)
        this.lookAheadDistance = 3;

        // Velocidad de interpolación (lerp)
        this.positionLerpFactor = 0.1;  // Más bajo = más suave pero con más delay
        this.rotationLerpFactor = 0.08; // Rotación ligeramente más lenta para efecto dinámico

        // Posición y rotación objetivo (smooth)
        this.targetPosition = { x: 0, y: 0, z: 0 };
        this.targetLookAt = { x: 0, y: 0, z: 0 };

        // Shake de cámara por velocidad (opcional, para efecto arcade)
        this.shakeIntensity = 0;
        this.shakeSpeed = 0.1;
    }

    /**
     * Actualiza la posición de la cámara cada frame
     * @param {number} carSpeed - Velocidad actual del carro (para efectos)
     */
    update(carSpeed = 0) {
        if (!this.target) return;

        // Calcular la posición ideal de la cámara en espacio local del carro
        const idealOffset = this.calculateIdealOffset(carSpeed);
        
        // Convertir el offset local a posición mundial
        const targetPosition = this.getWorldPosition(idealOffset);

        // Suavizar la transición de la cámara (lerp)
        this.camera.position.x = this.lerp(
            this.camera.position.x,
            targetPosition.x,
            this.positionLerpFactor
        );
        this.camera.position.y = this.lerp(
            this.camera.position.y,
            targetPosition.y,
            this.positionLerpFactor
        );
        this.camera.position.z = this.lerp(
            this.camera.position.z,
            targetPosition.z,
            this.positionLerpFactor
        );

        // Punto al que mira la cámara (adelante del carro)
        const lookAtPoint = this.calculateLookAtPoint(carSpeed);
        
        // Suavizar la rotación de la cámara
        this.targetLookAt.x = this.lerp(
            this.targetLookAt.x,
            lookAtPoint.x,
            this.rotationLerpFactor
        );
        this.targetLookAt.y = this.lerp(
            this.targetLookAt.y,
            lookAtPoint.y,
            this.rotationLerpFactor
        );
        this.targetLookAt.z = this.lerp(
            this.targetLookAt.z,
            lookAtPoint.z,
            this.rotationLerpFactor
        );

        this.camera.lookAt(
            this.targetLookAt.x,
            this.targetLookAt.y,
            this.targetLookAt.z
        );
    }

    /**
     * Calcula el offset ideal basado en la velocidad (efecto arcade)
     * A mayor velocidad, cámara más lejos y alta
     */
    calculateIdealOffset(carSpeed) {
        const speed = Math.abs(carSpeed);
        const speedFactor = Math.min(speed / 10, 1); // Normalizar 0-1

        return {
            x: this.offset.x,
            y: this.offset.y + speedFactor * 1.5,  // Sube ligeramente con velocidad
            z: this.offset.z + speedFactor * 2     // Se aleja más con velocidad
        };
    }

    /**
     * Convierte offset local del carro a posición mundial
     */
    getWorldPosition(offset) {
        // Obtener la matriz de rotación del carro
        const carRotation = this.target.rotation.y;

        // Rotar el offset según la orientación del carro
        const worldX = this.target.position.x + 
            offset.x * Math.cos(carRotation) - 
            offset.z * Math.sin(carRotation);
        
        const worldZ = this.target.position.z + 
            offset.x * Math.sin(carRotation) + 
            offset.z * Math.cos(carRotation);

        return {
            x: worldX,
            y: this.target.position.y + offset.y,
            z: worldZ
        };
    }

    /**
     * Calcula el punto hacia donde debe mirar la cámara
     * Mira ligeramente adelante del carro para sensación de velocidad
     */
    calculateLookAtPoint(carSpeed) {
        const carRotation = this.target.rotation.y;
        
        // Calcular punto adelante del carro
        const lookAhead = this.lookAheadDistance;
        
        return {
            x: this.target.position.x - lookAhead * Math.sin(carRotation),
            y: this.target.position.y + 0.5, // Mirar ligeramente arriba del centro
            z: this.target.position.z - lookAhead * Math.cos(carRotation)
        };
    }

    /**
     * Interpolación lineal (lerp) para transiciones suaves
     * @param {number} start - Valor inicial
     * @param {number} end - Valor objetivo
     * @param {number} factor - Factor de interpolación (0-1)
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * Establece un nuevo objetivo para la cámara
     */
    setTarget(newTarget) {
        this.target = newTarget;
    }

    /**
     * Ajusta el offset de la cámara (útil para diferentes vistas)
     */
    setOffset(x, y, z) {
        this.offset.x = x;
        this.offset.y = y;
        this.offset.z = z;
    }

    /**
     * Ajusta la suavidad de la cámara
     */
    setSmoothness(positionFactor, rotationFactor) {
        this.positionLerpFactor = positionFactor;
        this.rotationLerpFactor = rotationFactor;
    }

    /**
     * Reinicia la posición de la cámara instantáneamente
     * Útil al reiniciar el juego
     */
    reset() {
        if (!this.target) return;

        const idealOffset = this.calculateIdealOffset(0);
        const targetPosition = this.getWorldPosition(idealOffset);

        this.camera.position.set(
            targetPosition.x,
            targetPosition.y,
            targetPosition.z
        );

        const lookAtPoint = this.calculateLookAtPoint(0);
        this.targetLookAt = { ...lookAtPoint };
        this.camera.lookAt(lookAtPoint.x, lookAtPoint.y, lookAtPoint.z);
    }
}
