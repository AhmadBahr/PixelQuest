# PixelQuest

![game preview](preview.png)

## Table of Contents
1. [**General Info**](#general-info)
3. [**Technologies Used**](#Techlogy-used)
4. [**Setup**](#setup)
5. [**Features**](#features) 
6. [**Code & Snippets**](#CodeSnippets)

## General Info
PixelQuest is a 2D platformer game built using TypeScript and Kaboom.js. Inspired by classic platformers, the game features a pixel art world where players must navigate obstacles, collect items, and defeat enemies to reach the goal. The project demonstrates core game development concepts such as sprite animation, physics, and state management in a browser environment.

## Technologies Used:

# TypeScript
TypeScript is a statically typed superset of JavaScript that adds type annotations. It helps catch errors during development and improves the code quality for large-scale projects like PixelQuest.

# CSS3
CSS3 is used to style the webpage surrounding the game canvas, ensuring it is responsive and visually appealing. It also handles some of the game’s UI components.

# Kaboom.js
Kaboom.js is a lightweight JavaScript game framework for building 2D games. It provides built-in tools for handling sprite rendering, physics, and input, which simplifies the game development process.

# Vite
Vite is a fast build tool and development server for modern web projects. It speeds up the development process by providing fast Hot Module Replacement (HMR) and efficient bundling, allowing developers to see changes instantly in the browser.

# HTML5 Canvas
React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.

## Setup
Clone the repository:
git clone https://github.com/your-username/pixelquest-game.git

Navigate to the project directory:
cd pixelquest-game

Install dependencies using Vite:
npm install

Start the development server with Vite:
npm run dev

Open the game in your browser by navigating to the local server URL displayed by Vite (typically http://localhost:3000).

To build the project for production:
npm run build

## Features

Character Movement:
Control the player character using the arrow keys for movement and the spacebar to jump. The game uses Kaboom's built-in physics engine to handle gravity and collisions with the environment.

Collectible Items:
Throughout the levels, players can collect coins and power-ups that enhance their abilities or provide score bonuses.

Enemies:
There are various enemies placed in levels. If touched, they will deal damage to the player. The player can defeat enemies by jumping on top of them.

Multiple Levels:
PixelQuest features multiple levels with increasing difficulty. Each level has a distinct layout with its own set of challenges, platforms, and enemies.

Smooth Animations:
Kaboom.js handles sprite animations for the character, enemies, and objects. Smooth transitions and animated effects enhance the gameplay experience.

# Code & Snippets: 

