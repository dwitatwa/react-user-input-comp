import { useState, MouseEvent, createRef } from "react";

type Props = {
  label: string;
  id: string;
};

type dateState = "pickYear" | "pickMonth" | "pickDate" | null;

const monthData = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function DateInput({ label, id }: Props) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [state, setState] = useState<dateState>(null);
  const [outputValue, setOutputValue] = useState("");
  const inputRef = createRef<HTMLInputElement>();

  // components
  const InputYear = () => {
    const currentYear = new Date().getFullYear();
    const [choose, setChoose] = useState<number[]>(() => {
      const array = [];
      for (let i = 0; i < 12; i++) {
        array.push(currentYear - i);
      }
      return array;
    });

    function getNextYear() {
      const theValue = [];
      for (let i = 0; i < 12; i++) {
        theValue.push(choose[0] - (i + 12));
      }
      setChoose(theValue);
    }

    function getPrevYear() {
      const theValue = [];
      for (let i = 0; i < 12; i++) {
        theValue.push(choose[0] - (i - 12));
      }
      if (choose[0] !== currentYear) setChoose(theValue);
    }

    function choosTheYear(event: MouseEvent) {
      const button = event.target as HTMLButtonElement;
      console.log(button.value);
      setYear(button.value);
      setState("pickMonth");
    }

    return (
      <div className="mt-2 text-gray-500 py-5 px-3 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex flex-col gap-2 absolute top-0 left-0 bg-slate-100 z-30">
        <div className="flex justify-between">
          <h1 className="w-full">Pilih Tahun : </h1>
          <div className="flex gap-2">
            <button
              type="button"
              className="border px-4 py-1 text-xs rounded-xl hover:bg-slate-200 bg-white"
              onClick={getPrevYear}
            >
              &larr;
            </button>
            <button
              type="button"
              className="border px-4 py-1 text-xs rounded-xl hover:bg-slate-200 bg-white"
              onClick={getNextYear}
            >
              &rarr;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {choose.map((v, i) => (
            <button
              className="border px-1 py-1 text-xs text-center rounded-md bg-white hover:bg-slate-200"
              onClick={choosTheYear}
              type="button"
              value={v}
              key={i}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const InputMonth = () => {
    function chooseTheMonth(event: MouseEvent) {
      const button = event.target as HTMLButtonElement;
      setMonth(button.value);
      setState("pickDate");
    }

    return (
      <div className="mt-2 text-gray-500 py-5 px-3 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex flex-col gap-2 absolute top-0 left-0 bg-slate-100 z-30">
        <div className="flex justify-between items-center">
          <h1>Pilih Bulan : </h1>
          <button
            type="button"
            className="border px-4 py-1 text-xs rounded-xl hover:bg-slate-200 bg-white flex items-center gap-2"
            onClick={() => setState("pickYear")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 7v4L2 6l6-5v4h5a8 8 0 110 16H4v-2h9a6 6 0 100-12H8z" />
            </svg>
            kembali
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {monthData.map((v, i) => (
            <button
              className="border px-1 py-1 text-xs text-center rounded-md bg-white hover:bg-slate-200"
              onClick={chooseTheMonth}
              type="button"
              value={v}
              key={i}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const InputDate = () => {
    function getDateData(year: number, month: number) {
      const date = new Date(year, month, 1);
      const dates = [];
      while (date.getMonth() === month) {
        dates.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }

    function getMonthNumber(monthName: string): number {
      for (let i = 0; i < monthData.length; i++) {
        if (monthData[i] === monthName) return i;
      }
      return 0;
    }

    const dates: number[] = getDateData(parseInt(year), getMonthNumber(month));

    function chooseTheDate(event: MouseEvent) {
      const date = event.target as HTMLButtonElement;
      if (inputRef.current) {
        inputRef.current.value = `${date.value} ${month} ${year}`;
      }
      setOutputValue(`${date.value} ${month} ${year}`);
      setState(null);
    }

    return (
      <div className="mt-2 text-gray-500 py-5 px-3 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex flex-col gap-2 absolute top-0 left-0 bg-slate-100 z-30">
        <div className="flex justify-between items-center">
          <h1>Pilih Tanggal : </h1>
          <button
            type="button"
            className="border px-4 py-1 text-xs rounded-xl hover:bg-slate-200 bg-white flex items-center gap-2"
            onClick={() => setState("pickMonth")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 7v4L2 6l6-5v4h5a8 8 0 110 16H4v-2h9a6 6 0 100-12H8z" />
            </svg>
            kembali
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dates.map((v, i) => (
            <button
              className="border px-1 py-1 text-xs text-center rounded-md bg-white hover:bg-slate-200"
              onClick={chooseTheDate}
              type="button"
              value={v}
              key={i}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const Container = () => {
    return (
      <div
        className="mt-2 space-y-3 text-gray-500 py-2 px-3 pr-11 w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight flex items-center gap-2 hover:bg-slate-100 hover:cursor-pointer"
        onClick={openDate}
      >
        <svg viewBox="0 0 21 21" fill="currentColor" className="w-4 h-4">
          <g fill="none" fillRule="evenodd">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 2.5h12a2 2 0 012 2v11.99a2 2 0 01-2 2h-12a2 2 0 01-2-2V4.5a2 2 0 012-2zM2.659 6.5H18.5"
            />
            <g fill="currentColor">
              <path d="M6.816 13.155v-1.079h.88c.668 0 1.122-.395 1.122-.972 0-.527-.415-.927-1.103-.927-.713 0-1.152.366-1.201.996H5.15C5.201 9.874 6.201 9 7.788 9c1.563 0 2.432.864 2.427 1.895-.005.854-.542 1.416-1.299 1.601v.093c.981.141 1.577.766 1.577 1.709 0 1.235-1.162 2.11-2.754 2.11S5.063 15.537 5 14.204h1.411c.044.596.552.977 1.309.977.747 0 1.27-.406 1.27-1.016 0-.625-.489-1.01-1.28-1.01zM13.516 16.227v-5.611h-.087L11.7 11.808v-1.372l1.821-1.255h1.47v7.046z" />
            </g>
          </g>
        </svg>
        {outputValue || "Pilih Tanggal"}
      </div>
    );
  };

  // function
  function openDate() {
    setState("pickYear");
  }

  return (
    <div className="">
      <input type="text" id={id} className="hidden" ref={inputRef} />
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {state === null ? (
          <Container />
        ) : state === "pickYear" ? (
          <InputYear />
        ) : state === "pickMonth" ? (
          <InputMonth />
        ) : (
          <InputDate />
        )}
      </div>
    </div>
  );
}
