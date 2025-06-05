

const updateApi = async ({ URI, Data={} , isTop=false, token = undefined}) => {
    try {
        if(!token) throw new Error("Invalid token")
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${URI}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( isTop ?  Data : {
                 data: Data
            })
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


export default updateApi