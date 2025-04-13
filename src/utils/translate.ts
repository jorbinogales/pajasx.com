import axios from "axios";

const translateText = async (text: string, targetLanguage: string = "es") => {
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: text,            // El texto que deseas traducir
      source: "en",       // Idioma original (por ejemplo, inglés)
      target: targetLanguage, // Idioma de destino (por ejemplo, español)
      format: "text"
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Error al traducir:", error);
    return text; // Si hay un error, regresamos el texto original
  }
};

export default translateText;