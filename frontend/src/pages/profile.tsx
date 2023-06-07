import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  contacts: Contact[];
}

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Perfil de {user.fullName}</h1>
      <p>E-mail: {user.email}</p>

      <h2>Contatos</h2>
      <ul>
        {user.contacts.map((contact) => (
          <li key={contact.id}>
            <p>Nome: {contact.fullName}</p>
            <p>E-mail: {contact.email}</p>
            <p>Telefone: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Profile;