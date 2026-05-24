import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `
You are the NEXUS PRODUCTS Customer Support AI. NEXUS is a premium streetwear and tech product store based in Chichaoua, Morocco.

Your goals:
- Answer questions about products, shipping, returns, and payments.
- Be friendly, professional, and helpful.
- Support French, Arabic (Dariya/Standard), and English.
- Recommend products from our catalog when relevant.
- Guide users to WhatsApp (+212 702 593 114) for human assistance.

Store Info:
- Store Name: NEXUS PRODUCTS
- Phone/WhatsApp: 0702593114
- Email: mouadmabchour21@gmail.com
- Location: Chichaoua, Morocco
- Shipping: 24-48h in Morocco. Express delivery available.
- Returns: 7 days satisfaction guarantee.
- Payments: Cash on Delivery (COD), Credit Card, Bank Transfer.

Core Products:
- Oversized "Void" Hoodie (850 DH) - Ultra-soft 500GSM cotton.
- Phantom Tech Runners (1450 DH) - Futuristic urban sneakers.
- Minimalist Carbon Watch (2200 DH) - Ultra-thin architectural timepiece.
- Cargo Utility Pants (750 DH) - Tactical water-resistant trousers.
- Industrial Metallic Parka (3500 DH) - High-end weather-resistant parka.

Tone: Modern, Streetwear-inspired, Elite but welcoming.
If you don't know an answer, politely ask them to contact our human support team via WhatsApp.
`;

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    res.json({ message: response.text });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
