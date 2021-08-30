import Table from '../components/Table';
import Layout from './../components/Layout';
import Button from './../components/Button';
import Client from './../core/Client';
import ClientForm from './../components/ClientForm';
import { useEffect, useState } from 'react';
import ClienteRepository from '../core/ClientRepository';
import CollectionClient from '../service/db/CollectionClient';

export default function Home() {
  const repo: ClienteRepository = new CollectionClient();

  const [client, setClient] = useState<Client>(Client.vazio());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<'table' | 'form'>('table');

  useEffect(getAll, []);

  function getAll() {
    repo.list().then((clients) => {
      setClients(clients);
      setVisible('table');
    });
  }

  function handleClient(client: Client) {
    setClient(client);
    setVisible('form');
  }

  async function deleteClient(client: Client) {
    await repo.delete(client);
    getAll();
  }

  async function updateClient(client: Client) {
    await repo.create(client);
    getAll();
  }

  function newClient() {
    setClient(Client.vazio());
    setVisible('form');
  }

  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-400
      text-white
    `}
    >
      <Layout title="Cadastro Simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4" onClick={newClient}>
                Novo Cliente
              </Button>
            </div>
            <Table
              clients={clients}
              handleClient={handleClient}
              deleteClient={deleteClient}
            />
          </>
        ) : (
          <ClientForm
            client={client}
            handleCancel={() => setVisible('table')}
            handleUpdate={updateClient}
          />
        )}
      </Layout>
    </div>
  );
}
