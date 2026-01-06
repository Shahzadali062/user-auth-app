# User Authentication App

This project is a take-home assignment completed for **Kloudius Services.**  
It demonstrates authentication flow implementation.

---

## Features

### Authentication
- Login
- Signup
- Logout
- Global authentication state using **React Context API**

### User Management
- Multiple users supported
- Users stored locally using **AsyncStorage**
- Login possible with any registered user
- Persistent login after app restart

### Validation & UX
- Required field validation
- Email format validation
- Password length validation (minimum 6 characters)
- Error messages with clean UI
- Password visibility toggle (eye icon)

### Screens
- Login Screen
- Signup Screen
- Home Screen (User details + Logout)

### Navigation
- Implemented using **React Navigation**

---

## 🛠 Tech Stack
- React Native
- TypeScript
- React Context API
- AsyncStorage
- React Navigation

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Shahzadali062/user-auth-app.git
cd user-auth-app
npm install

# Android
npm run android
