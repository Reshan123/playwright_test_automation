# CURA Healthcare & FakeStoreAPI Automation Assignment

This repository contains the Playwright automation test suite for the **CURA Healthcare Service** (UI) and **FakeStoreAPI** (API).

## 📂 Project Structure
* **tests/ui**: Contains UI test scenarios (Login, Appointment).
* **tests/api**: Contains API test scenarios (Auth, Users, Products).
* **pages/**: Page Object Models (POM) for the UI.
* **utils/**: Reusable API client helper.
* **fixtures/**: JSON data files and custom test fixtures.

## 🚀 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Install Playwright Browsers:**
    ```bash
    npx playwright install
    ```
4.  **Environment Configuration:**
    Create a `.env` file in the root directory with the following:
    ```ini
    BASE_URL_UI=[https://katalon-demo-cura.herokuapp.com/](https://katalon-demo-cura.herokuapp.com/)
    BASE_URL_API=[https://fakestoreapi.com](https://fakestoreapi.com)
    CI=false
    ```

## 🧪 Running Tests

* **Run All Tests:**
    ```bash
    npx playwright test
    ```
* **Run UI Tests Only:**
    ```bash
    npx playwright test tests/ui
    ```
* **Run API Tests Only:**
    ```bash
    npx playwright test tests/api
    ```
* **View Report:**
    ```bash
    npx playwright show-report
    ```

---

## 📋 Test Case Documentation

### 1. UI: Authentication (Login)
| ID | Scenario | Type | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC_AUTH_01** | Login with valid credentials | Positive | Redirect to Appointment page. |
| **TC_AUTH_02** | Login with invalid username/password | Negative | Error: "Login failed! Please ensure the username and password are valid." |
| **TC_AUTH_03** | Login with empty fields | Negative | Error: "Login failed! Please ensure the username and password are valid." |

### 2. UI: Appointment Booking
| ID | Scenario | Type | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC_APPT_01** | Book appointment (Future Date) | Positive | Confirmation page displayed; Appointment visible in History. |
| **TC_APPT_02** | Book appointment without Date | Negative | Browser validation prevents submission. |
| **TC_APPT_03** | Book appointment (Past Date) | Documenting Behavior | System accepts past dates (Logic gap documented). |

### 3. API: User Management
| ID | Scenario | Type | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC_API_01** | Get Single User | Positive | Status 200; Returns correct user ID/Email. |
| **TC_API_02** | Create New User | Positive | Status 200; Returns new ID. |
| **TC_API_03** | Delete User | Positive | Status 200; Returns deleted user data. |
| **TC_API_04** | Create User (Invalid Email) | Negative | Status not 500 (API handles error gracefully). |

### 4. API: Products & Auth
| ID | Scenario | Type | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC_API_AUTH_01** | Login with valid credentials | Positive | Status 200; Returns Auth Token. |
| **TC_API_AUTH_02** | Login with invalid password | Negative | Status 401. |
| **TC_API_PROD_01** | Get All Products | Positive | Status 200; Returns array of products. |