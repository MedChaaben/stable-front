export default class ImageGeneratorService {
  static baseUrl;
  static maxRange;
  constructor(baseUrl, maxRange) {
    this.baseUrl = baseUrl; // L'URL de base de votre modèle / serveur
    this.maxRange = maxRange || 800;
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

  getPositivePrompt() {
    return [
      'interior design',
      'detailed (white background )',
      'atmospheric',
      'canon eos c 3 0 0',
      'ƒ 1. 8',
      '3 5 mm',
      '8 k',
    ];
  }

  getNegativePrompt() {
    return [
      '(((stock photo)))',
      '((((ugly))))',
      '(((duplicate)))',
      '((morbid))',
      '((mutilated))',
      '[out of frame]',
      'extra fingers',
      'mutated hands',
      '((poorly drawn hands))',
      '((poorly drawn face))',
      '(((mutation)))',
      '(((deformed)))',
      '((ugly))',
      'blurry',
      '((bad anatomy))',
      '(((bad proportions)))',
      '((extra limbs))',
      'cloned face',
      '(((disfigured)))',
      'out of frame',
      'ugly',
      'extra limbs',
      '(bad anatomy)',
      'gross proportions',
      '(malformed limbs)',
      '((missing arms))',
      '((missing legs))',
      '(((extra arms)))',
      '(((extra legs)))',
      'mutated hands',
      '(fused fingers)',
      '(too many fingers)',
      '(((long neck)))',
      'grayscale',
      'black and white',
      '(((bad composition)))',
      '((((stock photo))))',
    ];
  }
}
