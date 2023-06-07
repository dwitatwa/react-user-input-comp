import useOutsideClick from "@src/hooks/useOutsideClick";
import { useState } from "react";

type Props = {
  label: string;
  id: string;
  placeholder: string;
};

export const NohpRegex = /^\+62\d{9,}$/;

export default function NumberInput({ label, id, placeholder }: Props) {
  //?-> state section
  const [isError, setIsError] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  /** regex
   * regex dibawah ini buat mastiin string harus
   * diawali dari +62 dan panjang string minimal
   * 12 character
   */

  //?-> function section
  /** Fungsi handleChange
   * fungsi ini buat ngcek setiap user menginput
   * data.ini buat mastiin kalau yang diinput user itu
   * valid
   */
  function handleChange(value: string) {
    const check = NohpRegex.test(value);
    setIsError(!check);
    setShowErrorMsg(!check);
  }
  /** fungsi handleClick
   * fungsi ini buat ngcek value input field
   * pada saat di click. karena error akan ilang
   * saat user memilih component lain atau men-click
   * diluar kompoenen ini.
   */
  function handleClick(e: EventTarget) {
    const checkInput = e as HTMLInputElement;
    const check = NohpRegex.test(checkInput.value);
    if (checkInput.value !== "") {
      setIsError(!check);
      setShowErrorMsg(!check);
    }
  }
  /** fungsi outsideClick
   * fungsi ini buat ilanging pesan error kalo user klik
   * diluar komponen
   */
  const outsideClickRef = useOutsideClick(() => {
    setShowErrorMsg(false);
  });

  return (
    <div className="">
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 relative" ref={outsideClickRef}>
        <input
          id={id}
          type="text"
          name={id}
          className={`box-border ring-red-500 text-gray-500 py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg ${
            isError && "border-red-500 outline-red-500"
          } font-extralight`}
          onChange={(e) => handleChange(e.target.value)}
          onClick={(e) => handleClick(e.target)}
          placeholder={placeholder}
        />
        {showErrorMsg && (
          <div className="text-[10px] text-red-900 absolute z-10 bg-red-200 px-3 py-4 rounded-lg w-full">
            Pastikan nomor handphone yang Anda masukkan berawalan +62.
          </div>
        )}
      </div>
    </div>
  );
}
