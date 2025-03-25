"use client";

import { useTheme } from "./theme-provider";
import ThemeToggle from "./ThemeToggle";

export default function ThemeExample() {
  const { theme } = useTheme();
  
  return (
    <div className="p-6 max-w-md mx-auto my-8 rounded-xl shadow-md bg-white dark:bg-gray-800 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-black dark:text-white">
            Ejemplo de Modo Oscuro
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            El tema actual es: {theme}
          </p>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="mt-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">
            Este es un ejemplo de cómo usar Tailwind CSS con modo oscuro.
            Los elementos se adaptan automáticamente al tema seleccionado.
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
            Componente azul
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded">
            Componente púrpura
          </div>
        </div>
      </div>
    </div>
  );
}