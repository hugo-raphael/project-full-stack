import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import jwt from "jsonwebtoken";
import html2pdf from "html2pdf.js";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  clientId: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registrationDate: Date;
  contacts: Contact[];
}

const Profile = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
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
          const response = await api.get<User>(`/users/${userId}`, config);
          setProfile(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchContacts();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedToken = jwt.decode(token);
        const userId = decodedToken?.sub;
        await api.patch(`/users/${userId}`, profile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedToken = jwt.decode(token);
        const userId = decodedToken?.sub;
        await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("token")
        router.push("/");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Perfil</h1>

      {profile ? (
        <>
          <div id="profile-content">
            <div>
              <label className="font-bold">Nome:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="block w-full border rounded px-3 py-2 mt-1 text-black"
                />
              ) : (
                <p>{profile.fullName}</p>
              )}
            </div>

            <div>
              <label className="font-bold">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="block w-full border rounded px-3 py-2 mt-1 text-black"
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>

            <div>
              <label className="font-bold">Telefone:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="block w-full border rounded px-3 py-2 mt-1 text-black"
                />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="font-bold">Senha:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  className="block w-full border rounded px-3 py-2 mt-1 text-black"
                />
              ) : (
                <p>{profile.password}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Editar
              </button>
            )}

            <button
              onClick={() => setIsEditing(false)}
              className="bg-white py-2 px-4 rounded text-black mr-2"
            >
              Cancelar
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Excluir
            </button>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 mt-10">Contatos</h2>
            {profile.contacts.map((contact: any) => {
              return (
                <div
                  key={contact.id}
                  className="border pd-1p min-w-1 max-w-sm rounded p-2 mt-5"
                >
                  <h3>Nome: {contact.fullName}</h3>
                  <p>Email: {contact.email}</p>
                  <p>Telefone: {contact.phone}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Carregando perfil...</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p className="text-black font-bold">
              Tem certeza que deseja excluir sua conta?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

/*


const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await api.patch('/profile', profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await api.delete('/profile');
      setIsModalOpen(false);
      // Redirecionar para a página inicial ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao excluir perfil:', error);
    }
  };

  const handleDownloadProfile = () => {
    // Lógica para baixar o perfil em PDF
    // Você pode usar bibliotecas como react-pdf para gerar o PDF
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile: any) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Perfil</h1>

      {profile ? (
        <>
          <div>
            <label className="font-bold">Nome:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="block w-full border rounded px-3 py-2 mt-1"
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>

          <div>
            <label className="font-bold">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="block w-full border rounded px-3 py-2 mt-1"
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>

          <div className="mt-4">
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Editar
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Excluir
            </button>
          </div>
        </>
      ) : (
        <p>Carregando perfil...</p>
      )}

      Modal de confirmação para excluir 
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Tem certeza que deseja excluir sua conta?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleDownloadProfile}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Baixar perfil em PDF
        </button>
      </div>
    </div>
  );
};

export default Profile;
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Coloque aqui o conteúdo do modal de edição 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleUpdateUser}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza de que deseja excluir sua conta?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteModalClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Excluir Conta
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAddContactModal} onHide={handleAddContactModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Contato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                onClick={handleAddContactModalClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                Fechar
              </button>
            </form>
          </Modal.Body>
        </Modal>*/
