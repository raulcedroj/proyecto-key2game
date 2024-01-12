const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto',
});

// Middleware para el análisis del cuerpo de solicitudes en formato JSON
app.use(express.json());

// Configuración del middleware cors
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501'], 
    methods: 'GET,PUT,POST,DELETE', 
    optionsSuccessStatus: 200 
}));


//#region Usuarios
// Ruta para obtener todos los usuarios
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             example:
 *               usuarios:
 *                - ID_Usuario: 1
 *                  Usuario: "ejemplo"
 *                  Contraseña: "contraseña"
 *                  Correo: "usuario@correo.com"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al obtener usuarios"
 */
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json({ usuarios: results });
        }
    });
});

// Ruta para obtener un usuario por su ID
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna los detalles de un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a recuperar
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             example:
 *               usuarios:
 *                - ID_Usuario: 1
 *                  Usuario: "ejemplo"
 *                  Contraseña: "contraseña"
 *                  Correo: "usuario@correo.com"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario no encontrado'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener el usuario'
 */
app.get('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM Usuarios WHERE ID_Usuario = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json({ usuarios: results[0] });
            }
        }
    });
});

// Ruta para crear un nuevo usuario
/**
 * @swagger
 * /api/usuarios/insert:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Usuario: "nuevoUsuario"
 *             Contraseña: "nuevaContraseña"
 *             Correo: "nuevoUsuario@correo.com"
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario creado con éxito'
 *               usuario:
 *                 Usuario: "nuevoUsuario"
 *                 Contraseña: "nuevaContraseña"
 *                 Correo: "nuevoUsuario@correo.com"
 *       500:
 *         description: Error interno del servidor al crear el usuario
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al crear el usuario'
 */
app.post('/api/usuarios', (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO usuarios (Usuario, Contraseña, Correo) VALUES (?, ?, ?)', [newUser.Usuario, newUser.Contraseña, newUser.Correo], (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.json({ message: 'Usuario creado con éxito', usuario: newUser });
        }
    });
});

// Ruta para actualizar un usuario por su ID
/**
 * @swagger
 * /api/usuarios/update/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     description: Actualiza la información de un usuario existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Usuario: "usuarioActualizado"
 *             Contraseña: "nuevaContraseña"
 *             Correo: "usuarioActualizado@correo.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario actualizado con éxito'
 *               usuario:
 *                 Usuario: "usuarioActualizado"
 *                 Contraseña: "nuevaContraseña"
 *                 Correo: "usuarioActualizado@correo.com"
 *       500:
 *         description: Error interno del servidor al actualizar el usuario
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al actualizar el usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario no encontrado'
 */
app.put('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.query('UPDATE usuarios SET Usuario = ?, Contraseña = ?, Correo = ? WHERE ID_Usuario = ?', [updatedUser.Usuario, updatedUser.Contraseña, updatedUser.Correo, userId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else {
            res.json({ message: 'Usuario actualizado con éxito', usuario: updatedUser });
        }
    });
});

// Ruta para eliminar un usuario por su ID
/**
 * @swagger
 * /api/usuarios/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     description: Elimina un usuario existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario eliminado con éxito'
 *       500:
 *         description: Error interno del servidor al eliminar el usuario
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al eliminar el usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: 'Usuario no encontrado'
 */
app.delete('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json({ message: 'Usuario eliminado con éxito' });
        }
    });
});

//#endregion

//#region Juegos
/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtiene todos los juegos
 *     description: Retorna una lista de todos los juegos.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             example:
 *               juegos:
 *                - ID_Juego: 1
 *                  Nombre: "Ejemplo Juego"
 *                  Plataforma: "PC"
 *                  Genero: "Aventura"
 *       500:
 *         description: Error interno del servidor al obtener juegos
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener juegos'
 */
app.get('/api/juegos', (req, res) => {
    db.query('SELECT * FROM juegos', (err, results) => {
        if (err) {
            console.error('Error al obtener juegos:', err);
            res.status(500).json({ error: 'Error al obtener juegos' });
        } else {
            res.json({ juegos: results });
        }
    });
});

