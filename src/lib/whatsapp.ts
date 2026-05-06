export const WHATSAPP_NUMBER = "918075583203";

export function whatsappOrderUrl(productName: string) {
  const text = encodeURIComponent(`Hello, I want to order ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappContactUrl(message = "Hello! I'd like to know more about Infinity Learning Center.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
