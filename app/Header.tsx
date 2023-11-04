'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

import Searchbox from '@/app/Searchbox';
import Menu from '@/app/components/Menu';
import YoutubeIcon from '@/app/components/YoutubeIcon';
import Button from '@/app/components/Button';
import { useSidebarContext } from '@/app/contexts/SidebarContext';

const Header = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { handleSidebarToggle } = useSidebarContext();

  return (
    <header className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20">
      <HeaderLeftSection
        hidden={showFullWidthSearch}
        onToggleSidebar={handleSidebarToggle}
      />
      <Searchbox
        showFullWidthSearch={showFullWidthSearch}
        onSearchClick={() => setShowFullWidthSearch(false)}
      />
      <Menu
        showFullWidthSearch={showFullWidthSearch}
        onSearchClick={() => setShowFullWidthSearch(true)}
      />
    </header>
  );
};

type HeaderLeftSectionProps = {
  hidden?: boolean;
  onToggleSidebar: () => void;
};

export const HeaderLeftSection = ({
  hidden = false,
  onToggleSidebar,
}: HeaderLeftSectionProps) => {
  return (
    <div
      className={`flex-shrink-0 items-center gap-4 ${
        hidden ? 'hidden' : 'flex'
      }`}
    >
      <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
        <Bars3Icon className="h-6 w-6" />
      </Button>
      <Link href="/">
        <YoutubeIcon />
      </Link>
    </div>
  );
};

export default Header;
