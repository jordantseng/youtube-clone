import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  MoonIcon,
  ChevronRightIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';

import SubMenu from '@/components/layout/SubMenu';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const { theme, setTheme } = useTheme();

  if (!theme) {
    return null;
  }

  const handleClick = (selected: string) => () => {
    setSelectedItem(selected);
  };

  return (
    <div className="z-50 fixed right-5 top-16 w-80">
      {selectedItem === '' && (
        <ul className="rounded-lg py-3">
          <li
            className="flex items-center cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            onClick={handleClick('appearance')}
          >
            <MoonIcon className="w-5 h-5 mr-2" />
            <p className="mr-auto text-sm">Appearance: Device Theme</p>
            <ChevronRightIcon className="w-5 h-5" />
          </li>
          <li
            className="flex items-center cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            onClick={handleClick('language')}
          >
            <LanguageIcon className="w-5 h-5 mr-2" />
            <p className="mr-auto text-sm">Language: English</p>
            <ChevronRightIcon className="w-5 h-5" />
          </li>
        </ul>
      )}
      {selectedItem === 'appearance' && (
        <SubMenu
          title="Appearance"
          items={[
            { title: 'Light Mode', value: 'light' },
            { title: 'Dark Mode', value: 'dark' },
            { title: 'Use device theme', value: 'system' },
          ]}
          value={theme}
          onPrevious={handleClick('')}
          onChange={(value) => setTheme(value)}
        />
      )}
      {selectedItem === 'language' && (
        <SubMenu
          title="Choose your language"
          items={[
            { title: '中文(繁體)', value: 'chinese' },
            { title: 'English(US)', value: 'english' },
          ]}
          value="chinese"
          onPrevious={handleClick('')}
          onChange={() => {}}
        />
      )}
    </div>
  );
};

export default Menu;
