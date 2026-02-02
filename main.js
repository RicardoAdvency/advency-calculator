import { Car } from './car.js';
import { InputManager } from './input.js';
import { GameCamera } from './camera.js';

class ArcadeRacingGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.speedDisplay = document.getElementById('speed');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshPhongMaterial({ color: 0x2d5016 })
    );
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    this.car = new Car(this.scene);
    this.input = new InputManager();
    this.gameCamera = new GameCamera(this.camera, this.car.getMesh());
    this.gameCamera.reset();

    this.animate();
  }

  animate() {
    this.car.update(this.input, 1);
    this.gameCamera.update(this.car.speed);

    this.speedDisplay.textContent = this.car.getSpeedKmh();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new ArcadeRacingGame();
});
