import SkeletonElement from '@/components/SkeletonsElement';

const CardSkeleton = () => {
  return (
    <div>
      <SkeletonElement type="thumbnail" />
      <div className="flex">
        <SkeletonElement type="avatar" />
        <div className="w-full ml-2">
          <SkeletonElement type="text" />
          <SkeletonElement type="title" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
