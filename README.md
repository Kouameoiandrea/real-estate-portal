# Portail Immobilier

Application web pour la gestion d'un portail immobilier avec les fonctionnalités suivantes :

- Gestion du référentiel (annonces de biens)
- Gestion des utilisateurs
- Gestion des contrats de base
- Suivi financier

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

3. Ouvrez [http://127.0.0.1:3001](http://127.0.0.1:3001) dans votre navigateur.

Le projet est configuré pour le développement sur le port `3001`.

Si le port `3001` est déjà utilisé, fermez l'ancien processus Node concerné puis relancez `npm run dev`.

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et adaptez les valeurs si besoin.

Configuration locale par défaut :

- `DATABASE_URL="file:./prisma/dev.db"`
- `NEXTAUTH_URL="http://127.0.0.1:3001"`
- `JWT_SECRET="..."`

## Déploiement

Le projet peut être envoyé sur GitHub puis déployé sur Vercel, mais il y a une contrainte importante :

- la base actuelle utilise `SQLite`
- pour une vraie mise en ligne avec inscription/connexion, il vaut mieux une base distante

SQLite convient en local, mais ce n'est pas une solution robuste pour une application publique déployée.

Voir le guide [DEPLOYMENT.md](./DEPLOYMENT.md).

## Technologies utilisées

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint
