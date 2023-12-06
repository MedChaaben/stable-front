export default class StableDiffusionService {
  baseUrl: String;

  constructor(baseUrl) {
    this.baseUrl = baseUrl; // L'URL de base de votre modèle / serveur
  }

  async generateImage(description, imageUrl, parameters) {
    try {
      const response = await fetch(this.baseUrl + '/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          imageUrl,
          parameters,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Ou traiter les données reçues selon vos besoins
    } catch (error) {
      console.error('Error in generating image:', error);
      // Gérez l'erreur comme vous le souhaitez
    }
  }
}
