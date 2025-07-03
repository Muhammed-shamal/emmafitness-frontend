import { baseUrl } from "./constant";

const PostAPI = async ({ URI, Data = {}, isTop = false, API_TOKEN }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }
  console.log('data sending to server',Data)

  const body = JSON.stringify(isTop ? Data : { data: Data });

  const result = await fetch(`${baseUrl}/api/${URI}`, {
    method: 'POST',
    headers,
    body,
  });

  // 🔴 Throw error if not OK
  if (!result.ok) {
    let errorMessage = 'Something went wrong.';
    try {
      const errorData = await result.json();
      errorMessage = errorData?.message || result.statusText;
    } catch (_) {
      errorMessage = result.statusText;
    }
    throw new Error(errorMessage);
  }

  console.log('Post API response:', result);
  return await result.json();
};

export default PostAPI;
