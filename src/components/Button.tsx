interface ButtonProps {
  children?: any;
  color?: 'green' | 'blue' | 'gray';
  className?: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const color = props?.color ?? 'gray';
  return (
    <button
      onClick={props.onClick}
      className={`
      px-4 py-2 rounded-md bg-gradient-to-r from-${color}-400 to-${color}-700 text-white
      ${props?.className}
    `}
    >
      {props.children}
    </button>
  );
}
