const contenedorTarjetas = document.querySelector(".tarjetas")
const tablaInfoPokemon = document.querySelector("#tabla-resultados")

console.log(contenedorTarjetas)
// Paginado
const firstPage = document.getElementById("first-page")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const lastPage = document.getElementById("last-page")

//Buscador
const searchForm = document.getElementById("serch-form")
const searchInput = document.getElementById("search-input")

const paginadoBusqueda = document.getElementById("paginado-busqueda")
const firstPageBusqueda = document.getElementById("first-page-busqueda")
const prevBusqueda = document.getElementById("prev-busqueda")
const nextBusqueda = document.getElementById("next-busqueda")
const lastPageBusqueda = document.getElementById("last-page-busqueda")


let paginaActual = 1
let ultimaPagina = 0

const urlPokemon = async () => {    
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=12&page=${paginaActual}`)
    const data = await respuesta.json()
    console.log(data)
    console.log(data.data)
    contenedorTarjetas.innerHTML = aHTML(data) 
    console.log(data.data[0].resistances[0].type) 
    console.log(tablasHTML(data))
    tablaInfoPokemon.innerHTML = tablasHTML(data)
    console.log(data.data[0])

   
    
    contenedorTarjetas.innerHTML = aHTML(data)     
}    

urlPokemon()

const fetchBusquedaPokemon = async () => {
    
}

const aHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <div class="item" id="${elemento.id}">
        <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
    }, "")
    
    return arrayAHtml
} 

// Paginado

firstPage.onclick = () => {
    paginaActual = 1
    firstPage.disabled = true
    prev.disabled = true
    next.disabled = false
    lastPage.disabled = false
    urlPokemon()
}

next.onclick = () => {
    paginaActual++ 
    firstPage.disabled = false
    prev.disabled = false
     if (paginaActual === 1441) {
      next.disabled = true
      lastPage.disabled = true
    } 
    urlPokemon()
}

prev.onclick = () => {
    paginaActual--
    next.disabled = false
    lastPage.disabled = false
    if (paginaActual === 1) {
        prev.disabled = true
        firstPage.disabled = true
    }
    urlPokemon()
}

const tablasHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <tbody>
            <tr>
                <td>${elemento.name}</td>
                <td>${elemento.nationalPokedexNumbers}</td>
                <td>${elemento.set.name}</td>
                <td>${elemento.rarity}</td>
                <td>${elemento.types[0]}</td>
                <td>${elemento.subtypes[0]}</td>
                <td>${elemento.resistances && elemento.resistances.length && elemento.resistances[0].type ? elemento.resistances[0].type : "None"}</td>
                <td>${elemento.weaknesses && elemento.weaknesses.length && elemento.weaknesses[0].type ? elemento.weaknesses[0].type : "None"}</td>            
            </tr>
        </tbody>
        `
    }, `<thead>
           <tr>
                <th>Name</th>
                <th>N.Pokedex</th>
                <th>Set</th>
                <th>Rarity</th>
                <th>Types</th>
                <th>Subtypes</th>
                <th>Resistances</th>
                <th>Weaknesses</th>
            </tr>
        </thead> `
    )

    return arrayAHtml
}


lastPage.onclick = () => {
    paginaActual = 1441
    prev.disabled = false
    firstPage.disabled = false
    if (paginaActual === 1441) {
        next.disabled = true
        lastPage.disabled = true
    }
    urlPokemon()
}

//Búsqueda 

let busquedaPorInput = ""

const inputBusquedaPokemon = async () => {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${busquedaPorInput}&pageSize=10&page=${paginaActual}`)
    const data = await res.json()
    contenedorTarjetas.innerHTML = aHTML(data)
}

searchForm.onsubmit = (e) => {
    e.preventDefault() 
    busquedaPorInput = searchInput.value
    inputBusquedaPokemon()

}

