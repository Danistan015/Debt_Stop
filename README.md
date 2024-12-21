# Debt Stop: Take Control of Your Finances

## Project Description
Debt Stop is a user-friendly application designed to simplify personal debt management. It helps users track debts, record payments, and organize their finances with ease. Featuring an intuitive interface and local storage system, Debt Stop aims to empower users to take control of their financial health.

### Key Features
- **User Registration and Login**: Secure user authentication.
- **Active Debt Tracking**: View and manage active debts.
- **Payment History**: Keep a detailed history of payments.
- **Automatic Reminders**: Notifications to ensure timely payments.
- **Debt Management**: Mark debts as paid and track balances.
- **Savings Goals**: Set and monitor financial goals.
- **Filtering and Sorting**: Organize debts by status, date, or amount.
- **Chatbot Assistance**: Get financial advice from an integrated chatbot.
- **Reports**: Generate detailed history and balance reports.

---

## Quick Start Guide

### 1. Create an API Key
To access Google Generative AI services, you need an API Key. Follow these steps:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Google Generative AI API** from the API library.
4. Generate an API Key in the **Credentials** section.
5. Save the generated API Key for later use.

---

### 2. Install Dependencies
Run the following commands in your terminal:

#### Google Generative AI
```bash
npm install @google/generative-ai
```

#### dotenv
```bash
npm install dotenv
```

#### CORS
```bash
npm install cors
```

#### Node Fetch
```bash
npm install node-fetch@2
```

#### Project Dependencies
Ensure you have all necessary project dependencies:
```bash
npm install
```
This will include essential packages like Express and Socket.io.

---

### 3. Configure Your API Key
1. Create a `.env` file in the root directory of your project.
2. Add your API Key in the following format:
   ```env
   API_KEY=your_api_key_here
   ```
   This keeps your API Key secure and out of the source code.

---

### 4. Run the Server
1. Navigate to the project directory.
2. Start the server with:
   ```bash
   node server.js
   ```

---

## Functional Requirements

| **ID**  | **Description**                                                                 |
|---------|---------------------------------------------------------------------------------|
| RF-1    | The user can log in.                                                           |
| RF-2    | The user can register new debts.                                               |
| RF-3    | The user can view the payment history.                                         |
| RF-4    | The application displays payment reminders.                                   |
| RF-5    | The user can mark a registered debt as paid.                                   |
| RF-6    | The application automatically calculates the total balance of active debts.    |
| RF-7    | The user can filter debts by status (pending or paid) and sort by date or amount. |
| RF-8    | The application allows setting savings goals.                                  |
| RF-9    | Chatbot provides financial advice.                                             |
| RF-10   | The application allows generating reports of history and balances.            |

---

## Project Information

- **Project Name**: Debt Stop: Take Control of Your Finances
- **Date**: 12/12/2024
- **Team Members**:
  - Daniela Soto
  - Valeria Aristizabal

---

## Installation Summary
1. Create an API Key from Google Cloud.
2. Install dependencies:
   ```bash
   npm install @google/generative-ai dotenv cors node-fetch@2
   ```
3. Configure the API Key in a `.env` file.
4. Install all project dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   node server.js
   ```



