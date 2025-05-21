import type * as React from "react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import Link from "next/link";
import { presets } from "@/styles/presets";
import AlertManager, { type AlertType, type AlertMessage } from "@/plasmic-library/alerts/AlertManager/AlertManager";
import { EyeIcon, ViewIcon } from "@/plasmic-library/icons/icons";

export interface ResetPasswordProps {
  // Wrapper
  wrapperStyle?: "simple" | "card" | "custom";

  // Title
  titleHeading?: "h1" | "h2" | "h3";
  title?: string;

  // Input
  inputStyle?: "simple" | "advance";

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
  cancelButtonStyle?: "primary" | "secondary" | "tertiary";
  cancelButtonText?: string;

  // show / hide
  showPasswordToggle?: boolean;
  showAlerts?: boolean;
  showPasswordStrength?: boolean;

  // Events handlers
  onPasswordChange?: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onAlertClose?: (id: string) => void;
}

function ResetPassword_(
  props: ResetPasswordProps,
  ref: HTMLElementRefOf<"div">
) {
  const {
    // Wrapper
    wrapperStyle = "card",

    // Title
    titleHeading = "h1",
    title = "Réinitialiser le mot de passe",
    
    // Input
    inputStyle = "simple",

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
    submitButtonStyle = "primary",
    submitButtonText = "Réinitialiser",
    cancelButtonStyle = "tertiary",
    cancelButtonText = "Annuler",

    // show / hide
    showPasswordToggle = true,
    showAlerts = true,
    showPasswordStrength = true,

    // Events handlers
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
    onAlertClose,
  } = props;

  type HeadingKeys = "heading1" | "heading2" | "heading3";

  const headingKey = `heading${titleHeading.slice(1)}` as HeadingKeys;
  const headingStyle = presets[headingKey] || presets.heading1;
  const Title = titleHeading as keyof JSX.IntrinsicElements;
  const [password, setPassword] = useState(props.password || "");
  const [confirmPassword, setConfirmPassword] = useState(props.confirmPassword || "");
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

  useEffect(() => {
    const pwd = props.password || "";
    setPassword(pwd);
    checkPasswordStrength(pwd);
  }, [props.password, checkPasswordStrength]);
  
  useEffect(() => {
    setConfirmPassword(props.confirmPassword || "");
  },  [props.confirmPassword]);

  return (
    <div
      ref={ref}
      style={presets.wrappers[wrapperStyle] as React.CSSProperties}
    >
      <Title style={headingStyle}>{title}</Title>

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
              placeholder={passwordPlaceholder}
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
          <label style={presets.formLabel as React.CSSProperties} htmlFor="confirmPasswordInput">{confirmPasswordLabel}</label>
          <div style={presets.passwordInputWrapper as React.CSSProperties}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPasswordInput"
              placeholder={confirmPasswordPlaceholder}
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
          
          {!passwordsMatch && (
            <small style={{ color: 'red', marginTop: 4 }}>
              {errorMessages.passwordMismatch}
            </small>
          )}
          
        </div>

        <button
          type="submit"
          style={{
            ...presets.buttons[submitButtonStyle] as React.CSSProperties,
            cursor: passwordStrength < 4 || !passwordsMatch ? "not-allowed" : "pointer",
            opacity: passwordStrength < 4 || !passwordsMatch ? 0.5 : 1,
          }}
          disabled={passwordStrength < 4 || !passwordsMatch}
        >
          {submitButtonText}
        </button>
      </form>

      <Link href="/login">
        <button
          type="button"
          style={presets.buttons[cancelButtonStyle] as React.CSSProperties}
        >
          {cancelButtonText}
        </button>
      </Link>
    </div>
  );
}

const ResetPassword = forwardRef(ResetPassword_);
export default ResetPassword;
