# Guide d'Intégration du Système Solaire 3D

## 📋 Fichiers fournis

1. **solar-system-skills.js** - Le système solaire interactif complet
2. **solar-system-demo.html** - Page de démonstration standalone
3. Ce guide d'intégration

## 🎯 Étapes d'intégration dans ton portfolio

### Étape 1: Ajouter Three.js
Dans ton `index.html`, ajoute Three.js AVANT tes autres scripts :

```html
<!-- Avant la balise </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="solar-system-skills.js"></script>
<script src="script.js"></script>
<script src="projects.js"></script>
```

### Étape 2: Modifier la section Skills dans index.html

Remplace la section actuelle (lignes 356-507 environ) par :

```html
<section id="skills" class="section-skills">
    <div class="container-fluid">
        <div class="section-header" data-scroll-reveal>
            <span class="section-number">03</span>
            <h2 class="section-title-large">Expertise Technique</h2>
            <p class="section-subtitle">Explorez mon univers de compétences en 3D</p>
        </div>

        <!-- NOUVEAU SYSTÈME SOLAIRE -->
        <div id="skill-solar-container">
            <div class="loading-overlay" id="loadingOverlay">
                <div class="loading-spinner"></div>
                <div class="loading-text">Chargement du système solaire...</div>
            </div>
            
            <div class="solar-instructions">
                <span>Glissez pour tourner • Molette pour zoomer • Cliquez pour explorer</span>
            </div>
        </div>

        <!-- Légende des catégories -->
        <div class="solar-legend" data-scroll-reveal>
            <h3>Univers de Compétences</h3>
            <div class="legend-grid">
                <div class="legend-item">
                    <div class="legend-color" style="background: #4285F4; color: #4285F4;"></div>
                    <div class="legend-info">
                        <h4>DevOps</h4>
                        <p>Infrastructure & Automatisation</p>
                        <div class="legend-tools">
                            <span>Docker</span>
                            <span>K8s</span>
                            <span>CI/CD</span>
                            <span>Azure</span>
                        </div>
                    </div>
                </div>

                <div class="legend-item">
                    <div class="legend-color" style="background: #E34F26; color: #E34F26;"></div>
                    <div class="legend-info">
                        <h4>Web Dev</h4>
                        <p>Frontend & Backend Moderne</p>
                        <div class="legend-tools">
                            <span>React</span>
                            <span>Node.js</span>
                            <span>TypeScript</span>
                            <span>HTML/CSS</span>
                        </div>
                    </div>
                </div>

                <div class="legend-item">
                    <div class="legend-color" style="background: #FF6B35; color: #FF6B35;"></div>
                    <div class="legend-info">
                        <h4>AI & ML</h4>
                        <p>Intelligence Artificielle</p>
                        <div class="legend-tools">
                            <span>TensorFlow</span>
                            <span>PyTorch</span>
                            <span>Keras</span>
                            <span>OpenCV</span>
                        </div>
                    </div>
                </div>

                <div class="legend-item">
                    <div class="legend-color" style="background: #336791; color: #336791;"></div>
                    <div class="legend-info">
                        <h4>Databases</h4>
                        <p>Gestion de Données</p>
                        <div class="legend-tools">
                            <span>PostgreSQL</span>
                            <span>MySQL</span>
                            <span>MongoDB</span>
                            <span>Redis</span>
                        </div>
                    </div>
                </div>

                <div class="legend-item">
                    <div class="legend-color" style="background: #339933; color: #339933;"></div>
                    <div class="legend-info">
                        <h4>Backend</h4>
                        <p>Serveurs & API</p>
                        <div class="legend-tools">
                            <span>Java</span>
                            <span>Python</span>
                            <span>Express.js</span>
                            <span>REST</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tu peux garder ou supprimer les anciennes skill-cards -->
    </div>
</section>
```

### Étape 3: Ajouter les styles CSS

Dans ton `style.css`, ajoute à la fin (ou remplace la section .section-skills) :

