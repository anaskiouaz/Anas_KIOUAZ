class ProjectsSystem {
    constructor() {
        this.projectData = {
            ml: {
                title: 'Classification de Dépêches',
                category: 'Machine Learning',
                year: '2025',
                images: ['img/ML1.png', 'img/ML1.png', 'img/ML1.png'],
                tech: ['Java', 'NLP', 'TF-IDF', 'KNN', 'Machine Learning'],
                context: 'Développement d\'un système de classification automatique d\'articles de presse utilisant des techniques de traitement du langage naturel. Le projet implémente une approche hybride combinant l\'analyse lexicale et l\'algorithme des k plus proches voisins pour obtenir une précision optimale.',
                role: 'Conception complète de l\'architecture du système, implémentation de l\'algorithme TF-IDF pour la vectorisation des textes, optimisation des hyperparamètres KNN, et développement de l\'interface de test. Réalisation d\'une analyse comparative de performances avec différents modèles.',
                github: 'https://github.com/Jolly-Ak/News-Classification-ML'
            },
            cnn: {
                title: 'Classification par CNN',
                category: 'Deep Learning',
                year: '2024',
                images: ['img/1745556736982.jpg', 'img/1745556736982.jpg'],
                tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Data Augmentation', 'NumPy'],
                context: 'Implémentation d\'un réseau de neurones convolutifs profond pour la classification d\'images. Le projet inclut un pipeline complet de prétraitement des données, data augmentation, entraînement du modèle avec early stopping, et évaluation des performances sur un ensemble de validation.',
                role: 'Design de l\'architecture du réseau neuronal avec multiples couches convolutives et pooling, mise en place de techniques de régularisation (dropout, batch normalization), optimisation des hyperparamètres, et création d\'un système de visualisation des prédictions et des performances du modèle.',
                github: 'https://github.com/Jolly-Ak/Valorant-Kill-Detection'
            },
            javafx: {
                title: 'ERP Grand Prix',
                category: 'Application Desktop',
                year: '2025',
                images: ['img/JavaFX.png', 'img/JavaFX.png'],
                tech: ['Java', 'JavaFX', 'MySQL', 'MVC', 'JDBC', 'Scene Builder'],
                context: 'Application de gestion complète pour événements sportifs développée dans le cadre d\'un projet universitaire. L\'application permet la gestion des participants, des résultats, de la logistique et génère automatiquement les rapports et statistiques de l\'événement.',
                role: 'Architecture complète en pattern MVC, développement de l\'interface utilisateur moderne avec JavaFX et CSS, conception et implémentation de la base de données MySQL avec relations complexes, création du système CRUD complet, et mise en place de tests unitaires pour les composants critiques.',
                github: 'https://gricad-gitlab.univ-grenoble-alpes.fr/iut2-info-stud/2025-s2/r2.01.03/d2/kiouazan'
            },
            web: {
                title: 'Site Hardis Group',
                category: 'Développement Web',
                year: '2024',
                images: ['img/Hardis.png', 'img/Hardis.png'],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Responsive Design', 'Git'],
                context: 'Création d\'un site web institutionnel éducatif présentant l\'entreprise Hardis Group et sa démarche de transition écologique. Le site est conçu pour être accessible à un jeune public tout en maintenant un niveau professionnel d\'information et de design.',
                role: 'Développement frontend complet avec HTML5/CSS3, implémentation de l\'interactivité JavaScript, création d\'un design responsive mobile-first, intégration de formulaires de contact avec validation PHP, optimisation des performances et SEO, et déploiement sur serveur web.',
                github: 'https://github.com/Jolly-Ak/Hardis-Group'
            },
            game: {
                title: 'Sort Game',
                category: 'Game Development',
                year: '2023',
                images: ['img/sortgame.png', 'img/sortgame.png'],
                tech: ['Python', 'Tkinter', 'POO', 'Algorithmes', 'Event-Driven'],
                context: 'Jeu de réflexion et de stratégie développé en Python utilisant la bibliothèque Tkinter pour l\'interface graphique. Le jeu propose des défis de tri et de résolution de puzzles avec différents niveaux de difficulté et un système de scores.',
                role: 'Conception de la logique du jeu en programmation orientée objet, développement de l\'interface graphique interactive avec Tkinter, implémentation du système de gestion des niveaux et des scores, création d\'algorithmes de génération de puzzles, et mise en place d\'un système de sauvegarde des progressions.',
                github: 'https://github.com/Jolly-Ak/SortGame'
            },
            weave: {
                title: 'Weave - Plateforme de Soins',
                category: 'Full Stack Web & Mobile',
                year: '2025',
                // Assure-toi que ces images sont bien dans ton dossier img/
                images: ['img/weave_dashboard.png', 'img/weave_arch.png', 'img/weave_cicd.png'],
                tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Azure', 'Socket.IO', 'CI/CD'],
                context: 'Face au vieillissement de la population, Weave centralise la coordination du maintien à domicile. C\'est une plateforme collaborative (Web & Mobile) qui connecte aidants, familles et bénévoles autour d\'un agenda partagé, d\'un système d\'incidents temps réel et d\'une messagerie sécurisée, remplaçant les échanges fragmentés par une solution structurée.',
                role: 'Founder & Lead Developer. Conception de l\'architecture micro-services et de la base de données PostgreSQL. Mise en place du pipeline CI/CD (GitHub Actions -> Azure). Développement du backend (Express/Socket.IO) et de la logique de synchronisation temps réel. Coordination de l\'équipe mobile (React Native/Capacitor).',
                github: 'https://github.com/anaskiouaz/WEAVE'
        },
            
        };
        
        this.modal = null;
        this.fullscreenViewer = null;
        this.currentProject = null;
        this.scrollPosition = 0;
        this.init();
    }

    init() {
        this.setupModal();
        this.setupFullscreenViewer();
        this.setupProjectCards();
        this.setupKeyboardNavigation();
    }

    setupModal() {
        this.modal = document.querySelector('.project-detail-modal');
        const closeBtn = this.modal.querySelector('.modal-close-btn');
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeModal();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    setupFullscreenViewer() {
        this.fullscreenViewer = document.querySelector('.fullscreen-viewer');
        const closeBtn = this.fullscreenViewer.querySelector('.fullscreen-close-btn');
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeFullscreen();
        });
        
        this.fullscreenViewer.addEventListener('click', (e) => {
            if (e.target === this.fullscreenViewer || e.target.classList.contains('fullscreen-image')) {
                this.closeFullscreen();
            }
        });
    }

    setupProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                this.openModal(projectId);
            });
        });
    }

    openModal(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;
        
        this.currentProject = projectId;
        this.scrollPosition = window.pageYOffset;
        
        document.body.style.overflow = 'hidden';
        
        this.populateModal(project);
        
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
        });
    }

    populateModal(project) {
        const category = this.modal.querySelector('.modal-category');
        const year = this.modal.querySelector('.modal-year');
        const title = this.modal.querySelector('.modal-title');
        const techStack = this.modal.querySelector('.modal-tech-stack');
        const context = this.modal.querySelector('.modal-context');
        const role = this.modal.querySelector('.modal-role');
        const githubLink = this.modal.querySelector('.modal-btn-github');
        const gallery = this.modal.querySelector('.modal-gallery');
        
        category.textContent = project.category;
        year.textContent = project.year;
        title.textContent = project.title;
        context.textContent = project.context;
        role.textContent = project.role;
        githubLink.href = project.github;
        
        techStack.innerHTML = project.tech
            .map(tech => `<span>${tech}</span>`)
            .join('');
        
        gallery.innerHTML = project.images
            .map(image => `<img src="${image}" alt="${project.title}" class="gallery-image">`)
            .join('');
        
        const galleryImages = gallery.querySelectorAll('.gallery-image');
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFullscreen(img.src, project.title);
            });
        });
    }

    closeModal() {
        this.modal.classList.remove('active');
        
        setTimeout(() => {
            document.body.style.overflow = '';
            // Only scroll back if we opened a project (and thus saved a position)
            if (this.currentProject) {
                window.scrollTo(0, this.scrollPosition);
                this.currentProject = null; // Reset
            }
        }, 500);
    }

    openFullscreen(imageSrc, alt) {
        const fullscreenImage = this.fullscreenViewer.querySelector('.fullscreen-image');
        fullscreenImage.src = imageSrc;
        fullscreenImage.alt = alt;
        
        requestAnimationFrame(() => {
            this.fullscreenViewer.classList.add('active');
        });
    }

    closeFullscreen() {
        this.fullscreenViewer.classList.remove('active');
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.fullscreenViewer.classList.contains('active')) {
                    this.closeFullscreen();
                } else if (this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectsSystem();
});