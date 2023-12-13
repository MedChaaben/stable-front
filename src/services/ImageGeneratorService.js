export default class ImageGeneratorService {
  static baseUrl;
  static maxRange;
  constructor(baseUrl, maxRange) {
    this.baseUrl = baseUrl; // L'URL de base de votre modèle / serveur
    this.maxRange = maxRange || 1000;
  }

  getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

  async generateImage() {
    try {
      return this.baseUrl + this.getRandomInt(this.maxRange).toString();
    } catch (error) {
      console.error('Error in generating image:', error);
      // Gérez l'erreur comme vous le souhaitez
    }
  }
}
