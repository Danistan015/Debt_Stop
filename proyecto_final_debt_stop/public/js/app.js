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
  userMessageInput.focus(); 
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
    this.renderAddDebts();
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
    this.debts = JSON.parse(localStorage.getItem("debts")) || [];
  
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    `;
  
    const formSection = document.getElementById("form-section");
    const addDebtsBtn = document.getElementById("addDebtsBtn");
    const debtForm = document.getElementById("debtForm");
    const debtBody = document.getElementById("debtBody");
  
    const renderTable = () => {
      debtBody.innerHTML = ""; // Limpiar la tabla
      this.debts.forEach((debt, index) => {
        if (debt.estado === "Pending") {
          debtBody.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${debt.name}</td>
              <td>$${debt.amount}</td>
              <td>${debt.dueDate}</td>
              <td>${debt.description}</td>
              <td class="actions-buttons"><button class="btn btn-success" data-index="${index}" id="markPaid">
                <i class="fas fa-check-circle"></i> Mark as Paid
              </button>
              </td>
            </tr>
          `;
        }
      });
  
      // Event listeners para botones de acciones
      document.querySelectorAll("#markPaid").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          this.debts[index].estado = "Paid"; // Cambiar el estado
          updateLocalStorage();
          renderTable();
        });
      });
    };
  
    const updateLocalStorage = () => {
      localStorage.setItem("debts", JSON.stringify(this.debts));
    };
  
    // Evento para mostrar/ocultar el formulario
    addDebtsBtn.addEventListener("click", () => {
      formSection.style.display = formSection.style.display === "none" ? "block" : "none";
    });
  
    // Evento para guardar la deuda
    debtForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const amount = document.getElementById("amount").value;
      const dueDate = document.getElementById("dueDate").value;
      const description = document.getElementById("description").value;
  
      // Añadir la deuda con estado "Pendiente"
      this.debts.push({ name, amount, dueDate, description, estado: "Pending" });
      updateLocalStorage();
  
      renderTable();
      formSection.style.display = "none";
      debtForm.reset();
    });
  
    renderTable();
  }
  
  // historial hola daaan
  renderHistory() {
    this.app.innerHTML = `
      <h1>History</h1>
  
      <!-- Filtro por estado -->
      <label for="statusFilter">Filter by Status:</label>
      <select id="statusFilter">
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>
  
      <!-- Filtro por rango de fechas -->
      <label for="startDate">From:</label>
      <input type="date" id="startDate" />
  
      <label for="endDate">To:</label>
      <input type="date" id="endDate" />
  
      <!-- Opciones de ordenación -->
      <label for="sortOrder">Sort by:</label>
      <select id="sortOrder">
        <option value="amountAsc">Amount (Low to High)</option>
        <option value="amountDesc">Amount (High to Low)</option>
        <option value="dateAsc">Date (Oldest First)</option>
        <option value="dateDesc">Date (Newest First)</option>
      </select>
  
      <!-- Botón para exportar a Excel -->
      <button id="exportToExcel" style="margin-top: 20px;">Export to Excel</button>
  
      <table id="debtTable" class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="debtBody"></tbody>
      </table>
    `;
  
    const debtBody = document.getElementById("debtBody");
    const statusFilter = document.getElementById("statusFilter");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const sortOrderSelect = document.getElementById("sortOrder");
    const exportToExcelButton = document.getElementById("exportToExcel");
  
    // Función para renderizar las deudas filtradas
    const renderFilteredDebts = () => {
      const selectedStatus = statusFilter.value;
      const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
      const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
      const sortOrder = sortOrderSelect.value;
  
      // Filtrar las deudas según estado y fecha
      const filteredDebts = this.debts.filter(debt => {
        const debtDate = new Date(debt.dueDate);
        const inDateRange = (!startDate || debtDate >= startDate) && (!endDate || debtDate <= endDate);
        const inStatus = selectedStatus === "all" || debt.estado === selectedStatus;
  
        return inDateRange && inStatus;
      });
  
      // Ordenar las deudas según el criterio seleccionado
      filteredDebts.sort((a, b) => {
        switch (sortOrder) {
          case "amountAsc":
            return a.amount - b.amount;
          case "amountDesc":
            return b.amount - a.amount;
          case "dateAsc":
            return new Date(a.dueDate) - new Date(b.dueDate);
          case "dateDesc":
            return new Date(b.dueDate) - new Date(a.dueDate);
          default:
            return 0;
        }
      });
  
      // Limpiar el cuerpo de la tabla y renderizar deudas
      debtBody.innerHTML = "";
      filteredDebts.forEach((debt, index) => {
        debtBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${debt.name}</td>
            <td>$${debt.amount}</td>
            <td>${debt.dueDate}</td>
            <td>${debt.description}</td>
            <td>${debt.estado}</td>
          </tr>
        `;
      });
    };
  
    // Inicializar renderizado con todas las deudas
    renderFilteredDebts();
  
    // Añadir eventos a los filtros
    statusFilter.addEventListener("change", renderFilteredDebts);
    startDateInput.addEventListener("change", renderFilteredDebts);
    endDateInput.addEventListener("change", renderFilteredDebts);
    sortOrderSelect.addEventListener("change", renderFilteredDebts);
  
    // Función para exportar la tabla a Excel
    exportToExcelButton.addEventListener("click", () => {
      // Primero renderizamos las deudas filtradas
      renderFilteredDebts();
  
      // Convertir la tabla a hoja de Excel usando SheetJS
      const ws = XLSX.utils.table_to_sheet(document.getElementById('debtTable'));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Debt History');
      
      // Guardar el archivo Excel
      XLSX.writeFile(wb, 'debt_history.xlsx');
    });
  }
  
  
  
  
  renderNotifications() {
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 5); // Calcula la fecha de 5 días más
  
    // Filtra las deudas pendientes que vencen desde hoy hasta los próximos 5 días
    const upcomingDebts = this.debts.filter(debt => {
      const dueDate = new Date(debt.dueDate);
      const isPending = debt.estado === "Pendiente"; // Asegura que solo se muestren deudas pendientes
      return isPending && dueDate >= today && dueDate <= fiveDaysLater;
    });
  
    // Genera el HTML para cada deuda pendiente que vence desde hoy hasta los próximos 5 días
    this.app.innerHTML = `
      <h1>Notifications</h1>
      <div id="notification-container">
        ${upcomingDebts.map(debt => {
          const dueDate = new Date(debt.dueDate);
          const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)); // Calcula los días restantes
          return `
            <div class="notification" id="notificationDiv">
              The debt "${debt.name}" is due in ${daysLeft === 0 ? "today" : daysLeft + " days"}.
            </div>
          `;
        }).join('')}
      </div>
    `;
  };
  
  renderTotalBalance() {
    const totalPaid = this.debts
      .filter(debt => debt.estado === "Paid")
      .reduce((sum, debt) => sum + parseFloat(debt.amount), 0);
  
    const totalPending = this.debts
      .filter(debt => debt.estado === "Pending")
      .reduce((sum, debt) => sum + parseFloat(debt.amount), 0);
  
    this.app.innerHTML = `
      <h1>Total Balance</h1>
      
      <div id="balance-container" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <div class="balance-card" style="padding: 20px; border-radius: 8px; background-color: #4CAF50; color: white; width: 300px; text-align: center;">
          <h2>Total Paid</h2>
          <p style="font-size: 24px;">$${totalPaid.toFixed(2)}</p>
        </div>
        
        <div class="balance-card" style="padding: 20px; border-radius: 8px; background-color: #c1121f; color: white; width: 300px; text-align: center;">
          <h2>Total Pending</h2>
          <p style="font-size: 24px;">$${totalPending.toFixed(2)}</p>
        </div>
      </div>
  
      <!-- Botón para exportar a Excel -->
      <button id="exportToExcel2">Export to Excel</button>
    `;
  
    // Añadir evento al botón de exportación
    document.getElementById('exportButton').addEventListener('click', () => {
      this.exportBalanceToExcel(totalPaid, totalPending);
    });
  }
  
  exportBalanceToExcel(totalPaid, totalPending) {
    const ws_data = [
      ["Balance Type", "Amount"],
      ["Total Paid", totalPaid.toFixed(2)],
      ["Total Pending", totalPending.toFixed(2)]
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Total Balance");
  
    // Exportar a un archivo Excel
    XLSX.writeFile(wb, "Total_Balance_Report.xlsx");
  }
  
  
  renderMyGoals() {
    // Inicializar HTML con el formulario para agregar metas
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
  
    // Elementos del DOM
    const goalForm = document.getElementById("goalForm");
    const goalBody = document.getElementById("goalBody");
    
    // Cargar las metas desde localStorage o inicializar un arreglo vacío
    this.goals = JSON.parse(localStorage.getItem("goals")) || [];
  
    // Función para renderizar la tabla con las metas
    const renderGoalsTable = () => {
      goalBody.innerHTML = ""; // Limpiar la tabla
      this.goals.forEach((goal, index) => {
        goalBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${goal}</td>
          </tr>
        `;
      });
    };
  
    // Evento para manejar la sumisión del formulario y agregar una nueva meta
    goalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const goal = document.getElementById("goal").value;
      if (goal) {
        this.goals.push(goal); // Agregar la meta al arreglo
        localStorage.setItem("goals", JSON.stringify(this.goals)); // Guardar en localStorage
        renderGoalsTable(); // Volver a renderizar la tabla
        goalForm.reset(); // Limpiar el formulario
      }
    });
  
    renderGoalsTable(); // Renderizar las metas al cargar la página
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
