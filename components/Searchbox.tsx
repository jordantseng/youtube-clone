'use client';
import { FormEvent, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

import Button from '@/components/Button';

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
      className={`flex-grow items-center rounded-3xl md:flex ${
        showFullWidthSearch ? 'flex' : 'max-w-[600px] hidden md:flex'
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
        className="w-full rounded-l-full border border-secondary-border px-4 py-2 shadow-inner shadow-secondary outline-none focus:border-blue-500"
        type="text"
        placeholder="搜尋"
        defaultValue={searchTerm}
        ref={searchInputRef}
      />
      <Button className="flex-shrink-0 rounded-r-full border border-l-0 border-secondary-border px-4 py-2">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default Searchbox;
