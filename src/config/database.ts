import { Pool } from 'pg';

// On crée notre équipe de connexions
export const pool = new Pool({
  user: 'postgres',           // Ton nom d'utilisateur PostgreSQL (souvent 'postgres' par défaut)
  host: 'localhost',          // La base tourne sur ta propre machine
  database: 'nfc_tags',       // Le nom de la base de données qu'on va utiliser
  password: 'enes', 
  port: 5432,                 // Le port par défaut de PostgreSQL
});

// Petit test de connexion pour être sûr que tout va bien au démarrage
pool.on('connect', () => {
  console.info('🐘 Connecté à la base de données PostgreSQL !');
});

// On demande à Node.js de créer la table automatiquement au démarrage !
pool.query(`
  CREATE TABLE IF NOT EXISTS tags (
    id VARCHAR(50) PRIMARY KEY,
    "ownerId" VARCHAR(100) NOT NULL,
    "targetUrl" TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    clicks INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
  );
`)
.then(() => console.info('✅ Table "tags" vérifiée et prête à l\'emploi !'))
.catch(err => console.error('❌ Erreur lors de la création de la table :', err));