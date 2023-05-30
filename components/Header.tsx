import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';

import Searchbox from '@/components/Searchbox';

const Header = () => {
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
      <div></div>
    </header>
  );
};

export default Header;
