import Client from './Client';

export default interface ClienteRepository {
  create(client: Client): Promise<Client>;
  delete(client: Client): Promise<void>;
  list(): Promise<Client[]>;
}
