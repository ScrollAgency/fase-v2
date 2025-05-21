import type * as React from "react";
import { forwardRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { presets } from "@/styles/presets";
import AlertManager, { type AlertType, type AlertMessage } from "../../alerts/AlertManager/AlertManager";
import { EyeIcon, ViewIcon } from "@/plasmic-library/icons/icons";

export interface AccountParametersProps {
  // Wrapper
  wrapperStyle?: "simple" | "card" | "custom";

  // Title
  titleHeading?: "h1" | "h2" | "h3";
  title?: string;

  // Input
  inputStyle?: "simple" | "advance";

  // Informations
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  
  // Password
  password?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  confirmPasswordLabel?: string;
  confirmPassword?: string;
  confirmPasswordPlaceholder?: string;
  passwordInfoText?: string;
  eyeIconColor?: string;

  // Alert
  alertPosition?: 'top' | 'bottom' | 'inline';
  maxAlerts?: number;
  customErrorMessages?: {
    weakPassword?: string;
    passwordMismatch?: string;
    resetTokenInvalid?: string;
    resetTokenExpired?: string;
    networkError?: string;
  };
  resetSuccessMessage?: string;

  // Buttons
  submitButtonStyle?: "primary" | "secondary" | "tertiary";
  submitButtonText?: string;

  // show / hide
  showTitle?: boolean;
  showPasswordToggle?: boolean;
  showAlerts?: boolean;
  showPasswordStrength?: boolean;

  // Events handlers
  onPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onAlertClose?: (id: string) => void;
}

const AccountParameters = forwardRef<HTMLDivElement, AccountParametersProps>(
  ({ 
    // Wrapper
    wrapperStyle = "card",

    // Title
    titleHeading = "h1",
    title = "Réinitialiser le mot de passe",

    // Input
    inputStyle = "simple",

    // Informations
    firstName,
    lastName,
    email,
    role,

    // Password
    passwordLabel= "Nouveau mot de passe*",
    passwordPlaceholder = "••••••••",
    confirmPasswordLabel= "Répétez le mot de passe*",
    confirmPasswordPlaceholder = "••••••••",
    passwordInfoText = "Utilisez 8 caractères ou plus en mélangeant lettres, chiffres et symboles.",
    eyeIconColor = "#666",

    // Alert
    alertPosition = 'top',
    maxAlerts = 3,
    customErrorMessages,
    resetSuccessMessage = "Votre mot de passe a été réinitialisé avec succès!",

    // Buttons
    submitButtonText = "Enregistrer le nouveau mot de passe",
    submitButtonStyle = "secondary",

    // show / hide
    showTitle = false,
    showPasswordToggle = true,
    showAlerts = true,
    showPasswordStrength = true,

    // Events handlers
    onPasswordChange,
    onConfirmPasswordChange,
    onAlertClose,
    onSubmit,
  }, ref) => {
    type HeadingKeys = "heading1" | "heading2" | "heading3";
  
    const headingKey = `heading${titleHeading.slice(1)}` as HeadingKeys;
    const headingStyle = presets[headingKey] || presets.heading1;
    const Title = titleHeading as keyof JSX.IntrinsicElements;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordsMatch, setPasswordsMatch] = useState(password === confirmPassword);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alerts, setAlerts] = useState<AlertMessage[]>([]);

const defaultErrorMessages = {
  weakPassword: "Le mot de passe est trop faible. Utilisez au moins 8 caractères avec des lettres, chiffres et symboles.",
  passwordMismatch: "Les mots de passe ne correspondent pas",
  resetTokenInvalid: "Le lien de réinitialisation n'est pas valide",
  resetTokenExpired: "Le lien de réinitialisation a expiré",
  networkError: "Une erreur réseau s'est produite. Veuillez réessayer."
};

const errorMessages = { ...defaultErrorMessages, ...customErrorMessages };

const addAlert = (type: AlertType, message: string) => {
  const id = Date.now().toString();
  setAlerts(prevAlerts => [...prevAlerts, { id, type, message }]);
  return id;
};

const removeAlert = (id: string) => {
  setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  if (onAlertClose) onAlertClose(id);
};

  const checkPasswordStrength = useCallback((password: string) => {
    const criteria = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
    const hasMinLength = password.length >= 8;
    const criteriaCount = criteria.filter(regex => regex.test(password)).length;
    const strength = hasMinLength ? criteriaCount : Math.min(criteriaCount, 2);
    setPasswordStrength(strength);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
    setPasswordsMatch(value === confirmPassword);
    if (onPasswordChange) onPasswordChange(value);
  }, [confirmPassword, onPasswordChange, checkPasswordStrength]);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
    if (onConfirmPasswordChange) onConfirmPasswordChange(value);
  }, [password, onConfirmPasswordChange]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 1: return "#ff4d4d";
      case 2: return "#ffaa00";
      case 3: return "#c9d64f";
      case 4: return "#4caf50";
      default: return "#ddd";
    }
  };

  const renderStrengthBars = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      bars.push(
        <div
          key={i}
          style={{
            ...presets.strengthBar,
            backgroundColor: i < passwordStrength ? getStrengthColor(passwordStrength) : "#ddd",
          }}
        />
      );
    }
    return bars;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAlerts([]);

    const errors: string[] = [];

    if (passwordStrength < 3) {
      errors.push(errorMessages.weakPassword);
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      errors.push(errorMessages.passwordMismatch);
    } else {
      setPasswordsMatch(true);
    }

    if (errors.length > 0) {
      for (const error of errors) {
        addAlert('error', error);
      }
      return;
    }

    if (onSubmit) {
      (async () => {
        try {
          await onSubmit(event);
          addAlert("success", resetSuccessMessage);
        } catch (error) {
          addAlert("error", error instanceof Error ? error.message || errorMessages.networkError : errorMessages.networkError);
        }
      })();
    }
  };

  useEffect(() => {
    return () => {
      setAlerts([]);
    };
  }, []);

    return (
      <div style={presets.wrappers.accountCard as React.CSSProperties} ref={ref}>
        
      {showTitle && (
        <Title style={headingStyle}>{title}</Title>
      )}

        {/* Informations utilisateur */}
        <div style={{ columnGap: 110}}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <strong>Nom</strong>
            <span>{lastName}</span>
          </div>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <strong>Prénom</strong>
            <span>{firstName}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <strong>Email</strong>
            <span>{email}</span>
          </div>
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <strong>Rôle</strong>
            <span>{role}</span>
          </div>
        </div>
      </div>

        <p style={presets.accountInfos}>Ces informations ne peuvent être modifiées que par un Administrateur.</p>
        <hr />

        {/* Formulaire de réinitialisation du mot de passe */}
        {showAlerts && <AlertManager
        alerts={alerts}
        position={alertPosition}
        onClose={removeAlert}
        maxAlerts={maxAlerts}
      />}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", rowGap: presets.form.rowGap }}
      >
        <div style={{ rowGap: presets.inputField.rowGap }}>
          <label style={presets.formLabel as React.CSSProperties} htmlFor="passwordInput">{passwordLabel}</label>
          <div style={presets.passwordInputWrapper as React.CSSProperties}>
            <input
              type={showPassword ? "text" : "password"}
              id="passwordInput"
              value={password}
              onChange={handlePasswordChange}
              required
              style={presets.inputs[inputStyle]}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{ ...presets.togglePasswordVisibility, color: eyeIconColor} as React.CSSProperties}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeIcon /> : <ViewIcon />}
              </button>
            )}
          </div>
          
          {showPasswordStrength && (
            <>
              <div style={presets.strengthBars}>{renderStrengthBars()}</div>
              <small style={presets.passwordHint as React.CSSProperties}>{passwordInfoText}</small>
            </>
          )}

        </div>

        <div style={{ rowGap: presets.inputField.rowGap }}>
          <label style={presets.formLabel as React.CSSProperties} htmlFor="confirmPassword">{confirmPasswordLabel}</label>
          <div style={presets.passwordInputWrapper as React.CSSProperties}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPasswordInput"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={presets.inputs[inputStyle]}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                style={{ ...presets.togglePasswordVisibility, color: eyeIconColor } as React.CSSProperties}
                aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showConfirmPassword ? <EyeIcon /> : <ViewIcon />}
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          style={presets.buttons[submitButtonStyle] as React.CSSProperties}
        >
          {submitButtonText}
        </button>
      </form>
      </div>
    );
  }
);

export default AccountParameters;
