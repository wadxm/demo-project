export function normalizeContactPayload(formData) {
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim().toLowerCase(),
    message: String(formData.get("message") || "").trim(),
  };
}

export function isValidContactPayload(payload) {
  return (
    payload.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) &&
    payload.message.length >= 24
  );
}
