type SkeletonElementProps = {
  type: string;
};

const SkeletonElement = ({ type }: SkeletonElementProps) => {
  const className: { [key: string]: string } = {
    thumbnail: 'w-full h-64 rounded-2xl mb-4',
    avatar: 'w-10 h-10 rounded-full',
    title: 'w-1/2 h-5 rounded-sm mb-3',
    text: 'h-5 rounded-sm mb-3',
  };

  return <div className={`bg-gray-300 ${className[type]}`} />;
};

export default SkeletonElement;
