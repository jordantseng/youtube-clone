'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import Searchbox from '@/components/ui/Searchbox';
import Menu from '@/components/layout/Menu';
import IconButton from '@/components/ui/IconButton';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-5 sticky z-50 top-0 bg-white">
      <div className="flex items-center">
        <div>
          <Bars3Icon className="w-6 h-6" />
        </div>
        <Link href="/">
          <Image
            className="m-4"
            src="/1024px-YouTube_Logo_2017.png"
            alt="youtubeLogo"
            width="90"
            height="20"
          />
        </Link>
      </div>
      <div className="w-2/5 hidden sm:block">
        <Searchbox />
      </div>
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </IconButton>
      {menuOpen && <Menu />}
    </header>
  );
};

export default Header;
