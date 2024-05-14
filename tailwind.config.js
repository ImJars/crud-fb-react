/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
          "primary": "#0C1222",
          "secondary": "#0F172A",
          "table-color": "#161E31",
          "text-general": "#909EB2",
          "text-purple": "#8B5CF6",
          "text-blue": "#60A5FA",
          "text-white-gray": "#CBD5E1",
        },
      },
  },
  plugins: [],
};
