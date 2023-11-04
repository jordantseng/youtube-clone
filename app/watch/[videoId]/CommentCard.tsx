import Avatar from 'react-avatar';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';

import { formatTimeStamp } from '@/app/utils/helpers';

type Props = {
  authorImage: string;
  authorName: string;
  publishedAt: string;
  content: string;
  likeCount: number;
  canReply: boolean
  getLastComment?: (element: HTMLDivElement) => void
}

const CommentCard = ({
  authorImage,
  authorName,
  publishedAt,
  content,
  likeCount,
  canReply,
  getLastComment,
}: Props) => {
  return (
    <div className="flex m-4" ref={getLastComment}>
      <Avatar src={authorImage} alt="user-avatar" size="40" round />
      <div className="ml-4 flex-1">
        <div className="flex items-center mb-2">
          <span className="mr-1 text-sm font-medium">{authorName}</span>
          <span className="text-xs text-slate-500">
            {formatTimeStamp(publishedAt)}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="flex">
          <span className="flex items-center p-2 pl-0">
            <HandThumbUpIcon className="w-4 h-4" />
            {likeCount > 0 && (
              <p className="text-gray-700 ml-2 text-xs">{likeCount}</p>
            )}
          </span>
          <span className="flex items-center p-2">
            <HandThumbDownIcon className="w-4 h-4" />
          </span>
          {canReply && (
            <span className="flex items-center p-2">
              <p className="text-sm text-gray-700">回覆</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
