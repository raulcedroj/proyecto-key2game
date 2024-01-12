document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();


        const email = document.getElementById('email').value;
        const usuario = document.getElementById('user').value;
        const contrasena = document.getElementById('password').value;


        const newUser = {
            Usuario: usuario,
            Contraseña: contrasena,
            Correo: email,
        };

        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta de la API
            console.log(data);
            // Aquí puedes realizar acciones adicionales según la respuesta de la API
        })
        .catch(error => {
            console.error('Error al enviar la solicitud a la API:', error.message);
            // Manejar errores, si es necesario
        });
        
    });
});
