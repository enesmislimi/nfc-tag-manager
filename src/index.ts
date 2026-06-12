import express from 'express';
import tagRoutes from './routes/tagRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour comprendre le format JSON si on en envoie
app.use(express.json());

// On branche nos routes : toutes les requêtes qui commencent par "/tags" 
// seront gérées par notre fichier tagRoutes !
app.use('/tags', tagRoutes);

// On lance le serveur
app.listen(PORT, () => {
  console.info(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});