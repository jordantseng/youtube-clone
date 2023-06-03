import { transformTimeStamp, transformViews } from '@/lib/util';

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

export default VideoDetails;
