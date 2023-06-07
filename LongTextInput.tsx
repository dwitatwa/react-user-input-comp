type Props = {
  label: string;
  id: string;
  placeholder?: string;
};

export default function LongTextInput({ label, id, placeholder }: Props) {
  return (
    <div className="">
      <label htmlFor={id} className="inline-block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 space-y-3">
        <textarea
          id={id}
          name={id}
          className="text-gray-500 py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight"
          placeholder={placeholder}
          cols={3}
          rows={3}
        />
      </div>
    </div>
  );
}
