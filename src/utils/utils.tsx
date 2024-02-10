
const API_PORT = '80'
const API_PATH = 'weather'
const API_HOST = '127.0.0.1'

const AWS_URL = 'http://beanstalk-app2-env.eba-2mgkj2d6.eu-west-2.elasticbeanstalk.com';
const LOCAL_URL = 'http://127.0.0.1';

interface UrlParams {
    protocol: string;
    port: string;
    domain: string;
    path?: string;
    queryParams?: Array<{ key: string; value: string }>;
  }
  
function buildCustomUrl(params: UrlParams): string {
    const { protocol, port, domain, path = '/', queryParams = [] } = params;
  
    // Construct the base URL
    let url = `${protocol}://${domain}:${port}${path}`;
  
    // Append query parameters if any
    const queryString = queryParams
      .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  
    if (queryString) {
      url += `?${queryString}`;
    }
  
    return url;
}
  
  // Example usage:
//   export const myUrl = buildCustomUrl({
//     protocol: 'http',
//     port: API_PORT,
//     domain: API_HOST,
//     path: '/',
//   });

  
  export function get_url(city_name: string){
    return buildCustomUrl({
        protocol: 'http',
        port: API_PORT,
        domain: API_HOST,
        path: '/weather',
        queryParams: [
          { key: 'city_name', value: city_name },
        ],
      })
  }
//   console.log(myUrl);
  