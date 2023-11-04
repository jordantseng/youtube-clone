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
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useState, Children, ElementType } from 'react';

import { useSidebarContext } from '@/app/contexts/SidebarContext';
import { HeaderLeftSection } from '@/app/Header';
import Button, { buttonStyles } from '@/app/components/Button';

type SmallSidebarItemProps = {
  href: string;
  title: string;
  Icon: ElementType;
};

const SmallSidebarItem = ({ href, title, Icon }: SmallSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'flex flex-col items-center gap-1 rounded-lg px-1 py-4'
      )}
    >
      <Icon className="h-6 w-6" />
      <div className="text-sm">{title}</div>
    </Link>
  );
};

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Infinity,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div>
      {title && <div className="mb-1 ml-4 mt-2 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="flex w-full items-center gap-4 rounded-lg p-3"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
          <ButtonIcon className="h-6 w-6" />
          <div>{isExpanded ? '顯示較少' : '顯示更多'}</div>
        </Button>
      )}
    </div>
  );
};

type LargeSidebarItemProps = {
  href: string;
  title: string;
  Icon: ElementType;
  isActive?: boolean;
};

const LargeSidebarItem = ({
  href,
  title,
  isActive = false,
  Icon,
}: LargeSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `flex w-full items-center gap-4 rounded-lg p-3 ${
          isActive ? 'bg-neutral-100 dark:bg-dark-hover font-bold hover:bg-light' : undefined
        }`
      )}
    >
      <Icon className="h-6 w-6" />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
    </Link>
  );
};

const smallSidebarItems = [
  { title: '首頁', href: '/', Icon: HomeIcon },
  { title: '媒體庫', href: '/', Icon: FilmIcon },
  { title: '觀看紀錄', href: '/', Icon: ClockIcon },
];

const Sidebar = () => {
  const { isSmallOpen, isLargeOpen, handleSidebarToggle, handleSidebarClose } =
    useSidebarContext();

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
          className="fixed inset-0 z-[999] bg-light-dark opacity-50 lg:hidden"
          onClick={handleSidebarClose}
        />
      )}
      <aside
        className={`scrollbar-hidden absolute top-0 h-full w-56 flex-col gap-2 overflow-y-auto px-2 pb-4 lg:sticky ${
          isLargeOpen ? 'lg:flex' : 'lg:hidden'
        } ${isSmallOpen ? 'z-[999] flex max-h-screen bg-white dark:bg-dark' : 'hidden'}`}
      >
        <div className="sticky top-0 bg-white dark:bg-dark px-2 pb-4 pt-2 lg:hidden">
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
