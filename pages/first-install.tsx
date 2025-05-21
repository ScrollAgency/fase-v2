import fs from 'node:fs';
import path from 'node:path';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './first-install.module.css';

interface FirstInstallPageProps {
  folderExists: boolean;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

const FirstInstallPage = ({ folderExists }: FirstInstallPageProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [installationComplete, setInstallationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const startInstallation = async () => {
    setHasStarted(true);
    setLoading(true);
    try {
      const response = await fetch('/api/first-install', { method: 'POST' });
      if (!response.ok) throw new Error("Erreur lors du lancement de l'installation");

      const postInstallResponse = await fetch('/api/post-install', { method: 'POST' });
      if (!postInstallResponse.ok) throw new Error("Erreur lors du post-install");

      alert("Installation complète !");
      setInstallationComplete(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/install-log')
        .then(res => res.json())
        .then(setLogs)
        .catch(console.error);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (installationComplete) {
      router.push('/plasmic-library');
    }
  }, [installationComplete, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.logoRow}>
            <img src="https://plasmic-api.agence-scroll.com/plasmic.svg" width="35px" alt="plasmic logo" />
            <p>
              Plasmic <span className={styles.by}>by</span>
              <span className={styles.scroll}> Scroll Agency</span>
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={startInstallation}
              disabled={loading}
              aria-label="Lancer l'installation"
              className={styles.installButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = loading ? '#ccc' : '#fff'}
            >
              {loading ? (
                <div className={styles.installing}>
                  <span className={styles.spinner} />
                  <span className={styles.installingText}>Installation en cours...</span>
                </div>
              ) : 'Première installation'}
            </button>
          </div>

          {hasStarted && (
            <div className={styles.logBox}>
              <p className={styles.logTitle}>📝 Installation en cours :</p>
              {logs.map((log, i) => (
                <div key={i}>[{new Date(log.timestamp).toLocaleTimeString()}] {log.message}</div>
              ))}
            </div>
          )}

          {/* {error && (
            <div className={styles.errorBox}>
              ⚠️ {error}
            </div>
          )} */}

          <div className={styles.instructions}>
            <p>Merci d'effectuer quelques vérifications avant de lancer l'installation</p>
            <ul>
              <li>Modifier le plasmic-init : preview true</li>
              <li>Modifier le port utilisé dans package.json (next dev -p 3030)</li>
            </ul>
          </div>

          {installationComplete && (
            <div className={styles.successMessage}>
              ✅ Installation réussie ! Redirection en cours...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const folderPath = path.resolve(process.cwd(), 'pages/api/plasmic-lib');
  const folderExists = fs.existsSync(folderPath);

  if (folderExists) {
    return {
      redirect: {
        destination: '/plasmic-library',
        permanent: false,
      },
    };
  }

  return {
    props: {
      folderExists,
    },
  };
}

export default FirstInstallPage;
