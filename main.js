import { Car } from './car.js';
import { InputManager } from './input.js';
import { GameCamera } from './camera.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const speedDisplay = document.getElementById('speed');

  // 🔑 FOCO REAL (desktop + mobile)
  canvas.focus();
  canvas.addEventListener('touchstart', () => canvas.focus());
  canvas.addEventListener('click', () => canvas.focus());

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Luces
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(50, 50, 50);
  scene.add(sun);

  // Suelo
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshPhongMaterial({ color: 0x2d5016 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Juego
  const car = new Car(scene);
  const input = new InputManager();
  const gameCamera = new GameCamera(camera, car.getMesh());
  gameCamera.reset();

  // 🚨 CONTROLES TOUCH (iPad / móvil)
  const touchState = {
    forward: false,
    left: false,
    right: false
  };

  // Exponer para debug
  window.touchState = touchState;

  // Loop
  function loop() {
    requestAnimationFrame(loop);

    // Simular input desde touch
    input.keys.forward = touchState.forward || input.keys.forward;
    input.keys.left = touchState.left || input.keys.left;
    input.keys.right = touchState.right || input.keys.right;

    car.update(input, 1);
    gameCamera.update(car.speed);

    if (speedDisplay) {
      speedDisplay.textContent = car.getSpeedKmh();
    }

    renderer.render(scene, camera);
  }

  loop();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
