import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Avatar from 'react-avatar';

import { transformCounts } from '@/lib/util';

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
    <div className="flex mb-2 flex-wrap">
      <Avatar src={channelThumbnail.url} alt="channel-avatar" size="40" round />
      <div className="flex ml-4 gap-3 w-48 mb-2 mr-auto">
        <div>
          <div className="font-medium overflow-hidden line-clamp-1">
            {channel}
          </div>
          {subscriberCount && (
            <p className="text-xs text-zinc-500">
              {transformCounts(subscriberCount)}位訂閱者
            </p>
          )}
        </div>
        <button className="bg-black rounded-3xl text-white px-4 text-sm w-20">
          訂閱
        </button>
      </div>
      <div className="flex gap-2">
        {/* TODO: Button Group */}
        <div className="flex h-10">
          <div className="bg-slate-100 flex items-center justify-center rounded-l-3xl px-3 cursor-pointer relative after:content-[''] after:absolute after:right-0 after:top-2 after:h-6 after:w-px after:bg-slate-300 text-sm">
            <HandThumbUpIcon className="h-5 w-5 mr-1" />
            <span>{transformCounts(likeCount)}</span>
          </div>
          <div className="bg-slate-100 flex items-center justify-center rounded-r-3xl px-3 cursor-pointer">
            <HandThumbDownIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="bg-slate-100 flex items-center justify-center rounded-3xl px-3 cursor-pointer h-10">
          <ShareIcon className="h-5 w-5 mr-1" />
          <span className='text-sm'>分享</span>
        </div>
        <div className="bg-slate-100 flex items-center justify-center rounded-3xl px-3 cursor-pointer h-10">
          <PlusIcon className="h-5 w-5 mr-1" />
          <span className='text-sm'>儲存</span>
        </div>
      </div>
    </div>
  );
};

export default VideoHeader;
