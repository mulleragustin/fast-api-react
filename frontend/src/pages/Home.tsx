import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Bienvenido al Home</h1>
      <p className="text-lg text-blue-700">Esta es una vista protegida. Solo usuarios autenticados pueden verla.</p>
    </div>
  );
};

export default Home;
