import { baseUrl } from './constant'

const fetchApi = async ({ URI, API_TOKEN }) => {
  try {
    const result = await fetch(`${baseUrl}/api/${URI}`, {
      method: "GET",
      next: { revalidate: 3 },
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    console.log("result is",result)

    if (!result.ok) {
      throw new Error(`Fetch failed: ${result.statusText}`);
    }

    return await result.json();
  } catch (err) {
    console.error("fetchApi error:", err);
    return null;
  }
};


// export const dynamic = 'force-dynamic'
export default fetchApi