/** @type {import('tailwindcss').Config} */ // Also fixed the type hint
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#B65733",
          dark: "#9F4D2F",
        },
        secondary: {
          base: "#617767",
          dark: "#5e4c3b",
        },
        accent: {
          rose: "#A46278",
        },
        neutral: {
          base: "#E6DBCD",
          light: "#F6F2ED",
          dark: "#7E7065",
        },
        white: {
          base: "#FFFFFF",
          light: "#FEFCF9",
          dark: "#FEFBF8",
          input: "#FAF7F2",
        },
        outline: {
          light: "#EDE7E5",
          input: "#E2D9CE",
        },
        negative: {
          base: "#C93218",
          light: "#FEF8F4",
        }
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      dropShadow: {
        primary: "0 0px 5px 5px rgba(241, 137, 102, 0.5)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};
