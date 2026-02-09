// =====================================================
// SOLAR SYSTEM SKILLS - Système solaire 3D interactif
// =====================================================

class SolarSystemSkills {
    constructor() {
        this.container = document.getElementById('skill-solar-container');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.planets = [];
        this.satellites = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredObject = null;
        this.selectedPlanet = null;
        this.isZooming = false;
        this.autoRotateCamera = true;

        // Variables pour la rotation fluide (damping)
        this.targetRotationX = 0;
        this.targetRotationY = 0;

        // Configuration des planètes (catégories)
        this.planetData = {
            devops: {
                name: 'DevOps',
                color: 0x4285F4,
                glowColor: 0x6BA3FF,
                size: 1.8,
                orbitRadius: 8,
                orbitSpeed: 0.0003,
                rotationSpeed: 0.001,
                satellites: [
                    { name: 'Docker', color: 0x2496ED, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                    { name: 'Kubernetes', color: 0x326CE5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
                    { name: 'GitHub Actions', color: 0x2088FF, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                    { name: 'Azure', color: 0x0078D4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
                    { name: 'Jenkins', color: 0xD24939, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
                    { name: 'Terraform', color: 0x7B42BC, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' }
                ]
            },
            web: {
                name: 'Web Dev',
                color: 0xE34F26,
                glowColor: 0xFF6B47,
                size: 1.6,
                orbitRadius: 14,
                orbitSpeed: 0.0002,
                rotationSpeed: 0.0008,
                satellites: [
                    { name: 'React', color: 0x61DAFB, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                    { name: 'Node.js', color: 0x339933, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                    { name: 'TypeScript', color: 0x3178C6, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                    { name: 'HTML5', color: 0xE34F26, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                    { name: 'CSS3', color: 0x1572B6, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                    { name: 'JavaScript', color: 0xF7DF1E, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
                ]
            },
            ai: {
                name: 'AI & ML',
                color: 0xFF6B35,
                glowColor: 0xFF8C5A,
                size: 1.7,
                orbitRadius: 20,
                orbitSpeed: 0.00015,
                rotationSpeed: 0.0009,
                satellites: [
                    { name: 'TensorFlow', color: 0xFF6F00, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
                    { name: 'PyTorch', color: 0xEE4C2C, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
                    { name: 'Keras', color: 0xD00000, icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg' }, // Keras not always on devicon, using backup or generic
                    { name: 'Scikit-learn', color: 0xF7931E, icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Scikit_learn_logo_small.svg' },
                    { name: 'OpenCV', color: 0x5C3EE8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' }
                ]
            },
            database: {
                name: 'Databases',
                color: 0x336791,
                glowColor: 0x5089B5,
                size: 1.5,
                orbitRadius: 26,
                orbitSpeed: 0.0001,
                rotationSpeed: 0.0007,
                satellites: [
                    { name: 'PostgreSQL', color: 0x336791, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                    { name: 'MySQL', color: 0x4479A1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                    { name: 'MongoDB', color: 0x47A248, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                    { name: 'Redis', color: 0xDC382D, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
                    { name: 'SQLite', color: 0x003B57, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' }
                ]
            },
            backend: {
                name: 'Backend',
                color: 0x339933,
                glowColor: 0x52B84F,
                size: 1.65,
                orbitRadius: 32,
                orbitSpeed: 0.00008,
                rotationSpeed: 0.00065,
                satellites: [
                    { name: 'Java', color: 0xF89820, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                    { name: 'Python', color: 0x3776AB, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                    { name: 'Express.js', color: 0x000000, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                    { name: 'Spring Boot', color: 0x6DB33F, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
                    { name: 'REST API', color: 0x009688, icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/api/api.png' }
                ]
            }
        };

        this.init();
    }

    init() {
        this.setupScene();
        this.createSun();
        this.createPlanets();
        this.createStars();
        this.createAmbientParticles();
        this.setupLights();
        this.setupEventListeners();
        this.createInfoPanel();
        this.animate();
    }

    setupScene() {
        // Scène
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.002);

        // Caméra
        const aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(0, 25, 45);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.container.appendChild(this.renderer.domElement);
    }

    createSun() {
        // Soleil central (Mon expertise)
        const sunGeometry = new THREE.SphereGeometry(3, 64, 64);

        // Shader personnalisé pour le soleil
        const sunMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0xFFD700) },
                color2: { value: new THREE.Color(0xFF6B35) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                varying vec3 vNormal;
                
                void main() {
                    float noise = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, noise);
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    color = mix(color, vec3(1.0, 0.9, 0.6), fresnel * 0.5);
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(this.sun);

        // Glow du soleil
        const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                c: { value: 0.4 },
                p: { value: 4.5 }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float c;
                uniform float p;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
                    gl_FragColor = vec4(1.0, 0.8, 0.3, 1.0) * intensity;
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(glow);

        // Texte "Expertise" au centre
        this.createSunLabel();
    }

    createSunLabel() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;

        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 60px Inter, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('EXPERTISE', 256, 64);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(8, 2, 1);
        sprite.position.y = 0;
        this.scene.add(sprite);
    }

    createPlanets() {
        let angle = 0;
        const angleStep = (Math.PI * 2) / Object.keys(this.planetData).length;

        Object.entries(this.planetData).forEach(([key, data]) => {
            const planetGroup = new THREE.Group();

            // Planète
            const geometry = new THREE.SphereGeometry(data.size, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: data.color,
                emissive: data.color,
                emissiveIntensity: 0.3,
                shininess: 100,
                specular: 0xffffff
            });

            const planet = new THREE.Mesh(geometry, material);
            planet.userData = { type: 'planet', key, data };
            planetGroup.add(planet);

            // Glow de la planète
            const glowGeometry = new THREE.SphereGeometry(data.size * 1.15, 16, 16);
            const glowMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    c: { value: 0.5 },
                    p: { value: 3.0 },
                    glowColor: { value: new THREE.Color(data.glowColor) }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float c;
                    uniform float p;
                    uniform vec3 glowColor;
                    varying vec3 vNormal;
                    void main() {
                        float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
                        gl_FragColor = vec4(glowColor, 1.0) * intensity;
                    }
                `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            planetGroup.add(glow);

            // Label de la planète
            const label = this.createLabel(data.name);
            label.position.y = data.size + 1;
            planetGroup.add(label);

            // Orbite visuelle
            const orbitGeometry = new THREE.RingGeometry(data.orbitRadius - 0.05, data.orbitRadius + 0.05, 128);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: data.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.2
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            this.scene.add(orbit);

            // Position initiale sur l'orbite
            const x = Math.cos(angle) * data.orbitRadius;
            const z = Math.sin(angle) * data.orbitRadius;
            planetGroup.position.set(x, 0, z);
            planetGroup.userData = { orbitAngle: angle, data, key };

            this.scene.add(planetGroup);
            this.planets.push(planetGroup);

            // Créer les satellites (outils) pour cette planète
            this.createSatellites(planetGroup, data);

            angle += angleStep;
        });
    }

    createSatellites(planetGroup, planetData) {
        const satelliteGroup = new THREE.Group();
        const satelliteCount = planetData.satellites.length;
        const satelliteOrbitRadius = planetData.size + 2;

        planetData.satellites.forEach((satData, index) => {
            const angle = (index / satelliteCount) * Math.PI * 2;

            // Satellite IMAGE (Icone/Emoji) au lieu d'une sphère
            const satellite = this.createIconSprite(satData.icon, satData.color);
            satellite.userData = {
                type: 'satellite',
                name: satData.name,
                icon: satData.icon,
                parentPlanet: planetData.name
            };

            const x = Math.cos(angle) * satelliteOrbitRadius;
            const z = Math.sin(angle) * satelliteOrbitRadius;
            satellite.position.set(x, 0, z);

            satelliteGroup.add(satellite);
            this.satellites.push({ mesh: satellite, angle, radius: satelliteOrbitRadius });
        });

        satelliteGroup.userData = { rotationSpeed: 0.01 };
        planetGroup.add(satelliteGroup);
    }

    createLabel(text, scale = 1) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 32px Inter, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 32);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(2 * scale, 0.5 * scale, 1);
        return sprite;
    }

    createIconSprite(icon, colorHex) {
        const group = new THREE.Group();

        // 1. Cercle de fond (Canvas)
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;

        const color = new THREE.Color(colorHex);
        const r = Math.floor(color.r * 255);
        const g = Math.floor(color.g * 255);
        const b = Math.floor(color.b * 255);

        context.beginPath();
        context.arc(64, 64, 50, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
        context.fill();
        context.lineWidth = 4;
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        context.stroke();

        const bgTexture = new THREE.CanvasTexture(canvas);
        const bgMaterial = new THREE.SpriteMaterial({
            map: bgTexture,
            transparent: true,
            depthWrite: false
        });
        const bgSprite = new THREE.Sprite(bgMaterial);
        bgSprite.scale.set(1.5, 1.5, 1);
        group.add(bgSprite);

        // 2. Icône
        if (icon.startsWith('http') || icon.startsWith('data:')) {
            // URL Image
            const loader = new THREE.TextureLoader();
            loader.load(icon, (texture) => {
                const iconMaterial = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    depthWrite: false
                });
                const iconSprite = new THREE.Sprite(iconMaterial);
                iconSprite.scale.set(0.8, 0.8, 1);
                iconSprite.renderOrder = 1;
                group.add(iconSprite);
            });
        } else {
            // Emoji
            const emojiCanvas = document.createElement('canvas');
            const ctx = emojiCanvas.getContext('2d');
            emojiCanvas.width = 128;
            emojiCanvas.height = 128;

            ctx.font = '60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(icon, 64, 68);

            const emojiTexture = new THREE.CanvasTexture(emojiCanvas);
            const emojiMaterial = new THREE.SpriteMaterial({
                map: emojiTexture,
                transparent: true,
                depthWrite: false
            });
            const emojiSprite = new THREE.Sprite(emojiMaterial);
            emojiSprite.scale.set(1.5, 1.5, 1);
            emojiSprite.renderOrder = 1;
            group.add(emojiSprite);
        }

        return group;
    }

    createStars() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 2000; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
    }

    createAmbientParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x4A9FFF,
            size: 0.3,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesVertices = [];
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            particlesVertices.push(x, y, z);
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    setupLights() {
        // Lumière ambiante
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        // Lumière du soleil
        const sunLight = new THREE.PointLight(0xFFD700, 2, 100);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        // Lumières directionnelles pour éclairer les planètes
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0x4A9FFF, 0.3);
        directionalLight2.position.set(-5, -5, -5);
        this.scene.add(directionalLight2);
    }

    createInfoPanel() {
        const panel = document.createElement('div');
        panel.id = 'solar-info-panel';
        panel.className = 'solar-info-panel';
        panel.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px 30px;
            color: white;
            font-family: 'Inter', sans-serif;
            max-width: 500px;
            text-align: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 600;"></h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;"></p>
        `;
        this.container.appendChild(panel);
        this.infoPanel = panel;
    }

    setupEventListeners() {
        // Resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Mouse move pour hover
        this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Click pour sélection
        this.renderer.domElement.addEventListener('click', (e) => this.onClick(e));

        // Double-click pour réinitialiser la vue
        this.renderer.domElement.addEventListener('dblclick', () => {
            if (this.selectedPlanet) {
                this.resetView();
            }
        });

        // Touche Escape pour réinitialiser la vue
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.selectedPlanet) {
                this.resetView();
            }
        });

        // Rotation de la caméra avec la souris
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let currentButton = -1; // -1: None, 0: Left, 2: Right

        // Désactiver le menu contextuel pour utiliser le clic droit
        this.renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

        this.renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            currentButton = e.button;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        this.renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false;
            currentButton = -1;
        });

        this.renderer.domElement.addEventListener('mouseleave', () => {
            isDragging = false;
            currentButton = -1;
        });

        this.renderer.domElement.addEventListener('mousemove', (e) => {
            // Empêcher le drag si on est en train de zoomer sur une planète
            if (this.isZooming && isDragging) {
                isDragging = false;
                return;
            }

            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                if (currentButton === 2) {
                    // Clic Droit = ROTATION
                    const rotationSpeed = 0.005;
                    this.targetRotationY += deltaX * rotationSpeed;
                    this.targetRotationX += deltaY * rotationSpeed;
                    this.targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.targetRotationX));
                }
                else if (currentButton === 0) {
                    // Clic Gauche = TRANSLATION (PAN)
                    // Déclenche le mode "manuel" (arrête la rotation auto si activée) mais pas le "Zoom"
                    this.autoRotateCamera = false;

                    const panSpeed = 0.05;
                    // Déplacement relatif à la caméra
                    this.camera.translateX(-deltaX * panSpeed);
                    this.camera.translateY(deltaY * panSpeed);
                }

                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        // Zoom avec la molette
        this.renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.1;
            this.camera.position.z += e.deltaY * zoomSpeed;
            this.camera.position.z = Math.max(20, Math.min(80, this.camera.position.z));
        });
    }

    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const allObjects = [];
        this.planets.forEach(p => {
            allObjects.push(p.children[0]); // La planète elle-même
            const satGroup = p.children.find(c => c.children.length > 0);
            if (satGroup) {
                satGroup.children.forEach(sat => {
                    if (sat.userData.type === 'satellite') allObjects.push(sat);
                });
            }
        });

        const intersects = this.raycaster.intersectObjects(allObjects);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.type === 'planet') {
                this.showInfo(object.userData.data.name, 'Catégorie de compétences');
                this.renderer.domElement.style.cursor = 'pointer';
            } else if (object.userData.type === 'satellite') {
                this.showInfo(object.userData.name, object.userData.parentPlanet);
                this.renderer.domElement.style.cursor = 'pointer';
            }
            this.hoveredObject = object;
        } else {
            this.hideInfo();
            this.renderer.domElement.style.cursor = 'default';
            this.hoveredObject = null;
        }
    }

    onClick(event) {
        if (this.hoveredObject) {
            if (this.hoveredObject.userData.type === 'planet') {
                this.focusOnPlanet(this.hoveredObject.parent);
            }
        }
    }

    focusOnPlanet(planetGroup) {
        this.selectedPlanet = planetGroup;
        this.isZooming = true;
        this.autoRotateCamera = false;

        // Calcul de la position dans le monde (World Coordinates)
        const planetWorldPos = new THREE.Vector3();
        planetGroup.getWorldPosition(planetWorldPos);

        // Direction depuis le soleil vers la planète pour savoir où placer la caméra
        // On veut être "devant" la planète
        const directionFromCenter = planetWorldPos.clone().normalize();

        // Position cible : Planète + (Direction * Distance)
        const distance = 15;
        const height = 8;

        const targetPosition = planetWorldPos.clone().add(directionFromCenter.multiplyScalar(distance));
        targetPosition.y += height;

        // Effet de zoom rapide
        const duration = 1500;
        const start = Date.now();
        const initialPosition = this.camera.position.clone();

        // Créer un effet de particules lors du focus
        this.createFocusParticles(planetGroup.position);

        const animateCamera = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);

            this.camera.position.lerpVectors(initialPosition, targetPosition, eased);

            // On s'assure de regarder la POSITION MONDE de la planète
            const currentLookAt = new THREE.Vector3();
            planetGroup.getWorldPosition(currentLookAt);
            this.camera.lookAt(currentLookAt);

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            } else {
                this.isZooming = false;
                // Afficher une info détaillée de la planète
                this.showDetailedInfo(planetGroup);
            }
        };

        animateCamera();
    }

    createFocusParticles(position) {
        // Optimisation : Utiliser THREE.Points au lieu de 50 Meshes
        const particleCount = 30; // Réduit de 50 à 30 pour la perf
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 2 + Math.random();

            // Position initiale autour de la cible
            positions.push(
                position.x + Math.cos(angle) * radius,
                position.y + (Math.random() - 0.5) * 2,
                position.z + Math.sin(angle) * radius
            );

            // Vitesse pour l'animation (expansion)
            velocities.push(
                Math.cos(angle) * 0.05, // x
                0.05 + Math.random() * 0.05, // y (monte)
                Math.sin(angle) * 0.05 // z
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x4A9FFF,
            size: 0.2, // Taille des points
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);

        // Animation simple des particules
        let opacity = 0.8;
        const animateParticles = () => {
            opacity -= 0.02;

            if (opacity <= 0) {
                this.scene.remove(particles);
                geometry.dispose();
                material.dispose();
                return; // Stop animation
            }

            material.opacity = opacity;

            // Mise à jour des positions
            const posAttribute = geometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                // x += vx
                posAttribute.array[i * 3] += velocities[i * 3];
                // y += vy
                posAttribute.array[i * 3 + 1] += velocities[i * 3 + 1];
                // z += vz
                posAttribute.array[i * 3 + 2] += velocities[i * 3 + 2];
            }
            posAttribute.needsUpdate = true;

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    showDetailedInfo(planetGroup) {
        const data = planetGroup.userData.data;
        const panel = this.infoPanel;

        let toolsList = data.satellites.map(s => s.name).join(' • ');

        panel.querySelector('h3').textContent = data.name;
        panel.querySelector('p').innerHTML = `
            <strong>${data.satellites.length} Technologies</strong><br>
            ${toolsList}
        `;
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'auto';
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    resetView() {
        this.selectedPlanet = null;
        this.isZooming = true;
        this.hideInfo();

        const targetPosition = new THREE.Vector3(0, 25, 45);
        const duration = 1500;
        const start = Date.now();
        const initialPosition = this.camera.position.clone();

        const animateCamera = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);

            this.camera.position.lerpVectors(initialPosition, targetPosition, eased);
            this.camera.lookAt(0, 0, 0);

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            } else {
                this.isZooming = false;
                this.autoRotateCamera = true;
            }
        };

        animateCamera();
    }

    showInfo(title, subtitle) {
        const h3 = this.infoPanel.querySelector('h3');
        const p = this.infoPanel.querySelector('p');
        h3.textContent = title;
        p.textContent = subtitle;
        this.infoPanel.style.opacity = '1';
        this.infoPanel.style.pointerEvents = 'auto';
    }

    hideInfo() {
        this.infoPanel.style.opacity = '0';
        this.infoPanel.style.pointerEvents = 'none';
    }

    onWindowResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // --- Navigation Fluide (Damping) ---
        // On interpole la rotation actuelle vers la rotation cible
        if (!this.isZooming) {
            this.scene.rotation.x += (this.targetRotationX - this.scene.rotation.x) * 0.05;
            this.scene.rotation.y += (this.targetRotationY - this.scene.rotation.y) * 0.05;
        }

        // Rotation du soleil
        if (this.sun) {
            this.sun.rotation.y += 0.002;
            this.sun.material.uniforms.time.value = time;
        }

        // Rotation des particules ambiantes
        if (this.particles) {
            this.particles.rotation.y += 0.0002;
        }

        // Orbite des planètes
        this.planets.forEach(planetGroup => {
            const data = planetGroup.userData.data;

            // Mise à jour de l'angle orbital
            planetGroup.userData.orbitAngle += data.orbitSpeed;
            const angle = planetGroup.userData.orbitAngle;

            // Nouvelle position sur l'orbite
            const x = Math.cos(angle) * data.orbitRadius;
            const z = Math.sin(angle) * data.orbitRadius;
            planetGroup.position.set(x, 0, z);

            // Rotation de la planète sur elle-même
            const planet = planetGroup.children[0];
            if (planet) {
                planet.rotation.y += data.rotationSpeed;
            }

            // Rotation des satellites autour de la planète
            const satelliteGroup = planetGroup.children.find(child =>
                child.children.some(c => c.userData.type === 'satellite')
            );

            if (satelliteGroup) {
                satelliteGroup.rotation.y += satelliteGroup.userData.rotationSpeed;
            }
        });

        // Rotation douce de la caméra autour du système (seulement si pas en zoom)
        if (this.autoRotateCamera && !this.isZooming) {
            this.camera.position.x = Math.cos(time * 0.05) * 45;
            this.camera.position.z = Math.sin(time * 0.05) * 45;
            this.camera.lookAt(0, 0, 0);
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('skill-solar-container');
    if (container && typeof THREE !== 'undefined') {
        new SolarSystemSkills();
    }
});
