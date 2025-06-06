import { baseUrl } from './constant';

const fetchApi = async ({ URI, API_TOKEN = null, revalidate = 3 }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };

    // Only add Authorization if API_TOKEN is provided
    if (API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN}`;
    }

    const result = await fetch(`${baseUrl}/api/${URI}`, {
      method: "GET",
      next: { revalidate },
      headers,
    });

    console.log("Result:", result);

    if (!result.ok) {
      throw new Error(`Fetch failed: ${result.statusText}`);
    }

    return await result.json();
  } catch (err) {
    console.error("fetchApi error:", err);
    return null;
  }
};

export default fetchApi;
