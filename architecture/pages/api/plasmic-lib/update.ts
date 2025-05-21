import type { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'node:child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Lancement de la mise à jour...');

      console.log('Exécution de la commande d\'installation');
      const installOutput = execSync('curl -s https://plasmic-api.agence-scroll.com/api/update?key=scrollagency | npx ts-node');
      console.log('Installation terminée avec sortie:', installOutput.toString());

      // Retourner une réponse de succès
      res.status(200).json({ message: 'Installation terminée avec succès !' });
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
      if (error instanceof Error) {
        res.status(500).json({ message: 'Erreur lors de l\'installation', error: error.message });
      }
    }
  } else {
    // Si ce n'est pas une requête POST
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
