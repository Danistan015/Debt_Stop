const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware para parsear los datos en el cuerpo de la solicitud
app.use(bodyParser.json());

// Sirve los archivos estáticos desde la carpeta 'proyecto_final_debt_stop/public'
app.use(express.static(path.join(__dirname, 'proyecto_final_debt_stop', 'public')));

// Cambia la ruta para servir 'menu.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'proyecto_final_debt_stop', 'public', 'views', 'menu.html'));
});


// Ruta para manejar las interacciones del chatbot
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Llamar a la función para interactuar con la API de Gemini
  obtenerRespuestaGemini(userMessage)
    .then(reply => {
      res.json({ reply });
    })
    .catch(error => {
      console.error('Error al generar respuesta con Gemini:', error);
      res.json({ reply: 'Lo siento, algo salió mal. ¿Puedes intentar de nuevo?' });
    });
});

// Función para interactuar con la API de Gemini y obtener una respuesta
function obtenerRespuestaGemini(prompt) {
  // Si el mensaje contiene una palabra clave problemática
  if (prompt.toLowerCase().includes("mal")) {
    return Promise.resolve("Parece que algo no va bien. ¿Puedes contarme más sobre lo que te sucede?");
  }

  const API_KEY = 'Tu api KEY';  // Asegúrate de poner tu clave de API correcta
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  // Hacer la solicitud a la API de Gemini
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })
    .then(response => response.json())
    .then(data => {
      const textoGenerado = data.candidates[0].content.parts[0].text;
      return textoGenerado;
    })
    .catch(error => {
      console.error('Error al llamar a la API de Gemini:', error);
      throw new Error('Hubo un problema al procesar tu solicitud');
    });
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