// Ruta para obtener un juego por su ID
/**
 * @swagger
 * /api/juegos/{id}:
 *   get:
 *     summary: Obtiene un juego por ID
 *     description: Retorna los detalles de un juego específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del juego a recuperar
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             example:
 *               juegos:
 *                - ID_Juego: 1
 *                  Nombre: "Ejemplo Juego"
 *                  Plataforma: "PC"
 *                  Genero: "Aventura"
 *       404:
 *         description: Juego no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: 'Juego no encontrado'
 *       500:
 *         description: Error interno del servidor al obtener el juego
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener el juego'
 */
app.get('/api/juegos/:id', (req, res) => {
    const juegoId = req.params.id;
    db.query('SELECT * FROM Juegos WHERE ID_Juego = ?', [juegoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el juego:', err);
            res.status(500).json({ error: 'Error al obtener el juego' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Juego no encontrado' });
            } else {
                res.json({ juegos: results[0] });
            }
        }
    });
});

// Ruta para obtener juegos marcados como Top
app.get('/api/juego/top', (req, res) => {
    db.query('SELECT * FROM juegos WHERE Top = 1', (err, results) => {
        if (err) {
            console.error('Error al obtener juegos top:', err);
            res.status(500).json({ error: 'Error al obtener juegos top' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Juegos top no encontrados' });
            } else {
                res.json({ juegos: results });
            }
        }
    });
});




// Ruta para crear un nuevo usuario
/**
 * @swagger
 * /api/juegos/insert:
 *   post:
 *     summary: Crea un nuevo juego
 *     description: Crea un nuevo juego con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre_Juego: "Nuevo Juego"
 *             Precio: 49.99
 *             Descripcion_Juego: "Descripción del nuevo juego"
 *             Genero: "Aventura"
 *             Requisitos: "Requisitos del nuevo juego"
 *             Pegi: 16
 *             Disponible: true
 *             Fecha_Salida: "2023-01-01"
 *             Top: false
 *     responses:
 *       200:
 *         description: Juego creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: 'Juego creado con éxito'
 *               juego:
 *                 Nombre_Juego: "Nuevo Juego"
 *                 Precio: 49.99
 *                 Descripcion_Juego: "Descripción del nuevo juego"
 *                 Genero: "Aventura"
 *                 Requisitos: "Requisitos del nuevo juego"
 *                 Pegi: 16
 *                 Disponible: true
 *                 Fecha_Salida: "2023-01-01"
 *                 Top: false
 *       500:
 *         description: Error interno del servidor al crear el juego
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al crear el juego'
 */
app.post('/api/juegos', (req, res) => {
    const newJuego = req.body;
    db.query('INSERT INTO juegos (Nombre_Juego, Precio, Descripcion_Juego, Genero, Requisitos, Pegi, Disponible, Fecha_Salida, Top) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newJuego.Nombre_Juego, newJuego.Precio, newJuego.Descripcion_Juego, newJuego.Genero, newJuego.Requisitos, newJuego.Pegi, newJuego.Disponible, newJuego.Fecha_Salida, newJuego.Top],
        (err) => {
            if (err) {
                console.error('Error al crear el juego:', err);
                res.status(500).json({ error: 'Error al crear el juego' });
            } else {
                res.json({ message: 'Juego creado con éxito', juego: newJuego });
            }
        });
});

// Ruta para actualizar un usuario por su ID
/**
 * @swagger
 * /api/juegos/update/{id}:
 *   put:
 *     summary: Actualiza un juego existente
 *     description: Actualiza la información de un juego existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del juego a actualizar
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre_Juego: "Juego Actualizado"
 *             Precio: 59.99
 *             Descripcion_Juego: "Descripción actualizada del juego"
 *             Genero: "Acción"
 *             Requisitos: "Requisitos actualizados"
 *             Pegi: 18
 *             Disponible: true
 *             Fecha_Salida: "2023-02-01"
 *             Top: true
 *     responses:
 *       200:
 *         description: Juego actualizado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: 'Juego actualizado con éxito'
 *               juego:
 *                 Nombre_Juego: "Juego Actualizado"
 *                 Precio: 59.99
 *                 Descripcion_Juego: "Descripción actualizada del juego"
 *                 Genero: "Acción"
 *                 Requisitos: "Requisitos actualizados"
 *                 Pegi: 18
 *                 Disponible: true
 *                 Fecha_Salida: "2023-02-01"
 *                 Top: true
 *       500:
 *         description: Error interno del servidor al actualizar el juego
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al actualizar el juego'
 *       404:
 *         description: Juego no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: 'Juego no encontrado'
 */
app.put('/api/juegos/:id', (req, res) => {
    const juegoId = req.params.id;
    const updatedJuego = req.body;
    db.query('UPDATE juegos SET Nombre_Juego = ?, Precio = ?, Descripcion_Juego = ?, Genero = ?, Requisitos = ?, Pegi = ?, Disponible = ?, Fecha_Salida = ?, Top = ? WHERE ID_Juego = ?',
        [updatedJuego.Nombre_Juego, updatedJuego.Precio, updatedJuego.Descripcion_Juego, updatedJuego.Genero, updatedJuego.Requisitos, updatedJuego.Pegi, updatedJuego.Disponible, updatedJuego.Fecha_Salida, updatedJuego.Top, juegoId],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar el juego:', err);
                res.status(500).json({ error: 'Error al actualizar el juego' });
            } else {
                res.json({ message: 'Usuario actualizado con éxito', juego: updatedJuego });
            }
        });
});

