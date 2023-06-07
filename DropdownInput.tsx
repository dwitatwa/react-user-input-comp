import { createRef, useState } from "react";

type Props = {
  label: string;
  id: string;
  list: { label: string; isOpen: boolean }[];
  onChange?: (event: EventTarget) => void;
};

export default function DropdownInput({ label, id, list, onChange }: Props) {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState("");
  const inputRef = createRef<HTMLInputElement>();

  function handleSelected(e: EventTarget) {
    const button = e as HTMLButtonElement;
    setSelected(button.value);
    if (inputRef.current) inputRef.current.value = button.value;
    if (onChange) onChange(e);
    setToggle(false);
  }

  return (
    <div className="">
      {/* Input dibawah ini cuman buat nyimpen data */}
      <input type="text" name={id} className="hidden" ref={inputRef} />
      {/* ==== */}

      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 relative font-extralight">
        <button
          type="button"
          className="text-gray-500 text-sm py-2 px-3 flex items-center justify-between w-full border border-gray-200 shadow-sm rounded-lg hover:bg-slate-100 bg-white"
          onClick={() => setToggle(true)}
        >
          <span id={"choose_label"}>
            {selected === "" ? "Pilih " + label : selected}
          </span>
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2m-5 8l5 5 5-5H7z" />
          </svg>
        </button>
        {toggle && (
          <div
            className={`absolute z-10 top-0 flex flex-col w-full divide-y-[1px] border border-gray-200 shadow-sm rounded-lg ${
              list.length > 3 ? "h-32" : "w-fit"
            } overflow-auto`}
          >
            {list.map((v, i) => (
              <button
                className={`py-2 px-3 text-sm bg-slate-100 hover:bg-slate-200 text-left ${
                  v.isOpen || "hover:cursor-not-allowed"
                }`}
                key={i}
                onClick={(e) => {
                  v.isOpen ? handleSelected(e.target) : null;
                }}
                value={v.label}
                type="button"
              >
                {v.label}{" "}
                {v.isOpen || (
                  <span className="text-xs px-2 rounded-full bg-red-100 text-red-900 ml-2">
                    Tidak tersedia
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
