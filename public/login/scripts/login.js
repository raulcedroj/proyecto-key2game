document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    document.getElementById('aceptar').addEventListener('click', function () {

        const usuario = document.getElementById('user').value;
        const contraseña = document.getElementById('password').value;

        // Puedes realizar validaciones aquí si es necesario

        // Enviar la solicitud de inicio de sesión al servidor
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contraseña }),
        })
        .then(response => {
            
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        
        })
        .then(data => {
            // Manejar la respuesta del servidor
            //console.log(data);
            
            if (data.message === 'Inicio de sesión exitoso') {
                window.location.href = '../homepage/index.html';
            } else {
                // Puedes mostrar un mensaje de error u otras acciones según tus necesidades
                console.error('Error en el inicio de sesión:', data.error);
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud de inicio de sesión:', error.message);
            // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
        });
    });
});