export interface UrlParams {
  protocol: string
  port: string
  domain: string
  path?: string
  payload?: Record<string, string | number>
}

export interface QueryParams{
  path: string
  offset?: number
  limit?: number
  text?: string
}