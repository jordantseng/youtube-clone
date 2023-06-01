const IconButton = ({ Icon, title }) => (
  <div className="bg-slate-100 flex items-center justify-center rounded-3xl px-3 cursor-pointer h-10">
    <Icon className="h-6 w-6 mr-1" />
    <span>{title}</span>
  </div>
);

export default IconButton;