```css
/* ===================================
   SOLAR SYSTEM SKILLS SECTION
   =================================== */

.section-skills {
    position: relative;
    padding: 120px 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 26, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%);
    overflow: hidden;
}

/* Conteneur du Système Solaire */
#skill-solar-container {
    position: relative;
    width: 100%;
    height: 700px;
    margin: 40px 0;
    border-radius: 20px;
    overflow: hidden;
    background: radial-gradient(ellipse at center, rgba(74, 159, 255, 0.1) 0%, transparent 70%);
    box-shadow: 
        inset 0 0 100px rgba(74, 159, 255, 0.1),
        0 20px 60px rgba(0, 0, 0, 0.3);
}

#skill-solar-container canvas {
    display: block;
    width: 100%;
    height: 100%;
}

/* Instructions */
.solar-instructions {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 12px 24px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 12px;
}

.solar-instructions::before {
    content: '🌌';
    font-size: 18px;
}

/* Légende des catégories */
.solar-legend {
    margin-top: 60px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.solar-legend h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    color: #4A9FFF;
}

.legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
}

.legend-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(74, 159, 255, 0.3);
    transform: translateY(-2px);
}

.legend-color {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 20px currentColor;
}

.legend-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
}

.legend-info p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
}

.legend-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
}

.legend-tools span {
    font-size: 11px;
    padding: 3px 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.7);
}

/* Loading Overlay */
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: opacity 0.5s ease;
}

.loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(74, 159, 255, 0.2);
    border-top-color: #4A9FFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
    #skill-solar-container {
        height: 500px;
    }

    .solar-legend {
        padding: 20px;
    }

    .legend-grid {
        grid-template-columns: 1fr;
    }

    .solar-instructions {
        font-size: 12px;
        padding: 10px 16px;
    }
}
```

### Étape 4: Ajouter le script de chargement

Dans ton `script.js`, ajoute à la fin :

```javascript
// Gestion du chargement du système solaire
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }, 1000);
});
```

### Étape 5: Supprimer l'ancien système (optionnel)

Si tu veux complètement remplacer l'ancien système de physics-sack :

1. Supprime ou commente l'inclusion de `physics-sack.js`
2. Supprime la section `#skill-sack-container` si elle existe
3. Garde uniquement le nouveau `#skill-solar-container`

## 🎨 Personnalisation

### Modifier les planètes (catégories)

Dans `solar-system-skills.js`, édite l'objet `planetData` :

```javascript
this.planetData = {
    devops: {
        name: 'DevOps',           // Nom affiché
        color: 0x4285F4,          // Couleur de la planète (hex)
        glowColor: 0x6BA3FF,      // Couleur du glow
        size: 1.8,                // Taille de la planète
        orbitRadius: 8,           // Distance du soleil
        orbitSpeed: 0.0003,       // Vitesse d'orbite
        satellites: [...]          // Outils associés
    },
    // Ajoute tes propres catégories !
}
```

### Modifier les satellites (outils)

Dans chaque catégorie, édite le tableau `satellites` :

```javascript
satellites: [
    { name: 'Docker', color: 0x2496ED, icon: '🐳' },
    { name: 'Kubernetes', color: 0x326CE5, icon: '☸️' },
    // Ajoute tes outils !
]
```

## 🎯 Fonctionnalités

✅ **Interaction souris** : Glisser pour tourner la scène
✅ **Zoom** : Molette de la souris
✅ **Hover** : Info-panel s'affiche au survol
✅ **Click** : Focus sur une planète
✅ **Rotation automatique** : La caméra tourne doucement autour du système
✅ **Particules** : Étoiles et particules ambiantes
✅ **Shaders personnalisés** : Soleil animé et glows

## 📱 Responsive

Le système s'adapte automatiquement :
- Desktop : 700px de hauteur
- Mobile : 500px de hauteur
- Contrôles tactiles supportés

## 🚀 Performance

- Utilise WebGL via Three.js
- Optimisé pour 60 FPS
- Particules limitées pour mobile
- Rendu adaptatif selon le device

## 🐛 Troubleshooting

**Le canvas est noir ?**
- Vérifie que Three.js est bien chargé
- Ouvre la console pour voir les erreurs

**Les planètes ne tournent pas ?**
- Vérifie que `animate()` est bien appelé
- Contrôle les `orbitSpeed` dans `planetData`

**Contrôles ne répondent pas ?**
- Vérifie que les event listeners sont bien attachés
- Regarde si le canvas a bien la bonne taille

## 📝 Notes

- Compatible tous navigateurs modernes
- Nécessite WebGL (99% des navigateurs)
- Performance testée jusqu'à 30 satellites
- Extensible facilement avec de nouvelles catégories

Profite de ton nouveau système solaire ! 🌟🚀
