import { useState } from 'react';
import {
  MoonIcon,
  ChevronRightIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';

import SubMenu from '@/components/layout/SubMenu';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleClick = (selected: string) => () => {
    setSelectedItem(selected);
  };

  return (
    <div className="z-50 fixed right-5 top-16 w-80 bg-white bg-opacity-95 border border-gray-200 border-t-0 rounded-lg">
      <ul>
        {selectedItem === '' && (
          <>
            <li
              className="flex items-center cursor-pointer p-4 hover:bg-slate-100 rounded-lg"
              onClick={handleClick('appearance')}
            >
              <MoonIcon className="w-6 h-6 mr-2" />
              <p className="mr-auto">Appearance: Device Theme</p>
              <ChevronRightIcon className="w-6 h-6" />
            </li>
            <li
              className="flex items-center cursor-pointer p-4 hover:bg-slate-100 rounded-lg"
              onClick={handleClick('language')}
            >
              <LanguageIcon className="w-6 h-6 mr-2" />
              <p className="mr-auto">Language: English</p>
              <ChevronRightIcon className="w-6 h-6" />
            </li>
          </>
        )}
      </ul>
      {selectedItem === 'appearance' && (
        <SubMenu
          title="Appearance"
          items={[
            { title: 'Light Mode', value: 'light' },
            { title: 'Dark Mode', value: 'dark' },
          ]}
          onClick={handleClick}
        />
      )}
      {selectedItem === 'language' && (
        <SubMenu
          title="Choose your language"
          items={[
            { title: '中文(繁體)', value: 'chinese' },
            { title: 'English(US)', value: 'english' },
          ]}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default Menu;
