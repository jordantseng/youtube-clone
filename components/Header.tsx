import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

import Searchbox from '@/components/Searchbox';
import Menu from '@/components/Menu';
import YoutubeIcon from '@/components/YoutubeIcon';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 sticky z-50 top-0">
      <div className="flex items-center">
        <Bars3Icon className="w-6 h-6" />
        <Link href="/">
          <YoutubeIcon />
        </Link>
      </div>
      <div className="w-2/5 hidden sm:block">
        <Searchbox />
      </div>
      <Menu />
    </header>
  );
};

export default Header;
