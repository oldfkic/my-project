"use client";

import Calendar22 from "@/components/calendar-22";
import TimePicker from "@/components/time-picker";
import TextInput from "@/components/text-input";
import { useState } from "react";

export default function PassagerPage(): React.JSX.Element {
  // Form state
  const [date] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [seats, setSeats] = useState<number>(1);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { date, time, seats, from, to };
    console.log("Submit:", payload);
    alert(`Отправлено: ${JSON.stringify(payload, null, 2)}`);
  };


  const buttonStyle = {
    padding: "12px 20px",
    border: "2px solid #007bff",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 200ms ease",
    outline: "none"
  } as React.CSSProperties;

  return (
    <div style={{ maxWidth: 500, padding: 16, margin: "0 auto"}}>
      <h1 style={{ marginBottom: 16 }}>Бронирование поездки</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <Calendar22 />
        
        <TimePicker 
          value={time}
          onChange={setTime}
          label="Время"
        />

        <TextInput
          value={seats.toString()}
          onChange={(value) => setSeats(Number(value))}
          label="Количество мест"
          type="number"
          min={1}
          max={8}
          required
        />

        <TextInput
          value={from}
          onChange={setFrom}
          label="Откуда"
          placeholder="Например: Центр города"
          required
        />

        <TextInput
          value={to}
          onChange={setTo}
          label="Куда"
          placeholder="Например: Аэропорт"
          required
        />

        <button 
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0056b3";
            e.currentTarget.style.borderColor = "#0056b3";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#007bff";
            e.currentTarget.style.borderColor = "#007bff";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}