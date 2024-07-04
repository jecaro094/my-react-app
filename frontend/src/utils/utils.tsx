import { UrlParams, QueryParams } from '../interfaces/urlParams'

const API_PORT = '8000'
// const AWS_HOST = 'test-env.eba-hmsbvcs5.eu-west-2.elasticbeanstalk.com/api'
const AWS_HOST = 'back/api'
const LOCAL_HOST = 'localhost/api'

const API_HOST = AWS_HOST

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
  // 'hp',
  // 'attack',
  // 'special attack',
  // 'defense',
  // 'special defense',
  // 'speed',
]

export const DROPDOWN_OPTIONS = DROPDOWN_OPTIONS_POKEMON

// type QueryParam = UrlParams['queryParams']

// Builds custom URL based on url params, given by parameter.
function buildCustomUrl(params: UrlParams): string {
  const { protocol, domain, path = '/', payload = {} } = params

  // Construct the base URL
  let url = `${protocol}://${domain}${path}`

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
  const { path, offset, limit, text } = params;
  const hasPayload = offset !== undefined || limit !== undefined || text !== undefined;

  return buildCustomUrl({
    protocol: 'http',
    // port: API_PORT,
    domain: API_HOST,
    path: path,
    ...(hasPayload && {
      payload: { 
        ...(offset !== undefined && { offset: offset }),
        ...(limit !== undefined && { limit: limit }),
        ...(text !== undefined && { text: text }),
      },
    }),
  });
}
