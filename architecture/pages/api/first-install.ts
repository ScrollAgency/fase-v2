import fs from 'node:fs';
import path from 'node:path';
import { exec, execSync, type ExecException } from 'node:child_process';
import dotenv from 'dotenv';
import AdmZip from 'adm-zip';
import { appendLog, resetLog } from '../../lib/logger';

dotenv.config();

resetLog();
appendLog('🚀 Démarrage de l\'installation...');

// const ARCHIVE_DIR = 'architecture';
// const COMPONENTS_DIR = 'plasmic-library';

const packagesToInstall = [
  'dotenv',
  'adm-zip',
  'plasmic-supabase',
  '@supabase/ssr@0.4.0',
  'tailwindcss@3.4.17',
  'postcss',
  'autoprefixer',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  '@heroui/react',
  'mapbox-gl',
  'simple-git',
  '@plasmicapp/react-web',
  'ts-node',
  'date-fns',
  '@hello-pangea/dnd',
  'nextjs-cors',
  '@supabase/supabase-js'
];

const devDependencies = [
  '@types/adm-zip'
];

// Vérification des packages installés
const isPackageInstalled = (pkg: string) => {
  try {
    execSync(`npm ls ${pkg} --depth=0`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const execPromise = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    appendLog(`▶️ Exécution : ${command}`);
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        appendLog(`❌ Erreur : ${error.message}`);
        reject(error);
        return;
      }
      if (stdout.trim()) appendLog(`📤 STDOUT: ${stdout.trim().substring(0, 500)}`);
      if (stderr.trim()) appendLog(`⚠️ STDERR: ${stderr.trim().substring(0, 500)}`);
      resolve(stdout);
    });
  });
};

// Fonction pour installer les dépendances
const installDependencies = async () => {
  appendLog('📦 Vérification et installation des dépendances...');

  for (const [i, pkg] of packagesToInstall.entries()) {
    if (!isPackageInstalled(pkg)) {
      appendLog(`📦 ${i + 1}/${packagesToInstall.length} : Installation de ${pkg}...`);
      await execPromise(`npm install ${pkg}`);
    } else {
      appendLog(`✅ ${pkg} déjà installé.`);
    }
  }

  for (const [i, pkg] of devDependencies.entries()) {
    if (!isPackageInstalled(pkg)) {
      appendLog(`🛠️ ${i + 1}/${devDependencies.length} : Installation dev de ${pkg}...`);
      await execPromise(`npm install --save-dev ${pkg}`);
    } else {
      appendLog(`✅ ${pkg} déjà installé (dev).`);
    }
  }

  console.log('📂 Téléchargement et extraction des fichiers...');
  await downloadAndUnzip('architecture', 'architecture');
  await downloadAndUnzip('components', 'plasmic-library');

  console.log('📂 Copie des fichiers...');
  await copyFilesFromArchitecture();

  // Assurez-vous que Tailwind est installé avant de lancer son initialisation
  const tailwindInstalled = isPackageInstalled('tailwindcss');
  const postcssInstalled = isPackageInstalled('postcss');
  const autoprefixerInstalled = isPackageInstalled('autoprefixer');

  if (!tailwindInstalled || !postcssInstalled || !autoprefixerInstalled) {
    console.log('🔧 Installation de TailwindCSS, PostCSS et Autoprefixer...');
    await execPromise('npm install tailwindcss@3.4.17 postcss autoprefixer  && npx tailwindcss init -p');
  }

  console.log('✅ Installation complète 🎉');
};

// Fonction pour télécharger et extraire les fichiers avec adm-zip
const downloadAndUnzip = async (dossier: string, extractionDir: string) => {
  const url = `${process.env.API_URL}/archive?dossier=${dossier}`;
  appendLog(`🔗 Téléchargement de ${dossier} depuis ${url}`);
  await execPromise(`curl -o ${dossier}.zip "${url}"`);

  try {
    const zip = new AdmZip(`${dossier}.zip`);
    const destinationDir = path.resolve(process.cwd(), extractionDir);
    zip.extractAllTo(destinationDir, true);
    appendLog(`📂 Extraction réussie dans ${extractionDir}`);
    fs.unlinkSync(`${dossier}.zip`);
    appendLog(`🗑️ Archive ZIP ${dossier}.zip supprimée`);
  } catch (error) {
    appendLog(`❌ Erreur d'extraction : ${error instanceof Error ? error.message : 'inconnue'}`);
  }
};

