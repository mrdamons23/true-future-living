// =========================
// Global 3D Showcase (Default Projection) using Three.js
// =========================
const container = document.getElementById('modelContainer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create a default placeholder 3D model (cube)
const geometry = new THREE.BoxGeometry(2, 1, 4);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Global showcase media (if available, override default model)
const globalShowcaseMedia = [
  { src: "images/showcase1.png", type: "image" },
  { src: "images/showcase2.png", type: "image" },
  { src: "images/showcase3.png", type: "image" }
];

if (globalShowcaseMedia.length > 0) {
  cancelAnimationFrame(animationId);
  container.innerHTML = "";
  startShowcaseSlider(globalShowcaseMedia);
}

function startShowcaseSlider(mediaArray) {
  // Filter the media array to include only .mp4, .png and .jpg files and limit to 3 items.
  const acceptedExtensions = ['.mp4', '.png', '.jpg'];
  const filteredMediaArray = mediaArray.filter(item =>
    acceptedExtensions.some(ext => item.src.toLowerCase().endsWith(ext))
  ).slice(0, 3);

  let currentIndex = 0;
  const mediaElements = filteredMediaArray.map(item => {
    let el;
    if (item.type === "image") {
      el = document.createElement("img");
      el.src = item.src;
      el.className = "projection-media";
    } else if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src;
      el.className = "projection-media";
      el.autoplay = true;
      el.loop = true;
      el.muted = true;
      el.playsInline = true;
    }
    return el;
  });
  
  // Append first element with fade-in effect
  const initialEl = mediaElements[currentIndex];
  initialEl.classList.add('fade-in');
  container.appendChild(initialEl);
  
  setInterval(() => {
    const currentEl = container.firstChild;
    if (currentEl) {
      // Add fade-out class
      currentEl.classList.add('fade-out');
      setTimeout(() => {
    currentIndex = (currentIndex + 1) % mediaElements.length;
    container.innerHTML = "";
        const nextEl = mediaElements[currentIndex];
        nextEl.classList.add('fade-in');
        container.appendChild(nextEl);
      }, 500); // duration of fade transition
    }
  }, 5000);
}

