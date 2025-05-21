import type React from 'react';
import { useState } from 'react';
import fs from 'node:fs';
import path from 'node:path';
import Library_ from './api/plasmic-lib/system/Library/Library';

interface LibraryPageProps {
  folderExists: boolean;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ folderExists }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const startInstallation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/first-install', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Erreur lors du lancement de l\'installation');
      }

      const data = await response.json();
      console.log(data.message);
      alert('Installation terminée !');
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue.');
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f6f3ef',
    }}>
      {folderExists ? (
        <Library_
          title="Ma Bibliothèque"
          imageUrl="https://via.placeholder.com/150"
          buttonText="Paramètres"
          apiUrl="https://plasmic-api.agence-scroll.com/api"
        />
      ) : (
        <>
          <h1>Première installation</h1>
          <button type="button" onClick={startInstallation} style={{ padding: '10px', fontSize: '16px' }}>
            Démarrer
          </button>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const folderPath = path.resolve(process.cwd(), 'pages/api/plasmic-lib');
  const folderExists = fs.existsSync(folderPath);

  return {
    props: {
      folderExists,
    },
  };
}

export default LibraryPage;
