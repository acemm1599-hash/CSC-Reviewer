
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getAiExplanation(topic: string, question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: Philippine Civil Service Exam Reviewer.
      Topic: ${topic}
      Question: ${question}
      Task: Provide a professional, encouraging, and detailed step-by-step explanation of the logic behind solving this question.`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "The AI assistant is currently unavailable. Please refer to the lesson modules for help.";
  }
}

export async function getAiCoachResponse(userMessage: string, progressContext: any) {
  try {
    const systemInstruction = `You are the "CSC Master AI Coach", a senior education architect and CSC exam specialist. 
    Your goal is to help the user pass the Philippine Civil Service Professional Exam.
    
    User Progress Context:
    - Readiness Score: ${progressContext.readinessScore}%
    - Streak: ${progressContext.streak} days
    - Completed Lessons: ${progressContext.completedLessons.length}
    - Recent Exam Average: ${progressContext.examAverage}%
    - Weak Topics: ${progressContext.weakTopics.join(", ")}
    - Strong Topics: ${progressContext.strongTopics.join(", ")}
    
    Guidelines:
    1. Be professional, encouraging, and highly exam-focused.
    2. Provide actionable study plans (e.g., "Review Logic for 30 mins, then take a 10-item drill").
    3. Share time-management tips for the 3h 10m exam duration.
    4. Do NOT give direct answers to specific test questions; explain the LOGIC and strategy instead.
    5. Keep responses concise but comprehensive. Use bullet points for plans.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Coach Error:", error);
    return "I'm having trouble connecting to my knowledge base. Try focusing on your weakest topic listed in the dashboard for now!";
  }
}