// =========================
// Capsule Models Data Updated with Uniform Image Logic
// =========================
const containerModels = {
  "G30": {
    name: "G30",
    price: 14920,
    description: `Building area: 18㎡
Length: 5.6m
Width: 3.6m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 8KW (with floor heating)
Total Net Weight: 4 tons
Price: US$14,920`
  },
  "G50": {
    name: "G50",
    price: 25296,
    description: `Building area: 31.4㎡
Length: 9.5m
Width: 3.3m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 7.5KW / 12KW (with floor heating)
Total Net Weight: 7 tons
Price: US$25,296`
  },
  "G50F": {
    name: "G50F",
    price: 25928,
    description: `Building area: 31.4㎡
Length: 9.5m
Width: 3.3m
Height: 3.2m
Occupancy: 2-4 people
Maximum Power: 7.5KW / 12KW (with floor heating)
Total Net Weight: 7 tons
Price: US$25,928`
  },
  "G70": {
    name: "G70",
    price: 30754,
    description: `Building area: 38.0㎡
Length: 11.5m
Width: 3.3m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 11.5KW / 17KW (with floor heating)
Total Net Weight: 9 tons
Price: US$30,754`
  },
  "G70F": {
    name: "G70F",
    price: 31386,
    description: `Building area: 38.0㎡
Length: 11.5m
Width: 3.3m
Height: 3.2m
Occupancy: 2-4 people
Maximum Power: 11.5KW / 17KW (with floor heating)
Total Net Weight: 9 tons
Price: US$31,386`
  },
  "L50": {
    name: "L50",
    price: 25296,
    description: `Building area: 30.0㎡
Length: 9.1m
Width: 3.3m
Height: 3.4m
Occupancy: 2 people
Maximum Power: 10KW / 15KW (with floor heating)
Total Net Weight: 7 tons
Price: US$25,296`
  },
  "L50F": {
    name: "L50F",
    price: 25928,
    description: `Building area: 30.0㎡
Length: 9.1m
Width: 3.3m
Height: 3.4m
Occupancy: 2 people
Maximum Power: 10KW / 15KW (with floor heating)
Total Net Weight: 7 tons
Price: US$25,928`
  },
  "L70": {
    name: "L70",
    price: 28941,
    description: `Building area: 38.0㎡
Length: 11.5m
Width: 3.3m
Height: 3.2m
Occupancy: 2-4 people
Maximum Power: 10KW / 15KW (with floor heating)
Total Net Weight: 8 tons
Price: US$28,941`
  },
  "A30": {
    name: "A30",
    price: 15865,
    description: `Building area: 15.7㎡
Length: 5.6m
Width: 2.8m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 6.7KW / 11.2KW (with floor heating)
Total Net Weight: 5 tons
Price: US$15,865`
  },
  "A50": {
    name: "A50",
    price: 20686,
    description: `Building area: 31.4㎡
Length: 9.5m
Width: 3.3m
Height: 3.3m
Occupancy: 2-4 people
Maximum Power: 6.7KW / 11.2KW (with floor heating)
Total Net Weight: 7 tons
Price: US$20,686`
  },
  "A70": {
    name: "A70",
    price: 24370,
    description: `Building area: 38.0㎡
Length: 11.5m
Width: 3.3m
Height: 3.4m
Occupancy: 2-4 people
Maximum Power: 9.9KW / 15.4KW (with floor heating)
Total Net Weight: 9 tons
Price: US$24,370`
  },
  "M50": {
    name: "M50",
    price: 22866,
    description: `Building area: 29.8㎡
Length: 9.3m
Width: 3.2m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 7.5KW / 12KW (with floor heating)
Total Net Weight: 7 tons
Price: US$22,866`
  },
  "M70": {
    name: "M70",
    price: 28825,
    description: `Building area: 36.8㎡
Length: 11.5m
Width: 3.2m
Height: 3.2m
Occupancy: 2 people
Maximum Power: 11.5KW / 17KW (with floor heating)
Total Net Weight: 9 tons
Price: US$28,825`
  },
  "U": {
    name: "U",
    price: "US$24,500",
    description: `Building area: 33.0㎡
Diameter: 6.5m
Height: 3.2m
Occupancy: 2-4 people
Maximum Power: 10KW (with floor heating)
Total Net Weight: 5 tons
Price: US$24,500`
  },
  "X60": {
    name: "X60",
    price: 32000,
    description: `Building area: 40.0㎡
Length: 12.0m | Width: 3.5m | Height: 3.2m
Occupancy: 2 people
Maximum Power: 12KW (with floor heating)
Total Net Weight: 10 tons
Price: US$32,000`
  },
  "X96": {
    name: "X96",
    price: 40000,
    description: `Building area: 50.0㎡
Length: 14.0m | Width: 3.8m | Height: 3.4m
Occupancy: 3 people
Maximum Power: 14KW (with floor heating)
Total Net Weight: 12 tons
Price: US$40,000`
  },
  "X116": {
    name: "X116",
    price: 46000,
    description: `Building area: 60.0㎡
Length: 16.0m | Width: 4.0m | Height: 3.5m
Occupancy: 3-4 people
Maximum Power: 16KW (with floor heating)
Total Net Weight: 14 tons
Price: US$46,000`
  }
};

// Update image naming logic for all models
// Expected filenames: images/modelname.png, images/modelname_2.png, and images/modelname_3.png
Object.keys(containerModels).forEach(modelKey => {
  const lowerCaseKey = modelKey.toLowerCase();
  containerModels[modelKey].image = "images/" + lowerCaseKey + ".png";
  containerModels[modelKey].showcase = [
    { src: "images/" + lowerCaseKey + "_2.png", type: "image" },
    { src: "images/" + lowerCaseKey + "_3.png", type: "image" }
  ];
});

