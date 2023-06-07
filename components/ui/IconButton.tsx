type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <a className="active:bg-slate-100 p-2 rounded-full">
      <span className="cursor-pointer rounded-full" onClick={onClick}>
        {children}
      </span>
    </a>
  );
};

export default IconButton;
