document.getElementById('send-message').addEventListener('click', function() {
    const userMessage = document.getElementById('user-message').value;
    if (userMessage) {
      // Muestra el mensaje del usuario en el chat
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('user-message');
      messageDiv.textContent = userMessage;
      document.getElementById('chat-messages').appendChild(messageDiv);
  
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
        // Muestra la respuesta del chatbot en el chat
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('bot-reply');
        replyDiv.textContent = data.reply;
        document.getElementById('chat-messages').appendChild(replyDiv);
        
        // Limpia el input
        document.getElementById('user-message').value = '';
      })
      .catch(error => {
        console.error('Error al enviar el mensaje:', error);
      });
    }
  });
  