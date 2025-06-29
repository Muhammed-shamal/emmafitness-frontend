import { baseUrl } from "./constant";

const deleteApi = async ({ URI, token }) => {
  if (!token) throw new Error("Invalid token");

  const result = await fetch(`${baseUrl}/api/${URI}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!result.ok) {
    let message = "Something went wrong.";
    try {
      const errorData = await result.json();
      message = errorData?.message || result.statusText;
    } catch (_) {
      message = result.statusText;
    }
    throw new Error(message);
  }

  console.log('Delete API response:', result);
  return await result.json();
};

export default deleteApi;
