import { ContactCard } from "@/components/cardContacts";
import { AddContactModal } from "@/components/modal";
import { contactData } from "@/schemas/contacts.schemas";
import { userData } from "@/schemas/users.schemas";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaPlus } from "react-icons/fa";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

interface inputContact {
  fullName: string;
  email: string;
  phone: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState<contactData[]>([]);

  const handleDeleteContact = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleEditContact = (id: string, editedContact: contactData) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? editedContact : contact
      )
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          const userId = decodedToken?.sub;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await api.get<userData>(`/users/${userId}`, config);
          setContacts(response.data.contacts);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <header className="flex items-center justify-between py-4 px-6 bg-gray-800 text-white">
        <h2 className="text-2xl">Dashboard - Contacts</h2>
        <div className="flex items-center">
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                const decodedToken = jwt.decode(token);
                const userId = decodedToken?.sub;
                router.push(`/profile/?=${userId}`);
              }
            }}
            className="flex items-center text-white text-sm focus:outline-none mr-4"
          >
            <FaUser className="mr-2" />
            Perfil
          </button>
          <button
            className="flex items-center text-white text-sm focus:outline-none"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
          >
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

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   const config = {
//     headers: {
//       Authorization: `Bearer`,
//     },
//   };

//   const response = await api.get<userData>(`/users/:id`);

//   return {
//     props: { contacts: response.data },
//   };
// };

export default Dashboard;
