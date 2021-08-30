interface InputProps {
  title: string;
  type?: 'text' | 'number';
  value: any;
  className?: string;
  isView?: boolean;

  onChange?: (value: any) => void;
}

export default function Input(props: InputProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mg-2">{props.title}</label>

      <input
        type={props.type ?? 'text'}
        value={props.value}
        readOnly={props.isView}
        className={`
          border border-purple-500 rounded-lg
          focus: outline-none bg-gray-100 px-4 py-2
          ${props.isView ? '' : 'focus:bg-white'}
        `}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </div>
  );
}
