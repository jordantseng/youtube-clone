type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const IconButton = ({ children, className, onClick }: Props) => {
  return (
    <a className={`active:bg-slate-100 p-2 rounded-full ${className}`}>
      <span className="cursor-pointer rounded-full" onClick={onClick}>
        {children}
      </span>
    </a>
  );
};

export default IconButton;
