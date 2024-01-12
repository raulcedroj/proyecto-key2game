// Función para cargar el juego en banner
function loadBannerGame() {
    fetch('http://localhost:3000/api/juegos/1') // Recoger el juego 1
        .then(response => response.json())
        .then(data => {
            const bannerGame = document.getElementById('bannerGame');

            const div = document.createElement('div');
            div.classList.add('new-container', 'col-12', 'text-center');
            const img = document.createElement('img');
            img.classList.add('d-block', 'w-100', 'height-img-class', 'banner-img');
            img.src = data.juegos.url_img; // Asegúrate de tener la URL de la imagen desde tu API
            img.alt = `${data.juegos.Nombre_Juego}`;

            const pegiImg = document.createElement('img');
            pegiImg.classList.add('position-absolute', 'bottom-0', 'end-90', 'pegi-img');
            pegiImg.src = "../images/pegi18.png";
            img.alt = "Pegi18";

            const gameName = document.createElement('h3');
            gameName.classList.add('position-absolute', 'top-35', 'end-90', 'text-white', 'z-index-1');
            gameName.textContent = data.juegos.Nombre_Juego; // Incluir el nombre del juego aquí

            // Crear elemento para el precio
            const price = document.createElement('h2');
            price.classList.add('position-absolute', 'bottom-10', 'end-90', 'text-white', 'z-index-1');
            price.textContent = `${data.juegos.Precio} €`; // Incluir el precio del juego aquí

            // Crear botón de "Comprar"
            const buyButton = document.createElement('button');
            buyButton.classList.add('btn', 'btn-primary', 'position-absolute', 'bottom-0', 'end-80', 'z-index-1');
            buyButton.textContent = 'Comprar';

            div.appendChild(img);
            div.appendChild(gameName);
            div.appendChild(price);
            div.appendChild(pegiImg);
            div.appendChild(buyButton);
            bannerGame.appendChild(div);

        })
        .catch(error => console.error('Error:', error));
}

function loadGenresGame() {
    fetch('http://localhost:3000/api/juegos/1') // Recoger el juego 1
        .then(response => response.json())
        .then(data => {
            const bannerGame = document.getElementById('bannerDesc');

            const div = document.createElement('div');
            div.classList.add('generos', 'col-12');

            const gameGenre = document.createElement('a');
            gameGenre.classList.add('text-black', 'z-index-1');
            gameGenre.textContent = data.juegos.Genero; // Incluir el genero del juego aquí

            div.appendChild(gameGenre);
            bannerGame.appendChild(div);

        })
        .catch(error => console.error('Error:', error));
}

function loadDescriptionGame() {
    fetch('http://localhost:3000/api/juegos/1') // Recoger el juego 1
        .then(response => response.json())
        .then(data => {
            const bannerGame = document.getElementById('bannerDescription');

            const div = document.createElement('div');
            div.classList.add('col-12');

            const gameDesc = document.createElement('p');
            gameDesc.classList.add('text-black', 'z-index-1');
            gameDesc.textContent = data.juegos.Descripcion_Juego; // Incluir el genero del juego aquí

            div.appendChild(gameDesc);
            bannerGame.appendChild(div);

        })
        .catch(error => console.error('Error:', error));
}

function loadReqGame() {
    fetch('http://localhost:3000/api/juegos/1') // Recoger el juego 1
        .then(response => response.json())
        .then(data => {
            const bannerGame = document.getElementById('bannerReq');

            const div = document.createElement('div');
            div.classList.add('col-12');

            const gameReq = document.createElement('p');
            gameReq.classList.add('text-black', 'z-index-1');
            gameReq.textContent = data.juegos.Requisitos; // Incluir el genero del juego aquí

            div.appendChild(gameReq);
            bannerGame.appendChild(div);

        })
        .catch(error => console.error('Error:', error));
}

// Función para cargar los primeros 4 juegos de la base de datos
function loadFirstGames() {
    fetch('http://localhost:3000/api/juegos?limit=4') // Limitar a 4 juegos
        .then(response => response.json())
        .then(data => {
            // Actualiza la sección de los primeros juegos
            const firstGames = document.getElementById('firstGames');
            data.juegos.forEach(juego => {
                const div = document.createElement('div');
                div.classList.add('new-container', 'col-3', 'text-center', 'p-5');
                const img = document.createElement('img');
                img.classList.add('d-inline', 'w-100', 'h-50');
                img.src = juego.url_img; // Asegúrate de tener la URL de la imagen desde tu API
                img.alt = `${juego.Nombre_Juego}`;

                const gameName = document.createElement('h3');
                gameName.classList.add('d-inline', 'm-3', 'text-black', 'z-index-1');
                gameName.textContent = juego.Nombre_Juego; // Incluir el nombre del juego aquí

                const buyButton = document.createElement('button');
                buyButton.classList.add('btn', 'btn-primary', 'm-3', 'z-index-1');
                buyButton.textContent = `${juego.Precio} €`;

                div.appendChild(img);
                div.appendChild(gameName);
                div.appendChild(buyButton);
                firstGames.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamadas a las funciones para cargar la página
loadBannerGame();
loadGenresGame();
loadDescriptionGame();
loadReqGame();
loadFirstGames();
