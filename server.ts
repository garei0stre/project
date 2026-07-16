import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";
import { clientConfig } from "./src/config";

const __filename = typeof import.meta.url === "string" ? fileURLToPath(import.meta.url) : "";
const __dirname = typeof import.meta.url === "string" ? path.dirname(__filename) : "";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", apiConnected: !!ai });
  });

  // API Route: AI Chatbot representing Plumber
  app.post("/api/chat", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({
          error: "Gemini API key is missing. Please configure it in the Secrets panel.",
        });
      }

      const { message, history } = req.body;

      const systemInstruction = `
You are the AI Assistant representing the company "${clientConfig.companyName}" and its plumber "${clientConfig.plumberName}".
Your job is to answer the user's questions in a friendly, professional, and convincing manner to promote our plumbing, heating, and emergency services.

About us:
- **Company**: ${clientConfig.companyName}
- **Plumber/Contact Person**: ${clientConfig.plumberName}
- **Phone**: ${clientConfig.phone} (Emergency number)
- **Email**: ${clientConfig.email}
- **Location & Coverage Area**: ${clientConfig.areaCovered} (${clientConfig.detailedAreaText || ""})
- **Opening Hours**: Week: ${clientConfig.hoursWeek}, Saturday: ${clientConfig.hoursSaturday}, Emergencies: ${clientConfig.hoursEmergency}
- **Badge text**: ${clientConfig.badgeText}
- **Services description**: ${clientConfig.heroDescription}
- **About our company**: ${clientConfig.aboutDescription}

Key Services:
- Urgent plumbing assistance and troubleshooting (leaks, pipe burst, water heater failure, etc.).
- Drain unblocking (sinks, toilets, showers, etc.).
- Installation and replacement of faucets, valves, sinks, and showers.
- Installation and maintenance of water heaters and boilers.

Tone Guidelines:
- Professional, reassuring, welcoming, and clear.
- Provide reassurance about rapid interventions and transparent pricing.
- Keep answers concise and structured in French, focusing on how we can assist them with their plumbing, heating, or sanitary emergencies and projects.
      `;

      // Simple single call with previous chat history combined
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.content }],
          });
        }
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: error.message || "An error occurred while calling the AI model." });
    }
  });

  // API Route: AI Project Planner & Quote Estimator
  app.post("/api/estimate", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({
          error: "Gemini API key is missing. Please configure it in the Secrets panel.",
        });
      }

      const { projectType, description, features, budget, timeline } = req.body;

      const prompt = `
Generate a professional plumbing work proposal and estimation based on these inputs:
- Type of Project: ${projectType}
- Description: ${description}
- Options/Details: ${features}
- Targeted Budget: ${budget}
- Expected Timeline: ${timeline}

Act as the virtual estimator for "${clientConfig.companyName}". 
Analyze the feasibility, suggest the optimal materials or equipment (e.g., copper, PEX, specific water heater brands, high-quality sanitary fixtures), 
provide a cost estimation, and list a structured implementation roadmap divided into logical project phases (e.g., Phase 1: Preparation & Demolition, Phase 2: Installation, Phase 3: Finishing & Testing).
      `;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          totalCostEstimate: { type: Type.STRING, description: "Estimated cost range in euros, e.g., '1500€ - 2500€'" },
          durationWeeks: { type: Type.INTEGER, description: "Total duration in weeks" },
          recommendedStack: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of recommended equipment, brands, or materials (e.g., Cuivre, PER, Ballon Thermodynamique, Robinetterie Grohe)"
          },
          executiveSummary: { type: Type.STRING, description: "Professional summary in French of the plumbing project strategy" },
          keyFeatures: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "description"]
            },
            description: "Detailed key actions or installations mapped to client needs"
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "Phase title (e.g., Phase 1: Dépose & Préparation des réseaux)" },
                duration: { type: Type.STRING, description: "e.g., Jours 1-2" },
                tasks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["phase", "duration", "tasks"]
            },
            description: "Step-by-step roadmap tailored for this project"
          },
          riskAssessment: { type: Type.STRING, description: "Potential challenges (water supply cut, hidden leaks, space constraints) and mitigation actions" }
        },
        required: [
          "projectName",
          "totalCostEstimate",
          "durationWeeks",
          "recommendedStack",
          "executiveSummary",
          "keyFeatures",
          "roadmap",
          "riskAssessment"
        ]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema,
          systemInstruction: "You are an expert plumber and heating engineer. You respond strictly in French with highly professional technical specifications.",
          temperature: 0.3,
        }
      });

      const parsedData = JSON.parse(response.text || "{}");
      res.json(parsedData);
    } catch (error: any) {
      console.error("Estimation API error:", error);
      res.status(500).json({ error: error.message || "An error occurred while generating the estimation." });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
