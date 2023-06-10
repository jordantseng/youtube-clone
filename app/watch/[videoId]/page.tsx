import Comments from '@/app/watch/[videoId]/components/Comments';
import RecommendVideos from '@/app/watch/[videoId]/components/RecommendVideos';
import Video from '@/components/Video';
import { getVideo } from '@/services/youtube';

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPage = async ({ params: { videoId } }: Props) => {
  const videoDetails = await getVideo(
    `videos?part=snippet,contentDetails,statistics&id=${videoId}`
  );

  return (
    <main className="flex px-12 flex-wrap">
      <div className="flex-1 mb-2">
        <Video
          id={videoDetails.id}
          title={videoDetails.title}
          viewCount={videoDetails.viewCount}
          videoTimeStamp={videoDetails.videoTimeStamp}
          likeCount={videoDetails.likeCount}
          channel={videoDetails.channel}
          subscriberCount={videoDetails.subscriberCount}
          channelThumbnail={videoDetails.channelThumbnail}
          videoDescription={videoDetails.videoDescription}
        />
        <div className="hidden xl:block">
          <Comments videoId={videoDetails.id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 xl:pl-4">
        <RecommendVideos />
      </div>
      <div className="block w-full xl:hidden">
        <Comments videoId={videoDetails.id} />
      </div>
    </main>
  );
};

export default VideoPage;
