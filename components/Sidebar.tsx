'use client';

import {
  ClockIcon,
  FilmIcon,
  HomeIcon,
  FireIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  PuzzlePieceIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import SmallSidebarItem from '@/components/SmallSidebarItem';
import LargeSidebarItem from '@/components/LargeSidebarItem';
import LargeSidebarSection from '@/components/LargeSidebarSection';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { HeaderLeftSection } from '@/components/Header';

const smallSidebarItems = [
  { title: '首頁', href: '/', Icon: HomeIcon },
  { title: '媒體庫', href: '/', Icon: FilmIcon },
  { title: '觀看紀錄', href: '/', Icon: ClockIcon },
];

const Sidebar = () => {
  const { isSmallOpen, isLargeOpen, handleSidebarToggle, handleSidebarClose } = useSidebarContext();

  return (
    <>
      <aside
        className={`scrollbar-hidden sticky top-0 ml-1 flex flex-col overflow-y-auto pb-4 ${
          isLargeOpen ? 'lg:hidden' : 'lg:flex'
        }`}
      >
        {smallSidebarItems.map(({ title, href, Icon }) => (
          <SmallSidebarItem key={title} title={title} href={href} Icon={Icon} />
        ))}
      </aside>
      {isSmallOpen && (
        <div
          className="fixed inset-0 z-[999] bg-secondary-dark opacity-50 lg:hidden"
          onClick={handleSidebarClose}
        />
      )}
      <aside
        className={`scrollbar-hidden absolute top-0 h-full w-56 flex-col gap-2 overflow-y-auto px-2 pb-4 lg:sticky ${
          isLargeOpen ? 'lg:flex' : 'lg:hidden'
        } ${isSmallOpen ? 'z-[999] flex max-h-screen bg-white' : 'hidden'}`}
      >
        <div className="sticky top-0 bg-white px-2 pb-4 pt-2 lg:hidden">
          <HeaderLeftSection onToggleSidebar={handleSidebarToggle} />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={HomeIcon} title="首頁" href="/" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={3} title="探索">
          <LargeSidebarItem Icon={FireIcon} title="發燒影片" href="/" />
          <LargeSidebarItem Icon={MusicalNoteIcon} title="音樂" href="/" />
          <LargeSidebarItem Icon={VideoCameraIcon} title="電影" href="/" />
          <LargeSidebarItem Icon={PuzzlePieceIcon} title="遊戲" href="/" />
          <LargeSidebarItem Icon={NewspaperIcon} title="新聞" href="/" />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default Sidebar;
