import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Library.module.css";

// On récupère les données de version du fichier version.json
import versionData from './version.json';

interface ParametersProps {
  onClose: () => void;
  onItemClick: (item: string, installedVersion: string, lastVersion: string) => void;
}

function Parameters({ onClose, onItemClick }: ParametersProps) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [installedVersion, setInstalledVersion] = useState<string>("N/A");
  const [lastVersion, setLastVersion] = useState<string>("N/A");
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Mise à jour des versions à partir du fichier version.json
  const checkVersions = () => {
    try {
      // On récupère les versions depuis le fichier version.json
      const installedVer = versionData?.installedVersion || "N/A";
      const lastVer = versionData?.lastVersion || "N/A";  // Assurez-vous que la clé lastVersion existe dans version.json

      setInstalledVersion(installedVer);
      setLastVersion(lastVer);

      // Vérification des mises à jour
      if (installedVer !== "N/A" && lastVer !== "N/A") {
        if (installedVer !== lastVer) {
          setUpdateAvailable(true);
          setMessage(`Une nouvelle version est disponible : ${lastVer}`);
          onItemClick("update", installedVer, lastVer);
        } else {
          setMessage(`Version ${lastVer} à jour`);
        }
      } else {
        setMessage("⚠️ Impossible de vérifier les mises à jour.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la vérification des versions :", error);
      setMessage("⚠️ Impossible de vérifier les mises à jour.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction de mise à jour
  const handleUpdate = () => {
    setIsUpdating(true);
    setMessage("Mise à jour en cours...");
    // Simuler la mise à jour
    setTimeout(() => {
      setIsUpdating(false);
      setMessage("Mise à jour terminée !");
      checkVersions(); // Vérifier les versions après la mise à jour
    }, 4000);
  };

  // Exécution des fonctions au montage
  useEffect(() => {
    checkVersions();  // Vérifie les versions
  }, []);

  // Fonction pour gérer la sélection d'un élément du menu
  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    // Passer les versions au composant Details ici
    setTimeout(() => {
      onItemClick(item, installedVersion, lastVersion); // Ceci déclenche l'affichage de la div
    }, 500);
  };

  return (
    <div className={styles.parametersContainer}>
      <button
        onClick={() => { onClose(); onItemClick("close", installedVersion, lastVersion); }} // Fermer aussi les détails lors de la fermeture de la fenêtre
        className={styles.closeButton}
        aria-label="Fermer"
        type="button"
      >
        ×
      </button>

      <h2 className={styles.headerTitle}>Paramètres</h2>

      {/* Message d'état */}
      <div className={styles.statusMessage}>
        {loading ? <p>🔹 Vérification en cours...</p> : <p>{message}</p>}
      </div>

      {/* Menu des sections */}
      <h3 className={styles.menuSection}>Mise à jour</h3>
      <ul>
        <li
          onClick={() => handleMenuItemClick("Système")}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleMenuItemClick("Système") : null}
          className={styles.menuItem}
        >
          Système
        </li>
        <li
          onClick={() => handleMenuItemClick("Composants")}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleMenuItemClick("Composants") : null}
          className={styles.menuItem}
        >
          Composants
        </li>
        <li
          onClick={() => handleMenuItemClick("Réinitialiser")}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleMenuItemClick("Réinitialiser") : null}
          className={styles.menuItem}
        >
          Réinitialiser
        </li>
      </ul>

      <h3 className={styles.menuSection}>Composants</h3>
      <ul>
        <li
          onClick={() => handleMenuItemClick("Lister et agir")}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleMenuItemClick("Lister et agir") : null}
          className={styles.menuItem}
        >
          Lister et agir
        </li>
        <li
          onClick={() => handleMenuItemClick("Partager")}
          onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleMenuItemClick("Partager") : null}
          className={styles.menuItem}
        >
          Partager
        </li>
      </ul>
    </div>
  );
}

export default Parameters;
