// 3D Rotating Cubes Background Animation
document.addEventListener('DOMContentLoaded', () => {
  // Check if animation container exists
  const container = document.getElementById('bg-animation') || document.body;
  
  // Set up scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Configure camera - moved further back to show more of the scene
  camera.position.z = 50;
  
  // Create multiple cubes
  const cubes = [];
  const cubeCount = 12; // Fewer cubes for better spacing
  
  // Create materials with different grayscale colors and transparency
  const materials = [
    new THREE.MeshPhongMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3,
      specular: 0x111111,
      shininess: 100
    }),
    new THREE.MeshPhongMaterial({ 
      color: 0xaaaaaa, 
      transparent: true, 
      opacity: 0.3,
      specular: 0x222222,
      shininess: 100
    }),
    new THREE.MeshPhongMaterial({ 
      color: 0x666666, 
      transparent: true, 
      opacity: 0.3,
      specular: 0x333333,
      shininess: 100
    })
  ];
  
  // Wireframe material for edges - light gray with higher opacity
  const wireframeMaterial = new THREE.LineBasicMaterial({ 
    color: 0xffffff, 
    transparent: true, 
    opacity: 0.7,
    linewidth: 1
  });
  
  // Inner wireframe for more detail
  const innerWireframeMaterial = new THREE.LineBasicMaterial({ 
    color: 0xcccccc, 
    transparent: true, 
    opacity: 0.3
  });
  
  // Create cube instances
  for (let i = 0; i < cubeCount; i++) {
    // Determine cube size - varying sizes for more interest
    const cubeSize = 4 + Math.random() * 4;
    
    // Create more detailed cube geometry by increasing segments
    const geometry = new THREE.BoxGeometry(
      cubeSize, cubeSize, cubeSize,
      2, 2, 2  // More segments for detail
    );
    
    // Create edges geometry
    const edges = new THREE.EdgesGeometry(geometry);
    
    // Create inner details
    const innerGeometry = new THREE.BoxGeometry(
      cubeSize * 0.7, cubeSize * 0.7, cubeSize * 0.7
    );
    const innerEdges = new THREE.EdgesGeometry(innerGeometry);
    
    // Create cube mesh with random material
    const materialIndex = Math.floor(Math.random() * materials.length);
    const cube = new THREE.Mesh(geometry, materials[materialIndex]);
    
    // Create wireframe outlines
    const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
    const innerWireframe = new THREE.LineSegments(innerEdges, innerWireframeMaterial);
    
    // Position cube randomly in 3D space - much wider spacing
    cube.position.x = (Math.random() - 0.5) * 80;
    cube.position.y = (Math.random() - 0.5) * 80;
    cube.position.z = (Math.random() - 0.5) * 50;
    
    // Set random rotation
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    cube.rotation.z = Math.random() * Math.PI;
    
    // Copy cube position and rotation to wireframes
    wireframe.position.copy(cube.position);
    wireframe.rotation.copy(cube.rotation);
    
    innerWireframe.position.copy(cube.position);
    innerWireframe.rotation.copy(cube.rotation);
    
    // Add to arrays and scene
    cubes.push({ cube, wireframe, innerWireframe });
    scene.add(cube);
    scene.add(wireframe);
    scene.add(innerWireframe);
  }
  
  // Add lighting - adjust for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);
  
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight2.position.set(-1, -1, -1);
  scene.add(directionalLight2);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate each cube at different speeds for more dynamic movement
    cubes.forEach(({ cube, wireframe, innerWireframe }, index) => {
      const speed = 0.001 + (index % 3) * 0.001;
      
      cube.rotation.x += speed;
      cube.rotation.y += speed * 1.5;
      cube.rotation.z += speed * 0.5;
      
      // Sync wireframe rotations with cube
      wireframe.rotation.copy(cube.rotation);
      innerWireframe.rotation.copy(cube.rotation);
    });
    
    // Slowly move camera to create parallax effect
    camera.position.x = Math.sin(Date.now() * 0.00008) * 5;
    camera.position.y = Math.cos(Date.now() * 0.00008) * 5;
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Make sure the canvas is positioned correctly
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '-1';
  renderer.domElement.style.pointerEvents = 'none';
  
  // Start animation
  animate();
}); 