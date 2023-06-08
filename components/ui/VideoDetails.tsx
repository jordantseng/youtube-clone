import { transformTimeStamp, transformViews } from '@/lib/util';

type Props = {
  viewCount: string;
  videoTimeStamp: string;
  videoDescription: string;
};

const VideoDetails = ({
  viewCount,
  videoTimeStamp,
  videoDescription,
}: Props) => {
  const descriptionLines = videoDescription.split(/\r\n|\r|\n/g);

  return (
    <div className="rounded-2xl bg-zinc-200 dark:bg-zinc-800 p-4 text-sm">
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
      {descriptionLines.map((line, index) => (
        <div className="leading-normal" key={index}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default VideoDetails;
