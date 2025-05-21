import type { NextApiRequest, NextApiResponse } from "next";
import AdmZip from "adm-zip";
import fs from "node:fs";
import path from "node:path";

// Désactiver le body-parser de Next.js
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { components } = req.body;
  if (!components || !Array.isArray(components)) {
    return res.status(400).json({ error: "Aucune liste de composants fournie" });
  }

  try {
    const zip = new AdmZip();

    // Charger le fichier componentsList.json
    const componentsListPath = path.join(process.cwd(), "public", "componentsList.json");
    const componentsList = JSON.parse(fs.readFileSync(componentsListPath, "utf-8"));

    // Ajouter chaque fichier récupéré au ZIP
    for (const component of components) {
      const componentData = componentsList[component];

      if (componentData) {
        // Récupérer la catégorie et construire le chemin du fichier
        const category = componentData.category;
        const componentPath = path.join(process.cwd(), "plasmic-library", category, component);
        
        // Ajouter le fichier .tsx du composant
        const componentFilePath = `${componentPath}.tsx`;
        if (fs.existsSync(componentFilePath)) {
          zip.addLocalFile(componentFilePath);
        } else {
          console.warn(`Fichier introuvable : ${componentFilePath}`);
        }

        // Ajouter le fichier .json du composant
        const componentJsonFilePath = `${componentPath}.json`;
        if (fs.existsSync(componentJsonFilePath)) {
          zip.addLocalFile(componentJsonFilePath);
        } else {
          console.warn(`Fichier JSON introuvable : ${componentJsonFilePath}`);
        }
      } else {
        console.warn(`Composant non trouvé dans le fichier componentsList.json : ${component}`);
      }
    }

    // Sauvegarde temporaire du fichier ZIP
    const zipPath = path.join(process.cwd(), "public", "components.zip");
    zip.writeZip(zipPath);

    // Lire le fichier ZIP pour l'envoyer au serveur VPS
    const zipBuffer = fs.readFileSync(zipPath);
    const formData = new FormData();
    formData.append("file", new Blob([zipBuffer]), "components.zip");

    // Envoyer le ZIP au VPS
    const response = await fetch("https://plasmic-api.agence-scroll.com/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Erreur lors de l'envoi au VPS");

    return res.status(200).json({ message: "Fichier ZIP envoyé avec succès" });
  } catch (error: any) {
    return res.status(500).json({ error: `Erreur : ${error.message}` });
  }
}
