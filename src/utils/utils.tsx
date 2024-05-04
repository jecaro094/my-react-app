import { UrlParams, QueryParams } from '../interfaces/urlParams'

const API_PORT = '80'
const AWS_HOST = 'Python-app-1-env.eba-yvhiu7pc.eu-west-2.elasticbeanstalk.com'
const LOCAL_HOST = '127.0.0.1'

const API_HOST = LOCAL_HOST

const DROPDOWN_OPTIONS_WEATHER = [
  'Helsinki',
  'Amsterdam',
  'London',
  'Seville',
  'Malaga',
  'Madrid',
  'Barcelona',
]
const DROPDOWN_OPTIONS_POKEMON = ['127', '2', '63']

export const PKMN_TABLE_COLS = [
  'sprite',
  'name',
  'type_1',
  'type_2',
  'hp',
  'attack',
  'special attack',
  'defense',
  'special defense',
  'speed',
]

export const DROPDOWN_OPTIONS = DROPDOWN_OPTIONS_POKEMON

// type QueryParam = UrlParams['queryParams']

// Builds custom URL based on url params, given by parameter.
function buildCustomUrl(params: UrlParams): string {
  const { protocol, port, domain, path = '/', payload = {} } = params

  // Construct the base URL
  let url = `${protocol}://${domain}:${port}${path}`

  // Append query parameters if any
  const queryString = Object.entries(payload)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')

  if (queryString) {
    url += `?${queryString}`
  }

  return url
}

export function get_url(params: QueryParams) {
  const { offset, limit, text } = params
  return buildCustomUrl({
    protocol: 'http',
    port: API_PORT,
    domain: API_HOST,
    path: '/pokemon',
    payload: { offset: offset, limit: limit, text: text },
  })
}
