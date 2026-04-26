# Déploiement

## Ce qu'il faut savoir

Le projet fonctionne actuellement avec `Prisma + SQLite` :

- bien pour le développement local
- pas idéal pour une application publique sur Vercel

Si vous voulez seulement montrer l'interface à quelqu'un, vous avez 2 options :

1. Déploiement propre

- mettre le projet sur GitHub
- connecter le repo à Vercel
- utiliser ensuite une base distante si vous voulez garder l'inscription/connexion

2. Partage temporaire

- lancer le projet en local
- exposer temporairement le port avec un tunnel comme `ngrok` ou `cloudflared`

## Préparation GitHub

Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Initial project"
```

Ensuite :

- créez un repo GitHub
- poussez le projet dessus

Exemple :

```bash
git remote add origin https://github.com/VOTRE_COMPTE/VOTRE_REPO.git
git branch -M main
git push -u origin main
```

## Déploiement Vercel

1. Connectez-vous sur Vercel
2. Importez le repo GitHub
3. Ajoutez les variables d'environnement :

```env
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_URL=https://votre-projet.vercel.app
NEXTAUTH_SECRET=un-secret-fort
JWT_SECRET=un-secret-fort
```

## Limite importante

`SQLite` peut convenir pour une démonstration simple, mais pas pour une application publique fiable avec écriture.

Pour une version propre en ligne, il faudra migrer vers une base distante, par exemple :

- Neon Postgres
- Supabase Postgres
- Railway Postgres

## Remarque

Dans cet environnement, le `build` n'a pas pu être validé automatiquement à cause d'un `EPERM` local sur `C:\Users\Utilisateur`.
Le projet démarre bien en développement avec `npm run dev`.
