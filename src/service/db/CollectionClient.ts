import Client from '../../core/Client';
import ClientRepository from '../../core/ClientRepository';
import firebase from '../config';

export default class CollectionClient implements ClientRepository {
  #transform = {
    toFirestore(client: Client) {
      return {
        name: client.name,
        age: client.age,
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): Client {
      const dados = snapshot.data(options);
      return new Client(dados.name, dados.age, snapshot.id);
    },
  };

  async create(client: Client): Promise<Client> {
    if (client?.id) {
      await this.colletion().doc(client.id).set(client);
      return client;
    } else {
      const docRef = await this.colletion().add(client);
      const doc = await docRef.get();
      return doc.data();
    }
  }

  async delete(client: Client): Promise<void> {
    return this.colletion().doc(client.id).delete();
  }

  async list(): Promise<Client[]> {
    const query = await this.colletion().get();
    return query.docs.map((doc) => doc.data()) ?? [];
  }

  private colletion() {
    return firebase
      .firestore()
      .collection('clients')
      .withConverter(this.#transform);
  }
}
