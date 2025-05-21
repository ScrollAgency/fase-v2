import fs from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
import AdmZip from "adm-zip";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { dossier } = req.query;
    if (!dossier || typeof dossier !== "string") {
      return res.status(400).json({ error: "Dossier non spécifié." });
    }

    const zipUrl = `${process.env.API_URL}/archive?dossier=${dossier}`;
    const zipPath = path.join(process.cwd(), `${dossier}.zip`);
    const extractPath = path.join(process.cwd(), dossier);

    console.log(`📥 Téléchargement de ${zipUrl}...`);

    // Téléchargement du fichier ZIP
    const response = await fetch(zipUrl);
    if (!response.ok) {
      throw new Error(`Échec du téléchargement (${response.status}): ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(zipPath, buffer);
    console.log(`✅ ZIP enregistré : ${zipPath}`);

    // Extraction avec adm-zip
    console.log(`📂 Extraction de ${zipPath} dans ${extractPath}...`);
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);
    console.log("✅ Extraction terminée");

    // Suppression du fichier ZIP après extraction
    fs.unlinkSync(zipPath);
    console.log(`🗑️ ZIP supprimé : ${zipPath}`);

    res.status(200).json({ message: "Mise à jour réussie", extractedTo: extractPath });
  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
}
