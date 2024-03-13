module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#28273f",
        gray: {
          100: "#f7f7f7",
          200: "#f1f1f1",
          300: "#e0e0e0",
          400: "#A09FAD",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "15px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "40px",
        "5xl": "46px",
      },
      fontFamily: {
        sans: ["CoFo Sans", "sans-serif"],
        serif: ["CoFo Robert", "serif"],
      },
      lineHeight: { tight: 1.25, normal: 1.33, relaxed: 1.5 },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
