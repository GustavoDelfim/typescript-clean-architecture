export interface UseCase {
  perform (reuqest: any): Promise<any>
}