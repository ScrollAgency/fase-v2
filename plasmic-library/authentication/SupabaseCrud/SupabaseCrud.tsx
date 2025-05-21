import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { presets } from "@/styles/presets";

interface User {
  id?: string;
  pseudo?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
}

interface SupabaseCrudProps {
  action: "read" | "create" | "update" | "delete" | "reset" | "none";
  userId?: string;
  
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onClose?: (e?: any) => void;

  pseudoToUpdate?: string;
  firstnameToUpdate?: string;
  lastnameToUpdate?: string;
  emailToUpdate?: string;
  roleToUpdate?: string;

  titleCreate?: string;
  titleRead?: string;
  titleUpdate?: string;
  titleReset?: string;
  titleDelete?: string;
}

const getAccessTokenFromCookies = () => {
  const supabaseId = process.env.NEXT_PUBLIC_SUPABASE_ID;
  const match = document.cookie.match(new RegExp(`sb-${supabaseId}-auth-token=([^;]+)`));

  if (match?.[1]) {
    let token = match[1];
    if (token.startsWith("base64-")) {
      token = token.substring(7);
    }
    try {
      const decodedToken =  JSON.parse(atob(token));
      return decodedToken.access_token;
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      return null;
    }
  }
  return null;
};

function SupabaseCrud(props: SupabaseCrudProps) {
  const titleCreate = "Nouvel utilisateur";
  const titleRead = "Informations";
  const titleUpdate = "Mettre à jour";
  const titleReset = "Modifier le mot de passe";
  const titleDelete = "Supprimer";
    
  const { action, userId, isOpen, setIsOpen } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setIsOpen) {
      setIsOpen(false);
    }
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleUserAction = useCallback(
    async (
      action: "create" | "update" | "reset" | "delete",
      data: any
    ) => {
      const token = getAccessTokenFromCookies();
      if (!token) {
        console.error("Utilisateur non authentifié");
        return;
      }
  
      let endpoint = "";
      let method = "";
      let body = {};
  
      switch (action) {
        case "create":
          endpoint = "create_user";
          method = "POST";
          body = data;
          break;
        case "update":
          endpoint = "update_user";
          method = "PUT";
          body = { id: data.id, updates: data.updates };
          break;
        case "reset":
          endpoint = "reset_password";
          method = "PUT";
          body = { id: data.id, newPassword: data.newPassword };
          break;
        case "delete":
          endpoint = "delete_user";
          method = "DELETE";
          body = { id: data.id };
          break;
        default:
          return;
      }
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_URL}/api/supabase_crud/${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
  
        if (!res.ok) {
          throw new Error(`Failed to ${action} user`);
        }
      } catch (error) {
        console.error(`Error during ${action}:`, error);
      }
    },
    []
  );  

  return (
    isOpen ? (
    <div onClick={handleBackdropClick} style={presets.wrappers.overlay as React.CSSProperties}>
      <div onClick={(e) => e.stopPropagation()} style={presets.wrappers.card as React.CSSProperties}>
        <button
          type="button"
          onClick={handleCloseModal}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {action === "read" ? (
          <>
            <h1 style={presets.heading1}>{titleRead}</h1>
            <ul>
              <li>Pseudo : {props.pseudoToUpdate}</li>
              <li>Email : {props.emailToUpdate}</li>
            </ul>
          </>
        ) : action === "create" ? (
          <>
            <h2 style={presets.heading2}>{titleCreate}</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newUser = {
                  pseudo: formData.get("pseudo") as string,
                  firstname: formData.get("firstname") as string,
                  lastname: formData.get("lastname") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                };
                await handleUserAction("create", newUser);
                form.reset();
                handleCloseModal();
              }}
              style={presets.form as React.CSSProperties}
            >
              <input name="pseudo" placeholder="Pseudo" style={presets.inputs.simple} required />
              <input name="firstname" placeholder="Prénom" style={presets.inputs.simple} required />
              <input name="lastname" placeholder="Nom" style={presets.inputs.simple} required />
              <input name="email" type="email" placeholder="Email" style={presets.inputs.simple} required />
              <select name="role" style={presets.inputs.simple} required>
                <option value="">Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button type="submit" style={presets.buttons.primary as React.CSSProperties}>Créer l'utilisateur</button>
            </form>
          </>
        ) : action === "update" && userId ? (
          <>
            <h2 style={presets.heading2}>{titleUpdate}</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const updates = {
                  pseudo: formData.get("pseudo") as string,
                  firstname: formData.get("firstname") as string,
                  lastname: formData.get("lastname") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                };
                await handleUserAction("update", { id: userId, updates });
                form.reset();
                handleCloseModal();
              }}
              style={presets.form as React.CSSProperties}
            >
              <input name="pseudo" placeholder="Pseudo" defaultValue={props.pseudoToUpdate} style={presets.inputs.simple} required />
              <input name="firstname" placeholder="Prénom" defaultValue={props.firstnameToUpdate} style={presets.inputs.simple} required />
              <input name="lastname" placeholder="Nom" defaultValue={props.lastnameToUpdate} style={presets.inputs.simple} required />
              <input name="email" type="email" placeholder="Email" defaultValue={props.emailToUpdate} style={presets.inputs.simple} required />
              <select name="role" defaultValue={props.roleToUpdate} style={presets.inputs.simple} required>
                <option value="">Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button type="submit" style={presets.buttons.primary as React.CSSProperties}>Mettre à jour l'utilisateur</button>
            </form>
          </>
         ) : action === "reset" && userId ? (
          <>
            <h2 style={presets.heading2}>{titleReset}</h2>
            <p>{props.emailToUpdate}</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newPassword = formData.get("password") as string;
                await handleUserAction("reset", { id: userId, newPassword });
                form.reset();
                handleCloseModal();
              }}
              style={presets.form as React.CSSProperties}
            >
              <input name="password" placeholder="Mot de passe" style={presets.inputs.simple} required />
              <button type="submit" style={presets.buttons.primary as React.CSSProperties}>Modifier le mot de passe</button>
            </form>
          </>
        ) : action === "delete" && userId ? (
          <>
            <h2 style={presets.heading2}>{titleDelete}</h2>
            <p>Êtes-vous sûr de vouloir supprimer l'utilisateur suivant ?</p>
            <p>{props.emailToUpdate}</p>
            <button
              type="button"
              onClick={() => {
                handleUserAction("delete", { id: userId });
                handleCloseModal();
              }}
              style={presets.buttons.primary as React.CSSProperties}
            >
              Supprimer
            </button>
          </>
        ) : (
          <div>Aucune action disponible</div>
        )}
      </div>
    </div>
    ) : null
  );
}

export default SupabaseCrud;
