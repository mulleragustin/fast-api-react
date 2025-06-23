import React, { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import LogoutButton from "../components/LogoutButton";
import ThemeButton from "../components/ThemeButton";

const Home: React.FC<{ token: string | null; handleLogout: () => void }> = ({
  token,
  handleLogout,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [username, setUsername] = useState("");
  const [loadingMensaje, setLoadingMensaje] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res: AxiosResponse<{ message: string }>) => {
        setMensaje(res.data.message);
      })
      .catch(() => {
        setMensaje("No se pudo conectar con el backend");
      })
      .finally(() => setLoadingMensaje(false));
  }, []);

  useEffect(() => {
    if (!token) {
      setUsername("Token no encontrado");
      setLoadingUser(false);
      return;
    }

    axios
      .get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername("No se pudo obtener información del usuario");
      })
      .finally(() => setLoadingUser(false));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4">
      <div className="absolute top-0 right-0 p-4 m-4">
        <LogoutButton onLogout={handleLogout} />
      </div>

      <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">
        Bienvenido al Home
      </h1>
      <p className="text-lg text-blue-700 dark:text-blue-200 mb-2">
        Esta es una vista protegida. Solo usuarios autenticados pueden verla.
      </p>

      <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded shadow text-blue-900 dark:text-white min-h-[40px] flex items-center justify-center w-full max-w-md">
        {loadingMensaje ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
            Cargando mensaje
          </span>
        ) : (
          mensaje
        )}
      </div>

      <div className="mt-4 p-4 bg-orange-400 dark:bg-orange-950 rounded shadow text-blue-900 dark:text-white min-h-[40px] flex items-center justify-center w-full max-w-md">
        {loadingUser ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
            Cargando usuario
          </span>
        ) : (
          username
        )}
      </div>

      <div className="mt-6">
        <ThemeButton />
      </div>

      <h1 className="mt-4 text-lg">Prueba modo oscuro</h1>
    </div>
  );
};

export default Home;
