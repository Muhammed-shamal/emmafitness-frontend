import { baseUrl } from "./constant";

const deleteApi = async ({ URI, token }) => {
  try {
    if (!token) throw new Error("Invalid token");

    const result = await fetch(`${baseUrl}/api/${URI}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!result.ok) {
      const errorData = await result.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `Bad response: ${result.status}`);
    }

    return await result.json();
  } catch (err) {
    console.error("deleteApi error:", err);
    throw err;
  }
};

export default deleteApi
