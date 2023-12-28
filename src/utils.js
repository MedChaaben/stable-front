export function downloadImage(image, index) {
  const link = document.createElement('a');
  link.href = image; // Votre image est déjà encodée en base64
  link.download = `image-${index}.png`; // Nom de fichier personnalisable
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
