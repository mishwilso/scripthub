/** @type {import('tailwindcss')} */
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
          dark: "#7A6757",
        },
        accent: {
          rose: "#A46278",
        },
        neutral: {
          light: "#E6DBCD",
          dark: "#7E7065",
        },
        background: {
          light: "#FEFCF9",
          dark: "#FEFBF8",
          input: "#E2D9CE",
        },
        outline: {
          light: "#EDE7E5",
        },
      },
      fontFamilly: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};
