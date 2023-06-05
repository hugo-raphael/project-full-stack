import React from "react";
import { FaUser, FaSignOutAlt, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <header className="flex items-center justify-between py-4 px-6 bg-gray-800 text-white">
        <h2 className="text-2xl">Dashboard - Contacts</h2>
        <div className="flex items-center">
          <button className="flex items-center text-white text-sm focus:outline-none mr-4">
            <FaUser className="mr-2" />
            Perfil
          </button>
          <button className="flex items-center text-white text-sm focus:outline-none">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>
      <main className="py-6 px-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 focus:outline-none">
          Adicionar
        </button>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* tranformar isso em um component */}
          <li className="bg-white rounded-md p-4 shadow-md">
            {/* Conteúdo do card */}
          </li>
          <li className="bg-white rounded-md p-4 shadow-md">
            {/* Conteúdo do card */}
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
