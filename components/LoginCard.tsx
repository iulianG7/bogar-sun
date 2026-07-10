import Image from "next/image";
import Button from "./Button";
import Input from "./Input";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur">

      <div className="flex justify-center mb-8">
        <Image
          src="/logo.png"
          alt="Bogar Sun"
          width={220}
          height={220}
          priority
        />
      </div>

      <h1 className="text-3xl font-bold text-white">
        Bun venit!
      </h1>

      <p className="mt-2 text-zinc-400">
        Autentifică-te pentru a continua
      </p>

      <div className="mt-8 space-y-4">
        <Input
          type="email"
          placeholder="E-mail"
        />

        <Input
          type="password"
          placeholder="Parolă"
        />
      </div>

      <div className="mt-8">
        <Button>
          Intră în cont
        </Button>
      </div>

    </div>
  );
}