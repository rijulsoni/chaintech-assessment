# User Signup & Edit Form

This is a simple user signup and edit form application built using React. The form allows users to sign up with their basic information. If a user exists, the form enables them to edit their details. The user data is stored in `localStorage` to simulate a persistent backend.

## Features

- **User Signup**: Allows users to create a new account.
- **User Edit**: Enables users to update their existing account information.
- **Form Validation**: Ensures that the email is in the correct format, and the password is provided.
- **LocalStorage-based Data Persistence**: User data is stored in `localStorage` for persistence.
- **Zip Code Field**: A zip code field with a max length of 6 characters.

## Technologies Used

- **React**: Frontend library used to build the user interface.
- **React Router**: For handling routing and navigation between pages.
- **LocalStorage**: For storing and retrieving user data locally in the browser.

## Setup

### Prerequisites

Before you begin, ensure that you have the following installed:

- Node.js
- npm

### Installation

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/rijulsoni/chaintech-assessment.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd chaintech-assessment
   ```

3. **Install the necessary dependencies**:

   ```bash
   npm install
   ```

### Running the Application

To start the development server and run the application, use the following command:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/` to see the application running.

## How It Works

- **User Signup**: When a new user signs up, the form collects their name, email, password, city, state, gender, and zip code. This data is saved in `localStorage`.
- **User Edit**: If the user is editing an existing account, their details are pre-filled in the form, and they can update the information.
- **Zip Code Field**: The zip code field has a max length of 6 characters, ensuring valid input.
- **Form Validation**: Basic validation is applied to the email and password fields to ensure they meet minimum requirements (email contains "@" and password is not empty).


## Known Issues

- **No Backend**: This application stores data in `localStorage` for demo purposes. There's no backend API to persist data beyond the local environment.
- **Limited Validation**: Only basic form validation is implemented (e.g., checking if the email contains an "@" symbol).

