"use client";

import Calendar22 from "@/components/calendar-22";
import TimePicker from "@/components/time-picker";
import TextInput from "@/components/text-input";
import TextareaInput from "@/components/textarea-input";
import SelectInput from "@/components/select-input";
import FileInput from "@/components/file-input";
import { useMemo, useState } from "react";

type PaymentType = "per_seat" | "package";

export default function DriverPage(): React.JSX.Element {
  // Car & driver info
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState<string>("");
  const [carColor, setCarColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [carPhotos, setCarPhotos] = useState<File[]>([]);

  // Trip setup
  const [isRegular, setIsRegular] = useState(false);
  const [date] = useState(""); // for one-time
  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // for regular
  const [paymentType, setPaymentType] = useState<PaymentType>("per_seat");
  const [allowBuyout, setAllowBuyout] = useState(true); // relevant for per_seat
  const [notifyOnMatch, setNotifyOnMatch] = useState(true);

  // Route & preferences
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [preferences, setPreferences] = useState("");
  const [stops, setStops] = useState<string[]>([""]); // intermediate stops

  const dayOptions = useMemo(
    () => [
      { id: "mon", label: "Пн" },
      { id: "tue", label: "Вт" },
      { id: "wed", label: "Ср" },
      { id: "thu", label: "Чт" },
      { id: "fri", label: "Пт" },
      { id: "sat", label: "Сб" },
      { id: "sun", label: "Вс" }
    ],
    []
  );

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };


  const handleStopChange = (index: number, value: string) => {
    setStops((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const addStop = () => setStops((prev) => [...prev, ""]);
  const removeStop = (index: number) =>
    setStops((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      car: {
        make: carMake,
        model: carModel,
        year: carYear,
        color: carColor,
        licensePlate
      },
      photos: carPhotos.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      trip: {
        type: isRegular ? "regular" : "one_time",
        date: isRegular ? null : date,
        time,
        days: isRegular ? selectedDays : [],
        from,
        to,
        preferences,
        stops: stops.filter((s) => s.trim() !== "")
      },
      payment: {
        type: paymentType,
        allowBuyout: paymentType === "per_seat" ? allowBuyout : false
      },
      notifications: {
        onMatch: notifyOnMatch
      }
    };

    console.log("Driver form submit:", payload);
    alert("Данные отправлены в консоль. (Заглушка)");
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

  const secondaryButtonStyle = {
    padding: "8px 12px",
    border: "2px solid #6c757d",
    borderRadius: "6px",
    background: "#6c757d",
    color: "white",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 200ms ease",
    outline: "none"
  } as React.CSSProperties;

  const checkboxStyle = {
    width: "18px",
    height: "18px",
    accentColor: "#007bff",
    cursor: "pointer"
  } as React.CSSProperties;

  return (
    <div style={{ maxWidth: 720, padding: 16, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 16 }}>Анкета водителя и создание рейса</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <section style={{ display: "grid", gap: 12 }}>
            <h2 style={{ margin: 0 }}>Данные авто</h2>
            <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", alignItems: "end" }}>
              <TextInput
                value={carMake}
                onChange={setCarMake}
                label="Марка"
                required
              />
              <TextInput
                value={carModel}
                onChange={setCarModel}
                label="Модель"
                required
              />
              <TextInput
                value={carYear}
                onChange={setCarYear}
                label="Год"
                type="number"
                min={1980}
                max={2100}
                required
              />
              <TextInput
                value={carColor}
                onChange={setCarColor}
                label="Цвет"
                required
              />
              <TextInput
                value={licensePlate}
                onChange={setLicensePlate}
                label="Гос. номер"
                required
              />
              <FileInput
                onChange={setCarPhotos}
                label="Фото авто"
                accept="image/*"
                multiple
              />
            </div>
          </section>

          <section style={{ display: "grid", gap: 12 }}>
            <h2 style={{ margin: 0 }}>Создание рейса</h2>

            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={isRegular} onChange={(e) => setIsRegular(e.target.checked)} style={checkboxStyle} />
              <span>Регулярный рейс</span>
            </label>

            {isRegular ? (
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {dayOptions.map((d) => (
                    <label key={d.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input type="checkbox" checked={selectedDays.includes(d.id)} onChange={() => toggleDay(d.id)} style={checkboxStyle} />
                      <span>{d.label}</span>
                    </label>
                  ))}
                </div>
                <TimePicker 
                  value={time}
                  onChange={setTime}
                  label="Время отправления"
                />
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                <Calendar22 />
                <TimePicker 
                  value={time}
                  onChange={setTime}
                  label="Время отправления"
                />
              </div>
            )}

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

            <div style={{ display: "grid", gap: 8 }}>
              <span>Промежуточные пункты</span>
              {stops.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <TextInput
                      value={s}
                      onChange={(value) => handleStopChange(i, value)}
                      placeholder={`Пункт ${i + 1}`}
                      label=""
                    />
                  </div>
                  {stops.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeStop(i)}
                      style={secondaryButtonStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#5a6268";
                        e.currentTarget.style.borderColor = "#5a6268";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#6c757d";
                        e.currentTarget.style.borderColor = "#6c757d";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      Удалить
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addStop}
                style={secondaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5a6268";
                  e.currentTarget.style.borderColor = "#5a6268";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#6c757d";
                  e.currentTarget.style.borderColor = "#6c757d";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Добавить пункт
              </button>
            </div>

            <TextareaInput
              value={preferences}
              onChange={setPreferences}
              label="Предпочтения"
              placeholder="Например: не курить в салоне, без животных и т.д."
              rows={4}
            />

            <div style={{ display: "grid", gap: 8 }}>
              <SelectInput
                value={paymentType}
                onChange={(value) => setPaymentType(value as PaymentType)}
                label="Модель оплаты"
                placeholder="Выберите модель оплаты"
                options={[
                  { value: "per_seat", label: "Поштучная оплата" },
                  { value: "package", label: "Пакет" }
                ]}
              />

              {paymentType === "per_seat" ? (
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={allowBuyout} onChange={(e) => setAllowBuyout(e.target.checked)} style={checkboxStyle} />
                  <span>Разрешить &quot;выкуп&quot; заявки при совпадении</span>
                </label>
              ) : (
                <p style={{ margin: 0, color: "#444" }}>При пакете доступ предоставляется автоматически.</p>
              )}
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={notifyOnMatch} onChange={(e) => setNotifyOnMatch(e.target.checked)} style={checkboxStyle} />
              <span>Получать уведомление при совпадении заявок</span>
            </label>
          </section>

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
            Сохранить и создать рейс
          </button>
        </form>
    </div>
  );
}


