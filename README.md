# Salesforce Validation Rules Viewer

A lightweight Node.js + Express web app with a simple UI to fetch and display **Salesforce validation rules** for a given `sObject`. Useful for architecture planning, sync logic, and integration debugging (e.g., Velaris to Salesforce).

## ✨ Features

* Retrieve all active validation rules for any Salesforce object (e.g., Opportunity)
* View formulas and error messages clearly
* Works with **Tooling API**
* Simple web UI
* Uses `dotenv` for environment-based token management
* ESLint + modern JS module support

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/your-org/salesforce-validation-rule-viewer.git](https://github.com/your-org/salesforce-validation-rule-viewer.git)
cd salesforce-validation-rule-viewer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file at the root:

```env
ACCESS_TOKEN=your_salesforce_access_token
```
⚠️ Your access token must have Tooling API access to read validation rules.

### 4. Run the app
```bash
node server.js
```
The app will start at `http://localhost:3000`

## 🖥️ Usage
Go to the UI.

Enter:

* Your Salesforce instance URL (e.g. `https://aanalytix.my.salesforce.com`)
* The sObject name (e.g. `Opportunity`)

Click **Fetch Rules**.

You’ll see a list of:

* ✅ Rule name
* 🧮 Validation formula
* 🧾 Error message

## 🧪 Linting
This project uses ESLint with modern module support.

```bash
npx eslint .
```

## 📂 Project Structure
```
.
├── public/              # Static frontend files
├── views/               # HTML template (basic)
├── server.js            # Express server logic
├── fetchRules.js        # Salesforce query + detail logic
├── .env                 # Access token
└── eslint.config.js     # ESLint config
```

## 📌 Notes

* Only supports Tooling API (not Metadata API)
* Works best for internal use or architectural audits
* `ACCESS_TOKEN` should ideally be a session token in production use

## 🛠 Future Ideas

* CSV or JSON export
* Support bulk object types
* Display referenced fields dynamically

## 📄 License

MIT
