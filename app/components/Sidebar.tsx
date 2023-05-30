import HomeIcon from './icons/HomeIcon';
import MediaIcon from './icons/MediaIcon';
import HistoryIcon from './icons/HistoryIcon';
import SidebarItem from './SidebarItem';

const topSidebarItems = [{ title: '首頁', href: '/', Icon: HomeIcon }];

const bottomSidebarItems = [
  { title: '媒體庫', href: '/', Icon: MediaIcon },
  { title: '觀看紀錄', href: '/', Icon: HistoryIcon },
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
          // sidebarOpen={sidebarOpen}
        />
      ))}
      <hr className="h-px hidden md:block" />
      {bottomSidebarItems.map((item) => (
        <SidebarItem
          key={item.title}
          title={item.title}
          href={item.href}
          Icon={item.Icon}
          // sidebarOpen={sidebarOpen}
        />
      ))}
    </div>
  );
};

export default Sidebar;
