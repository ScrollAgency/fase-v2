import type { NextApiRequest, NextApiResponse } from 'next';
import { execSync, exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Lancement de la post-installation...');

      // Vérifier si globals.css existe avant de le supprimer
      const globalStylesPath = path.resolve(process.cwd(), 'styles/globals.css');
      if (fs.existsSync(globalStylesPath)) {
        execSync(`rm ${globalStylesPath}`);
      }

      // Vérifier si le dossier styles existe avant de copier
      const stylesDir = path.resolve(process.cwd(), 'styles');
      if (!fs.existsSync(stylesDir)) {
        fs.mkdirSync(stylesDir, { recursive: true });
      }

      // Copier le nouveau fichier
      execSync(`cp ${path.resolve(process.cwd(), 'architecture/styles/globals.css')} ${stylesDir}/`);

      // Installer TailwindCSS et initialiser la config
      execSync('npm install tailwindcss@3.4.17 postcss autoprefixer && npx tailwindcss init -p', { stdio: 'inherit' });

      console.log('Installation des dépendances terminée.');

      console.log('Post-installation terminée !');

      res.status(200).json({ message: 'Installation terminée avec succès !' });

    } catch (error: any) {
      console.error("Erreur lors de l'installation:", error);
      res.status(500).json({ message: "Erreur lors de l'installation", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
