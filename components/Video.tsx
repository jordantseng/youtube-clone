'use client';

import { transformViews, transformTimeStamp } from '@/lib/util';

const Video = ({ id, title, viewCount, videoTimeStamp, likeCount }) => {
  console.log(id);

  return (
    <>
      {/* video */}
      <div className="relative aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {/* info */}
      <div className="p-5 pb-2 w-full border-b border-gray-300">
        <h3 className="mb-2">{title}</h3>
        <div className="mb-2 flex flex-wrap justify-between">
          <div className="flex items-center">
            <div>觀看次數：{transformViews(viewCount)}</div>・
            <div>{transformTimeStamp(videoTimeStamp)}</div>
          </div>
          <div className="flex">
            <div className="text-gray-700 font-medium flex items-center py-2 pr-2">
              {/* VideoAction */}
              <p>{likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
