import 'dotenv/config'
import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

console.log(process.env.MONGO_URL)

MongoHelper.connect(process.env.MONGO_URL || '')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(5000, () => console.log('Server running at port :5000'))
  })
  .catch(console.error)
