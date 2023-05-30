'use client';
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchIcon from './icons/SearchIcon';

const Searchbox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef();
  const searchTerm = searchParams.get('q');

  const onSearchClick = (e) => {
    if (!searchInputRef.current.value) {
      return;
    }
    e.preventDefault();
    router.push(`/search?q=${searchInputRef.current.value}`);
  };

  return (
    <form
      className="flex items-center w-full border border-gray-300 rounded-3xl"
      onSubmit={onSearchClick}
    >
      <input
        className="flex-1 p-2 pl-4 rounded-l-3xl"
        type="text"
        placeholder="搜尋"
        defaultValue={searchTerm || ''}
        // ref={searchInputRef}
      />
      <button
        className="flex justify-center items-center w-16 border-l border-gray-300 p-2 cursor-pointer bg-gray-100 rounded-r-3xl"
        type="submit"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default Searchbox;
