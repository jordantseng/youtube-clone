import { HomeIcon, FilmIcon, ClockIcon } from '@heroicons/react/24/outline';

import SidebarItem from '@/components/layout/SidebarItem';

const topSidebarItems = [{ title: '首頁', href: '/', Icon: HomeIcon }];

const bottomSidebarItems = [
  { title: '媒體庫', href: '/', Icon: FilmIcon },
  { title: '觀看紀錄', href: '/', Icon: ClockIcon },
];

const Sidebar = () => {
  return (
    <div className="pl-5 h-full fixed hidden sm:block md:w-56">
      {topSidebarItems.map(({ title, href, Icon }) => (
        <SidebarItem key={title} title={title} href={href}>
          <Icon className="w-6 h-6" />
        </SidebarItem>
      ))}
      <hr className="h-px hidden md:block" />
      {bottomSidebarItems.map(({ title, href, Icon }) => (
        <SidebarItem key={title} title={title} href={href}>
          <Icon className="w-6 h-6" />
        </SidebarItem>
      ))}
    </div>
  );
};

export default Sidebar;
