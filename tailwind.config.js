// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      keyframes: {
        updatable: {
          "0%":   { backgroundImage: "url('/cbtis258_1.webp')" },
          "10%":  { backgroundImage: "url('/cbtis258_2.webp')" },
          "15%":  { backgroundImage: "url('/cbtis258_3.webp')" },
          "21%":  { backgroundImage: "url('/cbtis258_4.webp')" },
          "26%":  { backgroundImage: "url('/cbtis258_5.webp')" },
          "31%":  { backgroundImage: "url('/cbtis258_6.webp')" },
          "36%":  { backgroundImage: "url('/cbtis258_7.webp')" },
          "42%":  { backgroundImage: "url('/cbtis258_8.webp')" },
          "52%":  { backgroundImage: "url('/cbtis258_10.webp')" },
          "57%":  { backgroundImage: "url('/cbtis258_11.webp')" },
          "63%":  { backgroundImage: "url('/cbtis258_12.webp')" },
          "68%":  { backgroundImage: "url('/cbtis258_13.webp')" },
          "73%":  { backgroundImage: "url('/cbtis258_14.webp')" },
          "79%":  { backgroundImage: "url('/cbtis258_15.webp')" },
          "84%":  { backgroundImage: "url('/cbtis258_16.webp')" },
          "95%":  { backgroundImage: "url('/cbtis258_18.webp')" },
          "100%": { backgroundImage: "url('/cbtis258_19.webp')" },
        }
      },

      animation: {
        updatable: "updatable 150s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
