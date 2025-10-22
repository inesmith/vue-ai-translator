import axios from "axios";

const API_KEY =
  "A2ptCc4FZPb91PalE8zzGQFjCVkj3G8lm3nni0AI5jjPNscOItqQJQQJ99BJACrIdLPXJ3w3AAAbACOGdGH4";
const ENDPOINT = "https://api.cognitive.microsofttranslator.com/";
const REGION = "southafricanorth";

export const translateText = async (text, targetLang = "fr") => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/translate?api-version=3.0&to=${targetLang}`,
      [{ text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY,
          "Ocp-Apim-Subscription-Region": REGION,
          "Content-Type": "application/json",
        },
      }
    );

    const translation =
      response.data[0]?.translations[0]?.text || "No translation found.";
    return translation;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw new Error("Unable to translate text.");
  }
};
