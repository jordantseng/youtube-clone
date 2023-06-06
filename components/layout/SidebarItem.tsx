import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  // TODO: fix Icon type
  Icon: any;
};

const SidebarItem = ({ href, title, Icon }: Props) => {
  return (
    <>
      <div className="md:hidden">
        <Link
          href={href}
          className="flex flex-col justify-start items-center py-2"
        >
          <div>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <span className="flex-1 text-center text-xs">{title}</span>
          </div>
        </Link>
      </div>
      <div className="hidden md:block">
        <Link href={href} className="flex justify-start items-center">
          <div>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center px-4 py-3 cursor-pointer">
            <span className="flex-1 text-center">{title}</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SidebarItem;
