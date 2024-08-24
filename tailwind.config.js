/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'surfing': "url('/images/surfing-min.jpg')", // Ensure you have an image named 'surfing.jpg' in the public/images directory
      },
    },
  },
  plugins: [],
};
