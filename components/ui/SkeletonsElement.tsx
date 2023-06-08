type Props = {
  type: string;
};

const SkeletonElement = ({ type }: Props) => {
  const className: { [key: string]: string } = {
    thumbnail: 'w-full h-64 rounded-2xl mb-4',
    avatar: 'w-10 h-10 rounded-full',
    title: 'w-1/2 h-5 rounded-sm mb-3',
    text: 'h-5 rounded-sm mb-3',
  };

  return <div className={`${className[type]} bg-zinc-200 dark:bg-zinc-800`} />;
};

export default SkeletonElement;
