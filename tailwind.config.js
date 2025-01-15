/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			appleGreen: 'rgb(97, 67, 133, 0.5)',


  },
  plugins: [
    require('daisyui'),
    
    
],
}
  }
}

