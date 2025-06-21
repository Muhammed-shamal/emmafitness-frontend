import { baseUrl } from "./constant";


const PostAPI = async ({ URI, Data = {}, isTop = false, API_TOKEN = null }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // const token = localStorage.getItem('token')

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const body = JSON.stringify(isTop ? Data : { data: Data });

    const result = await fetch(`${baseUrl}/api/${URI}`, {
      method: 'POST',
      headers,
      body,
    });

    if (!result.ok) {
      const errorData = await result.json();
      console.log('errorData',errorData)
      throw new Error(errorData?.error?.message || result.statusText);
    }

    return await result.json();
  } catch (err) {
    console.error("postApi error:", err);
    return { error: true, message: err.message }; // return better error object
  }
};

export default PostAPI