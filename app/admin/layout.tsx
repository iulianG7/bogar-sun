import Link from "next/link";
import Protected from "@/app/protected";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <Protected>
    <div className="flex min-h-screen bg-black">

      <aside className="w-72 bg-zinc-950 border-r border-zinc-800 p-6">

        <div className="absolute top-90 left-10">

  <Image
    src="/logo.png"
    alt="Bogar Sun"
    width={180}
    height={180}
    priority
  />

</div>

        <nav className="space-y-3">

          <Link href="/admin/dashboard">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              📊 Dashboard
            </div>
          </Link>

          <Link href="/admin/workers">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              👷 Lucrători
            </div>
          </Link>

          <Link href="/admin/reports">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              📋 Rapoarte
            </div>
          </Link>

          <Link href="/admin/projects">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              🏗 Obiecte
            </div>
          </Link>

          <Link href="/admin/salaries">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              💰 Salarii
            </div>
          </Link>

          <Link href="/admin/settings">
            <div className="rounded-xl p-4 hover:bg-zinc-800 cursor-pointer">
              ⚙️ Setări
            </div>
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
    </Protected>
  );
}