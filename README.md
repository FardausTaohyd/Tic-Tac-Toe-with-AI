# 🎮 Tic-Tac-Toe Web Game  

A fully interactive web-based **Tic-Tac-Toe** game built with **HTML, CSS, and JavaScript**.  
The game supports multiple modes, AI opponents with different difficulty levels, and fun animations for wins and draws.  

---

## ✨ Features  

### 🎲 Game Modes  
- **Single Player** – Play against the computer.  
- **Two Player** – Play with a friend on the same device.  
- **Self Play** – Watch "X" and "O" AI battle it out automatically.  

### 🧠 Computer Difficulty Levels  
- **Easy** – Random moves, simple to beat.  
- **Medium** – Uses the minimax algorithm with some randomness.  
- **Hard** – Plays optimally using the minimax algorithm (very challenging).  

### 🏆 Game Logic  
- **Winning Conditions**: The game checks predefined winning combinations.  
- **Celebration**: Winning cells animate + confetti effect.  
- **Draw Condition**: If the board is full without a winner, the game ends in a draw.  

### 🖥️ User Interface  
- 3x3 **grid-based game board**.  
- **Status messages** showing whose turn it is or the outcome.  
- **Control buttons** for:  
  - Selecting game mode  
  - Choosing difficulty level  
  - Restarting the game  

---

## ⚙️ Technical Details  

- **HTML (`index.html`)**: Page structure (title, buttons, board, status, restart).  
- **CSS (`styles.css`)**: Styling, layout, animations (winning highlight + confetti).  
- **JavaScript (`script.js`)**: Core game logic.  
  - Handles game state (`currentPlayer`, `gameActive`, `gameState`).  
  - Click handlers (`handleCellClick`) & result checking (`handleResultValidation`).  
  - AI logic:  
    - `getRandomMove` – Easy difficulty.  
    - `getBestMove` – Medium/Hard difficulty using minimax.  
    - `minimax` algorithm with scoring for AI.  
  - Event listeners for UI interactions.  

---

## 🚀 How to Play  

1. Clone or download this repository.  
2. Open `index.html` in your browser.  
3. Choose your **game mode** and **difficulty** (if playing vs computer).  
4. Click on cells to play.  
5. Restart anytime using the **Restart** button.  

---

## 📸 Screenshots (Optional)  
 <img width="705" height="775" alt="image" src="https://github.com/user-attachments/assets/2ec1162b-16ad-404b-b88c-5cea5929a9db" />

---

## 📂 Project Structure  
tic-tac-toe/
│── index.html # Main page
│── styles.css # Styling and animations
│── script.js # Game logic and AI
│── README.md # Project documentation

---

## 🎉 Future Improvements  
- Add online multiplayer support.  
- Improve AI with learning 

---

## 📝 License  
This project is open-source and free to use.  


