import Video from '@/components/Video';
import { getChannels, getVideos } from '@/services/youtube';

async function fetchVideoDetails(videoId) {
  const videos = await getVideos({
    id: videoId,
    part: 'snippet,contentDetails,statistics',
  });

  const video = videos.items[0];

  const channels = await getChannels({
    id: video.snippet.channelId,
    part: 'snippet,statistics',
  });

  const channel = channels.items[0];

  return {
    video: video,
    id: video.id,
    title: video.snippet.title,
    viewCount: video.statistics.viewCount,
    videoTimeStamp: video.snippet.publishedAt,
    likeCount: video.statistics.likeCount,
    dislikeCount: video.statistics.dislikeCount,
    channel: channel.snippet.title,
    subscriberCount: channel.statistics.subscriberCount || null,
    channelThumbnail: channel.snippet.thumbnails.default,
    videoDescription: video.snippet.description,
  };
}

const VideoPage = async ({ params: { videoId } }) => {
  const videoDetails = await fetchVideoDetails(videoId);

  return (
    <div className="flex pr-4">
      <div className="flex-1 pr-4">
        <Video
          id={videoDetails.id}
          title={videoDetails.title}
          viewCount={videoDetails.viewCount}
          videoTimeStamp={videoDetails.videoTimeStamp}
          likeCount={videoDetails.likeCount}
          dislikeCount={videoDetails.dislikeCount}
          channel={videoDetails.channel}
          subscriberCount={videoDetails.subscriberCount}
          channelThumbnail={videoDetails.channelThumbnail}
          videoDescription={videoDetails.videoDescription}
        />
      </div>
    </div>
  );
};

export default VideoPage;
