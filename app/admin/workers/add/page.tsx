"use client";

import { useState } from "react";

export default function AddWorkerPage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [team, setTeam] = useState(1);

  const saveWorker = async () => {
  try {
    alert("Buton apăsat");

    const response = await fetch("/api/create-worker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        team,
      }),
    });

    alert("Status: " + response.status);

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Lucrător creat cu succes!");

    setFirstName("");
    setLastName("");
    setPhone("");
    setTeam(1);

  } catch (error: any) {
    alert(error.message || "Eroare necunoscută");
    console.error(error);
  }
};

  return (
    <main className="text-white max-w-2xl">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        ➕ Adaugă lucrător
      </h1>

      <div className="space-y-5">

        <input
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
  placeholder="Nume"
  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4"
/>
        <input
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
  placeholder="Prenume"
  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4"
/>

        <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon"
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4"
        />

        <select
        value={team}
        onChange={(e) => setTeam(Number(e.target.value))}
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4"
        >
        <option value={1}>Echipa 1</option>
        <option value={2}>Echipa 2</option>
        </select>

        <button
        onClick={saveWorker}
        className="w-full rounded-xl bg-yellow-400 text-black font-bold py-4"
        >
          Salvează lucrător
        </button>

      </div>

    </main>
  );
}