import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

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

  // API Route: AI Chatbot representing Illyass
  app.post("/api/chat", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({
          error: "Gemini API key is missing. Please configure it in the Secrets panel.",
        });
      }

      const { message, history } = req.body;

      const systemInstruction = `
You are the AI Assistant representing Illyass BENLAHSSANIA, a professional Digital Project Manager, Business Engineer (Ingénieur d'affaires), and Full-Stack Creator.
Your job is to answer the user's questions in a friendly, professional, and convincing manner to promote his services and websites.

About Illyass:
- **Profile**: Business engineer with strong expertise in project management, digital transformation, and business development. Experienced in coordinating cross-functional teams and creating high-impact digital solutions.
- **Language**: French (Native), English (C1/Fluent). Always answer in the language the user speaks to you (prefer French by default unless prompted otherwise).
- **Contact**: Phone: +33 6 58 39 73 67 | Email: benlahssania.elmehdi@gmail.com | LinkedIn: https://www.linkedin.com/in/illyass-benlahssania/

Experiences:
1. **Domotec** (Sept 2025 - Dec 2025) | Project Manager Numérisation:
   - Centralization of CRM, design of advanced Excel business tools.
   - Audited and mapped workflow/sales pipelines, identified productivity bottlenecks.
   - Configured custom business software rules and fields.
2. **Akkodis - Airbus Helicopters** (Sept 2023 - Sept 2025) | Project Manager Officer (PMO):
   - Transversal project management: onboarded and led 30+ collaborators.
   - Full subcontractor management: tracking performance KPIs, processing invoices, organizing meetings.
   - MOA/MOE coordination: deployed cloud solutions in Romania successfully on schedule.
3. **La Compagnie Médicale** (Sept 2022 - Aug 2023) | Commercial Sédentaire:
   - Direct business negotiation, custom tailored solutions, CRM implementation.
4. **Elior Services** (Aug 2021 - July 2022) | Manager QHSE:
   - Change management, safety protocols, reduced workplace accidents from 12 to 0 in a year.

Education:
- Master Ingénieur d'Affaires (MSc) - KEDGE Business School Toulon (Ongoing, Sept 2025+)
- Bachelor en Management - KEDGE Business School Marseille (Aug 2023)
- BTS Métiers et Services à l'Environnement - CFA INHNI Marseille (July 2022)

Key Skills:
- Project Management & Subcontracting, Agile/PMO workflows
- CRM tools (Salesforce, Microsoft Dynamics, custom CRM setups)
- Business Intelligence (Power BI, advanced Excel modeling)
- Full-Stack development interests, SaaS creation, and digital transformation.

Tone Guidelines:
- Professional, welcoming, and elegant.
- Be humble but display strong technical and commercial competence.
- Keep answers concise and structured, focusing on how Illyass can add value to their projects or business.
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
Generate a professional digital project proposal and estimation based on these inputs:
- Type of Project: ${projectType}
- Description: ${description}
- Desired Features: ${features}
- Targeted Budget: ${budget}
- Expected Timeline: ${timeline}

Act as Illyass Benlahssania, Business Engineer and Digital Project Manager. 
Analyze the feasibility, suggest the optimal modern web architecture (e.g. React/Vite, NextJS, Node/Express, Tailwind, PostgreSQL or Firestore), 
provide a cost estimation, and list a structured implementation roadmap divided into logical development phases.
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
            description: "List of recommended tech stacks (e.g., React, Node.js, PostgreSQL)"
          },
          executiveSummary: { type: Type.STRING, description: "Professional summary in French of the project strategy" },
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
            description: "Detailed key functionalities mapped to business value"
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "Phase title (e.g., Phase 1: UX/UI & Spécifications)" },
                duration: { type: Type.STRING, description: "e.g., Semaines 1-2" },
                tasks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["phase", "duration", "tasks"]
            },
            description: "Step-by-step roadmap tailored for this project"
          },
          riskAssessment: { type: Type.STRING, description: "Potential challenges (subcontractor delivery, legacy APIs) and mitigation actions" }
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
          systemInstruction: "You are an expert digital business engineer. You respond strictly in French with highly professional technical specifications.",
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
