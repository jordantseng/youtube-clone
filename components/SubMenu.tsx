import { ArrowSmallLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

import IconButton from '@/components/IconButton';

type Props = {
  title: string;
  items: { title: string; value: string }[];
  value: string;
  onPrevious: () => void;
  onChange: (value: string) => void;
};

const SubMenu = ({ title, value, items, onPrevious, onChange }: Props) => {
  return (
    <ul className="rounded-lg">
      <li className="flex items-center px-1 py-2">
        <IconButton
          className="active:bg-gray-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          onClick={onPrevious}
        >
          <ArrowSmallLeftIcon className="w-5 h-5" />
        </IconButton>
        <p className="ml-2 text-sm">{title}</p>
      </li>
      <hr />
      <div className="py-3">
        {items.map((item) => (
          <li
            className="flex items-center cursor-pointer px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            key={item.title}
            onClick={() => onChange(item.value)}
          >
            {value === item.value && <CheckIcon className="w-5 h-5" />}
            <p className={`text-sm ml-3 ${value !== item.value && 'px-5'}`}>
              {item.title}
            </p>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default SubMenu;
