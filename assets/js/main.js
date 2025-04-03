// Ensure DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ---------------------
  // Three.js 3D Animation for Cube Section
  // ---------------------
  let sceneCube, cameraCube, rendererCube, cube;
  const cubeContainer = document.getElementById("three-container-cube");

  function initCube() {
    sceneCube = new THREE.Scene();
    cameraCube = new THREE.PerspectiveCamera(
      45,
      cubeContainer.clientWidth / cubeContainer.clientHeight,
      0.1,
      1000
    );
    cameraCube.position.set(0, 0, 7);

    rendererCube = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererCube.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
    cubeContainer.appendChild(rendererCube.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    sceneCube.add(ambientLight);

    // Create a smaller cube with futuristic textures on each face
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const loader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face1.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face2.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face3.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face4.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face5.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("assets/images/face6.jpg") })
    ];
    cube = new THREE.Mesh(geometry, materials);
    sceneCube.add(cube);

    animateCube();
  }

  function animateCube() {
    requestAnimationFrame(animateCube);
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.005;
    rendererCube.render(sceneCube, cameraCube);
  }

  initCube();

  window.addEventListener("resize", () => {
    cameraCube.aspect = cubeContainer.clientWidth / cubeContainer.clientHeight;
    cameraCube.updateProjectionMatrix();
    rendererCube.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
  });

  // ---------------------
  // GSAP Animations for Scroll & Interactivity
  // ---------------------
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.from("#project-overview", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: "#project-overview", start: "top 80%" }
  });
  gsap.from("#product-showcase", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: "#product-showcase", start: "top 80%" }
  });
  gsap.from("#tech-features .feature", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: { trigger: "#tech-features", start: "top 80%" }
  });
  gsap.from("#sensors-esp", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: "#sensors-esp", start: "top 80%" }
  });
  gsap.from("#team .team-member", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: { trigger: "#team", start: "top 80%" }
  });
  gsap.from("#contact", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: "#contact", start: "top 80%" }
  });

  // ---------------------
  // Sensor & ESP32 Hover Descriptions
  // ---------------------
  const sensorItems = document.querySelectorAll(".sensor-item");
  const sensorDescContainer = document.getElementById("sensor-description");
  const esp32DescContainer = document.getElementById("esp32-description");

  const descriptions = {
    sensor1: `
      <h5>Hall Effect Sensor</h5>
      <p>Detects magnetic fields with advanced precision, turning subtle hand movements into click signals.</p>
    `,
    sensor2: `
      <h5>IMU Sensor</h5>
      <p>Our MPU6050 sensor captures every nuance of motion for intuitive, hands–free control.</p>
    `,
    esp32: `
      <h5>ESP32</h5>
      <p>The ESP32 delivers robust performance with dual–core processing and integrated Wi-Fi/Bluetooth for real–time gesture recognition.</p>
    `
  };

  sensorItems.forEach((item) => {
    const id = item.getAttribute("data-sensor");
    item.addEventListener("mouseenter", () => {
      // For sensors, display text in the common container
      if (id !== "esp32") {
        sensorDescContainer.innerHTML = descriptions[id] || "";
        gsap.to(sensorDescContainer, { duration: 0.5, autoAlpha: 1, ease: "power3.out" });
      } else {
        // For ESP32, handled separately
      }
    });
    item.addEventListener("mouseleave", () => {
      if (id !== "esp32") {
        gsap.to(sensorDescContainer, { duration: 0.5, autoAlpha: 0, ease: "power3.out" });
      }
    });
    item.addEventListener("click", () => {
      if (id !== "esp32") {
        sensorDescContainer.innerHTML = descriptions[id] || "";
      }
    });
  });

  // For ESP32 hover on its container
  const esp32Item = document.querySelector('[data-sensor="esp32"]');
  if (esp32Item) {
    esp32Item.addEventListener("mouseenter", () => {
      esp32DescContainer.innerHTML = descriptions.esp32;
      gsap.to(esp32DescContainer, { duration: 0.5, autoAlpha: 1, ease: "power3.out" });
    });
    esp32Item.addEventListener("mouseleave", () => {
      gsap.to(esp32DescContainer, { duration: 0.5, autoAlpha: 0, ease: "power3.out" });
    });
    esp32Item.addEventListener("click", () => {
      esp32DescContainer.innerHTML = descriptions.esp32;
    });
  }

  // ---------------------
  // Glide Title Click Animation - Scroll to Product Showcase
  // ---------------------
  const glideTitle = document.getElementById("glide-title");
  glideTitle.addEventListener("click", () => {
    gsap.to(glideTitle, {
      duration: 0.5,
      x: 100,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(window, { duration: 1, scrollTo: "#product-showcase", ease: "power2.inOut" });
      }
    });
  });
});
