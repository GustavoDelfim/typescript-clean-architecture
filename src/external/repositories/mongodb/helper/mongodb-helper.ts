import { MongoClient, Collection } from 'mongodb'

interface MongoHelperInterface {
  client: null | MongoClient
  connect (uri: string): Promise<void>
  disconnect (): Promise<void>
  getCollection<T = any> (name: string): Collection<T> | null
  clearCollection (name: string): void
}

export const MongoHelper: MongoHelperInterface = {
  client: null,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client?.close()
  },
  getCollection<T = any> (name: string): Collection<T> | null {
    if (!this.client) return null
    return this.client?.db().collection(name)
  },
  async clearCollection (name: string): Promise<void> {
    this.client?.db().collection(name).deleteMany({})
  }
}
