import { tokens } from "./tokens-fase";

export const getTokenValue = (name: string) => tokens.find((token) => token.name === name)?.value || name;

export const presets = {
  // Wrappers
  wrappers: {
    simple: {
      padding: "32px",
      borderRadius: "8px",
      backgroundColor: getTokenValue("tertiary"),
      boxShadow: "none",
      rowGap: "32px",
    },
    card: {
      position: "relative",
      padding: "0px",
      backgroundColor: getTokenValue("white"),
      borderRadius: "24px",
      rowGap: "0px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: getTokenValue("shadow-medium"),
      border: `1px solid ${getTokenValue("sand-200-borders")}`,
      width: "100%",
      /*maxWidth: "630px",*/
      minHeight: "auto",
      boxSizing: "border-box",
    
      "@media (max-width: 768px)": {
        padding: "0px",
        borderRadius: "16px",
        rowGap: "20px",
      },

      "@media (max-width: 480px)": {
        padding: "0px",
        borderRadius: "12px",
        rowGap: "16px",
      }
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      margin: 0,
    },
    custom: {
      padding: "48px",
      width: "100%",
      borderRadius: "16px",
      backgroundColor: getTokenValue("secondary"),
      boxShadow: getTokenValue("shadow-small"),
    },
    signUpCard: {
      backgroundColor: getTokenValue("white"),
      maxWidth: "400px",
      width: "100%",
      margin: "0 auto",
    },
    accountCard: {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      backgroundColor: getTokenValue("white"),
      width: "1191px",
      maxWidth: "100%",
      maxHeight: "640px",
      padding: "64px",
      borderRadius: "24px",
      boxSizing: "border-box",
    }
    
  },

  // typography
    heading1: {
      fontFamily: "Manrope, sans-serif",
      fontWeight: "bold",
      fontSize: "48px",
      lineHeight: "120%",
      color: getTokenValue("brand-black"),
    },
    heading2: {
      fontFamily: "Improvise, sans-serif",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      color: getTokenValue("primary"),
    },
    heading3: {
      fontFamily: "Improvise, sans-serif",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "140%",
      color: getTokenValue("primary"),
      paddingBottom: "18px",
    },
    heading4: {
      fontFamily: "Manrope",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "150%",
      color: getTokenValue("brand-black"),
    },

  passwordInputWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: "12px",
    marginBottom: "0px",
  },

  alerts: {
    error: {
      backgroundColor: getTokenValue("warning-background"),
      color: getTokenValue("warning-text"),
      border: `1px solid ${getTokenValue("warning-border")}`,
      padding: "12px",
      borderRadius: "4px",
      marginBottom: "10px",
      fontSize: "14px"
    }
  },
  
  // à ranger
  togglePasswordVisibility: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: getTokenValue("grey-500"),
    cursor: "pointer",
    zIndex: 1,
  },

  checkPassword: {
    fontFamily: "Manrope, sans-serif",
    fontWeight: "500",
    fontSize: "14px",
    color: getTokenValue("grey-700"),
    lineHeight: "1.4",
    marginTop: "8px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  // Buttons
  buttons: {
    primary: {
      backgroundColor: getTokenValue("black-500"),
      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
      padding: "16px 28px",
      color: getTokenValue("white"),
      fontFamily: "Manrope, sans-serif",
      width: "100%",
      /*height: "48px",*/
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px",
      borderRadius: "8px",
      cursor: "pointer",
    },
    secondary: {
      backgroundColor: getTokenValue("sand"),
      color: getTokenValue("lavender"),
      fontFamily: "Manrope, sans-serif",
      fontWeight: "bold",
      fontSize: "16px",
      padding: "12px 20px",
      borderRadius: "8px",
      border: `1px solid ${getTokenValue("sand-200-borders")}`,
      cursor: "pointer",
      maxWidth: "322px",
    },
    tertiary: {
      backgroundColor: "transparent",
      color: getTokenValue("lavender-500"),
      fontFamily: "Manrope, sans-serif",
      fontWeight: "bold",
      fontSize: "16px",
      width: "100%",
      textAlign: "center",
      border: "none",
      cursor: "pointer",
    },
    submitButton: {
      padding: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      backgroundColor: getTokenValue("purple-600"),
      color: getTokenValue("white"),
      border: "none",
      borderRadius: "16px",
      cursor: "pointer",
      fontWeight: "500",
      marginTop: "8px",
      height: "48px",
      fontSize: "15px",
      letterSpacing: "0.5px",
      hover: {
        opacity: "0.9",
      },
    },
    oAuthButton: {
      flex: 1,
      border: `1px solid ${getTokenValue("sand-200-borders")} !important`,
      backgroundColor: `${getTokenValue("white")} !important`,
      color: `${getTokenValue("grey-900")} !important`,
      fontWeight: "500",
      borderRadius: "16px !important",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 16px !important",
      gap: "8px",
      fontSize: "14px",
      letterSpacing: "0.5px",
    },
  },

  // Inputs
  inputField: {
    rowGap: "12px",
  },
  inputGroup: {
    display: "flex",
    gap: "16px",
    alignItems: "stretch",
    flexDirection:"column-reverse",
    width: "100%",
  },
  inputGroupItem: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  inputs: {
    simple: {
      fontFamily: "Manrope, sans-serif",
      padding: "12px 24px",
      width: "100%",
      height: "48px",
      color: getTokenValue("grey-400"),
      fontWeight: 600,
      borderRadius: "8px",
      borderColor: getTokenValue("grey-200"),
      borderWidth: "1px",
      fontSize: "15px",
      backgroundColor: getTokenValue("white"),
      focus: {
        outline: "none",
        borderColor: getTokenValue("purple-500"),
        boxShadow: getTokenValue("shadow-focus"),
      },
      placeholder: {
        opacity: "1",
        color: "inherit",
        fontFamily: "Manrope, sans-serif",
      },
    },
    advance: {
      fontSize: "16px",
      padding: "12px",
      border: `1px solid ${getTokenValue("lavender-500")}`,
      borderRadius: "8px",
      width: "100%",
      backgroundColor: getTokenValue("grey-50"),
    },
  },

  selectStyle: {
    padding: "12px",
    width: "100%",
    height: "48px",
    color: getTokenValue("grey-400"),
    borderRadius: "8px",
    borderColor: getTokenValue("grey-200"),
    borderWidth: "1px",
    fontSize: "15px",
    backgroundColor: getTokenValue("white"),
    appearance: "none", // Supprime les styles natifs du navigateur pour une meilleure personnalisation
    cursor: "pointer",
    focus: {
      outline: "none",
      borderColor: getTokenValue("purple-500"),
      boxShadow: getTokenValue("shadow-focus"),
    },
  },
  
  textareaStyle: {
    padding: "12px",
    width: "100%",
    height: "120px", // Ajuste la hauteur pour un textarea
    color: getTokenValue("grey-400"),
    borderRadius: "8px",
    borderColor: getTokenValue("grey-200"),
    borderWidth: "1px",
    fontSize: "15px",
    backgroundColor: getTokenValue("white"),
    resize: "vertical", // Permet de redimensionner verticalement le textarea
    focus: {
      outline: "none",
      borderColor: getTokenValue("purple-500"),
      boxShadow: getTokenValue("shadow-focus"),
    },
  },
  

  // Forms
  form: {
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
    width: "100%",
  },

  formLabel: {
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    color: getTokenValue("grey-900"),
    lineHeight: "20px",
    textAlign: "left",
    verticalAlign: "top",
    marginBottom: "4px",
    display: "block",
  },

  formMessage: {
    fontFamily: "Manrope, sans-serif",
    fontWeight: "500",
    fontSize: "20px",
    color: getTokenValue("grey-900"),
    lineHeight: "140%",
    textAlign: "left",
    marginTop: "12px",
  },

  // Links
  links: {
    linkLeft: {
      color: getTokenValue("lavender-500"),
      textDecoration: "none",
      fontWeight: "bold",
      cursor: "pointer",
      alignSelf: "flex-start",
    },
    linkRight: {
      color: getTokenValue("lavender-500"),
      textDecoration: "none",
      fontWeight: "bold",
      cursor: "pointer",
      alignSelf: "flex-end",
    },
  },
  linkSignupBottom: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "24px"
  },
  linkSignupBottomText: {
    color: "#002400",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer"
  },


  // Others
  passwordHint: {
    fontSize: "13px",
    color: getTokenValue("grey-600"),
    marginTop: "4px",
    marginBottom: "4px",
  },

  requiredField: {
    content: "*",
    color: getTokenValue("error"),
    marginLeft: "2px",
    fontSize: "16px",
    position: "relative",
    top: "2px",
  },

  accountInfos: {
    fontFamily: "Manrope, sans-serif",
    fontWeight: "regular",
    fontSize: "12px",
    lineHeight: "130%",
    color: getTokenValue("grey-600"),
  },

  // Strength Bar
  strengthBars: {
    display: "flex",
    gap: "4px",
    marginTop: "4px",
    marginBottom: "8px",
  },

  strengthBar: {
    width: "25%",
    height: "6px",
    backgroundColor: getTokenValue("grey-300"),
    borderRadius: "16px",
    transition: "background-color 0.3s ease",
  },

  strengthBarFilled: {
    backgroundColor: getTokenValue("green-500"),
  },

  strengthBarFilledFirst: {
    backgroundColor: getTokenValue("green-600"),
  },

  // Phone Input Group
  phoneInputGroup: {
    display: "flex",
    border: `1px solid ${getTokenValue("sand-200-borders")}`,
    borderRadius: "8px",
    overflow: "hidden",
    height: "42px",
    backgroundColor: getTokenValue("white"),
  },

  phoneSelector: {
    minWidth: "80px",
    display: "flex",
    alignItems: "center",
    padding: "0 0 0 12px",
    backgroundColor: getTokenValue("white"),
    border: "none",
    borderRight: "none !important",
    position: "relative",
    after: {
      content: "",
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid #666",
      pointerEvents: "none",
    },
  },

  phoneInput: {
    flex: 1,
    padding: "10px 12px 10px 0",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "8px 0",
  },

  checkboxLabel: {
    fontSize: "14px",
    color: getTokenValue("grey-700"),
    lineHeight: "1.4",
  },

  oAuthContainer: {
    marginTop: "5px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  separator: {
    display: "flex", 
    alignItems: "center", 
    margin: "16px 0",
  },
  separatorHr: {
    flex: 1, 
    borderBottom: "1px solid #ccc",
  },
  separatorText: {
    margin: "0 8px", 
    ontSize: "14px", 
    color: "#666",
  },

  oAuthButtons: {
    display: "flex",
    gap: "12px",
    width: "100%",
    marginTop: "0px",
  },

  oAuthButton2: {
    flex: "1 1 0",
    height: "56px",
    borderRadius: "28px",
    border: "1px solid #E5E7EB",
    backgroundColor: getTokenValue("white-500"),
    color: getTokenValue("black-500"),
    fontWeight: "500",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    cursor: "pointer",
    padding: "0 24px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    hover: {
      backgroundColor: getTokenValue("gray-200"),
    }
  },

  oAuthButton: {
    flex: "1 1 0",
    height: "56px",
    borderRadius: "28px",
    border: "1px solid #E5E7EB",
    backgroundColor: getTokenValue("white-500"),
    color: getTokenValue("black-500"),
    fontWeight: "500",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    cursor: "pointer",
    padding: "0 24px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    "@media (max-width: 768px)": {
      height: "44px",
      borderRadius: "24px",
      fontSize: "14px",
      padding: "0 16px",
      gap: "8px"
    }
  },

  loginLinkContainer: {
    marginTop: "12px",
    textAlign: "center",
  },

  loginLink: {
    color: getTokenValue("lavender-500"),
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    transition: "color 0.3s",
    hover: {
      color: getTokenValue("grey-900"),
      textDecoration: "underline",
    },
  },

  arrowIcon: {
    fontSize: "18px",
    marginLeft: "4px",
  }
};
