/**
 * SKILL SOLAR SYSTEM - PHYSICS ENGINE
 * Skills orbit around Category Centers (Suns)
 */

// Module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events,
      Vector = Matter.Vector,
      Body = Matter.Body;

const SkillSolarSystem = {
    engine: null,
    render: null,
    runner: null,
    mouseConstraint: null,
    elements: [],
    categories: {}, // Store category bodies
    
    // Configuration
    categoryConfig: {
        'web': { label: 'WEB', color: '#61DAFB', x: 0.2, y: 0.3 },     // Top Left
        'devops': { label: 'DEVOPS', color: '#F05032', x: 0.8, y: 0.3 },  // Top Right
        'data': { label: 'DATA', color: '#FFD43B', x: 0.5, y: 0.5 },      // Center
        'software': { label: 'LOGICIEL', color: '#f89820', x: 0.2, y: 0.7 }, // Bottom Left
        'sgbd': { label: 'SGBD', color: '#336791', x: 0.8, y: 0.7 }      // Bottom Right
    },

    skills: [
        // --- DATA SCIENCE & AI (Category: data) ---
        { id: 'python', category: 'data', label: 'Python', level: 0.85, color: '#FFD43B', desc: 'Data Science, ML & Automation.', xp: '3 ans' },
        { id: 'tensorflow', category: 'data', label: 'TF', level: 0.65, color: '#FF6F00', desc: 'Deep Learning & Neural Networks.', xp: '1 an' },
        { id: 'keras', category: 'data', label: 'Keras', level: 0.65, color: '#D00000', desc: 'High-level Neural Networks API.', xp: '1 an' },
        { id: 'numpy', category: 'data', label: 'NumPy', level: 0.75, color: '#013243', desc: 'Calcul scientifique & Matrices.', xp: '2 ans' },
        { id: 'pandas', category: 'data', label: 'Pandas', level: 0.75, color: '#150458', desc: 'Analyse & Manipulation de données.', xp: '2 ans' },
        { id: 'opencv', category: 'data', label: 'OpenCV', level: 0.60, color: '#5C3EE8', desc: 'Computer Vision & Traitement d\'image.', xp: '1 an' },
        { id: 'matplotlib', category: 'data', label: 'MatPlot', level: 0.70, color: '#11557c', desc: 'Visualisation de données.', xp: '2 ans' },

        // --- WEB DEVELOPMENT (Category: web) ---
        { id: 'js', category: 'web', label: 'JS', level: 0.85, color: '#F7DF1E', desc: 'ES6+, DOM & Async.', xp: '4 ans' },
        { id: 'typescript', category: 'web', label: 'TS', level: 0.75, color: '#3178C6', desc: 'Typage statique pour JS.', xp: '1 an' },
        { id: 'react', category: 'web', label: 'React', level: 0.8, color: '#61DAFB', desc: 'Interfaces réactives & Hooks.', xp: '2 ans' },
        { id: 'nextjs', category: 'web', label: 'Next.js', level: 0.75, color: '#000000', desc: 'React Framework, SSR & SEO.', xp: '1 an' },
        { id: 'nodejs', category: 'web', label: 'Node.js', level: 0.70, color: '#339933', desc: 'Backend JS Runtime.', xp: '2 ans' },
        { id: 'express', category: 'web', label: 'Express', level: 0.70, color: '#000000', desc: 'API REST & Middleware.', xp: '2 ans' },
        { id: 'php', category: 'web', label: 'PHP', level: 0.8, color: '#777BB4', desc: 'Backend Scripting.', xp: '3 ans' },
        { id: 'symfony', category: 'web', label: 'Symfony', level: 0.75, color: '#000000', desc: 'Framework PHP MVC.', xp: '2 ans' },
        { id: 'html', category: 'web', label: 'HTML5', level: 0.95, color: '#E34F26', desc: 'Structure & Sémantique.', xp: '5 ans' },
        { id: 'css', category: 'web', label: 'CSS3', level: 0.9, color: '#1572B6', desc: 'Flexbox, Grid & Animations.', xp: '5 ans' },
        { id: 'tailwindcss', category: 'web', label: 'Tailwind', level: 0.8, color: '#06B6D4', desc: 'Utility-first CSS.', xp: '1 an' },
        { id: 'figma', category: 'web', label: 'Figma', level: 0.7, color: '#F24E1E', desc: 'Prototypage UI/UX.', xp: '2 ans' },

        // --- SYSTEMS & DEVOPS (Category: devops) ---
        { id: 'linux', category: 'devops', label: 'Linux', level: 0.75, color: '#FCC624', desc: 'Debian/Ubuntu & Bash Scripting.', xp: '2 ans' },
        { id: 'docker', category: 'devops', label: 'Docker', level: 0.75, color: '#2496ED', desc: 'Conteneurisation.', xp: '1.5 ans' },
        { id: 'git', category: 'devops', label: 'Git', level: 0.9, color: '#F05032', desc: 'Version Control & CI/CD.', xp: '4 ans' },
        { id: 'jenkins', category: 'devops', label: 'Jenkins', level: 0.65, color: '#D24939', desc: 'Automatisation & CI/CD.', xp: '1 an' },
        { id: 'azure', category: 'devops', label: 'Azure', level: 0.7, color: '#0078D4', desc: 'Cloud Services & Pipelines.', xp: '1 an' },
        { id: 'apache', category: 'devops', label: 'Apache', level: 0.7, color: '#D22128', desc: 'Serveur Web & Config.', xp: '2 ans' },
        { id: 'jira', category: 'devops', label: 'Jira', level: 0.8, color: '#0052CC', desc: 'Gestion de projet Agile.', xp: '2 ans' },
        { id: 'confluence', category: 'devops', label: 'Conf.', level: 0.8, color: '#172B4D', desc: 'Documentation technique.', xp: '2 ans' },
        { id: 'linear', category: 'devops', label: 'Linear', level: 0.85, color: '#5E6AD2', desc: 'Issue Tracking moderne.', xp: '2 ans' },
        { id: 'notion', category: 'devops', label: 'Notion', level: 0.9, color: '#000000', desc: 'Organisation & Knowledge.', xp: '3 ans' },
        { id: 'slack', category: 'devops', label: 'Slack', level: 0.9, color: '#4A154B', desc: 'Communication d\'équipe.', xp: '4 ans' },

        // --- CORE LANGUAGES & LOGICIEL (Category: software) ---
        { id: 'java', category: 'software', label: 'Java', level: 0.9, color: '#f89820', desc: 'POO, JavaFX & Architecture.', xp: '3 ans' },
        { id: 'cpp', category: 'software', label: 'C++', level: 0.6, color: '#00599C', desc: 'Algo & Google Test.', xp: '1 an' },

        // --- DATABASES (Category: sgbd) ---
        { id: 'sql', category: 'sgbd', label: 'SQL', level: 0.85, color: '#003B57', desc: 'Requêtes complexes.', xp: '3 ans' },
        { id: 'mysql', category: 'sgbd', label: 'MySQL', level: 0.8, color: '#4479A1', desc: 'SGBD & Optimisation.', xp: '3 ans' },
        { id: 'postgresql', category: 'sgbd', label: 'Postgres', level: 0.8, color: '#336791', desc: 'SGBD Avancé.', xp: '2 ans' },
        { id: 'sqlite', category: 'sgbd', label: 'SQLite', level: 0.85, color: '#003B57', desc: 'DB Embarquée.', xp: '2 ans' }
    ],

    init() {
        const container = document.getElementById('skill-sack-container');
        if (!container) return;

        // Clean up any existing instances (primitive check)
        const domLayer = document.getElementById('dom-layer');
        domLayer.innerHTML = '';

        // Create engine
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0; // Zero gravity for space effect
        this.engine.world.gravity.x = 0;

        // Create renderer (Debug)
        const canvas = document.getElementById('physics-canvas');
        this.render = Render.create({
            element: container,
            canvas: canvas,
            engine: this.engine,
            options: {
                width: container.clientWidth,
                height: container.clientHeight,
                background: 'transparent',
                wireframes: false
            }
        });

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Add walls (Invisible boundaries to keep things in view)
        this.createWalls(width, height);

        // Add Categories (Suns)
        this.createCategories(width, height, domLayer);

        // Add Skills (Planets)
        this.createSkills(width, height, domLayer);

        // Add mouse control
        const mouse = Mouse.create(container);
        this.mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: { stiffness: 0.1, render: { visible: false } }
        });
        Composite.add(this.engine.world, this.mouseConstraint);

        // Loops
        Events.on(this.engine, 'beforeUpdate', () => this.applyOrbitalForces());
        Events.on(this.engine, 'afterUpdate', () => this.updateDomPositions());

        // Interactions
        this.setupInteractions();

        // Run
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
        // Render.run(this.render);

        // Resize
        window.addEventListener('resize', () => {
             // Simple reload logic for resize needed in prod, here we rely on CSS center
        });
    },

    createWalls(width, height) {
        const thickness = 100;
        const opts = { isStatic: true, restitution: 0.8, render: { visible: false } };
        // Create walls far out to allow some drift but keep them contained
        const buffer = 50; 
        Composite.add(this.engine.world, [
            Bodies.rectangle(width/2, -thickness/2 - buffer, width*2, thickness, opts),
            Bodies.rectangle(width/2, height + thickness/2 + buffer, width*2, thickness, opts),
            Bodies.rectangle(-thickness/2 - buffer, height/2, thickness, height*2, opts),
            Bodies.rectangle(width + thickness/2 + buffer, height/2, thickness, height*2, opts)
        ]);
    },

    createCategories(width, height, domLayer) {
        Object.keys(this.categoryConfig).forEach(key => {
            const config = this.categoryConfig[key];
            const posX = width * config.x;
            const posY = height * config.y;
            const radius = 60; // Size of the sun

            // Physics Body (Static attractor)
            // We make it static so it doesn't move, but it acts as a center
            const body = Bodies.circle(posX, posY, radius, {
                isStatic: true,
                isSensor: true, // Let bubbles pass through it? No, let's bump for now
                label: `category-${key}`,
                render: { visible: false }
            });

            this.categories[key] = body;
            Composite.add(this.engine.world, body);

            // DOM Element
            const el = document.createElement('div');
            el.className = 'category-sun';
            el.style.width = `${radius * 2}px`;
            el.style.height = `${radius * 2}px`;
            el.style.left = `${posX}px`;
            el.style.top = `${posY}px`;
            el.style.transform = `translate(-50%, -50%)`;
            el.style.backgroundImage = `radial-gradient(circle at 30% 30%, ${config.color}, #1a1a1a)`;
            el.style.boxShadow = `0 0 40px ${config.color}80`;
            el.innerHTML = `<span>${config.label}</span>`;
            
            domLayer.appendChild(el);
        });
    },

    createSkills(width, height, domLayer) {
        this.skills.forEach(skill => {
            const radius = 25 + (skill.level * 15); // Smaller planets
            const size = radius * 2;
            
            // Spawn random near center to start
            const x = width/2 + (Math.random() - 0.5) * 100;
            const y = height/2 + (Math.random() - 0.5) * 100;

            // Physics Body
            const body = Bodies.circle(x, y, radius, {
                restitution: 0.5,
                friction: 0.05,
                frictionAir: 0.02, // Drag to stop endless acceleration
                density: 0.01,
                render: { visible: false },
                label: skill.id
            });
            
            // Attach data for orbit logic
            body.categoryId = skill.category || 'web'; // Default fallback

            const el = document.createElement('div');
            el.className = 'skill-bubble';
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.innerHTML = `<img src="img/${skill.id}.svg" alt="${skill.label}" style="max-width: 60%; max-height: 60%; pointer-events: none; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">`;
            
            el.style.background = 'rgba(255, 255, 255, 0.08)';
            el.style.boxShadow = `inset 0 0 10px rgba(255,255,255,0.1), 0 0 15px ${skill.color}30`;
            el.style.border = `1px solid ${skill.color}40`;

            el.dataset.id = skill.id;
            
            // Tooltip on hover
            el.setAttribute('title', skill.label);

            domLayer.appendChild(el);
            this.elements.push({ body, el });
            Composite.add(this.engine.world, body);
        });
    },

    applyOrbitalForces() {
        // Gravity Constant
        const G = 0.0005;

        this.elements.forEach(({ body }) => {
            if (body.isStatic) return;

            const categoryId = body.categoryId;
            const sun = this.categories[categoryId];
            if (!sun) return;

            // Calculate vector to center
            const dx = sun.position.x - body.position.x;
            const dy = sun.position.y - body.position.y;
            const distanceSq = (dx*dx) + (dy*dy);
            const distance = Math.sqrt(distanceSq);

            // Minimum distance to prevent clamping/singularity
            if (distance < 50) return; 

            // Force magnitude (Inverse Square Law) + Pull
            // Normalizing force to keep them in orbit rather than crashing per se
            const forceMagnitude = (G * body.mass * 8000) / distanceSq;
            
            Body.applyForce(body, body.position, {
                x: (dx / distance) * forceMagnitude,
                y: (dy / distance) * forceMagnitude
            });
        });
    },

    updateDomPositions() {
        this.elements.forEach(({ body, el }) => {
            const { x, y } = body.position;
            const angle = body.angle;
            el.style.transform = `translate(${x - el.offsetWidth/2}px, ${y - el.offsetHeight/2}px) rotate(${angle}rad)`;
        });
    },

    setupInteractions() {
        let isDragging = false;
        let startPos = { x: 0, y: 0 };

        Matter.Events.on(this.mouseConstraint, 'startdrag', () => {
            isDragging = true;
            startPos = { ...this.mouseConstraint.mouse.position };
            document.body.style.cursor = 'grabbing';
        });

        Matter.Events.on(this.mouseConstraint, 'enddrag', () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        });

        Matter.Events.on(this.mouseConstraint, 'mouseup', (event) => {
            const mouse = this.mouseConstraint.mouse;
            const endPos = mouse.position;
            const dist = Matter.Vector.magnitude(Matter.Vector.sub(startPos, endPos));
            if (dist < 5 && this.mouseConstraint.body) {
                const body = this.mouseConstraint.body;
                this.openSkillModal(body.label);
            }
        });
    },

    openSkillModal(id) {
        const skill = this.skills.find(s => s.id === id);
        if (!skill) return;

        const modal = document.querySelector('.project-detail-modal');
        const title = modal.querySelector('.modal-title');
        const desc = modal.querySelector('.modal-context');
        const roleSection = modal.querySelector('.modal-role').parentElement; 
        const gallery = modal.querySelector('.modal-gallery');
        const tech = modal.querySelector('.modal-tech-stack');
        
        modal.querySelector('.modal-category').textContent = "Compétence";
        modal.querySelector('.modal-year').textContent = `${Math.floor(skill.level * 100)}% Maîtrise`;
        title.textContent = skill.label;
        title.style.color = skill.color;
        
        desc.innerHTML = `
            <div class="skill-detail-content">
                <p class="skill-description-large">${skill.desc}</p>
                <div class="skill-stats">
                    <div class="skill-xp-row">
                        <span class="skill-xp-label">Expérience</span>
                        <span class="skill-xp-value">${skill.xp}</span>
                    </div>
                </div>
            </div>
        `;

        tech.innerHTML = '';
        const span = document.createElement('span');
        span.className = 'skill-level-badge';
        span.textContent = skill.label;
        // Background color of badge to match skill
        span.style.background = `linear-gradient(135deg, ${skill.color}, #000)`;
        tech.appendChild(span);

        roleSection.style.display = 'none';
        gallery.innerHTML = '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Expose to window for potential debugging
        window.SkillSolarSystem = SkillSolarSystem;
        SkillSolarSystem.init();
    }, 500); 
});
