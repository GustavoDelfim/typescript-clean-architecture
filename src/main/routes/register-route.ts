import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'

import { makeRegisterAndSendEmailUserController } from '@/main/factories'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterAndSendEmailUserController()))
}
