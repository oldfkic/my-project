"use client";

import { useMemo, useState } from "react";
import  DriverPage  from "./driver/page";
import  PassagerPage  from "./passager/page";

type Role = "passager" | "driver" | null;

export default function Home() {
  const [role, setRole] = useState<Role>(null);

  const buttonBase = useMemo(
    () => ({
      padding: "12px 20px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.08)",
      background: "white",
      cursor: "pointer",
      transition: "box-shadow 200ms ease, transform 200ms ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      fontSize: 16,
      fontWeight: 600
    } as React.CSSProperties),
    []
  );

  return (
    <div style={{ display: "grid", justifyItems: "center", padding: 16, gap: 16 }}>
      <h1 style={{ margin: 0 }}>Вы пассажир или водитель?</h1>

      {role === null && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            style={buttonBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.16)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "none";
            }}
            onClick={() => setRole("passager")}
          >
            Пассажир
          </button>
          <button
            style={buttonBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.16)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "none";
            }}
            onClick={() => setRole("driver")}
          >
            Водитель
          </button>
        </div>
      )}

      {role !== null && (
        <div style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ marginBottom: 12 }}>
            <button
              style={{ ...buttonBase, padding: "8px 14px", fontWeight: 500 }}
              onClick={() => setRole(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.16)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "none";
              }}
            >
              ← Назад
            </button>
          </div>
          {role === "passager" ? <PassagerPage /> : <DriverPage />}
        </div>
      )}
    </div>
  );
}
