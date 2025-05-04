import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: true, // this allows external access (important for ngrok)
    port: 3000,
    allowedHosts:["5571-2401-4900-484e-7411-ac15-50eb-65dc-1daa.ngrok-free.app"]       // Or any other port you're using
  }
})
