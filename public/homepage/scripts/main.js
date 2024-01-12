function loadTopGames() {
    fetch('http://localhost:3000/api/juego/top')
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.querySelector('.carousel-indicators');
            const carouselInner = document.querySelector('.carousel-inner');

            data.juegos.forEach((juego, index) => {
                const indicator = document.createElement('button');
                indicator.setAttribute('type', 'button');
                indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
                indicator.setAttribute('data-bs-slide-to', index.toString());
                if (index === 0) {
                    indicator.classList.add('active');
                }
                carouselIndicators.appendChild(indicator);

                const imgDiv = document.createElement('div');
                imgDiv.classList.add('carousel-item');
                if (index === 0) {
                    imgDiv.classList.add('active');
                }

                // Crear elemento para el nombre del juego
                const gameName = document.createElement('h1');
                gameName.classList.add('position-absolute', 'top-10', 'end-80', 'm-3', 'text-white', 'z-index-1');
                gameName.textContent = juego.Nombre_Juego; // Incluir el nombre del juego aquí

                // Crear imagen
                const img = document.createElement('img');
                img.classList.add('d-block', 'w-100');
                img.src = juego.url_img; // Asegúrate de tener la URL de la imagen desde tu API
                img.alt = `Slide ${index + 1}`;

                // Crear elemento para el precio
                const price = document.createElement('h2');
                price.classList.add('position-absolute', 'bottom-40', 'end-80', 'text-white', 'z-index-1');
                price.textContent = `${juego.Precio} €`; // Incluir el precio del juego aquí

                // Crear botón de "Comprar"
                const buyButton = document.createElement('button');
                buyButton.classList.add('btn', 'btn-primary', 'position-absolute', 'bottom-0', 'end-75', 'translate-middle-y', 'm-3', 'z-index-1');
                buyButton.textContent = 'Comprar';

                // Añadir elementos al div
                imgDiv.appendChild(img);
                imgDiv.appendChild(buyButton);
                imgDiv.appendChild(gameName);
                imgDiv.appendChild(price);

                carouselInner.appendChild(imgDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para cargar los 3 juegos más recientes
function loadRecentGames() {
    fetch('http://localhost:3000/api/juegos?sortBy=date&limit=3') // Ordenar por fecha y limitar a 3 juegos
        .then(response => response.json())
        .then(data => {
            // Actualiza la lista de juegos recientes
            const recentGamesList = document.getElementById('recentGamesList');
            data.juegos.forEach(juego => {

                const div = document.createElement('div');
                div.classList.add('new-container', 'col-2', 'text-center');
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
                recentGamesList.appendChild(div);
            });
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
loadTopGames();
loadRecentGames();
loadFirstGames();
