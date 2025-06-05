
const deleteApi = async ({ URI,  token }) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${URI}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Host' : process.env.NEXT_PUBLIC_API_URL_NO_SSL,
                'Authorization': `Bearer ${token}`
            }
        })

        if (!result.ok) {
            const responseText = await result.text();
            console.error(`Response text: ${responseText}`);
            throw new Error(`Bad response: ${result.status}`);
        }
        return await result.json()
    } catch (err) {
        throw err
    }
}


export default deleteApi
