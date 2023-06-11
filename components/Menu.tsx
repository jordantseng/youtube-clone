'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  MoonIcon,
  ChevronRightIcon,
  LanguageIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import SubMenu from '@/components/SubMenu';
import IconButton from '@/components/IconButton';

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

  return (
    <div ref={menuRef}>
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </IconButton>
      {menuOpen && theme && (
        <div className="z-50 fixed right-5 top-20 w-80">
          {selectedItem === '' && (
            <ul className="rounded-lg py-3">
              <li
                className="flex items-center cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleClick('appearance')}
              >
                <MoonIcon className="w-5 h-5 mr-2" />
                <p className="mr-auto text-sm">外觀</p>
                <ChevronRightIcon className="w-5 h-5" />
              </li>
              <li
                className="flex items-center cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleClick('language')}
              >
                <LanguageIcon className="w-5 h-5 mr-2" />
                <p className="mr-auto text-sm">語言</p>
                <ChevronRightIcon className="w-5 h-5" />
              </li>
            </ul>
          )}
          {selectedItem === 'appearance' && (
            <SubMenu
              title="外觀"
              items={[
                { title: '淺色主題', value: 'light' },
                { title: '深色主題', value: 'dark' },
                { title: '使用裝置主題', value: 'system' },
              ]}
              value={theme}
              onPrevious={handleClick('')}
              onChange={(value) => setTheme(value)}
            />
          )}
          {selectedItem === 'language' && (
            <SubMenu
              title="選擇語言"
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
