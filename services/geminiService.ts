
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSuggestedPrice = async (pickup: string, dropoff: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given a ride from ${pickup} to ${dropoff}, suggest a reasonable price in USD and a brief market analysis.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            minPrice: { type: Type.NUMBER },
            maxPrice: { type: Type.NUMBER }
          },
          required: ["suggestedPrice", "reasoning", "minPrice", "maxPrice"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { suggestedPrice: 15, reasoning: "Local average", minPrice: 10, maxPrice: 25 };
  }
};

export const simulateDriverAcceptance = async (rideDetails: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `A passenger is offering $${rideDetails.offeredPrice} for a ride from ${rideDetails.pickup.address} to ${rideDetails.dropoff.address}. 
      Decide if a driver would accept this. Return a boolean and a reason.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            accept: { type: Type.BOOLEAN },
            driverName: { type: Type.STRING },
            counterOffer: { type: Type.NUMBER },
            message: { type: Type.STRING }
          },
          required: ["accept", "driverName", "message"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { accept: true, driverName: "Alex", message: "On my way!" };
  }
};
