type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const IconButton = ({ children, className, onClick }: Props) => {
  return (
    <a
      className={`block p-2 rounded-full active:bg-zinc-100 dark:active:bg-zinc-700 ${className}`}
    >
      <span className="cursor-pointer rounded-full" onClick={onClick}>
        {children}
      </span>
    </a>
  );
};

export default IconButton;
