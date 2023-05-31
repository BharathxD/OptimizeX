module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
      keyframes: {
        "border-expand": {
          "0%": {
            width: 0,
          },
          "50%": {
            width: "100%",
          },
          "100%": {
            width: 0,
          },
        },
      },
      animation: {
        "border-expand": "border-expand 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
