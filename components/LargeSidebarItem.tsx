import Link from 'next/link';
import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { buttonStyles } from '@/components/Button';

type LargeSidebarItemProps = {
  href: string;
  title: string;
  Icon: ElementType;
  isActive?: boolean;
};

const LargeSidebarItem = ({
  href,
  title,
  isActive = false,
  Icon,
}: LargeSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `flex w-full items-center gap-4 rounded-lg p-3 ${
          isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined
        }`
      )}
    >
      <Icon className="h-6 w-6" />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
    </Link>
  );
};

export default LargeSidebarItem;
