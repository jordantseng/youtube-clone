'use client';
import React, { Children, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import Button from '@/components/Button';

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Infinity,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div>
      {title && <div className="mb-1 ml-4 mt-2 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="flex w-full items-center gap-4 rounded-lg p-3"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
          <ButtonIcon className="h-6 w-6" />
          <div>
            {isExpanded ? '顯示較少' : '顯示更多'}
          </div>
        </Button>
      )}
    </div>
  );
};

export default LargeSidebarSection;
