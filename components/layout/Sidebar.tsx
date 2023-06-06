import { HomeIcon } from '@heroicons/react/24/outline';
import { FilmIcon } from '@heroicons/react/24/outline';
import { ClockIcon } from '@heroicons/react/24/outline';

import SidebarItem from '@/components/layout/SidebarItem';

const topSidebarItems = [{ title: '首頁', href: '/', Icon: HomeIcon }];

const bottomSidebarItems = [
  { title: '媒體庫', href: '/', Icon: FilmIcon },
  { title: '觀看紀錄', href: '/', Icon: ClockIcon },
];

const Sidebar = () => {
  return (
    <div className="pl-5 h-full fixed hidden sm:block md:w-56">
      {topSidebarItems.map((item) => (
        <SidebarItem
          key={item.title}
          title={item.title}
          href={item.href}
          Icon={item.Icon}
        />
      ))}
      <hr className="h-px hidden md:block" />
      {bottomSidebarItems.map((item) => (
        <SidebarItem
          key={item.title}
          title={item.title}
          href={item.href}
          Icon={item.Icon}          
        />
      ))}
    </div>
  );
};

export default Sidebar;
