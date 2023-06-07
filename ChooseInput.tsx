import { createRef, useState } from "react";

type Props = {
  label: string;
  id: string;
  option: string[];
};

export default function ChooseInput({ label, id, option }: Props) {
  const [selected, setSelected] = useState("");
  const inputRef = createRef<HTMLInputElement>();

  function handleSelected(e: EventTarget) {
    const button = e as HTMLButtonElement;
    setSelected(button.value);
    if (inputRef.current) inputRef.current.value = button.value;
  }

  return (
    <div>
      {/* Input dibawah ini di hidden, cuman buat nampung value doang. */}
      <input type="text" name={id} className="hidden" ref={inputRef} />
      {/* ===== */}

      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 flex divide-x-[1px] text-gray-500 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 overflow-hidden font-extralight">
        {option.map((v, i) => (
          <button
            className="text-sm flex-1 py-2 px-3 hover:bg-slate-100 flex items-center gap-2 bg-white"
            onClick={(e) => handleSelected(e.target)}
            type="button"
            key={i}
            value={v}
          >
            {v}
            {selected === v && (
              <svg fill="currentColor" viewBox="0 0 16 16" className="w-3 h-3">
                <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05z" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