// Ruta para eliminar un usuario por su ID
/**
 * @swagger
 * /api/juegos/delete/{id}:
 *   delete:
 *     summary: Eliminar un juego por ID
 *     description: Elimina un juego basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del juego que se va a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve un mensaje indicando que el juego ha sido eliminado.
 *         content:
 *           application/json:
 *             example:
 *               message: Juego eliminado con éxito
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error durante el proceso de eliminación.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el juego
 */
app.delete('/api/juegos/:id', (req, res) => {
    const juegoId = req.params.id;
    db.query('DELETE FROM juegos WHERE id_juego = ?', [juegoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el juego:', err);
            res.status(500).json({ error: 'Error al eliminar el juego' });
        } else {
            res.json({ message: 'Juego eliminado con éxito' });
        }
    });
});

//#endregion

//#region Metodos de pago
/**
 * @swagger
 * /api/metodos:
 *   get:
 *     summary: Obtener métodos de pago
 *     description: Obtiene una lista de todos los métodos de pago disponibles.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de métodos de pago.
 *         content:
 *           application/json:
 *             example:
 *               - id_metodo_pago: 1
 *                 nombre: 'Tarjeta de crédito'
 *               - id_metodo_pago: 2
 *                 nombre: 'Transferencia bancaria'
 *               - id_metodo_pago: 3
 *                 nombre: 'PayPal'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al obtener los métodos de pago.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener métodos de pago'
 */
app.get('/api/metodos', (req, res) => {
    db.query('SELECT * FROM metodos_pago', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener metodos de pago');
            return;
        }
        res.json(results);
    });
});

// Endpoint para obtener un usuario por su ID
/**
 * @swagger
 * /api/metodos/{id}:
 *   get:
 *     summary: Obtener un método de pago por ID
 *     description: Obtiene la información de un método de pago específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del método de pago que se desea obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la información del método de pago solicitado.
 *         content:
 *           application/json:
 *             example:
 *               id_metodo_pago: 1
 *               nombre: 'Tarjeta de crédito'
 *       404:
 *         description: No encontrado. Indica que el método de pago con el ID especificado no fue encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Metodo no encontrado'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al obtener el método de pago.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener el metodo'
 */
app.get('/api/metodos/:id', (req, res) => {
    const metodoId = req.params.id;
    db.query('SELECT * FROM metodos_pago WHERE ID_Metodo = ?', [metodoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el metodo:', err);
            res.status(500).send('Error al obtener el metodo');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Metodo no encontrado');
            return;
        }
        res.json(results[0]);
    });
});


// Endpoint para crear un nuevo usuario
/**
 * @swagger
 * /api/metodos/insert:
 *   post:
 *     summary: Crear un nuevo método de pago
 *     description: Crea un nuevo método de pago con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre_Metodo: 'Tarjeta de débito'
 *             ID_Usuario: 1
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve un mensaje indicando que el método de pago ha sido creado.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Metodo de pago creado con éxito'
 *               metodo:
 *                 Nombre_Metodo: 'Tarjeta de débito'
 *                 ID_Usuario: 1
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al crear el método de pago.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al crear el metodo de pago'
 */
