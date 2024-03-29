'use client';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import CommentCard from '@/app/watch/[videoId]/CommentCard';
import Loader from '@/app/components/Loader';
import useOnScreen from '@/app/hooks/useOnScreen';
import { getCommentThreads } from '@/app/services/youtube';

type Comment = {
  data: {
    id: string;
    authorImage: string;
    authorName: string;
    publishedAt: string;
    content: string;
    likeCount: number;
    canReply: boolean;
  }[];
  nextPageToken: string;
};

const getKey =
  (videoId: string) => (pageIndex: number, previousPageData: Comment) => {
    const url = `commentThreads?part=snippet,replies&videoId=${videoId}`;

    if (previousPageData && !previousPageData.nextPageToken) {
      return null;
    }

    if (pageIndex === 0) {
      return url;
    }

    return `${url}&pageToken=${previousPageData.nextPageToken}`;
  };

const Comments = ({ videoId }: { videoId: string }) => {
  const [lastComment, setLastComment] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastComment);
  const { data, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey(videoId),
    getCommentThreads
  );

  const comments = data?.flatMap(({ data }) => data);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSize((size) => size + 1);
  }, [visible, setSize]);

  const getLastComment = (element: HTMLDivElement) => {
    setLastComment(element);
  };

  return (
    <>
      {comments?.map((comment, index) => {
        const lastComment = comments.length - 1 === index;

        return (
          <CommentCard
            key={comment.id}
            authorImage={comment.authorImage}
            authorName={comment.authorName}
            publishedAt={comment.publishedAt}
            content={comment.content}
            likeCount={comment.likeCount}
            canReply={comment.canReply}
            {...(lastComment && { getLastComment })}
          />
        );
      })}
      {(isLoading || isValidating) && <Loader />}
    </>
  );
};

export default Comments;
