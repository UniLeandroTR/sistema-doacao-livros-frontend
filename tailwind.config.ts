import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #2563eb)",
        "primary-foreground": "var(--color-primary-foreground, #ffffff)",
        secondary: "var(--color-secondary, #f3f4f6)",
        "secondary-foreground": "var(--color-secondary-foreground, #1f2937)",
        accent: "var(--color-accent, #f5f5f5)",
        muted: "var(--color-muted, #9ca3af)",
        "muted-foreground": "var(--color-muted-foreground, #6b7280)",
        background: "var(--color-background, #ffffff)",
        foreground: "var(--color-foreground, #171717)",
        border: "var(--color-border, #e5e7eb)",
        ring: "var(--color-ring, #2563eb)",
      },
      borderRadius: {
        lg: "var(--radius-lg, 0.5rem)",
        md: "var(--radius-md, 0.375rem)",
        sm: "var(--radius-sm, 0.25rem)",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      spacing: {
        border: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
