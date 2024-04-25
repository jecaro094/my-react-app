export interface UrlParams {
  protocol: string
  port: string
  domain: string
  path?: string
  queryParams?: Array<{ key: string; value: string }>
}
