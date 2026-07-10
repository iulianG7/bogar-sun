type InputProps = {
  type: string;
  placeholder: string;
};

export default function Input({ type, placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900/80
        p-4
        text-white
        outline-none
        transition-all
        duration-300
        focus:border-yellow-400
        focus:ring-2
        focus:ring-yellow-400/40
      "
    />
  );
}