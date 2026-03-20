# ⏱ Countdown Clock

A sleek,sci-fi styled countdown timer with a live real-time clock built with React.

## Live Demo

👉 https://ian-qhamau.github.io/countdown-clock/

## Features

- **Live real-time clock** always displayed at the top (12-hour format, blinking colons)
- **Adjustable countdown** via spin-inputs for hours,minutes,and seconds
- **Quick presets** 5m,15m, 30m, 1h, 3h
- **Animated arc ring** that fills as time elapses, with a glowing tip dot
- **Digit flash animation** on each second tick
- **Pause / Resume / Reset** full control

---

## Project Structure

```
countdown-clock/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ArcRing.jsx          # SVG progress arc with tick marks
│   │   ├── ColonBlink.jsx       # Blinking colon separator
│   │   ├── Controls.jsx         # Start/Pause/Reset buttons
│   │   ├── CountdownDisplay.jsx # Arc + central digit display
│   │   ├── Digit.jsx            # Single animated digit
│   │   ├── RealTimeClock.jsx    # Live clock header
│   │   ├── SpinInput.jsx        # ▲/▼ number input
│   │   └── TimeSetPanel.jsx     # Duration setter + presets
│   ├── hooks/
│   │   ├── useCountdown.js      # All countdown timer logic
│   │   └── useRealTime.js       # Live Date hook + formatter
│   ├── App.jsx                  # Root wires everything together
│   ├── index.css                # Global resets + keyframes
│   └── index.js                 # React DOM entry point
├── package.json
└── README.md
```

---

## Getting Started

### 1.Install dependencies

```bash
npm install
```

### 2.Start the dev server

```bash
npm start
```

The app opens at **http://localhost:3000**.

### 3.Build for production

```bash
npm run build
```

---

## Customisation Tips

| What to change | Where |
|---|---|
| Default duration (3h) | `App.jsx` → `useState(3)` / `useState(0)` / `useState(0)` |
| Preset durations | `TimeSetPanel.jsx` → `PRESETS` array |
| Arc ring colours | `ArcRing.jsx` → `<linearGradient id="arcGrad">` |
| Clock colour palette | `Digit.jsx`, `RealTimeClock.jsx` → `glow` / `color` props |
| Background grid | `App.jsx` → decorative background `div` styles |
