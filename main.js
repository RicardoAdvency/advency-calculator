/**
 * main.js
 * Archivo principal del juego - Inicialización y game loop
 */

import { Car } from './core/car.js';
import { InputManager } from './core/input.js';
import { GameCamera } from './core/camera.js';

class ArcadeRacingGame {
    constructor() {
        // Elementos del DOM
        this.canvas = document.getElementById('game-canvas');
        this.speedDisplay = document.getElementById('speed');

        // Componentes principales
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.car = null;
        this.gameCamera = null;
        this.inputManager = null;

        // Control del loop
        this.lastTime = 0;
        this.isRunning = false;

        this.init();
    }

    /**
     * Inicializa todos los componentes del juego
     */
    init() {
        console.log('🏎️ Inicializando Arcade Racing Game...');

        // 1. Configurar Three.js
        this.setupThreeJS();

        // 2. Crear la escena (pista, luces, etc)
        this.createScene();

        // 3. Inicializar el carro
        this.car = new Car(this.scene);

        // 4. Configurar la cámara del juego
        this.gameCamera = new GameCamera(this.camera, this.car.getMesh());
        this.gameCamera.reset(); // Posición inicial

        // 5. Inicializar el input manager
        this.inputManager = new InputManager();

        // 6. Manejar resize de ventana
        window.addEventListener('resize', () => this.onWindowResize());

        // 7. Iniciar el game loop
        this.isRunning = true;
        this.gameLoop(0);

        console.log('✅ Juego iniciado correctamente');
    }

    /**
     * Configura Three.js (renderer, cámara, etc)
     */
    setupThreeJS() {
        // Crear escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Cielo azul

        // Crear cámara
        this.camera = new THREE.PerspectiveCamera(
            75,                                          // FOV
            window.innerWidth / window.innerHeight,      // Aspect ratio
            0.1,                                         // Near plane
            1000                                         // Far plane
        );

        // Crear renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    /**
     * Crea la escena del juego (pista, luces, decoración)
     */
    createScene() {
        // --- ILUMINACIÓN ---
        
        // Luz ambiental (iluminación general)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Luz direccional (sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // --- PISTA / SUELO ---
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2d5016,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // --- CARRETERA ---
        const roadGeometry = new THREE.PlaneGeometry(8, 200);
        const roadMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.rotation.x = -Math.PI / 2;
        road.position.y = 0.01; // Ligeramente arriba del suelo
        road.receiveShadow = true;
        this.scene.add(road);

        // --- LÍNEAS DE LA CARRETERA ---
        const lineGeometry = new THREE.PlaneGeometry(0.3, 3);
        const lineMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide
        });

        // Crear líneas discontinuas
        for (let i = -50; i < 50; i += 6) {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.position.set(0, 0.02, i * 2);
            this.scene.add(line);
        }

        // --- ÁRBOLES DECORATIVOS ---
        this.createTrees();

        // --- NIEBLA (profundidad) ---
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 150);
    }

    /**
     * Crea árboles decorativos a los lados de la pista
     */
    createTrees() {
        const treePositions = [];
        
        // Árboles a la izquierda
        for (let i = -50; i < 50; i += 8) {
            treePositions.push([-15, 0, i * 2]);
            treePositions.push([-20, 0, i * 2 + 4]);
        }
        
        // Árboles a la derecha
        for (let i = -50; i < 50; i += 8) {
            treePositions.push([15, 0, i * 2]);
            treePositions.push([20, 0, i * 2 + 4]);
        }

        treePositions.forEach(pos => {
            const tree = this.createTree();
            tree.position.set(pos[0], pos[1], pos[2]);
            this.scene.add(tree);
        });
    }

    /**
     * Crea un árbol simple
     */
    createTree() {
        const treeGroup = new THREE.Group();

        // Tronco
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
        const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x4d2600 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1.5;
        trunk.castShadow = true;
        treeGroup.add(trunk);

        // Copa (follaje)
        const foliageGeometry = new THREE.ConeGeometry(2, 4, 8);
        const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = 4.5;
        foliage.castShadow = true;
        treeGroup.add(foliage);

        return treeGroup;
    }

    /**
     * Game Loop principal
     */
    gameLoop(currentTime) {
        if (!this.isRunning) return;

        // Calcular delta time
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Obtener estado del input
        const inputState = this.inputManager.getInputState();

        // Actualizar el carro
        this.car.update(this.inputManager, 1);

        // Actualizar la cámara
        this.gameCamera.update(this.car.speed);

        // Actualizar UI
        this.updateUI();

        // Renderizar la escena
        this.renderer.render(this.scene, this.camera);

        // Continuar el loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     * Actualiza la interfaz de usuario
     */
    updateUI() {
        if (this.speedDisplay) {
            this.speedDisplay.textContent = this.car.getSpeedKmh();
        }
    }

    /**
     * Maneja el resize de la ventana
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Pausa el juego
     */
    pause() {
        this.isRunning = false;
    }

    /**
     * Reanuda el juego
     */
    resume() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.gameLoop(performance.now());
        }
    }
}

// Iniciar el juego cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    const game = new ArcadeRacingGame();
    
    // Exponer el juego globalmente para debugging
    window.game = game;
});
