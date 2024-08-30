export interface Sticker {
    name: string;
    value: string;
    color: string;
  }

export const stickers: Sticker[] = [
    { name: "Important", value: "Important ASAP", color: "#E5F1FF" },
    { name: "Offline", value: "Offline Meeting", color: "#FDCFA4" },
    { name: "Virtual", value: "Virtual Meeting", color: "#F9E9C3" },
    { name: "Asap", value: "ASAP", color: "#AFEBDB" },
    { name: "Client", value: "Client Related", color: "#CBF1C2" },
    { name: "Self", value: "Self Task", color: "#CFCEF9" },
    { name: "Appointment", value: "Appointment", color: "#F9E0FD" },
    { name: "Court", value: "Court Related", color: "#9DD0ED" },
  ];