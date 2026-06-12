# 1. On part d'une base légère avec Node.js 20
FROM node:20-alpine

# 2. On crée le dossier de l'application
WORKDIR /app

# 3. On copie les fichiers de configuration (package.json)
COPY package*.json ./

# 4. On installe UNIQUEMENT les dépendances de production (plus léger)
RUN npm ci --only=production

# 5. On copie tout le reste de ton code compilé
COPY . .

# 6. On expose le port de ton application
EXPOSE 3000

# 7. La commande pour démarrer l'application
CMD ["npm", "run", "dev"]