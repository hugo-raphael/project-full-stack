import { contactData } from "@/schemas/cards.schemas";
import { useState } from "react";

interface Contact {
  clientId: string;
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onEdit: (id: string, editedContact: contactData) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onDelete,
  onEdit,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState<contactData>({
    id: contact.id,
    fullName: contact.fullName,
    email: contact.email,
    phone: contact.phone,
    clientId: contact.clientId
  });

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    // Perform edit action
    onEdit(contact.id, editedContact);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Perform delete action
    onDelete(contact.id);
    setIsDeleteModalOpen(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <li className="bg-white rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-xl mb-2">{contact.fullName}</h3>
      <p className="text-gray-600 mb-2">{contact.email}</p>
      <p className="text-gray-600 mb-4">{contact.phone}</p>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
          onClick={handleEditClick}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          onClick={handleDeleteClick}
        >
          Excluir
        </button>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-5 z-50 flex justify-center items-center">
          <div className="modal bg-white w-90vw md:w-500px p-6">
            <h2 className="text-xl mb-4">Editar Contato</h2>
            <form className="flex flex-col" onSubmit={handleEditSubmit}>
              <div className="mb-4 flex flex-col">
                <label htmlFor="fullName" className="text-black">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={editedContact.fullName}
                  onChange={handleEditInputChange}
                  className="border border-black rounded p-2"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="email" className="text-black">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedContact.email}
                  onChange={handleEditInputChange}
                  className="border border-black rounded p-2"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="phone" className="text-black">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedContact.phone}
                  onChange={handleEditInputChange}
                  className="border border-black rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-2"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-5 z-50 flex justify-center items-center">
          <div className="modal bg-white w-90vw md:w-500px p-6">
            <h2 className="text-xl mb-4">Excluir Contato</h2>
            <p className="text-black">Deseja realmente excluir o contato {contact.fullName}?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleDeleteConfirm}
              >
                Excluir
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};
