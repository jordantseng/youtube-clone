'use client';

import {
  formatViews,
  formatTimeStamp,
  transformCounts,
} from '@/app/utils/helpers';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Avatar from 'react-avatar';

type VideoHeaderProps = {
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
}: VideoHeaderProps) => {
  return (
    <div className="mb-2 flex flex-wrap">
      <Avatar src={channelThumbnail.url} alt="channel-avatar" size="40" round />
      <div className="mb-2 flex min-w-[200px] flex-1">
        <div className="mx-4">
          <p className="line-clamp-1 overflow-hidden font-medium">{channel}</p>
          {subscriberCount && (
            <p className="text-xs">
              {transformCounts(subscriberCount)}位訂閱者
            </p>
          )}
        </div>
        <button className="mr-2 w-20 rounded-3xl bg-black px-4 text-sm text-white">
          訂閱
        </button>
      </div>
      <div className="flex gap-2">
        {/* TODO: Button Group */}
        <div className="flex h-10">
          <div className="relative flex cursor-pointer items-center justify-center rounded-l-3xl bg-zinc-200 px-3 text-sm after:absolute after:right-0 after:top-2 after:h-6 after:w-px after:bg-zinc-400 after:content-[''] dark:bg-zinc-800">
            <HandThumbUpIcon className="mr-1 h-5 w-5" />
            <span>{transformCounts(likeCount)}</span>
          </div>
          <div className="flex cursor-pointer items-center justify-center rounded-r-3xl bg-zinc-200 px-3 dark:bg-zinc-800">
            <HandThumbDownIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex h-10 cursor-pointer items-center justify-center rounded-3xl bg-zinc-200 px-3 dark:bg-zinc-800">
          <ShareIcon className="mr-1 h-5 w-5" />
          <p className="text-sm">分享</p>
        </div>
        <div className="flex h-10 cursor-pointer items-center justify-center rounded-3xl bg-zinc-200 px-3 dark:bg-zinc-800">
          <PlusIcon className="mr-1 h-5 w-5" />
          <p className="text-sm">儲存</p>
        </div>
      </div>
    </div>
  );
};

type VideoDetailsProps = {
  viewCount: string;
  videoTimeStamp: string;
  videoDescription: string;
};

const VideoDetails = ({
  viewCount,
  videoTimeStamp,
  videoDescription,
}: VideoDetailsProps) => {
  const descriptionLines = videoDescription.split(/\r\n|\r|\n/g);

  return (
    <div className="rounded-2xl bg-zinc-200 p-4 text-sm dark:bg-zinc-800">
      <div className="mb-2 flex flex-wrap justify-between">
        <div className="flex items-center gap-2">
          <div className="font-medium">
            觀看次數：{formatViews(viewCount)}次
          </div>
          <div className="font-medium">{formatTimeStamp(videoTimeStamp)}</div>
        </div>
      </div>
      {descriptionLines.map((line, index) => (
        <div className="leading-normal" key={index}>
          {line}
        </div>
      ))}
    </div>
  );
};

type VideoProps = {
  id: string;
  title: string;
  viewCount: string;
  videoTimeStamp: string;
  likeCount: string;
  channelThumbnail: { url: string; width: number; height: number };
  subscriberCount: string;
  channel: string;
  videoDescription: string;
};

const Video = ({
  id,
  title,
  viewCount,
  videoTimeStamp,
  likeCount,
  channelThumbnail,
  subscriberCount,
  channel,
  videoDescription,
}: VideoProps) => {
  return (
    <>
      <div className="relative aspect-video">
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3 className="mb-2 w-full p-5 pb-2 pl-0">{title}</h3>
      <div className="w-full pb-2">
        <VideoHeader
          channelThumbnail={channelThumbnail}
          channel={channel}
          subscriberCount={subscriberCount}
          likeCount={likeCount}
        />
        <VideoDetails
          viewCount={viewCount}
          videoTimeStamp={videoTimeStamp}
          videoDescription={videoDescription}
        />
      </div>
    </>
  );
};

export default Video;
