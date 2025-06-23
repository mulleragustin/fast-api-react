import React, { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import LogoutButton from "../components/LogoutButton";

const Home: React.FC<{ token: string | null; handleLogout: () => void }> = ({
  token,
  handleLogout,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res: AxiosResponse<{ message: string }>) =>
        setMensaje(res.data.message)
      )
      .catch(() => setMensaje("No se pudo conectar con el backend"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token) return; // No intentes pedir /auth/me si no hay token

    axios
      .get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsername(res.data.username))
      .catch(() => setUsername("No se pudo obtener información del usuario"));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Bienvenido al Home
      </h1>
      <p className="text-lg text-blue-700 mb-2">
        Esta es una vista protegida. Solo usuarios autenticados pueden verla.
      </p>
      <div className="mt-4 p-4 bg-white rounded shadow text-blue-900 min-h-[40px] flex items-center justify-center">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
            Cargando
          </span>
        ) : (
          mensaje
        )}
      </div>
      <div className="mt-4 p-4 bg-orange-400 rounded shadow text-blue-900 min-h-[40px] flex items-center justify-center">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
            Cargando
          </span>
        ) : (
          username
        )}
      </div>
      <div className="absolute top-0 right-0 p-4 m-4">
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Home;
