import { ContactCard } from "@/components/cardContacts";
import { AddContactModal } from "@/components/modal";
import { contactData } from "@/schemas/cards.schemas";
import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaPlus } from "react-icons/fa";

interface inputContact{
  fullName: string,
  email: string,
  phone: string,
}

const Dashboard = () => {
  const [contacts, setContacts] = useState<contactData[]>([
    {
      id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "123456789",
      clientId: "ajd8iud8901u01i9i9i131",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987654321",
      clientId: "ajd8iud8901u01i9i9i131",
    },
  ]);

  const handleDeleteContact = (id: string) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (id: string, editedContact: contactData) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => (contact.id === id ? editedContact : contact))
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar
        </button>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
          ))}
        </ul>
      </main>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
