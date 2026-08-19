import { ai } from "../config/gemini.js";

export const reWriteContentAPI = async (prompt) => {
  try {
    const response = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,

    });
    return response.output_text;
  } catch (error) {
    console.log("Error in generating content service -->", error);
  }
};
