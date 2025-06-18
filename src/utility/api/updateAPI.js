import { baseUrl } from "./constant";

const updateApi = async ({ URI, Data = {}, isTop = false, token }) => {
  try {
    if (!token) throw new Error("Invalid token");

    const result = await fetch(`${baseUrl}/api/${URI}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(isTop ? Data : { data: Data })
    });

    if (!result.ok) {
      const errorData = await result.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `Bad response: ${result.status}`);
    }

    return await result.json();
  } catch (err) {
    console.error("updateApi error:", err);
    throw err;
  }
};

export default updateApi