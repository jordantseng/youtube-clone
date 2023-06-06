import Comments from '@/components/Comments';
import RecommendVideos from '@/components/RecommendVideos';
import Video from '@/components/ui/Video';
import { getChannels, getVideos } from '@/services/youtube';

type Props = {
  params: {
    videoId: string;
  };
};

async function fetchVideoDetails(videoId: string) {
  const videos = await getVideos({
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  });

  const video = videos.items[0];

  const channels = await getChannels({
    part: 'snippet,statistics',
    id: video.snippet.channelId,
  });

  const channel = channels.items[0];

  return {
    id: video.id,
    title: video.snippet.title,
    viewCount: video.statistics.viewCount,
    videoTimeStamp: video.snippet.publishedAt,
    likeCount: video.statistics.likeCount,
    channel: channel.snippet.title,
    subscriberCount: channel.statistics.subscriberCount,
    channelThumbnail: channel.snippet.thumbnails.default,
    videoDescription: video.snippet.description,
  };
}

const VideoPage = async ({ params: { videoId } }: Props) => {
  const videoDetails = await fetchVideoDetails(videoId);

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
