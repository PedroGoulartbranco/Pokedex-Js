function pesquisa_pokemon(event) {
    event.preventDefault();

    let nome_pokemon = event.target.nome_pokemon.value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)
    
        .then(response => response.json())
    
        .then(data => {
            console.log(data.height)
        })
    
        .catch(error => console.log(error));
}

function carregar_todos_pokemons() {
    const div_pokemon = document.getElementById("pokemons_div"); //Pega a div que vai colocar os pokemons
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    
        .then(response => response.json())
    
        .then(data => {
            const lista_pokemons = data.results; //Coloca todos os dados dentro de uma lista
            div_pokemon.innerHTML = '' //Reseta a div
            lista_pokemons.forEach(pokemon => {
                const div = document.createElement("div") //Cria uma div para colocar o pokemon denteo
                div.style.backgroundColor = "white"
                div.style.width = "30vh"
                div.style.height = "30vh"
                div.style.margin = "2vh"
                div.style.borderRadius = "10px"
                div.style.textAlign = "center"
                fetch(pokemon.url)
                
                    .then(response => response.json())
                
                    .then(data => {

                        /* div.textContent = data.sprites.front_default //Escreve dentro da div
                        div_pokemon.appendChild(div) //Adiciona dentro da div princiapl */
                        div.innerHTML = `<h4><img src="${data.sprites.front_default}" width="75%" height= "75%";></h4> <br> <h5> #${data.id} <br> ${pokemon.name}</h5>`;
                        div_pokemon.appendChild(div)
                    })

                
                    .catch(error => console.log(error));
            });
        })
    
        .catch(error => console.log(error));
}

window.onload = carregar_todos_pokemons;
