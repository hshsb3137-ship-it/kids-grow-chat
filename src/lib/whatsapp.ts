export const WHATSAPP_NUMBER = "918075583203";

export function whatsappOrderUrl(productName: string, quantity = 1) {
  const text = encodeURIComponent(
    `Hello Infinity Learning Center,\n\nI want to order:\n1. ${productName} × ${quantity}\n\nCustomer Name:\nPhone Number:\nAddress:\n\nPlease confirm availability.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappContactUrl(message = "Hello! I'd like to know more about Infinity Learning Center.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type CartLine = { name: string; quantity: number; price: number };

export function whatsappCartUrl(items: CartLine[]) {
  if (items.length === 0) return whatsappContactUrl();
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.name} × ${i.quantity}`)
    .join("\n");
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const text = encodeURIComponent(
    `Hello Infinity Learning Center,\n\nI want to order:\n${lines}\n\nTotal: ₹${total}\n\nCustomer Name:\nPhone Number:\nAddress:\n\nPlease confirm availability.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
