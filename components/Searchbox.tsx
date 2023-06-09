'use client';
import { FormEvent, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Searchbox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTerm = searchParams.get('q') || '';

  const onSearchClick = (e: FormEvent<HTMLFormElement>) => {
    if (!searchInputRef.current?.value) {
      return;
    }

    e.preventDefault();

    router.push(`/search?q=${searchInputRef.current.value}`);
  };

  return (
    <form
      className="flex items-center w-full border rounded-3xl"
      onSubmit={onSearchClick}
    >
      <input
        className="flex-1 p-2 pl-4 rounded-l-3xl"
        type="text"
        placeholder="搜尋"
        defaultValue={searchTerm}
        ref={searchInputRef}
      />
      <button
        className="flex justify-center items-center w-16 border-l p-2 cursor-pointer rounded-r-3xl"
        type="submit"
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default Searchbox;
