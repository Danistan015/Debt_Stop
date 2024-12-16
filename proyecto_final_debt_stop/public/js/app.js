// Selección de elementos
const floatingBtn = document.getElementById('floating-btn');
const chatContainer = document.getElementById('chat-container');
const sendMessageButton = document.getElementById('send-message');
const userMessageInput = document.getElementById('user-message');
const chatMessages = document.getElementById('chat-messages');

// Mostrar y ocultar el chat al hacer clic en el ícono flotante
floatingBtn.addEventListener('click', () => {
  chatContainer.style.display = (chatContainer.style.display === 'none' || chatContainer.style.display === '') ? 'block' : 'none';
  userMessageInput.focus(); // Focalizar el campo de entrada de texto cuando se abre
});

// Función para mostrar el mensaje del usuario
function addUserMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('user-message');
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al último mensaje
}

// Función para mostrar la respuesta del bot
function addBotReply(message) {
  const botReply = document.createElement('div');
  botReply.classList.add('bot-reply');
  botReply.textContent = message;
  chatMessages.appendChild(botReply);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al último mensaje
}

// Lógica para enviar el mensaje cuando el usuario hace clic en "Enviar"
sendMessageButton.addEventListener('click', function() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage) {
    // Muestra el mensaje del usuario
    addUserMessage(userMessage);

    // Envía el mensaje al servidor para obtener la respuesta del chatbot
    fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
      // Muestra la respuesta del chatbot
      addBotReply(data.reply);
      // Limpia el campo de entrada
      userMessageInput.value = '';
    })
    .catch(error => {
      console.error('Error al enviar el mensaje:', error);
    });
  }
});

// Opcional: Permite enviar el mensaje presionando Enter
userMessageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessageButton.click();
  }
});
