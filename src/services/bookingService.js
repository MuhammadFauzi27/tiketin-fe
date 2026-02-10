const data = []

export const getAllTicket = () => data

export const createTicket = (dataTicket) => {
  data.push(dataTicket)
}

export const extractLocation = (location = "") => {
  if (!location) return "";

  const parts = location
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  return parts.length >= 2 ? parts[parts.length - 2] : "";
};



