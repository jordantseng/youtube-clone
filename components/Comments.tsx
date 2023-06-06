'use client';
import { useState, useEffect } from 'react';

import CommentCard from '@/components/ui/CommentCard';
import Loader from '@/components/ui/Loader';
import useOnScreen from '@/hooks/useOnScreen';
import useFetchComments from '@/hooks/api/useFetchComments';

type Props = { videoId: string };

const Comments = ({ videoId }: Props) => {
  const [page, setPage] = useState(1);
  const { loading, comments, hasMore } = useFetchComments(videoId, page);
  const [lastComment, setLastComment] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastComment);

  useEffect(() => {
    if (!visible || !hasMore) {
      return;
    }

    setPage((page) => page + 1);
  }, [visible, hasMore]);

  const getLastComment = (element: HTMLDivElement) => {
    setLastComment(element);
  };

  return (
    <>
      {comments.map((comment, index) => {
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
      {loading && <Loader />}
    </>
  );
};

export default Comments;
