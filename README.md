# गर्भ जांच बोर्ड गेम 🎲🐄

An interactive, educational 2-player digital board game inspired by *Snakes and Ladders*, designed to raise awareness about animal pregnancy testing among rural Indian users.

## 🧠 Concept

Players navigate a 5x5 board by rolling a dice, encountering both progress-boosting and setback-inducing events related to animal health and pregnancy testing. The game uses visual cues, Hindi popups, and messages to deliver social impact in an engaging format.

## 🛠 Features

- 🎯 5x5 game board using a static image
- 👥 2-player turn-based system
- 🎲 Animated dice roll (1–6)
- 🐍 Snake and 🪜 ladder logic
- 🗨️ Hindi messages for key tiles (educational insight)
- 🎉 Win condition and restart option
- 📱 Fully responsive (mobile + desktop)

## 🔍 Special Tile Messages

| Tile | Type      | Description |
|------|-----------|-------------|
| 3    | Info      | जाँच नहीं कराई - जानकारी की कमी |
| 4    | Ladder    | Bingnaa से जाँच की, सिर्फ 28 दिन में रिजल्ट! 13 पर जाएं |
| 8    | Snake     | गर्भ नहीं था, फिर भी इंतजार करते रहे - पशु बीमार, 2 पर वापस जाएं |
| 25   | Win Tile  | सही समय पर जांच कराई, पशु स्वस्थ और लाभ में! |

## 🧩 Tech Stack

- **React.js**
- **Tailwind CSS** for styling
- **JavaScript** for logic and animations

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ recommended

### Installation

```bash
git clone https://github.com/yourusername/garbh-jaanch-game.git
cd garbh-jaanch-game
npm install
npm start
