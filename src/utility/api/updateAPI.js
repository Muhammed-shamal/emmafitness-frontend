import { baseUrl } from "./constant";

const updateApi = async ({ URI, Data = {}, isTop = false, token }) => {
  if (!token) throw new Error("Invalid token");

  const result = await fetch(`${baseUrl}/api/${URI}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(isTop ? Data : { data: Data }),
  });

  if (!result.ok) {
    let message = "Something went wrong.";
    try {
      const errorData = await result.json();
      message = errorData?.message || result.statusText;
      console.log('Error response:', errorData);
    } catch (_) {
      message = result.statusText;
      console.log('Error parsing response:', _);
    }
    throw new Error(message);
  }

  return await result.json();
};

export default updateApi;
