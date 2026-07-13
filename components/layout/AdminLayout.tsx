"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <Header />

          <div className="mt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}