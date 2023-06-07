import { KeyboardEvent, createRef, ChangeEvent } from "react";

type Props = {
  label: string;
  id: string;
};

export default function MoneyInput({ label, id }: Props) {
  const inputRef = createRef<HTMLInputElement>();

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    const regex = /^[0-9]$/; // Regex to match numbers and the decimal point

    if (!allowedKeys.includes(event.key) && !regex.test(event.key)) {
      event.preventDefault();
    }
  }

  function formatValue(value: string) {
    const number = Number(value);
    return number.toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    });
  }

  function handleChange(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (value === "") return null;
    const cleardot = value.replace(/\./g, "");
    const newValue = formatValue(cleardot);
    if (inputRef.current) inputRef.current.value = newValue;
  }

  return (
    <div className="">
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 text-gray-500  border border-gray-200 shadow-sm group hover:bg-slate-100 text-sm rounded-lg focus:bg-slate-100 outline-none font-extralight  flex items-center overflow-hidden ">
        <label className="pl-3" htmlFor={id}>
          Rp.
        </label>
        <input
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={inputRef}
          id={id}
          type="text"
          name={id}
          className="py-2 px-3 w-full group-hover:bg-slate-100 outline-none"
          placeholder="Masukkan jumlah Dana"
        />
      </div>
    </div>
  );
}
