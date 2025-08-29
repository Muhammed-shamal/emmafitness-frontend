import { baseUrl } from './constant';

const fetchApi = async ({ URI, API_TOKEN = null, revalidate = 3 }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const res = await fetch(`${baseUrl}/api/${URI}`, {
    method: "GET",
    next: { revalidate },
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message = errorBody.message || res.statusText;
    throw new Error(`Fetch failed: ${message}`);
  }
  
  return await res.json();
};

export default fetchApi;
