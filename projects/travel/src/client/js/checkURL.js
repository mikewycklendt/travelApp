let checkURL = async()=>{
    const res = await fetch('/sentiment');
    try {
        const polarity = await res.json();
        console.log(polarity)
        if (polarity.polarity === 'enter a valid URL'){
            alert("Enter a valid URL")
        }
    }catch(error){
        console.log(error)
    }
};

export { checkURL }