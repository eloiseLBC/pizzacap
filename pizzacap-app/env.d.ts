/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Ajoute ici d'autres variables VITE_ si besoin
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  