# 🏷️ NFC Tag Manager API

Plateforme de gestion centralisée et à distance pour tags NFC. Permet la redirection dynamique d'URL avec une haute performance (< 200ms).

## 🚀 Stack Technique
- **Backend :** Node.js / Express / TypeScript
- **Base de données :** PostgreSQL (via Prisma/TypeORM - *à venir*)
- **Qualité :** Jest, ESLint, Prettier, SonarCloud
- **Infrastructure :** Docker, GitHub Actions, Terraform

## 📚 Documentation Détaillée
*(Les liens seront ajoutés au fur et à mesure du projet)*
- [Architecture & Design Patterns](./docs/DESIGN_PATTERNS.md)
- [Choix Techniques & Justifications](./docs/TECHNICAL_CHOICES.md)
- [Schéma de l'Infrastructure](./docs/INFRASTRUCTURE.md)

## 🛠️ Comment lancer en local
*Instructions à venir (Docker Compose)*

## 🚀 Stratégie de Déploiement Continu (CD) & Infrastructure

### 🏢 Architecture de Production Cible
Pour passer de la simulation GitHub Actions à un déploiement réel, l'infrastructure choisie repose sur une approche auto-hébergée performante et économique :

* **Fournisseur Cloud :** OVHcloud (Gamme VPS Linux).
* **Configuration du Serveur :** Linux Ubuntu Server, équipé de **8 Go de RAM** et de 4 vCPUs. Cette quantité de mémoire est idéale pour faire tourner confortablement le moteur Docker, notre application Node.js, et l'instance PostgreSQL de production sans risque de saturation lors des pics de connexions.
* **Estimation des Coûts :** Environ **12 € à 15 € HT / mois** (Excellent rapport performance/prix pour une jeune entreprise ou un projet de type SaaS).

### ⚙️ Procédure de Déploiement Réel (Hors simulation)
1. Le pipeline CD compile et pousse l'image Docker sur le registre sécurisé `ghcr.io`.
2. Via une connexion sécurisée par clés SSH non asymétriques (stockée dans les *GitHub Secrets*), le robot GitHub Actions se connecte au VPS OVH.
3. Un script automatise les commandes suivantes sur le serveur :
   ```bash
   docker pull ghcr.io/votre-compte/nfc-tag-manager:latest
   docker compose down
   docker compose up -d --remove-orphans