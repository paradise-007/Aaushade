# 🌿 Aaushade — Ayurvedic Plant Identifier

> *Aushad (औषध) means medicine in Sanskrit. Aaushade bridges 3000+ years of Ayurvedic wisdom with modern AI.*

![Aaushade Banner](https://img.shields.io/badge/Aaushade-Ayurvedic%20Plant%20AI-2d5a20?style=for-the-badge&logo=leaf&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-c9a84c?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📖 What is Aaushade?

**Aaushade** is an AI-powered web application that identifies Ayurvedic medicinal plants from photos and provides comprehensive information about their traditional uses, benefits, and precautions.

Simply upload a photo of any plant and instantly receive:

- 🌿 **Ayurvedic & Sanskrit name** with Devanagari script
- 📋 **Medicinal uses** rooted in traditional Ayurvedic practice
- ✨ **Health benefits** backed by ancient texts
- 👍 **Pros & cons** for informed decision-making
- 💊 **Dosage guidance** and preparation methods
- 🚨 **Safety precautions** and contraindications
- 📖 **Historical & cultural facts** from Ayurvedic tradition

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **AI Plant Identification** | Upload any plant photo and get full Ayurvedic profile via Claude AI |
| 🌐 **Multilingual Support** | Full translations in English, हिंदी (Hindi), and ગુજરાતી (Gujarati) |
| 📚 **Plant Library** | Curated database of 9+ key Ayurvedic plants with search & filters |
| 🎨 **Elegant UI** | Dark forest-green aesthetic with gold accents — beautiful on all devices |
| ⚡ **Fast & Free** | Built on Vite — instant load, zero cost to use |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key → [Get one here](https://console.anthropic.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aaushade.git

# Navigate into the project
cd aaushade

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Using the Plant Identifier

1. Go to the **Identify** page
2. Paste your Anthropic API key (never stored, stays in your browser)
3. Upload or drag-and-drop a plant photo
4. Click **Identify this Plant**
5. Receive a full Ayurvedic breakdown instantly

---

## 🗂️ Project Structure

```
aaushade/
├── public/
├── src/
│   ├── context/
│   │   └── LanguageContext.jsx   # Global language state (EN / HI / GU)
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation + language switcher
│   │   └── PlantResult.jsx       # AI result display card
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Identify.jsx          # AI plant identification
│   │   └── Explore.jsx           # Plant library browser
│   ├── translations.js           # All EN / HI / GU translations
│   ├── app.jsx                   # Root component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles & CSS variables
├── index.html
├── vite.config.js
└── package.json
```

---

## 🌍 Languages Supported

| Language | Code | Status |
|---|---|---|
| English | `en` | ✅ Complete |
| हिंदी (Hindi) | `hi` | ✅ Complete |
| ગુજરાતી (Gujarati) | `gu` | ✅ Complete |

Switch languages instantly using the 🌐 button in the navbar — all pages, labels, plant descriptions, and AI result cards update immediately.

---

## 🛠️ Tech Stack

- **Frontend** — [React 18](https://react.dev) + [Vite 7](https://vitejs.dev)
- **Routing** — [React Router v6](https://reactrouter.com)
- **AI** — [Anthropic Claude API](https://anthropic.com) (claude-opus-4-5 with vision)
- **Styling** — Pure CSS with CSS variables (no UI framework)
- **Fonts** — Cormorant Garamond + DM Sans (Google Fonts)
- **Deployment** — [Vercel](https://vercel.com)

---

## 🌿 Ayurvedic Plants in the Library

| Plant | Sanskrit | Primary Benefit |
|---|---|---|
| Ashwagandha | अश्वगंधा | Stress relief & vitality |
| Tulsi | तुलसी | Immunity & respiratory health |
| Brahmi | ब्राह्मी | Memory & cognitive boost |
| Neem | नीम | Skin purification & antibacterial |
| Turmeric | हल्दी | Anti-inflammatory & antioxidant |
| Shatavari | शतावरी | Hormonal balance & vitality |
| Triphala | त्रिफला | Digestive health & detox |
| Giloy | गिलोय | Immunity & fever management |
| Amla | आँवला | Vitamin C & rejuvenation |

---

## 🔒 Privacy

- Your Anthropic API key is **never stored** — it exists only in your browser session
- No user data is collected or transmitted beyond what is needed to call the Anthropic API
- Images are processed client-side and sent directly to Anthropic's API

---

## ⚕️ Disclaimer

> The information provided by Aaushade is for **educational purposes only** and does not constitute medical advice. Always consult a qualified Ayurvedic practitioner or healthcare professional before using any medicinal plant.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) for the Claude AI API
- The ancient Ayurvedic scholars whose knowledge forms the foundation of this project
- [Charaka Samhita](https://en.wikipedia.org/wiki/Charaka_Samhita) and [Sushruta Samhita](https://en.wikipedia.org/wiki/Sushruta_Samhita) — the original Ayurvedic texts

---

<div align="center">
  <p>Made with 🌿 to preserve and share the wisdom of Ayurveda</p>
  <p><strong>Aaushade</strong> · <em>औषधे</em></p>
</div>
