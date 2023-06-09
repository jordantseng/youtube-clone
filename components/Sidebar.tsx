import { HomeIcon, FilmIcon, ClockIcon } from '@heroicons/react/24/outline';

import SidebarItem from '@/components/SidebarItem';

const topSidebarItems = [{ title: '首頁', href: '/', Icon: HomeIcon }];

const bottomSidebarItems = [
  { title: '媒體庫', href: '/', Icon: FilmIcon },
  { title: '觀看紀錄', href: '/', Icon: ClockIcon },
];

const Sidebar = () => {
  return (
    <ul className="fixed hidden bg-zinc-100 pl-5 pt-4 sm:block md:w-56 dark:bg-zinc-900">
      {topSidebarItems.map(({ title, href, Icon }) => (
        <SidebarItem key={title} title={title} href={href}>
          <Icon className="w-6 h-6" />
        </SidebarItem>
      ))}
      <hr className="hidden my-3 md:block" />
      {bottomSidebarItems.map(({ title, href, Icon }) => (
        <SidebarItem key={title} title={title} href={href}>
          <Icon className="w-6 h-6" />
        </SidebarItem>
      ))}
    </ul>
  );
};

export default Sidebar;