// =========================
// Model-Specific Showcase Display
// When a model is selected from a dropdown, display its showcase in a given container.
function startModelShowcase(modelKey, containerId) {
  const modelData = containerModels[modelKey];
  const previewContainer = document.getElementById(containerId);
  if (!modelData || !modelData.showcase || !previewContainer) return;
  
  // Filter the model's showcase to include only .mp4, .png and .jpg files and limit to 3 items.
  const acceptedExtensions = ['.mp4', '.png', '.jpg'];
  const filteredShowcase = modelData.showcase.filter(item =>
    acceptedExtensions.some(ext => item.src.toLowerCase().endsWith(ext))
  ).slice(0, 3);

  const mediaElements = filteredShowcase.map(item => {
    let el;
    if (item.type === "image") {
      el = document.createElement("img");
      el.src = item.src;
      el.className = "projection-media";
    } else if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src;
      el.className = "projection-media";
      el.autoplay = true;
      el.loop = true;
      el.muted = true;
      el.playsInline = true;
    }
    return el;
  });
  previewContainer.innerHTML = "";
  previewContainer.appendChild(mediaElements[0]);
  setInterval(() => {
    const currentIndex = (previewContainer.children.length - 1) % mediaElements.length;
    previewContainer.innerHTML = "";
    previewContainer.appendChild(mediaElements[currentIndex]);
  }, 5000);
}

// =========================
// Customs Calculator Model Preview Update
// =========================
document.getElementById('model')?.addEventListener('change', function(e) {
  const modelKey = e.target.value;
  const previewContainer = document.getElementById('modelPreviewContainer');
  if (modelKey && containerModels[modelKey] && containerModels[modelKey].showcase) {
    startModelShowcase(modelKey, 'modelPreviewContainer');
  } else {
    previewContainer.innerHTML = "";
  }
});

// =========================
// Customs & Shipping Calculator
// =========================
const customsRates = {
  "USA": 0.05,
  "Canada": 0.07,
  "UK": 0.10,
  "Australia": 0.08,
  "Germany": 0.09
};

document.getElementById('customsForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const country = document.getElementById('country').value;
  const modelKey = document.getElementById('model').value;
  
  if (!country || !modelKey) {
    document.getElementById('result').innerText = "Please select both a country and a capsule model.";
    return;
  }
  
  const modelData = containerModels[modelKey];
  const basePrice = modelData.price;
  const totalCost = basePrice;
  
  const rate = customsRates[country];
  const customsFee = totalCost * rate;
  
  document.getElementById('result').innerText = `For ${country}, using ${modelData.name}:
  - Base Price: $${basePrice.toLocaleString()}
  - Total: $${totalCost.toLocaleString()}
  Estimated customs fee: $${customsFee.toFixed(2)} (Rate: ${(rate * 100)}%).`;
});

// =========================
// Cost Per Square Metre Calculator
// =========================
document.getElementById('costCalcForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const modelKey = document.getElementById('calcModel').value;
  const area = parseFloat(document.getElementById('calcArea').value);
  if (!modelKey || isNaN(area) || area <= 0) {
    document.getElementById('costCalcResult').innerText = "Please select a model and enter a valid area.";
    return;
  }
  const modelData = containerModels[modelKey];
  const totalCost = modelData.price;
  const costPerM2 = totalCost / area;
  document.getElementById('costCalcResult').innerText = `For ${modelData.name}, the cost per square metre is approximately $${costPerM2.toFixed(2)}.`;
});

// =========================
// Contact Form Submission (Dummy Handler)
// =========================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
});

// =========================
// Section Filtering Navigation (only applies if a link has a data-target attribute)
// =========================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = this.getAttribute('data-target');
    if (target) {
      e.preventDefault();
    filterSections(target);
    }
    // If no data-target is present, the default behavior (redirecting to href) will occur.
  });
});

function filterSections(target) {
  // Get all section elements within the mainContent wrapper
  const sections = document.querySelectorAll('#mainContent > section');
  if (target === "all") {
    // Show all sections
    sections.forEach(sec => sec.style.display = "block");
  } else {
    sections.forEach(sec => {
      if (sec.id === target) {
        sec.style.display = "block";
      } else {
        sec.style.display = "none";
      }
    });
  }
}

// =========================
// Redirect for Product Enquiries (from Enquire Now buttons)
function enquireNow(modelKey) {
  window.location.href = "index.html?model=" + modelKey + "#enquiry";
}

// =========================
// Enquire Now Button Handler
document.querySelectorAll('.enquire-now').forEach(button => {
  button.addEventListener('click', function() {
    const modelKey = this.getAttribute('data-model');
    enquireNow(modelKey);
  });
});

