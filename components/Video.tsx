'use client';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Avatar from 'react-avatar';

import {
  transformViews,
  transformTimeStamp,
  transformSubscribers,
} from '@/lib/util';
import Button from '@/components/Button';

const VideoHeader = ({
  channelThumbnail,
  channel,
  subscriberCount,
  likeCount,
}) => {
  return (
    <div className="flex mb-2 flex-wrap">
      <Avatar src={channelThumbnail.url} alt="channel-avatar" size="40" round />
      <div className="flex ml-4 gap-3 w-48 mb-2 mr-auto">
        <div>
          <div className="font-medium">{channel}</div>
          {subscriberCount && (
            <p className="text-xs text-zinc-500">
              {transformSubscribers(subscriberCount)}位訂閱者
            </p>
          )}
        </div>
        <button className="bg-black rounded-3xl text-white px-4 text-sm">
          訂閱
        </button>
      </div>
      <div className="flex gap-2">
        {/* TODO: Button Group */}
        <div className="flex h-10">
          <div className="bg-slate-100 flex items-center justify-center rounded-l-3xl px-3 cursor-pointer relative after:content-[''] after:absolute after:right-0 after:top-2 after:h-6 after:w-px after:bg-slate-300">
            <HandThumbUpIcon className="h-6 w-6 mr-1" />
            <span>{likeCount}</span>
          </div>
          <div className="bg-slate-100 flex items-center justify-center rounded-r-3xl px-3 cursor-pointer">
            <HandThumbDownIcon className="h-6 w-6" />
          </div>
        </div>
        <Button Icon={ShareIcon} title="分享" />
        <Button Icon={PlusIcon} title="儲存" />
      </div>
    </div>
  );
};

const VideoDetails = ({ viewCount, videoTimeStamp, videoDescription }) => {
  const descriptionLines = videoDescription.split(/\r\n|\r|\n/g);

  return (
    <div className="rounded-2xl bg-slate-100 p-4 text-sm">
      <div className="mb-2 flex flex-wrap justify-between">
        <div className="flex items-center gap-2">
          <div className="font-medium">
            觀看次數：{transformViews(viewCount)}
          </div>
          <div className="font-medium">
            {transformTimeStamp(videoTimeStamp)}
          </div>
        </div>
      </div>
      {descriptionLines.map((line) => (
        <div className="leading-normal" key={line}>
          {line}
        </div>
      ))}
    </div>
  );
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
}) => {
  return (
    <>
      <div className="relative aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3 className="mb-2 p-5 pl-0 pb-2 w-full border-b border-gray-300">
        {title}
      </h3>
      <div className="pt-5 px-0 pb-2 w-full">
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
