export default class ImageGeneratorService {
  baseUrl: String;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl; // L'URL de base de votre modèle / serveur
  }

  async generateImage() {
    try {
      const getRandomInt = (max: number) => Math.floor(Math.random() * max) + 1;

      return this.baseUrl + getRandomInt(50).toString();
    } catch (error) {
      console.error('Error in generating image:', error);
      // Gérez l'erreur comme vous le souhaitez
    }
  }
}
