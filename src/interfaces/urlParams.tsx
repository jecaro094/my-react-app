export interface UrlParams {
  protocol: string
  port: string
  domain: string
  path?: string
  payload?: Record<string, string | number>
}
