import Link from 'next/link';
import { buttonStyles } from './Button';
import { twMerge } from 'tailwind-merge';
import { ElementType } from 'react';

type SmallSidebarItemProps = {
  href: string;
  title: string;
  Icon: ElementType;
};

const SmallSidebarItem = ({ href, title, Icon }: SmallSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'flex flex-col items-center gap-1 rounded-lg px-1 py-4'
      )}
    >
      <Icon className="h-6 w-6" />
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default SmallSidebarItem;
