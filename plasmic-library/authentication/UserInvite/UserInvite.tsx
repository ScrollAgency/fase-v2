import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { useEffect, useState } from "react";
import { presets } from "@/styles/presets";
import { useRouter } from "next/router";

export interface UserInviteProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  successRedirectUrl?: string;
  password?: string;
  passwordLabel?: string;
  placeholderPassword?: string;
  onPasswordChange?: (value: string) => void;
}

function UserInvite_(
  props: UserInviteProps, 
  ref: HTMLElementRefOf<"div">
) {
  const {
    title = "Bienvenue",
    description = "Veuillez définir un mot de passe pour finaliser votre compte.",
    submitButtonText = "Valider",
    successRedirectUrl = "/login",
    password: controlledPassword,
    onPasswordChange,
    passwordLabel = "Mot de passe",
    placeholderPassword = "Entrez votre mot de passe",
  } = props;

  const [localPassword, setLocalPassword] = useState("");
  const password = controlledPassword ?? localPassword;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const accessToken = new URLSearchParams(hash.substring(1)).get("access_token");
    const refreshToken = new URLSearchParams(hash.substring(1)).get("refresh_token");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } else {
      setError("Lien d'invitation invalide ou expiré.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECT_URL}/api/supabase_crud/invite_user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        refreshToken,
        password
      })
    });

    const data = await response.json();
  
    if (!response.ok) {
      setError(data.error || "Erreur inconnue.");
    } else {
    router.push(successRedirectUrl);
  }

    setIsSubmitting(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onPasswordChange) onPasswordChange(value);
    else setLocalPassword(value);
  };

  return (
    <div 
      ref={ref}
      style={presets.wrappers.card as React.CSSProperties}
    >
      <h2 style={presets.heading1}>{title}</h2>
      <p>{description}</p>
      {error && (
        <div style={presets.alerts.error as React.CSSProperties}>
          {error}
        </div>
      )}
      <form 
        onSubmit={handleSubmit}
        style={presets.form as React.CSSProperties}
      >
        <div style={{ rowGap: presets.inputField.rowGap }}>
          <label style={presets.formLabel as React.CSSProperties} htmlFor="password">{passwordLabel}</label>
          <input
            type="password"
            id="password"
            placeholder={placeholderPassword}
            style={presets.inputs.simple} 
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={presets.buttons.primary as React.CSSProperties}
          >
            {submitButtonText}
          </button>
        
      </form>
    </div>
  );
}

const UserInvite = React.forwardRef(UserInvite_);
export default UserInvite;
