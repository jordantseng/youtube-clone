import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  children: React.ReactNode;
};

const SidebarItem = ({ href, title, children }: Props) => {
  return (
    <div className="p-2 hover:bg-slate-100 hover:rounded-lg">
      <Link href={href} className="flex items-center flex-col md:flex-row">
        <span className="mb-2 md:mr-4 md:mb-0">{children}</span>
        <p className="text-xs">{title}</p>
      </Link>
    </div>
  );
};

export default SidebarItem;
