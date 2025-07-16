export const dummyMessages = Array.from({ length: 100 }, (_, i) => ({
  id: `msg-${i}`,
  text: `Old message ${100 - i}`,
  sender: i % 2 === 0 ? "user" : "ai",
  timestamp: new Date(Date.now() - i * 60000).toISOString(),
}));
