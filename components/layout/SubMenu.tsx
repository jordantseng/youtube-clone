import { ArrowSmallLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import IconButton from '@/components/ui/IconButton';

type Props = {
  title: string;
  items: any[];
  onClick: (selected: string) => () => void;
};

const SubMenu = ({ title, items, onClick }: Props) => {
  return (
    <ul>
      <li className="flex items-center p-1 rounded-lg">
        <IconButton
          className="hover:bg-gray-100 active:bg-gray-200"
          onClick={onClick('')}
        >
          <ArrowSmallLeftIcon className="w-6 h-6" />
        </IconButton>
        <p className="ml-1">{title}</p>
      </li>
      <hr />
      {items.map((item) => {
        return (
          <li
            className="flex items-center cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-lg"
            key={item.title}
          >
            <CheckIcon className="w-5 h-5" />
            <p className="text-sm ml-3">{item.title}</p>
          </li>
        );
      })}
      {/* <li className="flex items-center h-10 cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-lg">
        <p className="text-sm ml-8">English(US)</p>
      </li> */}
    </ul>
  );
};

export default SubMenu;
