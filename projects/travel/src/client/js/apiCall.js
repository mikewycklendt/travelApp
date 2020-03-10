

const apiCall = async () =>{
    const res = await fetch('/');
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log(error)
    }
}

export { apiCall }