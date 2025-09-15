import { NextResponse } from "next/server";

export async function GET() {
  // Simulated DB data: replace with real DB fetch later
  const routes = [
    { id: "1", name: "Центр → Аэропорт" },
    { id: "2", name: "Аэропорт → Центр" },
    { id: "3", name: "Вокзал → Центр" },
    { id: "4", name: "Центр → Вокзал" }
  ];

  return NextResponse.json(routes);
}


