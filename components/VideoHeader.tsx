import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Avatar from 'react-avatar';

import { transformCounts } from '@/lib/helpers';

type Props = {
  channelThumbnail: { url: string; width: number; height: number };
  channel: string;
  subscriberCount: string;
  likeCount: string;
};

const VideoHeader = ({
  channelThumbnail,
  channel,
  subscriberCount,
  likeCount,
}: Props) => {
  return (
    <div className="flex flex-wrap mb-2">
      <Avatar src={channelThumbnail.url} alt="channel-avatar" size="40" round />
      <div className="flex flex-1 mb-2 min-w-[200px]">
        <div className="mx-4">
          <p className="font-medium overflow-hidden line-clamp-1">{channel}</p>
          {subscriberCount && (
            <p className="text-xs">
              {transformCounts(subscriberCount)}位訂閱者
            </p>
          )}
        </div>
        <button className="w-20 bg-black text-white px-4 mr-2 text-sm rounded-3xl">
          訂閱
        </button>
      </div>
      <div className="flex gap-2">
        {/* TODO: Button Group */}
        <div className="flex h-10">
          <div className="bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-l-3xl px-3 cursor-pointer relative after:content-[''] after:absolute after:right-0 after:top-2 after:h-6 after:w-px after:bg-zinc-400 text-sm">
            <HandThumbUpIcon className="h-5 w-5 mr-1" />
            <span>{transformCounts(likeCount)}</span>
          </div>
          <div className="bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-r-3xl px-3 cursor-pointer">
            <HandThumbDownIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-3xl px-3 cursor-pointer h-10">
          <ShareIcon className="h-5 w-5 mr-1" />
          <p className="text-sm">分享</p>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-3xl px-3 cursor-pointer h-10">
          <PlusIcon className="h-5 w-5 mr-1" />
          <p className="text-sm">儲存</p>
        </div>
      </div>
    </div>
  );
};

export default VideoHeader;
