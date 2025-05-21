import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const plasmicLibraryDir = path.resolve('plasmic-library');

// Fonction pour comparer les versions
const compareVersions = (v1: string, v2: string): number => {
    const splitV1 = v1.split('.').map(num => Number.parseInt(num, 10) || 0);
    const splitV2 = v2.split('.').map(num => Number.parseInt(num, 10) || 0);

    for (let i = 0; i < Math.max(splitV1.length, splitV2.length); i++) {
        const num1 = splitV1[i] || 0;
        const num2 = splitV2[i] || 0;

        if (num1 > num2) return 1;  // v1 > v2
        if (num1 < num2) return -1; // v1 < v2
    }

    return 0; // v1 == v2
};

// Interface pour décrire les données distantes
interface RemoteComponent {
  name: string;
  category: string;
  version: string;
}

interface RemoteData {
  components: RemoteComponent[];
}

// Fonction pour lister les composants
const listComponents = async () => {
    const componentsList: Record<string, { 
        localVersion: string; 
        remoteVersion: string; 
        status: string; 
        category: string; 
    }> = {};
    const newComponents: string[] = [];
    const updatedComponents: string[] = [];
  
    const categories = fs.readdirSync(plasmicLibraryDir, { withFileTypes: true }).filter(dir => dir.isDirectory());
  
    let remoteData: RemoteData = { components: [] };  // Initialisation du type
    try {
      const response = await fetch('https://plasmic-api.agence-scroll.com/data.json');
      if (!response.ok) throw new Error('Impossible de récupérer data.json');
      remoteData = await response.json();  // Ici, remoteData est bien typé
    } catch (error) {
      console.error('Erreur lors de la récupération de data.json:', error);
    }
  
    for (const category of categories) {
      const componentDirs = fs.readdirSync(path.join(plasmicLibraryDir, category.name), { withFileTypes: true }).filter(dir => dir.isDirectory());
  
      for (const componentDir of componentDirs) {
        const versionFilePath = path.join(plasmicLibraryDir, category.name, componentDir.name, 'version');
        let localVersion = 'N/A';
  
        if (fs.existsSync(versionFilePath)) {
          localVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();
        }
  
        let remoteVersion = 'N/A';
        let status = 'new';  // Par défaut, on assume que c'est un nouveau composant
  
        if (Array.isArray(remoteData.components)) {
          const remoteComponent = remoteData.components.find(comp => comp.name === componentDir.name && comp.category === category.name);
  
          if (remoteComponent) {
            remoteVersion = remoteComponent.version || 'N/A';
  
            // Si remoteVersion est "N/A", c'est un nouveau composant
            if (remoteVersion === 'N/A') {
              status = 'new';
              newComponents.push(componentDir.name);
            } else if (remoteVersion === 'unknown') {
                status = 'new';
                newComponents.push(componentDir.name);
              } else {
              const comparison = compareVersions(localVersion, remoteVersion);
  
              if (comparison === 0) {
                  status = 'uptodate';
              } else if (comparison > 0) {
                  status = 'modify';
                  updatedComponents.push(componentDir.name);
              } else {
                  status = 'new';
                  newComponents.push(componentDir.name);
              }
            }
          }
        }
  
        componentsList[componentDir.name] = {
          localVersion,
          remoteVersion,
          status,
          category: category.name, // Ajouter la catégorie ici
        };
      }
    }
  
    return { componentsList, newComponents, updatedComponents };
};

// Route API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { componentsList, newComponents, updatedComponents } = await listComponents();

    const componentsListPath = path.resolve('pages/api/plasmic-lib/system/Library', 'componentsList.json');
    fs.writeFileSync(componentsListPath, JSON.stringify(componentsList, null, 2));

    const dataFilePath = path.resolve('pages/api/plasmic-lib/system/Library', 'data.json');
    const response = await fetch('https://plasmic-api.agence-scroll.com/data.json');

    if (!response.ok) {
      throw new Error('Impossible de récupérer data.json depuis l\'API');
    }

    const newData = await response.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));

    res.status(200).json({
      message: 'Mise à jour réussie',
      newComponents,
      updatedComponents
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des fichiers:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des fichiers' });
  }
}