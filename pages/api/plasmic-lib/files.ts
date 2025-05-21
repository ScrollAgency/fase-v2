import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import path from "node:path";

const libraryPath = path.join(process.cwd(), "pages/api/plasmic-lib/system/Library/");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action, fichier } = req.query;

  console.log('Requête reçue:', req.method, req.query);
  
  if (!fichier || typeof fichier !== "string") {
    return res.status(400).json({ error: "Le fichier est requis" });
  }

  const filePath = path.join(libraryPath, fichier);
  console.log("Chemin du fichier:", filePath);

  try {
    if (action === "read") {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Fichier introuvable" });
      }
      const data = fs.readFileSync(filePath, "utf8");
      console.log("Contenu du fichier:", data);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ contenu: data });
    }

    if (action === "write") {
      if (req.method === 'POST') {
        // Log pour vérifier le contenu de la requête
        console.log("Corps de la requête:", req.body);

        const { contenu } = req.body;

        if (!contenu || typeof contenu !== "object") {
          return res.status(400).json({ error: "Le contenu est requis et doit être un objet" });
        }

        console.log("Écriture dans le fichier version.json avec le contenu suivant : ", contenu);

        // Vérification que le fichier existe avant d'écrire
        if (!fs.existsSync(filePath)) {
          return res.status(400).json({ error: "Le fichier version.json est introuvable" });
        }

        // Écriture dans le fichier version.json
        try {
          fs.writeFileSync(filePath, JSON.stringify(contenu, null, 2), "utf8");
          console.log("Fichier écrit avec succès.");
          return res.status(200).json({ success: true });
        } catch (writeError) {
          console.error("Erreur d'écriture dans le fichier:", writeError);
          return res.status(500).json({ error: "Erreur d'écriture dans le fichier", details: writeError });
        }
      } else {
        return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
      }
    }

    return res.status(400).json({ error: "Action non valide" });
  } catch (error) {
    console.error("Erreur lors de la gestion de la requête :", error);
    return res.status(500).json({ error: "Erreur serveur", details: error });
  }
}
