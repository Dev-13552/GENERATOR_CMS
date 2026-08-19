import { GoogleGenAI } from "@google/genai";
import "dotenv/config"

export const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_API_KEY});