app.post('/api/metodos', (req, res) => {
    const newMetodo = req.body;
    db.query('INSERT INTO metodos_pago (Nombre_Metodo, ID_Usuario) VALUES (?, ?)', [newMetodo.Nombre_Metodo, newMetodo.ID_Usuario],
        (err, result) => {
            if (err) {
                console.error('Error al crear el metodo de pago:', err);
                res.status(500).json({ error: 'Error al crear el metodo de pago' });
            } else {
                res.json({ message: 'Metodo de pago creado con éxito', metodo: newMetodo });
            }
        });
});

// Endpoint para actualizar un usuario existente
/**
 * @swagger
 * /api/metodos/update/{id}:
 *   put:
 *     summary: Actualizar un método de pago por ID
 *     description: Actualiza la información de un método de pago específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del método de pago que se desea actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre_Metodo: 'Nueva tarjeta de crédito'
 *             ID_Usuario: 2
 *     responses:
 *       200:
 *         description: Operación exitosa. Indica que el método de pago ha sido actualizado con éxito.
 *         content:
 *           text/plain:
 *             example: 'Metodo actualizado exitosamente'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al actualizar el método de pago.
 *         content:
 *           text/plain:
 *             example: 'Error al actualizar el metodo'
 */
app.put('/api/metodos/:id', (req, res) => {
    const metodoId = req.params.id;
    const updatedMetodo = req.body;
    db.query('UPDATE metodos_pago SET Nombre_Metodo = ?, ID_Usuario = ? WHERE ID_Metodo = ?', [updatedMetodo.Nombre_Metodo, updatedMetodo.ID_Usuario, metodoId], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar el metodo');
            return;
        }
        res.status(200).send('Metodo actualizado exitosamente');
    });
});

/**
 * @swagger
 * /api/metodos/delete/{id}:
 *   delete:
 *     summary: Eliminar un método de pago por ID
 *     description: Elimina un método de pago específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del método de pago que se desea eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Indica que el método de pago ha sido eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Metodo de pago eliminado con éxito'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al eliminar el método de pago.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al eliminar el metodo de pago'
 */
app.delete('/api/metodos/:id', (req, res) => {
    const metodoId = req.params.id;
    db.query('DELETE FROM metodos_pago WHERE id_metodo = ?', [metodoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el metodo de pago:', err);
            res.status(500).json({ error: 'Error al eliminar el metodo de pago' });
        } else {
            res.json({ message: 'Metodo de pago eliminado con éxito' });
        }
    });
});

//#endregion

//#region Codigos

/**
 * @swagger
 * /api/codigos:
 *   get:
 *     summary: Obtener códigos
 *     description: Obtiene una lista de todos los códigos disponibles.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de códigos.
 *         content:
 *           application/json:
 *             example:
 *               - id_codigo: 1
 *                 nombre: 'Código 1'
 *               - id_codigo: 2
 *                 nombre: 'Código 2'
 *               - id_codigo: 3
 *                 nombre: 'Código 3'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al obtener los códigos.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener codigos'
 */
app.get('/api/codigos', (req, res) => {
    db.query('SELECT * FROM codigos', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener codigos');
            return;
        }
        res.json(results);
    });
});

// Endpoint para obtener un usuario por su ID
/**
 * @swagger
 * /api/codigos/{id}:
 *   get:
 *     summary: Obtener un código por ID
 *     description: Obtiene la información de un código específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del código que se desea obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la información del código solicitado.
 *         content:
 *           application/json:
 *             example:
 *               id_codigo: 1
 *               nombre: 'Código 1'
 *       404:
 *         description: No encontrado. Indica que el código con el ID especificado no fue encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Codigo no encontrado'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al obtener el código.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al obtener el codigo'
 */
app.get('/api/codigos/:id', (req, res) => {
    const codigoId = req.params.id;
    db.query('SELECT * FROM codigos WHERE ID_DET_Pedido = ?', [codigoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el codigo:', err);
            res.status(500).send('Error al obtener el codigo');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Codigo no encontrado');
            return;
        }
        res.json(results[0]);
    });
});


