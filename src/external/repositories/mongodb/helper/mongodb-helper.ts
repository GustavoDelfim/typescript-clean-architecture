import { MongoClient, Collection } from 'mongodb'

interface MongoHelperInterface {
  client: null | MongoClient
  connect (uri: string): Promise<void>
  disconnect (): Promise<void>
  getCollection (name: string): Collection | null
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
  getCollection (name: string): Collection | null {
    if (!this.client) return null
    return this.client?.db().collection(name)
  },
  clearCollection (name: string): void {
    this.client?.db().collection(name).deleteMany({})
  }
}