// Fonction pour copier récursivement un dossier
const copyDirectory = (src: string, dest: string) => {
  // Crée le dossier de destination s'il n'existe pas
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Lis le contenu du dossier source
  const items = fs.readdirSync(src);

  for (const item of items) {
    const srcPath = path.resolve(src, item);
    const destPath = path.resolve(dest, item);
  
    // Si c'est un fichier, on le copie
    if (fs.lstatSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
    // Si c'est un répertoire, on appelle la fonction de copie récursive
    else if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    }
  }
};

// Fonction modifiée pour copier à la fois les fichiers et les répertoires
const copyFilesFromArchitecture = async () => {
  appendLog('📁 Copie des fichiers depuis architecture...');
  const filesToCopy = [
    { src: 'architecture/pages/_app.tsx', dest: 'pages/_app.tsx' },
    { src: 'architecture/pages/plasmic-library.tsx', dest: 'pages/plasmic-library.tsx' },
    { src: 'architecture/pages/api/plasmic-lib/update.ts', dest: 'pages/api/plasmic-lib/update.ts' },
    { src: 'architecture/middleware.ts', dest: 'middleware.ts' },
    { src: 'architecture/lib/utils.ts', dest: 'lib/utils.ts' },
    { src: 'architecture/lib/supabase.ts', dest: 'lib/supabase.ts' },
    { src: 'architecture/lib/supabaseClient.ts', dest: 'lib/supabaseClient.ts' },
    { src: 'architecture/styles/globals.css', dest: 'styles/globals.css' },
    { src: 'architecture/styles/fonts.css', dest: 'styles/fonts.css' },
    { src: 'architecture/styles/presets.ts', dest: 'styles/presets.ts' },
    { src: 'architecture/plasmic-init.ts', dest: 'plasmic-init-modele.ts' },
    { src: 'architecture/tailwind.config.js', dest: 'tailwind.config.js' }
  ];

  // Copier les fichiers individuels
  for (const { src, dest } of filesToCopy) {
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Fichier source introuvable : ${srcPath}`);
      continue; // Ignore ce fichier et passe au suivant
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    try {
      if (fs.lstatSync(srcPath).isDirectory()) {
        // Si c'est un dossier, on utilise la fonction pour copier récursivement
        copyDirectory(srcPath, destPath);
      } else {
        // Si c'est un fichier, on utilise copyFileSync
        fs.copyFileSync(srcPath, destPath);
        appendLog(`✅ Copié : ${src} → ${dest}`);
      }
    } catch (error) {
      appendLog(`❌ Fichier manquant ou erreur : ${src}`);
    }
  }

  // Copier les répertoires restants manuellement
  const directoriesToCopy = [
    { src: 'architecture/styles/tokens-sitex', dest: 'styles/tokens-sitex' },
    { src: 'architecture/styles/tokens-jam', dest: 'styles/tokens-jam' },
    { src: 'architecture/pages/api/plasmic-lib', dest: 'pages/api/plasmic-lib' },
    { src: 'architecture/pages/api/supabase_crud', dest: 'pages/api/supabase_crud' }
  ];

  for (const { src, dest } of directoriesToCopy) {
    const srcPath = path.resolve(process.cwd(), src);
    const destPath = path.resolve(process.cwd(), dest);

    if (fs.existsSync(srcPath)) {
      copyDirectory(srcPath, destPath);
      console.log(`✅ Copié répertoire : ${srcPath} → ${destPath}`);
    } else {
      console.error(`❌ Répertoire source introuvable : ${srcPath}`);
    }
  }
  await execPromise('npm install tailwindcss@3.4.17 postcss autoprefixer  && npx tailwindcss init -p');
};

(async () => {
  try {
    await execPromise('npm install dotenv adm-zip');
    await installDependencies();

    appendLog('✅ Installation terminée avec succès 🎉');
  } catch (err) {
    appendLog(`💥 Erreur inattendue : ${err instanceof Error ? err.message : 'inconnue'}`);
  } finally {
    appendLog('🛑 Fin du script d\'installation.');
  }
})();

