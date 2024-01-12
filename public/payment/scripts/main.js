// Función para cargar los primeros 4 juegos de la base de datos
function loadFirstMethods() {
    fetch('http://localhost:3000/api/metodos?limit=3') // Limitar a 4 juegos
        .then(response => response.json())
        .then(data => {
            // Actualiza la sección de los primeros juegos
            const firstmethods = document.getElementById('payment-meth');
            data.forEach(metodo => {
                const div = document.createElement('div');
                div.classList.add('new-container', 'col-8', 'p-4', 'm-4');

                const methodName = document.createElement('h3');
                methodName.classList.add('d-inline', 'm-3', 'text-black', 'z-index-1');
                methodName.textContent = metodo.Nombre_Metodo; // Incluir el nombre del metodo aquí

                const radio = document.createElement('input');
                radio.type = "radio";
                radio.value = `${metodo.Nombre_Metodo}`
                
                div.appendChild(methodName);
                div.appendChild(radio);
                firstmethods.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamadas a las funciones para cargar la página
loadFirstMethods();
