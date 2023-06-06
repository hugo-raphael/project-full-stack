import { contactData } from "@/schemas/cards.schemas";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormContactData {
  fullName: string;
  email: string;
  phone: string;
  clientId: string;
}

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormContactData>({
    fullName: "",
    email: "",
    phone: "",
    clientId: "1akcnCSJIANc31cnciISJHNciasc",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    console.log(formData)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      clientId: "1akcnCSJIANc31cnciISJHNciasc",
    });
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-5 x z-50 flex justify-center items-center">
          <div className="modal bg-white w-90vw rounded md:w-700px p-6">
            <h2 className="text-xl mb-4 text-black font-bold">
              Adicionar Contato
            </h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col">
                <label htmlFor="fullName" className="text-black">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="border border-black rounded p-2 text-gray-800"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-black rounded p-2 text-gray-800"
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-black rounded p-2 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-2"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
