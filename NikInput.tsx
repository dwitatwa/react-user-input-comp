import useOutsideClick from "@src/hooks/useOutsideClick";
import { useState } from "react";

type Props = {
  label: string;
  id: string;
  placeholder: string;
};

/** regex
 * regex ini buat masttin kalo nik yang diinput
 * pengguna memiliki panjang character minimal 16
 * dan nik yang diinput juga merupakan angka
 */
export const NikRegex = /^\d{16,}$/;

export default function NikInput({ label, id, placeholder }: Props) {
  const [isError, setIsError] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  /** Fungsi handleChange
   * fungsi ini buat ngcek setiap user menginput
   * data.ini buat mastiin kalau yang diinput user itu
   * valid
   */
  function handleChange(value: string) {
    const check = NikRegex.test(value);
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
    const check = NikRegex.test(checkInput.value);
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
    <div className="" ref={outsideClickRef}>
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          type="text"
          name={id}
          className={`text-gray-500 py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg ${
            isError && "border-red-500 outline-red-500"
          } font-extralight`}
          onChange={(e) => handleChange(e.target.value)}
          onClick={(e) => handleClick(e.target)}
          placeholder={placeholder}
        />
        {showErrorMsg && (
          <div className="text-[10px] text-red-900 absolute bg-red-200 px-3 py-4 rounded-lg w-full z-10">
            NIK yang Anda masukkan harus berupa Angka dan berisi minimal 16
            digit
          </div>
        )}
      </div>
    </div>
  );
}
