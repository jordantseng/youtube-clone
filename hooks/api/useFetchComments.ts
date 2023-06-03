import { useState, useEffect, useRef } from 'react';

import { RawComment, getVideoComments } from '@/services/youtube';

type Comment = {
  id: string;
  authorImage: string;
  authorName: string;
  publishedAt: string;
  content: string;
  likeCount: number;
  canReply: boolean;
};

function transformComments(comments: RawComment[]) {
  return comments.map(
    ({
      id,
      snippet: {
        canReply,
        topLevelComment: { snippet },
      },
    }) => ({
      id,
      authorImage: snippet.authorProfileImageUrl,
      authorName: snippet.authorDisplayName,
      publishedAt: snippet.publishedAt,
      content: snippet.textDisplay,
      likeCount: snippet.likeCount,
      canReply,
    })
  );
}

const useFetchComments = (videoId: string, page: number) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchVideoComments = async () => {
      setLoading(true);

      try {
        const commentsResponse = await getVideoComments({
          part: 'snippet,replies',
          videoId,
          pageToken: nextPageTokenRef.current,
        });

        const comments = commentsResponse.items;

        const transformedComments = transformComments(comments);

        if (commentsResponse.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = commentsResponse.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setComments((prevComments) =>
          page > 1
            ? [...prevComments, ...transformedComments]
            : [...transformedComments]
        );
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchVideoComments();
  }, [videoId, page]);

  return { loading, comments, error, hasMore };
};

export default useFetchComments;