// Endpoint para crear un nuevo usuario
/**
 * @swagger
 * /api/codigos/insert:
 *   post:
 *     summary: Crear un nuevo código
 *     description: Crea un nuevo código con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Codigo: 'ABC123'
 *             Fecha_Hora_Caducidad: '2023-12-31T23:59:59'
 *             Activo: true
 *             ID_Juego: 1
 *             ID_Pedido: 2
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve un mensaje indicando que el código ha sido creado.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Codigo creado con éxito'
 *               codigo:
 *                 Codigo: 'ABC123'
 *                 Fecha_Hora_Caducidad: '2023-12-31T23:59:59'
 *                 Activo: true
 *                 ID_Juego: 1
 *                 ID_Pedido: 2
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al crear el código.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al crear el codigo'
 */
app.post('/api/codigos', (req, res) => {
    const newCodigo = req.body;
    db.query('INSERT INTO codigos (Codigo, Fecha_Hora_Caducidad, Activo, ID_Juego, ID_Pedido) VALUES (?, ?, ?, ?, ?)', [newCodigo.Codigo, newCodigo.Fecha_Hora_Caducidad, newCodigo.Activo, newCodigo.ID_Juego, newCodigo.ID_Pedido],
        (err, result) => {
            if (err) {
                console.error('Error al crear el codigo:', err);
                res.status(500).json({ error: 'Error al crear el codigo' });
            } else {
                res.json({ message: 'Codigo creado con éxito', codigo: newCodigo });
            }
        });
});

// Endpoint para actualizar un usuario existente
/**
 * @swagger
 * /api/codigos/update/{id}:
 *   put:
 *     summary: Actualizar un código por ID
 *     description: Actualiza la información de un código específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del código que se desea actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Codigo: 'XYZ456'
 *             Fecha_Hora_Caducidad: '2023-12-31T23:59:59'
 *             Activo: false
 *             ID_Juego: 3
 *             ID_Pedido: 4
 *     responses:
 *       200:
 *         description: Operación exitosa. Indica que el código ha sido actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Codigo actualizado con éxito'
 *               codigo:
 *                 Codigo: 'XYZ456'
 *                 Fecha_Hora_Caducidad: '2023-12-31T23:59:59'
 *                 Activo: false
 *                 ID_Juego: 3
 *                 ID_Pedido: 4
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al actualizar el código.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al actualizar el codigo'
 */
app.put('/api/codigos/:id', (req, res) => {
    const codigoId = req.params.id;
    const updatedCodigo = req.body;
    db.query('UPDATE codigos SET Codigo = ?, Fecha_Hora_Caducidad = ?, Activo = ?, ID_Juego = ?, ID_Pedido = ? WHERE ID_DET_Pedido = ?',
        [updatedCodigo.Codigo, updatedCodigo.Fecha_Hora_Caducidad, updatedCodigo.Activo, updatedCodigo.ID_Juego, updatedCodigo.ID_Pedido, codigoId],
        (err, result) => {
            if (err) {
                console.error('Error al crear el codigo:', err);
                res.status(500).json({ error: 'Error al crear el codigo' });
            } else {
                res.json({ message: 'Codigo actualizado con éxito', codigo: updatedCodigo });
            }
        });
});

/**
 * @swagger
 * /api/codigos/delete/{id}:
 *   delete:
 *     summary: Eliminar un código por ID
 *     description: Elimina un código específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del código que se desea eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Indica que el código ha sido eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Codigo eliminado con éxito'
 *       500:
 *         description: Error interno del servidor. Indica que ocurrió un error al eliminar el código.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error al eliminar el codigo'
 */
app.delete('/api/codigos/:id', (req, res) => {
    const codigoId = req.params.id;
    db.query('DELETE FROM codigos WHERE ID_DET_Pedido = ?', [codigoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el codigo:', err);
            res.status(500).json({ error: 'Error al eliminar el codigo' });
        } else {
            res.json({ message: 'Codigo eliminado con éxito' });
        }
    });
});

//#endregion


// Inicia el servidor
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});


//Ruta para la documentación de la API
app.use("/api-docs", require("./api-docs.js"));
