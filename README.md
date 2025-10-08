ShopEZ - Mobile Shopping App

ShopEZ is a React Native shopping app where users can register/login, browse products from the Fake Store API
, view product details, add items to a personal cart, and manage their shopping cart. Cart data is saved in Firebase Realtime Database under each user’s profile, and login persists across app restarts.

Table of Contents

Features

Technologies

Installation

Firebase Setup

Usage

Screenshots

Project Structure

Notes

Features

User Registration & Login (Email/Password)

Persistent Login

Browse Products with Images, Titles, and Prices

Product Detail Screen with Description & “Add to Cart”

Category Filtering

Real-time Cart synced with Firebase

Offline Cart Persistence using AsyncStorage

Remove/Modify items in Cart

React Navigation for smooth screen transitions

Clean & responsive UI

Technologies

Frontend: React Native, Expo

Backend & Auth: Firebase Auth, Firebase Realtime Database

API: Fake Store API

Storage: AsyncStorage (offline cart)

Navigation: React Navigation

Installation

Clone the repo:

git clone https://github.com/yourusername/ShopEZ.git
cd ShopEZ


Install dependencies:

npm install


Set up Firebase:

Copy env.example to .env:

cp env.example .env


Fill in your Firebase credentials in .env:

 apiKey: "AIzaSyDzOXWUO_0uLl6C5bz7dnf-vQMsD18cQUc",
  authDomain: "test2-e2a3e.firebaseapp.com",
  databaseURL: "https://test2-e2a3e-default-rtdb.firebaseio.com",
  projectId: "test2-e2a3e",
  storageBucket: "test2-e2a3e.firebasestorage.app",
  messagingSenderId: "422029520509",
  appId: "1:422029520509:web:cc6560006f0157edf78b14",
  measurementId: "G-TQLVTCXV25"


Start the app:

npx expo start


Open the app in Expo Go on your phone or in an emulator.

Firebase Setup

Enable Email/Password Authentication.

Create a Realtime Database.

Apply security rules so users can only access their cart:

{
  "rules": {
    "carts": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
