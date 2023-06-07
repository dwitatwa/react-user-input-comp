import { createRef, useState } from "react";

type Props = {
  label: string;
  id: string;
};

export default function FileInput({ label, id }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  function selectFile() {
    if (inputRef.current) inputRef.current.click();
  }

  function uploadFile() {
    setIsUploading(true);
    if (inputRef.current && inputRef.current.files) {
      const file = inputRef.current.files[0];
      setTimeout(() => {
        console.log(file);
        setIsUploading(false);
      }, 2000);
    }
  }

  return (
    <div className="">
      <input
        type="file"
        id={id}
        className="hidden"
        ref={inputRef}
        onChange={uploadFile}
      />
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      {isUploading ? (
        <div className="mt-2 text-gray-500 py-2 px-3 pr-11 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex items-center gap-2 hover:cursor-pointer hover:bg-slate-100">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-100 rounded-full animate-spin" />
          Mengunggah ...
        </div>
      ) : (
        <div
          className="mt-2 text-gray-500 py-2 px-3 pr-11 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex items-center gap-2 hover:cursor-pointer hover:bg-slate-100"
          onClick={selectFile}
        >
          <svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
            <path d="M8 2a5.53 5.53 0 00-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 01-.708.708L8.5 6.707V10.5a.5.5 0 01-1 0V6.707L6.354 7.854a.5.5 0 11-.708-.708l2-2a.5.5 0 01.708 0l2 2z" />
          </svg>
          Pilih file
        </div>
      )}
    </div>
  );
}
