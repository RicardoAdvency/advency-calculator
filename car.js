/**
 * Car.js
 * Lógica completa del vehículo: renderizado, movimiento y actualización
 */

import { Physics } from './physics.js';

export class Car {
    constructor(scene) {
        this.scene = scene;
        this.physics = new Physics();
        
        // Estado del carro
        this.speed = 0;           // Velocidad actual
        this.rotation = 0;        // Rotación actual en radianes
        
        // Crear el mesh del carro
        this.mesh = this.createCarMesh();
        this.scene.add(this.mesh);
    }

    /**
     * Crea el modelo 3D del carro
     * Versión simple pero visualmente agradable
     */
    createCarMesh() {
        const carGroup = new THREE.Group();

        // --- CARROCERÍA PRINCIPAL ---
        const bodyGeometry = new THREE.BoxGeometry(1.2, 0.5, 2.4);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff3333,
            shininess: 100
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        carGroup.add(body);

        // --- CABINA (techo) ---
        const cabinGeometry = new THREE.BoxGeometry(1.0, 0.4, 1.2);
        const cabinMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 80
        });
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.y = 0.95;
        cabin.position.z = -0.2;
        carGroup.add(cabin);

        // --- PARABRISAS ---
        const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        });
        
        const frontWindowGeometry = new THREE.BoxGeometry(0.9, 0.3, 0.1);
        const frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial);
        frontWindow.position.set(0, 0.95, 0.35);
        carGroup.add(frontWindow);

        // --- RUEDAS ---
        const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
        const wheelMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a 
        });

        // Posiciones de las ruedas [x, y, z]
        const wheelPositions = [
            [-0.65, 0.25, 0.9],   // Delantera izquierda
            [0.65, 0.25, 0.9],    // Delantera derecha
            [-0.65, 0.25, -0.9],  // Trasera izquierda
            [0.65, 0.25, -0.9]    // Trasera derecha
        ];

        this.wheels = [];
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.z = Math.PI / 2; // Rotar para orientación correcta
            wheel.position.set(pos[0], pos[1], pos[2]);
            carGroup.add(wheel);
            this.wheels.push(wheel);
        });

        // --- DETALLES (faros) ---
        const lightGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.1);
        const lightMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.5
        });

        const leftLight = new THREE.Mesh(lightGeometry, lightMaterial);
        leftLight.position.set(-0.4, 0.5, 1.25);
        carGroup.add(leftLight);

        const rightLight = new THREE.Mesh(lightGeometry, lightMaterial);
        rightLight.position.set(0.4, 0.5, 1.25);
        carGroup.add(rightLight);

        // --- ESCAPE ---
        const exhaustGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
        const exhaustMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333 
        });
        const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
        exhaust.rotation.x = Math.PI / 2;
        exhaust.position.set(0.5, 0.3, -1.2);
        carGroup.add(exhaust);

        return carGroup;
    }

    /**
     * Actualiza el carro cada frame
     * @param {Object} input - Estado del input manager
     * @param {number} deltaTime - Tiempo desde el último frame
     */
    update(input, deltaTime = 1) {
        // 1. MOVIMIENTO HACIA ADELANTE/ATRÁS
        if (input.isAccelerating()) {
            this.speed = this.physics.accelerate(this.speed, true);
        } else if (input.isReversing()) {
            this.speed = this.physics.accelerate(this.speed, false);
        } else if (input.isBraking()) {
            this.speed = this.physics.applyBraking(this.speed);
        } else {
            // Fricción natural cuando no hay input
            this.speed = this.physics.applyFriction(this.speed);
        }

        // 2. ROTACIÓN (giro)
        const turnDirection = input.getTurnDirection();
        if (turnDirection !== 0) {
            const turnAngle = this.physics.calculateTurnAngle(this.speed, turnDirection);
            this.rotation += turnAngle;
        }

        // 3. APLICAR MOVIMIENTO AL MESH
        // Calcular la dirección basada en la rotación
        const moveX = -Math.sin(this.rotation) * this.speed * deltaTime;
        const moveZ = -Math.cos(this.rotation) * this.speed * deltaTime;

        this.mesh.position.x += moveX;
        this.mesh.position.z += moveZ;
        this.mesh.rotation.y = this.rotation;

        // 4. ANIMACIÓN DE RUEDAS (rotación visual)
        this.animateWheels();
    }

    /**
     * Anima la rotación de las ruedas basado en la velocidad
     */
    animateWheels() {
        if (this.wheels && this.wheels.length > 0) {
            const wheelRotationSpeed = this.speed * 0.1;
            this.wheels.forEach(wheel => {
                wheel.rotation.x += wheelRotationSpeed;
            });
        }
    }

    /**
     * Obtiene la velocidad en km/h (para UI)
     */
    getSpeedKmh() {
        return Math.abs(Math.round(this.speed * 10));
    }

    /**
     * Obtiene la posición actual del carro
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Obtiene el mesh para la cámara
     */
    getMesh() {
        return this.mesh;
    }

    /**
     * Reinicia el carro a su posición inicial
     */
    reset() {
        this.speed = 0;
        this.rotation = 0;
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.y = 0;
    }

    /**
     * Actualiza la posición del carro (útil para teletransportar)
     */
    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    /**
     * Establece la rotación del carro
     */
    setRotation(angle) {
        this.rotation = angle;
        this.mesh.rotation.y = angle;
    }
}
