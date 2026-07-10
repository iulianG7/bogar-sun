type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button
      className="
      w-full
      rounded-2xl
      bg-yellow-400
      py-4
      text-lg
      font-bold
      text-black
      transition-all
      duration-300
      hover:scale-105
      hover:bg-yellow-300
      active:scale-95
      shadow-[0_0_30px_rgba(255,208,0,.35)]
      "
    >
      {children}
    </button>
  );
}