import type { TokenType } from "@plasmicapp/host";

export const colors: Array<{ name: string; displayName: string; value: string; type: TokenType }> = [
  
  // 🎨 Brand Colours
  { name: "black", displayName: "Black", value: "#131013", type: "color" },
  { name: "offWhite", displayName: "OffWhite", value: "#fbfbfb", type: "color" },
  { name: "white", displayName: "White", value: "#ffffff", type: "color" },
  { name: "beige", displayName: "Beige", value: "#f2eee9", type: "color" },
  { name: "sand", displayName: "Sand", value: "#ece6df", type: "color" },
  { name: "lavender", displayName: "Lavender", value: "#7641f1", type: "color" },

  // ⚠️ Système Colours
  { name: "danger-text", displayName: "Danger Text", value: "#ab3832", type: "color" },
  { name: "danger-border", displayName: "Danger Border", value: "#f0a5a3", type: "color" },
  { name: "danger-background", displayName: "Danger Background", value: "#fcf1f1", type: "color" },
  { name: "warning-text", displayName: "Warning Text", value: "#ad5b2b", type: "color" },
  { name: "warning-border", displayName: "Warning Border", value: "#f7d165", type: "color" },
  { name: "warning-background", displayName: "Warning Background", value: "#fdf9eb", type: "color" },
  { name: "success-text", displayName: "Success Text", value: "#387c39", type: "color" },
  { name: "success-border", displayName: "Success Border", value: "#99e4a4", type: "color" },
  { name: "success-background", displayName: "Success Background", value: "#f1fbf3", type: "color" },
  { name: "information-text", displayName: "Information Text", value: "#552a9b", type: "color" },
  { name: "information-border", displayName: "Information Border", value: "#a490f7", type: "color" },
  { name: "information-background", displayName: "Information Background", value: "#f5f0fd", type: "color" },

  // 🔥 Gravité Colours
  { name: "code-blanc", displayName: "Code Blanc", value: "#eaeaec", type: "color" },
  { name: "code-jaune", displayName: "Code Jaune", value: "#ffd66b", type: "color" },
  { name: "code-orange", displayName: "Code Orange", value: "#ff7f37", type: "color" },
  { name: "code-rouge", displayName: "Code Rouge", value: "#e20a37", type: "color" },
  { name: "code-noir", displayName: "Code Noir", value: "#43454d", type: "color" },

  // 🎨 User Palette - Blue
  { name: "blue-100", displayName: "Blue 100", value: "#c8defd", type: "color" },
  { name: "blue-200", displayName: "Blue 200", value: "#8fbffc", type: "color" },
  { name: "blue-300", displayName: "Blue 300", value: "#0063d8", type: "color" },
  { name: "blue-400", displayName: "Blue 400", value: "#00499f", type: "color" },

  // 🎨 User Palette - Cyan
  { name: "cyan-100", displayName: "Cyan 100", value: "#b7e9fe", type: "color" },
  { name: "cyan-200", displayName: "Cyan 200", value: "#6fd6fc", type: "color" },
  { name: "cyan-300", displayName: "Cyan 300", value: "#00c3fb", type: "color" },
  { name: "cyan-400", displayName: "Cyan 400", value: "#005d95", type: "color" },

  // 🎨 Lavender Colours
  { name: "lavender-25", displayName: "Lavender 25", value: "#f9f5ff", type: "color" },
  { name: "lavender-50", displayName: "Lavender 50", value: "#eee7fd", type: "color" },
  { name: "lavender-100", displayName: "Lavender 100", value: "#ddcffc", type: "color" },
  { name: "lavender-200", displayName: "Lavender 200", value: "#baa0f8", type: "color" },
  { name: "lavender-300", displayName: "Lavender 300", value: "#ae8ff7", type: "color" },
  { name: "lavender-400", displayName: "Lavender 400", value: "#9870f5", type: "color" },
  { name: "lavender-500", displayName: "Lavender 500", value: "#7641f1", type: "color" },
  { name: "lavender-600", displayName: "Lavender 600", value: "#430ebe", type: "color" },
  { name: "lavender-700", displayName: "Lavender 700", value: "#320a8f", type: "color" },
  { name: "lavender-800", displayName: "Lavender 800", value: "#21075f", type: "color" },
  { name: "lavender-900", displayName: "Lavender 900", value: "#110330", type: "color" },
  { name: "lavender-950", displayName: "Lavender 950", value: "#080218", type: "color" },

  // 🎨 Sand Colours
  { name: "sand-50", displayName: "Sand 50", value: "#f6f3ef", type: "color" },
  { name: "sand-100", displayName: "Sand 100", value: "#ece6df", type: "color" },
  { name: "sand-200", displayName: "Sand 200", value: "#d9cdbf", type: "color" },
  { name: "sand-300", displayName: "Sand 300", value: "#c6b49f", type: "color" },
  { name: "sand-400", displayName: "Sand 400", value: "#b39c7f", type: "color" },
  { name: "sand-600", displayName: "Sand 600", value: "#80694c", type: "color" },
  { name: "sand-700", displayName: "Sand 700", value: "#604e39", type: "color" },
  { name: "sand-800", displayName: "Sand 800", value: "#403426", type: "color" },
  { name: "sand-900", displayName: "Sand 900", value: "#201a13", type: "color" },
  { name: "sand-950", displayName: "Sand 950", value: "#100d09", type: "color" },

  // 🎨 Grey Colours
  { name: "grey-50", displayName: "Grey 50", value: "#f2f2f2", type: "color" },
  { name: "grey-100", displayName: "Grey 100", value: "#e6e6e6", type: "color" },
  { name: "grey-200", displayName: "Grey 200", value: "#cccccc", type: "color" },
  { name: "grey-300", displayName: "Grey 300", value: "#b3b3b3", type: "color" },
  { name: "grey-500", displayName: "Grey 500", value: "#666666", type: "color" },

  // 🌟 Primary, Secondary, and Tertiary
  { name: "primary", displayName: "Primary Color", value: "#7641f1", type: "color" },
  { name: "secondary", displayName: "Secondary Color", value: "#f2eee9", type: "color" },
  { name: "tertiary", displayName: "Tertiary Color", value: "#f2f2f2", type: "color" },
];
