"use client";

import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import {
  User,
  Users,
  Phone,
  Languages,
  Bell,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {

    const router = useRouter();

const [user, setUser] = useState(auth.currentUser);
const [worker, setWorker] = useState<any>(null);

const [totalKw, setTotalKw] = useState(0);
const [totalHours, setTotalHours] = useState(0);
const [totalDays, setTotalDays] = useState(0);

useEffect(() => {

  if (!auth.currentUser) return;

  const q = query(
    collection(db, "reports"),
    where("workerId", "==", auth.currentUser.uid)
  );

  const unsub = onSnapshot(q, (snapshot) => {

    let kw = 0;
    let hours = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();

      kw += Number(data.kwp || 0);
      hours += Number(data.hours || 0);
    });

    setTotalKw(kw);
    setTotalHours(hours);
    setTotalDays(snapshot.size);

  });

  return () => unsub();

}, []);

useEffect(() => {
  setUser(auth.currentUser);
}, []);

async function loadWorker() {

  if (!auth.currentUser) return;

  const q = query(
    collection(db, "workers"),
    where("uid", "==", auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    setWorker(snapshot.docs[0].data());
  }

}

loadWorker();

async function logout() {
  await signOut(auth);
  router.replace("/");
}

  return (

    <div className="space-y-6 pb-28">

      <motion.div
        initial={{ opacity:0,y:-20 }}
        animate={{ opacity:1,y:0 }}
      >

        <p className="text-xs uppercase tracking-[5px] text-yellow-400 font-bold">

          Bogar Sun

        </p>

        <h1 className="mt-2 text-4xl font-black">

          Profil

        </h1>

      </motion.div>

      <motion.div
        initial={{ opacity:0, scale:.95 }}
        animate={{ opacity:1, scale:1 }}
        className="rounded-[34px] border border-white/10 bg-[#151515] p-6"
      >

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-black">

            <User size={36} />

          </div>

          <div>

            <h2 className="text-2xl font-black">

              {worker?.name || "Worker"}

            </h2>

            <p className="text-zinc-500">

              {user?.email}

            </p>

          </div>

        </div>

      </motion.div>

<div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">

  <h2 className="mb-5 text-xl font-bold">
    Informații personale
  </h2>

  <div className="space-y-5">

    <div className="flex items-center gap-4">
      <User className="text-yellow-400" size={22} />
      <div>
        <p className="text-xs text-zinc-500">Nume</p>
        <p className="font-semibold">
          {user?.displayName || "Worker"}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <Phone className="text-yellow-400" size={22} />
      <div>
        <p className="text-xs text-zinc-500">Telefon</p>
        <p className="font-semibold">
          {worker?.phone}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <Users className="text-yellow-400" size={22} />
      <div>
        <p className="text-xs text-zinc-500">Echipă</p>
        <p className="font-semibold">
          Team {worker?.team}
        </p>
      </div>
    </div>

  </div>

</div>

<div className="rounded-[30px] border border-white/10 bg-[#151515] p-6">

  <h2 className="mb-5 text-xl font-bold">
    Statistici
  </h2>

  <div className="grid grid-cols-3 gap-3">

    <div className="rounded-2xl bg-black/30 p-4 text-center">

      <p className="text-xs text-zinc-500">
        kWp
      </p>

      <h3 className="mt-2 text-3xl font-black text-yellow-400">
        {totalKw}
      </h3>

      <p className="mt-1 text-xs text-zinc-500">
        Total
      </p>

    </div>

    <div className="rounded-2xl bg-black/30 p-4 text-center">

      <p className="text-xs text-zinc-500">
        Ore
      </p>

      <h3 className="mt-2 text-3xl font-black text-green-400">
        {totalHours}
      </h3>

      <p className="mt-1 text-xs text-zinc-500">
        Lucrate
      </p>

    </div>

    <div className="rounded-2xl bg-black/30 p-4 text-center">

      <p className="text-xs text-zinc-500">
        Zile
      </p>

      <h3 className="mt-2 text-3xl font-black text-blue-400">
        {totalDays}
      </h3>

      <p className="mt-1 text-xs text-zinc-500">
        Active
      </p>

    </div>

  </div>

</div>

<div className="space-y-4">



        {[
          {
  icon: Languages,
  title: "Limbă",
  value: "Română",
},
{
  icon: Bell,
  title: "Notificări",
  value: "Activate",
},
{
  icon: Moon,
  title: "Dark Mode",
  value: "Activ",
},
        ].map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{ opacity:0,y:20 }}
              animate={{ opacity:1,y:0 }}
              transition={{ delay:index*.05 }}
              className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[#151515] p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10">

                  <Icon
                    size={22}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <p className="text-zinc-500">

                    {item.title}

                  </p>

                  <h3 className="font-bold">

                    {item.value}

                  </h3>

                </div>

              </div>

              <ChevronRight
                className="text-zinc-500"
                size={20}
              />

            </motion.div>

          );

        })}
        <motion.button
        
    onClick={logout}
        initial={{ opacity:0,y:20 }}
        animate={{ opacity:1,y:0 }}
        transition={{ delay:.35 }}
        className="flex h-16 w-full items-center justify-center rounded-[24px] bg-red-500 font-bold text-white"
      >

        <LogOut
          size={22}
          className="mr-3"
        />

        Logout

      </motion.button>

    </div>

</div>

  );

}