// pages/api/save-data.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import path from "node:path";

// Cette API enregistre les données dans le fichier data.json dans le dossier public
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérifier si c'est une requête POST
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'pages/api/plasmic-lib/system/Library', 'data.json');

    try {
      // Sauvegarder les données envoyées dans le fichier data.json
      const data = req.body;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return res.status(200).json({ message: 'Fichier data.json sauvegardé avec succès.' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: 'Erreur lors de la sauvegarde du fichier.', error: error.message });
      }
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
