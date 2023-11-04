import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type CategoryChipsProps = {
  categories: { id: number; title: string }[];
  selectedCategory: number;
  onSelect: (key: number) => void;
};

const TRANSLATE_AMOUNT = 50;

const CategoryChips = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryChipsProps) => {
  const [translate, setTransalte] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (containerRef.current == null) {
        return;
      }

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + containerRef.current.clientWidth <
          containerRef.current.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  const handleLeftButtonClick = () => {
    setTransalte((translate) => {
      const newTranslate = translate - TRANSLATE_AMOUNT;
      if (newTranslate <= 0) {
        return 0;
      }
      return newTranslate;
    });
  };

  const handleRightButtonClick = () => {
    setTransalte((translate) => {
      if (containerRef.current == null) {
        return translate;
      }

      const newTranslate = translate + TRANSLATE_AMOUNT;

      const edge = containerRef.current.scrollWidth;
      const width = containerRef.current.clientWidth;

      if (newTranslate + width >= edge) {
        return edge - width;
      }

      return newTranslate;
    });
  };

  return (
    <div className="relative overflow-x-hidden" ref={containerRef}>
      <div
        className="flex w-[max-content] gap-3 whitespace-nowrap transition-transform"
        style={{
          transform: `translateX(-${translate}px)`,
        }}
      >
        {categories.map(({ id, title }) => (
          <Button
            key={id}
            variant={selectedCategory === id ? 'dark' : 'default'}
            className="whitespace-nowrap rounded-lg px-3 py-1"
            onClick={() => onSelect(id)}
          >
            {title}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 w-24 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1"
            onClick={handleLeftButtonClick}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 flex w-24 -translate-y-1/2 justify-end bg-gradient-to-l from-white from-50% to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1"
            onClick={handleRightButtonClick}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryChips;
