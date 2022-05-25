import { HttpRequest, HttpResponse } from '.'

export interface WebController {
  handle (request: HttpRequest): Promise<HttpResponse>
}
