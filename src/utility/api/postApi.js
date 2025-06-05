

const PostAPI = async ({ URI, Data={} , isTop = false, token = undefined}) => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${URI}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Host' : process.env.NEXT_PUBLIC_API_URL_NO_SSL,
                'Authorization': `Bearer ${token ? token : process.env.NEXT_PUBLIC_API_TOKEN}`
            },
            body: JSON.stringify(isTop ? Data: {
                 data: Data
            })
        })
        
      
         return await result.json()
    } catch (err) {
        console.log(err)
        throw err
    }
}


export default PostAPI