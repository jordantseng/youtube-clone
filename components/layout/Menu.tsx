'use client'
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  MoonIcon,
  ChevronRightIcon,
  LanguageIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import SubMenu from '@/components/layout/SubMenu';
import IconButton from '../ui/IconButton';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleClick = (selected: string) => () => {
    setSelectedItem(selected);
  };

  if (!theme) {
    return null;
  }

  return (
    <div ref={menuRef}>
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </IconButton>
      {menuOpen && (
        <div className="z-50 fixed right-5 top-20 w-80">
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
      )}
    </div>
  );
};

export default Menu;
