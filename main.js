import { Car } from './car.js';
import { InputManager } from './input.js';
import { GameCamera } from './camera.js';

class ArcadeRacingGame {
  constructor() {
    this.speedDisplay = document.getElementById('speed');

    // 👇 Creamos la escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);

    // 👇 Cámara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 👇 Renderer y canvas
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // 👇 Enciende luz
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    this.scene.add(directionalLight);

    // 👇 Piso
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshPhongMaterial({ color: 0x2d5016 })
    );
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // 👇 Carro
    this.car = new Car(this.scene);

    // 👇 Input y cámara
    this.inputManager = new InputManager();
    this.gameCamera = new GameCamera(this.camera, this.car.getMesh());
    this.gameCamera.reset();

    // 👇 resize
    window.addEventListener('resize', () => this.onResize());

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.car.update(this.inputManager, 1);
    this.gameCamera.update(this.car.speed);

    if (this.speedDisplay) {
      this.speedDisplay.textContent = this.car.getSpeedKmh();
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// 👇 Iniciar juego en cuanto cargue
window.addEventListener('DOMContentLoaded', () => {
  new ArcadeRacingGame();
});
