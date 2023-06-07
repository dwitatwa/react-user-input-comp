type Props = {
  label: string;
  id: string;
  placeholder?: string;
};

export default function TextInput({ label, id, placeholder }: Props) {
  return (
    <div className="">
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 space-y-3">
        <input
          id={id}
          type="text"
          name={id}
          className="text-gray-500 py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:bg-slate-100 outline-none font-extralight hover:bg-slate-100"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