// =========================
// New 3D Breakdown Section – Futuristic Build Breakdown Model
// =========================
const breakdownContainer = document.getElementById('breakdown3D');
if (breakdownContainer) {
  const breakdownScene = new THREE.Scene();
  const breakdownCamera = new THREE.PerspectiveCamera(
    75,
    breakdownContainer.clientWidth / breakdownContainer.clientHeight,
    0.1,
    1000
  );
  const breakdownRenderer = new THREE.WebGLRenderer({ antialias: true });
  breakdownRenderer.setSize(breakdownContainer.clientWidth, breakdownContainer.clientHeight);
  breakdownContainer.appendChild(breakdownRenderer.domElement);

  // Create a futuristic model representing the capsule home's structural breakdown
  const breakdownGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const breakdownMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 0.8,
    roughness: 0.3
  });
  const breakdownModel = new THREE.Mesh(breakdownGeometry, breakdownMaterial);
  breakdownScene.add(breakdownModel);

  // Add ambient and point lights for enhanced futuristic effect
  const breakdownAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  breakdownScene.add(breakdownAmbientLight);
  const breakdownPointLight = new THREE.PointLight(0xffffff, 1);
  breakdownPointLight.position.set(5, 5, 5);
  breakdownScene.add(breakdownPointLight);

  breakdownCamera.position.z = 4;

  function animateBreakdown() {
    requestAnimationFrame(animateBreakdown);
    breakdownModel.rotation.x += 0.01;
    breakdownModel.rotation.y += 0.015;
    breakdownRenderer.render(breakdownScene, breakdownCamera);
  }
  animateBreakdown();
}

// =========================
// Animated 3D Grid Background
// =========================
const bgCanvas = document.getElementById('bgCanvas');
if (bgCanvas) {
  const bgScene = new THREE.Scene();
  const bgCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  bgCamera.position.set(0, 50, 100); // Adjust camera position as desired
  bgCamera.lookAt(0, 0, 0); // Ensure the camera is looking at the grid center
  const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(window.devicePixelRatio);

  // Create a grid helper with size 200 and 50 divisions
  const gridHelper = new THREE.GridHelper(200, 50, 0xffffff, 0x555555);
  bgScene.add(gridHelper);

  function animateBackground() {
    requestAnimationFrame(animateBackground);
    // Slowly rotate the grid for an animated effect
    gridHelper.rotation.z += 0.001;
    bgRenderer.render(bgScene, bgCamera);
  }
  animateBackground();

  // Handle window resize
  window.addEventListener('resize', () => {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Form handling
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
  // Update hidden fields before submission
  const selectedModels = Array.from(document.querySelectorAll('#modelSelectionContainer input:checked'))
    .map(input => input.value)
    .join(', ');
  document.getElementById('selectedModelsInput').value = selectedModels;

  const configurations = Array.from(document.querySelectorAll('.config-container input:checked'))
    .map(input => input.value)
    .join(', ');
  document.getElementById('configurationsInput').value = configurations;

  // Format budget
  const budget = document.getElementById('budget').value;
  if (budget) {
    document.getElementById('formattedBudget').value = `$${Number(budget).toLocaleString()}`;
  }

  // Concatenate all enquiry details into one hidden field
  const fullInfo = "Name: " + document.getElementById('enquirerName').value + "\n" +
    "Email: " + document.getElementById('enquirerEmail').value + "\n" +
    "Phone: " + document.getElementById('enquirerPhone').value + "\n" +
    "Country: " + document.getElementById('customerCountry').value + "\n" +
    "Quantity: " + document.getElementById('quantity').value + "\n" +
    "Budget: " + document.getElementById('formattedBudget').value + "\n" +
    "Selected Models: " + document.getElementById('selectedModelsInput').value + "\n" +
    "Configurations: " + document.getElementById('configurationsInput').value + "\n" +
    "Message: " + document.getElementById('enquiryMessage').value;
  document.getElementById('fullEnquiryDetails').value = fullInfo;
});

function formatBudget(value) {
  if (value) {
    document.getElementById('formattedBudget').value = `