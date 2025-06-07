
function useFilter() {
    const createQuery =({params})=>{
        const filter = []
        params.forEach((value, key)=>{
            filter.push(`${key}=${value}`)
        })
    return filter.join('&')     
  }
  return createQuery

}

export default useFilter