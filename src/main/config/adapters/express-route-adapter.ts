import { Request, Response } from 'express'
import { WebController, HttpRequest } from '@/web-controllers/ports'

export const adaptRoute = (controller: WebController) => {
  return async (req: Request, res: Response) => {
    const httpResquest: HttpRequest = {
      body: req.body
    }
    const httResponse = await controller.handle(httpResquest)
    res.status(httResponse.statusCode).json(httResponse.body)
  }
}
