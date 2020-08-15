window.onload = () => {
    axios.get('https://raphahf6.github.io/Mercado/db.json')
.then(response => {
    const api = response.data
    const {hamburgueres, bebidas} = api
    console.log(bebidas, bebidas)
    
})
}



