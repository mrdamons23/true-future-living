// Grey 3D Spinning Grid Background Animation

// Ensure Three.js is loaded before this script runs.

// Initialize the scene, camera, and renderer.
const scene = new THREE.Scene();
// Optional: add subtle fog for depth effect.
scene.fog = new THREE.FogExp2(0x000000, 0.002);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 50, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bgCanvas'),
  alpha: true // Allow transparency so that content can appear over the grid.
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a grid helper with grey tones.
const gridSize = 200;
const gridDivisions = 50;
const gridColorMain = 0x888888; // Light grey major lines.
const gridColorSub = 0x444444;  // Darker grey subdivisions.
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColorMain, gridColorSub);
// Enable transparency on the grid materials for a pulsating glow effect.
if (Array.isArray(gridHelper.material)) {
  gridHelper.material.forEach(material => { material.transparent = true; });
} else {
  gridHelper.material.transparent = true;
}
scene.add(gridHelper);

function animate() {
  requestAnimationFrame(animate);
  
  // Slowly rotate the grid.
  gridHelper.rotation.z += 0.001;
  
  // Orbit the camera slowly around the scene center.
  const time = Date.now() * 0.001;
  camera.position.x = Math.cos(time * 0.1) * 100;
  camera.position.z = Math.sin(time * 0.1) * 100;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // Pulsate grid opacity for a dynamic glow effect.
  const pulsate = 0.5 + 0.5 * Math.sin(time * 2);
  // We'll vary opacity between 0.5 and 0.8 (adjust as desired)
  const newOpacity = 0.5 + 0.3 * pulsate;
  if (Array.isArray(gridHelper.material)) {
    gridHelper.material.forEach(material => { material.opacity = newOpacity; });
  } else {
    gridHelper.material.opacity = newOpacity;
  }

  renderer.render(scene, camera);
}
animate();

// Adjust the renderer and camera on window resize.
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}); 