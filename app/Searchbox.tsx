'use client';
import { FormEvent, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

import Button from '@/app/components/Button';

type SearchboxProps = {
  showFullWidthSearch: boolean;
  onSearchClick: () => void;
};

const Searchbox = ({ showFullWidthSearch, onSearchClick }: SearchboxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTerm = searchParams.get('q') || '';

  const handleSeach = (e: FormEvent<HTMLFormElement>) => {
    if (!searchInputRef.current?.value) {
      return;
    }

    e.preventDefault();

    router.push(`/search?q=${searchInputRef.current.value}`);
  };

  return (
    <form
      className={`flex-grow items-center rounded-3xl dark:border-dark-border md:flex ${
        showFullWidthSearch ? 'flex' : 'hidden max-w-[600px] md:flex'
      }`}
      onSubmit={handleSeach}
    >
      {showFullWidthSearch && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onSearchClick}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
      )}
      <input
        className="w-full rounded-l-full border px-4 py-2 outline-none focus:border-blue-500 dark:border-dark-border dark:focus:border-blue-500"
        type="text"
        placeholder="搜尋"
        defaultValue={searchTerm}
        ref={searchInputRef}
      />
      <Button className="flex-shrink-0 rounded-r-full border border-l-0 px-4 py-2 dark:border-dark-border dark:bg-dark">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default Searchbox;
