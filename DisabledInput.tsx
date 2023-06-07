type Props = {
  label: string;
  value: string;
};

export default function DisabledInpt({ label, value }: Props) {
  return (
    <div className="text-blue-950">
      <label className="inline-block text-sm font-medium">{label}</label>
      <div className="mt-2 space-y-3">
        <div className="text-gray-500 py-2 px-3 block w-full border border-gray-200 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 font-extralight">
          {value}
        </div>
      </div>
    </div>
  );
}
