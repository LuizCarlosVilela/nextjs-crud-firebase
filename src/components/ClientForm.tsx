import { useState } from 'react';
import Client from '../core/Client';
import Button from './Button';
import Input from './Input';

interface ClientFormProps {
  client: Client;
  handleCancel?: () => void;
  handleUpdate?: (client: Client) => void;
}

export default function ClientForm(props: ClientFormProps) {
  const id = props.client?.id ?? null;

  const [name, setName] = useState(props.client?.name ?? '');
  const [age, setAge] = useState(props.client?.age ?? 0);
  return (
    <div>
      {id ? <Input isView title="Código" value={id} className="mb-5" /> : false}
      <Input title="Nome" value={name} onChange={setName} className="mb-5" />
      <Input title="Idade" type="number" value={age} onChange={setAge} />

      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={() => props.handleUpdate?.(new Client(name, +age, id))}
        >
          {id ? 'Alterar' : 'Salvar'}
        </Button>
        <Button onClick={props.handleCancel}>Cancelar</Button>
      </div>
    </div>
  );
}
