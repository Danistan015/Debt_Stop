// Selección de elementos
const floatingBtn = document.getElementById("floating-btn");
const chatContainer = document.getElementById("chat-container");
const sendMessageButton = document.getElementById("send-message");
const userMessageInput = document.getElementById("user-message");
const chatMessages = document.getElementById("chat-messages");

// Mostrar y ocultar el chat al hacer clic en el ícono flotante
floatingBtn.addEventListener("click", () => {
  chatContainer.style.display =
    chatContainer.style.display === "none" || chatContainer.style.display === ""
      ? "block"
      : "none";
  userMessageInput.focus(); // Focalizar el campo de entrada de texto cuando se abre
});

// Función para mostrar el mensaje del usuario
function addUserMessage(message) {
  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al último mensaje
}

// Función para mostrar la respuesta del bot
function addBotReply(message) {
  const botReply = document.createElement("div");
  botReply.classList.add("bot-reply");
  botReply.textContent = message;
  chatMessages.appendChild(botReply);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al último mensaje
}

// Lógica para enviar el mensaje cuando el usuario hace clic en "Enviar"
sendMessageButton.addEventListener("click", function () {
  const userMessage = userMessageInput.value.trim();
  if (userMessage) {
    // Muestra el mensaje del usuario
    addUserMessage(userMessage);

    // Envía el mensaje al servidor para obtener la respuesta del chatbot
    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Muestra la respuesta del chatbot
        addBotReply(data.reply);
        // Limpia el campo de entrada
        userMessageInput.value = "";
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });
  }
});

// Opcional: Permite enviar el mensaje presionando Enter
userMessageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessageButton.click();
  }
});

/*----NAVEGACIÓN----*/
class Proyecto {
  constructor() {
    this.app = document.getElementById("app");
    this.navButtons = document.querySelectorAll(".navBtn");

    this.initEventListeners();
  }

  initEventListeners() {
    this.navButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const view = event.target.dataset.view;
        this.navigateTo(view);
      });
    });
  }

  navigateTo(view) {
    switch (view) {
      case "add-debts":
        this.renderAddDebts();
        break;
      case "history":
        this.renderHistory();
        break;
      case "notifications":
        this.renderNotifications();
        break;
      case "total-balance":
        this.renderTotalBalance();
        break;
      case "my-goals":
        this.renderMyGoals();
        break;
      case "about-us":
        this.renderAboutUs();
        break;
    }
  }

  //ADDD DBTS
  renderAddDebts() {
    // Array to store debts
    this.debts = this.debts || [];

    // Render the interface
    this.app.innerHTML = `
      <h1>Debt Management</h1>
      <button type="button" class="btn btn-success" id="addDebtsBtn">Add Debt</button>
      
      <div id="form-section" class="form-container" style="display: none;">
        <form id="debtForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Name" required />
  
          <label for="amount">Amount:</label>
          <input type="number" id="amount" name="amount" placeholder="Amount" required />
  
          <label for="dueDate">Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" required />
  
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="Description"></textarea>
  
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
  
      <table id="debtTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    `;

    // DOM elements
    const formSection = document.getElementById("form-section");
    const addDebtsBtn = document.getElementById("addDebtsBtn");
    const debtForm = document.getElementById("debtForm");
    const debtBody = document.getElementById("debtBody");

    // Function to render the table
    const renderTable = () => {
      debtBody.innerHTML = ""; // Clear the table
      this.debts.forEach((debt, index) => {
        debtBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${debt.name}</td>
            <td>$${debt.amount}</td>
            <td>${debt.dueDate}</td>
            <td>${debt.description}</td>
          </tr>
        `;
      });
    };

    // Event to show/hide the form
    addDebtsBtn.addEventListener("click", () => {
      formSection.style.display =
        formSection.style.display === "none" ? "block" : "none";
    });

    // Event to save the debt
    debtForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const amount = document.getElementById("amount").value;
      const dueDate = document.getElementById("dueDate").value;
      const description = document.getElementById("description").value;

      // Add the debt to the array
      this.debts.push({ name, amount, dueDate, description });
      renderTable(); // Update the table
      formSection.style.display = "none"; // Hide the form
      debtForm.reset(); // Reset the form
    });

    renderTable(); // Initial render
}


  // hystoriiiiiiiiiiiiii

  renderHistory() {
    this.app.innerHTML = `
    <h1>History</h1>
    
      <table id="debtTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    `;
  }

  renderNotifications() {
    this.app.innerHTML = `
    <h1>Notification</h1>
    
      <table id="debtTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Notification</th>
            <th>Date</th>
           
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    
    `;
  }

  renderTotalBalance() {
    this.app.innerHTML = `
    <h1>Total Balance</h1>
    
      <table id="debtTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Paid</th>
            
            <th>Debts</th>
           
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    
    `;
  }

  renderMyGoals() {
    // Initial HTML structure with a form for adding goals
    this.app.innerHTML = `
      <h1>My Goals</h1>
      <div id="goal-section">
        <form id="goalForm">
    
          <input type="text" id="goal" name="goal" placeholder="Enter your goal" required />
          <button type="submit" class="btn btn-primary">Add Goal</button>
        </form>
      </div>
  
      <table id="goalTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody id="goalBody"></tbody>
      </table>
    `;
  
    // DOM elements
    const goalForm = document.getElementById("goalForm");
    const goalBody = document.getElementById("goalBody");
    
    // Array to store goals
    this.goals = this.goals || [];
  
    // Function to render the table with goals
    const renderGoalsTable = () => {
      goalBody.innerHTML = ""; // Clear the table
      this.goals.forEach((goal, index) => {
        goalBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${goal}</td>
          </tr>
        `;
      });
    };
  
    // Event to handle form submission and add a new goal
    goalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const goal = document.getElementById("goal").value;
      if (goal) {
        this.goals.push(goal); // Add the goal to the array
        renderGoalsTable(); // Update the table
        goalForm.reset(); // Reset the form
      }
    });
  
    renderGoalsTable(); // Initial render of the goals
  }
  

  renderAboutUs() {
    this.app.innerHTML = `
        <div class="about-us">
            <h1>About Us</h1>
            <p>We are a dynamic team of passionate individuals who believe in the power of technology to solve real-world problems. We combine our skills and expertise to create innovative solutions that make a difference. We specialize in web and mobile app development, always seeking to learn more, improve our skills, and create solutions that are not only technically efficient but also user-friendly and impactful..</p>
        </div>
    `;
}


}

new Proyecto();
