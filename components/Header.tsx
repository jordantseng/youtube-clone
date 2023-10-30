'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

import Searchbox from '@/components/Searchbox';
import Menu from '@/components/Menu';
import YoutubeIcon from '@/components/YoutubeIcon';
import Button from '@/components/Button';

const Header = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <header className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20">
      <div
        className={`flex-shrink-0 items-center gap-4 ${
          showFullWidthSearch ? 'hidden' : 'flex'
        }`}
      >
        <Button variant="ghost" size="icon">
          <Bars3Icon className="h-6 w-6" />
        </Button>
        <Link href="/">
          <YoutubeIcon />
        </Link>
      </div>
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

export default Header;
