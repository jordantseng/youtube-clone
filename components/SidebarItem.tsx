import Link from 'next/link';

const SmallSidebarItem = ({ href, title, Icon }) => {
  return (
    <Link href={href} className="flex flex-col justify-start items-center py-2">
      <div>
        <Icon />
      </div>
      <div className="flex justify-center items-center cursor-pointer">
        <span className="flex-1 text-center text-xs">{title}</span>
      </div>
    </Link>
  );
};

const MediumSidebarItem = ({ href, title, Icon }) => {
  return (
    <Link href={href} className="flex justify-start items-center">
      <div>
        <Icon className="w-6 h-6"/>
      </div>
      <div className="flex justify-center items-center px-4 py-3 cursor-pointer">
        <span className="flex-1 text-center">{title}</span>
      </div>
    </Link>
  );
};

const SidebarItem = ({ href, title, Icon }) => {
  return (
    <>
      <div className="md:hidden">
        <SmallSidebarItem href={href} title={title} Icon={Icon}/>
      </div>
      <div className="hidden md:block">
        <MediumSidebarItem href={href} title={title} Icon={Icon} />
      </div>
    </>
  );
};

export default SidebarItem;
