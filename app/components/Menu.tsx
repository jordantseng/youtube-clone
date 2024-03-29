'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  MoonIcon,
  ChevronRightIcon,
  LanguageIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ArrowSmallLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

import Button from '@/app/components/Button';

type SubMenuProps = {
  title: string;
  items: { title: string; value: string }[];
  value: string;
  onPrevious: () => void;
  onChange: (value: string) => void;
};

const SubMenu = ({
  title,
  value,
  items,
  onPrevious,
  onChange,
}: SubMenuProps) => {
  return (
    <ul className="shadow-xl rounded-lg bg-white dark:bg-dark">
      <li className="flex items-center px-1 py-2">
        <Button variant="ghost" size="icon" onClick={onPrevious}>
          <ArrowSmallLeftIcon className="h-6 w-6" />
        </Button>
        <p className="ml-2 text-sm">{title}</p>
      </li>
      <hr className="bg-white dark:border-dark-border" />
      <div className="py-3">
        {items.map((item) => (
          <li
            className="flex cursor-pointer items-center px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            key={item.title}
            onClick={() => onChange(item.value)}
          >
            {value === item.value && <CheckIcon className="h-5 w-5" />}
            <p className={`ml-3 text-sm ${value !== item.value && 'px-5'}`}>
              {item.title}
            </p>
          </li>
        ))}
      </div>
    </ul>
  );
};

type SelectedItem = 'appearance' | 'language' | '';

type MenuProps = {
  showFullWidthSearch: boolean;
  onSearchClick: () => void;
};

const Menu = ({ showFullWidthSearch, onSearchClick }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>('');
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

  const handleClick = (selected: SelectedItem) => () => {
    setSelectedItem(selected);
  };

  return (
    <div
      ref={menuRef}
      className={`flex-shrink-0 md:gap-2 ${
        showFullWidthSearch ? 'hidden' : 'flex'
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onSearchClick}
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </Button>
      {menuOpen && theme && (
        <div className="fixed right-5 top-16 z-50 w-80">
          {selectedItem === '' && (
            <ul className="rounded-lg bg-white py-3 shadow-xl dark:bg-dark">
              <li
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleClick('appearance')}
              >
                <MoonIcon className="mr-2 h-5 w-5" />
                <p className="mr-auto text-sm">外觀</p>
                <ChevronRightIcon className="h-5 w-5" />
              </li>
              <li
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleClick('language')}
              >
                <LanguageIcon className="mr-2 h-5 w-5" />
                <p className="mr-auto text-sm">語言</p>
                <ChevronRightIcon className="h-5 w-5" />
              </li>
            </ul>
          )}
          {selectedItem === 'appearance' && (
            <SubMenu
              title="外觀"
              items={[
                { title: '淺色主題', value: 'light' },
                { title: '深色主題', value: 'dark' },
                // { title: '使用裝置主題', value: 'system' },
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
