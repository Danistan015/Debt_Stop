const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');  // Asegúrate de instalar 'node-fetch' con `npm install node-fetch`

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());

// Servir los archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar las interacciones del chatbot
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Llamar a la API de Gemini con el mensaje del usuario
  llamarGemini(userMessage)
    .then(reply => {
      res.json({ reply: reply });
    })
    .catch(error => {
      console.error('Error al generar respuesta con Gemini:', error);
      res.json({ reply: 'Lo siento, algo salió mal al procesar tu solicitud.' });
    });
});

// Función para interactuar con la API de Gemini y obtener una respuesta generada
function llamarGemini(prompt) {
  // Verifica si el mensaje contiene palabras clave problemáticas
  if (prompt.toLowerCase().includes("mal")) {
    return Promise.resolve("Parece que algo no va bien. ¿Puedes decirme más sobre lo que te pasa?");
  }

  const API_KEY = 'AIzaSyDtJ92vkvx9n4MZ37IJ3Ldjb9raKv0T8Mg';
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => {
      const textoGenerado = data.candidates[0].content.parts[0].text;
      return textoGenerado;
    })
    .catch(error => {
      console.error('Error al llamar a la API de Gemini:', error);
      throw new Error('Error al llamar a la API');
    });
}

app.get('/styles.css', (req, res) => {
  res.type('css'); // Asegura que el tipo MIME sea 'text/css'
  res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
