"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      } else {
        setTimeout(() => {
  setLoading(false);
  setShowSplash(false);
}, 1500);
      }
    });

    return () => unsub();
  }, [router]);

     if (loading || showSplash) {
  return <SplashScreen />;
}

  return <>{children}</>;
}