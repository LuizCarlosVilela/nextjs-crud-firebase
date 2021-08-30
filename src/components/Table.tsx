import Client from '../core/Client';
import { IconDelete, IconEdit } from './Icons';

interface TableProps {
  clients: Client[];
  handleClient?: (client: Client) => void;
  deleteClient?: (client: Client) => void;
}

export default function Table(props: TableProps) {
  const viewActions = props.handleClient || props.deleteClient;

  function renderTableHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {viewActions ? <th className="p-4">Ações</th> : false}
      </tr>
    );
  }

  function renderTableBody() {
    return props.clients?.map((client, i) => (
      <tr
        key={client.id}
        className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
      >
        <td className="text-left p-4">{client.id}</td>
        <td className="text-left p-4">{client.name}</td>
        <td className="text-left p-4">{client.age}</td>
        {viewActions ? renderActions(client) : false}
      </tr>
    ));
  }

  function renderActions(client: Client) {
    return (
      <td className="flex justify-center">
        {props.handleClient ? (
          <button
            onClick={() => props.handleClient?.(client)}
            className="flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1"
          >
            {IconEdit}
          </button>
        ) : (
          false
        )}

        {props.deleteClient ? (
          <button
            onClick={() => props.deleteClient?.(client)}
            className="flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1"
          >
            {IconDelete}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="text-gray-100  bg-gradient-to-r from-purple-500 to-purple-800">
        {renderTableHeader()}
      </thead>

      <tbody>{renderTableBody()}</tbody>
    </table>
  );
}
