let lista_todos_pokemons = []

function pesquisa_pokemon(event) {
    event.preventDefault();

    let nome_pokemon = event.target.nome_pokemon.value.toLowerCase();
    const div_pokemon = document.getElementById("pokemons_div");


    fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)
    
        .then(response => response.json())
    
        .then(data => {
            div_pokemon.innerHTML = "";
            div_pokemon.style.display = "flex";
            div_pokemon.style.flexWrap = "wrap";
            div_pokemon.style.justifyContent = "center";


            const div = document.createElement("div");
            div.style.backgroundColor = "white";
            div.style.width = "32vh";
            div.style.height = "32vh";
            div.style.margin = "2vh";
            div.style.borderRadius = "10px";
            div.style.textAlign = "center";
            div.style.paddingTop = "1vh";
            div.style.transition = "all 0.3s";
            div.addEventListener("mouseenter", function() {
                div.style.transform = "translateY(-10px)";
            });
            div.addEventListener("mouseleave", function() {
                div.style.transform = "translateY(0)";
            });
            div.innerHTML = `<h4><img src="${data.sprites.other["official-artwork"].front_default}" width="60%" height="60%"></h4> <br> <h5 style="font-size: 2vh;"> #${data.id} <br> ${data.name}</h5>`;
            div_pokemon.appendChild(div);

        })
    
        .catch(error => carregar_todos_pokemons());
}

function carregar_todos_pokemons() {
    const div_pokemon = document.getElementById("pokemons_div"); //Pega a div que vai colocar os pokemons
    div_pokemon.style.display = "flex"
    div_pokemon.style.flexWrap = "wrap"; // permite quebrar a linha
    div_pokemon.style.justifyContent = "center"; // centraliza os cards
    fetch('https://pokeapi.co/api/v2/pokemon?limit=251')
    
        .then(response => response.json())
    
        .then(data => {
            lista_todos_pokemons.push(data)
            const lista_pokemons = data.results; //Coloca todos os dados dentro de uma lista
            div_pokemon.innerHTML = '' //Reseta a div
            lista_pokemons.forEach(pokemon => {
                const div = document.createElement("div") //Cria uma div para colocar o pokemon denteo
                div.style.backgroundColor = "white"
                div.style.width = "32vh"
                div.style.height = "32vh"
                div.style.margin = "2vh"
                div.style.borderRadius = "10px"
                div.style.textAlign = "center"
                div.style.paddingTop = "1vh"
                div.style.transition = "all 0.3s"; // deixa suave
                div.addEventListener("mouseenter", function() {
                    div.style.transform = "translateY(-10px)"; // sobe 10px
                })
                div.addEventListener("mouseleave", function() {
                    div.style.transform = "translateY(0)"; // volta ao normal
                })
                fetch(pokemon.url)
                
                    .then(response => response.json())
                
                    .then(data => {

                        /* div.textContent = data.sprites.front_default //Escreve dentro da div
                        div_pokemon.appendChild(div) //Adiciona dentro da div princiapl */
                        div.innerHTML = `<h4><img src="${data.sprites.other["official-artwork"].front_default
                    }" width="60%" height= "60%"></h4> <br> <h4 style="font-size: 3vh; "> #${data.id} <br> ${pokemon.name}</h4>`;
                        div.addEventListener("click", function() {
                            clicou_no_pokemon(pokemon.name)
                        })
                        div_pokemon.appendChild(div)
                    })
                

                    .catch(error => console.log(error));
            });
        })
    
        .catch(error => console.log(error));
}



function clicou_no_pokemon(nome_pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)
    
        .then(response => response.json())
    
        .then(data => {
            const tipos = data.types.map(t => t.type.name).join(", ");
            const vida = data.stats.find(s => s.stat.name === "hp").base_stat;
            const ataque = data.stats.find(s => s.stat.name === "attack").base_stat;
            const defesa = data.stats.find(s => s.stat.name === "defense").base_stat;
            const velocidade = data.stats.find(s => s.stat.name === "speed").base_stat;
            const ataque_especial = data.stats.find(s => s.stat.name === "special-attack").base_stat;
            const defesa_especial = data.stats.find(s => s.stat.name === "special-defense").base_stat;
            let div = document.createElement("div");
            div.style.backgroundColor = "rgb(200, 200, 200)"
            div.style.width = "50vh"
            div.style.height = "60vh"
            div.style.position = "fixed";
            div.style.top = "50%";
            div.style.left = "50%";
            let div_imagem = document.createElement("div");
            div_imagem = `<img src="${data.sprites.other["official-artwork"].front_default}" width="40%" height= "40%">`
            div.innerHTML = div_imagem
            div.style.transform = "translate(-50%, -50%)";
            div.style.textAlign = "center"
     
            document.body.appendChild(div)


        })
    
        .catch(error => console.log(error));
}


window.onload = carregar_todos_pokemons;