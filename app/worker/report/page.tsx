"use client";

import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Zap,
  Clock3,
  Send,
} from "lucide-react";

export default function ReportPage() {

  const [worked, setWorked] = useState(true);
  const [project, setProject] = useState("");
  const [kwp, setKwp] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("Ploaie");
  const [todayReportId, setTodayReportId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().split("T")[0]
);

  async function sendReport() {

  if (!auth.currentUser) return;

  const selected = new Date(selectedDate);

selected.setHours(0, 0, 0, 0);

const reportsQuery = query(
  collection(db, "reports"),
  where("workerId", "==", auth.currentUser.uid)
);

const reportsSnapshot = await getDocs(reportsQuery);

const alreadySent = reportsSnapshot.docs.some((doc) => {

  const data = doc.data();

  if (!data.createdAt) return false;

  const reportDate = data.createdAt.toDate();

  reportDate.setHours(0, 0, 0, 0);

  return reportDate.getTime() === selected.getTime();

});

if (alreadySent) {

  alert("Ai trimis deja raportul pentru astăzi!");

  return;

}

  // Caută lucrătorul curent
const workerQuery = query(
  collection(db, "workers"),
  where("uid", "==", auth.currentUser.uid)
);

const workerSnapshot = await getDocs(workerQuery);

if (workerSnapshot.empty) return;

const worker = workerSnapshot.docs[0].data();

// Caută toți membrii activi din aceeași echipă
const teamQuery = query(
  collection(db, "workers"),
  where("team", "==", worker.team),
  where("status", "==", "active")
);

const teamSnapshot = await getDocs(teamQuery);

const teamMembers = teamSnapshot.size;

const personalKwp =
  Math.round((Number(kwp) / teamMembers) * 100) / 100;

  await addDoc(collection(db, "reports"), {

    workerId: auth.currentUser.uid,

    workerEmail: auth.currentUser.email,

    workerName:
      auth.currentUser.displayName ??
      auth.currentUser.email,

    project,

    totalKwp: Number(kwp),

    kwp: personalKwp,

    team: worker.team,

    hours: Number(hours),

    didWork: worked,

    reason: worked ? "" : reason,

    createdAt: new Date(selectedDate),

  });

  setProject("");
  setKwp("");
  setHours("");
  setReason("Ploaie");
}

async function updateReport() {

  if (!todayReportId) return;

  // Caută lucrătorul curent
  const workerQuery = query(
    collection(db, "workers"),
    where("uid", "==", auth.currentUser!.uid)
  );

  const workerSnapshot = await getDocs(workerQuery);

  if (workerSnapshot.empty) return;

  const worker = workerSnapshot.docs[0].data();

  // Membrii activi ai echipei
  const teamQuery = query(
    collection(db, "workers"),
    where("team", "==", worker.team),
    where("status", "==", "active")
  );

  const teamSnapshot = await getDocs(teamQuery);

  const personalKwp =
    Math.round((Number(kwp) / teamSnapshot.size) * 100) / 100;

  await updateDoc(doc(db, "reports", todayReportId), {
    project,
    totalKwp: Number(kwp),
    kwp: personalKwp,
    team: worker.team,
    createdAt: new Date(selectedDate),
    hours: Number(hours),
    didWork: worked,
    reason: worked ? "" : reason,
  });

  alert("Raport actualizat cu succes!");
}

useEffect(() => {

  if (!auth.currentUser) return;

  const loadTodayReport = async () => {

    const q = query(
      collection(db, "reports"),
      where("workerId", "==", auth.currentUser!.uid)
    );

    const snapshot = await getDocs(q);
    let found = false;

    const selected = new Date(selectedDate);
selected.setHours(0, 0, 0, 0);

    snapshot.forEach((docSnap) => {

      const data = docSnap.data();

      if (!data.createdAt) return;

      const reportDate = data.createdAt.toDate();
      reportDate.setHours(0, 0, 0, 0);

      if (reportDate.getTime() === selected.getTime()) {

        found = true;

        setTodayReportId(docSnap.id);

        setProject(data.project || "");
        setKwp(String(data.totalKwp || ""));
        setHours(String(data.hours || ""));
        setWorked(data.didWork);

        if (data.reason) {
          setReason(data.reason);
        }

      }

    });

    if (!found) {
  setTodayReportId("");
  setProject("");
  setKwp("");
  setHours("");
  setWorked(true);
  setReason("Ploaie");
}

  };

  loadTodayReport();

}, [selectedDate]);


  return (

    <div className="space-y-6 pb-28">

      <motion.div
        initial={{ opacity:0,y:-20 }}
        animate={{ opacity:1,y:0 }}
        className="space-y-2"
      >

        <p className="uppercase tracking-[5px] text-yellow-400 text-xs font-bold">

          Bogar Sun

        </p>

        <h1 className="text-4xl font-black">

          Raport zilnic

        </h1>

        <p className="text-zinc-400">

          Completează raportul pentru astăzi.

        </p>
        {todayReportId && (
  <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
    <p className="font-semibold text-green-400">
      ✅ Ai trimis raportul pentru astăzi.
    </p>

    <p className="mt-1 text-sm text-zinc-300">
      Îl poți modifica până la sfârșitul zilei.
    </p>
  </div>
)}
<div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">
  <label className="text-sm text-zinc-500">
    Data raportului
  </label>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="mt-3 h-14 w-full rounded-2xl bg-black/30 px-4 outline-none"
  />
</div>
      </motion.div>

      <motion.div
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ delay:.1 }}
        className="rounded-[30px] border border-white/10 bg-[#151515] p-6"
      >

        <label className="text-sm text-zinc-500">

          Obiect

        </label>

        <div className="mt-3 flex h-14 items-center gap-3 rounded-2xl bg-black/30 px-4">

          <MapPin
            size={20}
            className="text-yellow-400"
          />

          <input
  value={project}
  onChange={(e) => setProject(e.target.value)}
  placeholder="Ex: Kaufland Düsseldorf"
  className="flex-1 bg-transparent outline-none"
