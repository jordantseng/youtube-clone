import { MoonIcon, ChevronRightIcon, LanguageIcon } from '@heroicons/react/24/outline';

const Menu = () => {
  return (
    <div className="z-50 fixed right-5 top-16 w-80 bg-white bg-opacity-95 border border-gray-200 border-t-0 rounded-lg">
      <div className="py-4">
        <div className="flex items-center h-10 cursor-pointer px-4 hover:bg-slate-100">
          <MoonIcon className="w-6 h-6 mr-2" />
          <p className="mr-auto">Appearance: Device Theme</p>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
        <div className="flex items-center h-10 cursor-pointer px-4 hover:bg-slate-100">
          <LanguageIcon className="w-6 h-6 mr-2" />
          <p className="mr-auto">Language: English</p>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