/>

        </div>

      </motion.div>
      <motion.div
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ delay:.2 }}
        className="grid grid-cols-2 gap-4"
      >

        <div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">

          <label className="text-sm text-zinc-500">

            kWp

          </label>

          <div className="mt-3 flex h-14 items-center gap-3 rounded-2xl bg-black/30 px-4">

            <Zap
              size={20}
              className="text-yellow-400"
            />

            <input
  type="number"
  value={kwp}
  onChange={(e) => setKwp(e.target.value)}
  placeholder="0"
  className="flex-1 bg-transparent text-xl font-bold outline-none"
/>

          </div>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">

          <label className="text-sm text-zinc-500">

            Ore

          </label>

          <div className="mt-3 flex h-14 items-center gap-3 rounded-2xl bg-black/30 px-4">

            <Clock3
              size={20}
              className="text-green-400"
            />

            <input
  type="number"
  value={hours}
  onChange={(e) => setHours(e.target.value)}
  placeholder="0"
  className="flex-1 bg-transparent text-xl font-bold outline-none"
/>

          </div>

        </div>

      </motion.div>

      <motion.div
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ delay:.3 }}
        className="rounded-[30px] border border-white/10 bg-[#151515] p-6"
      >

        <p className="text-sm text-zinc-500">

          Ai lucrat astăzi?

        </p>

        <div className="mt-5 grid grid-cols-2 gap-4">

          <button
            onClick={() => setWorked(true)}
            className={`h-14 rounded-2xl font-bold transition ${
              worked
                ? "bg-green-500 text-white"
                : "bg-black/30 text-zinc-400"
            }`}
          >

            ✅ Am lucrat

          </button>

          <button
            onClick={() => setWorked(false)}
            className={`h-14 rounded-2xl font-bold transition ${
              !worked
                ? "bg-red-500 text-white"
                : "bg-black/30 text-zinc-400"
            }`}
          >

            ❌ Nu am lucrat

          </button>

        </div>

      </motion.div>
      {!worked && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[30px] border border-white/10 bg-[#151515] p-6"
        >

          <label className="text-sm text-zinc-500">

            Motiv

          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          className="mt-3 h-14 w-full rounded-2xl bg-black/30 px-4 outline-none">

            <option>Ploaie</option>

            <option>Concediu</option>

            <option>Medical</option>

            <option>Nu a fost obiect</option>

            <option>Alt motiv</option>

          </select>

        </motion.div>

      )}
      <motion.button
         onClick={todayReportId ? updateReport : sendReport}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .4 }}
        className="flex h-16 w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-yellow-300 to-yellow-500 text-lg font-bold text-black shadow-[0_0_40px_rgba(250,204,21,.25)]"
      >

        <Send
          size={22}
          className="mr-3"
        />

        {todayReportId ? "Actualizează raport" : "Trimite raport"}

      </motion.button>

    </div>

  );

}