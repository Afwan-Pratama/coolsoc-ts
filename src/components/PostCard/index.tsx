import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import CommentsBox from "./CommentsBox";

type Props = {
  data: {
    id: string;
    userId: string;
    content: string;
    user: {
      name: string | null;
    };
    comments: { content: string }[];
  };
  currentUser: string;
};

const PostCard: React.FC<Props> = ({ data, currentUser }) => {
  const [comment, setComment] = useState<string>("");

  const createComment = trpc.comments.createComment.useMutation();

  const [openComment, setOpenComment] = useState<boolean>(false);

  const handleOpenComment = async (e: any) => {
    e.preventDefault();

    setOpenComment((prev) => {
      return !prev;
    });
  };

  const handleSendComment = (e: any) => {
    e.preventDefault();

    createComment.mutate({
      userId: currentUser,
      postId: data.id,
      content: comment,
    });

    setComment("");
  };

  return (
    <div className="w-full rounded-2xl bg-purple-500 p-28">
      <p className="text-yellow-400">{data.user.name}</p>
      <p className="text-white">{data.content}</p>
      <button
        className="rounded-2xl bg-blue-400 p-3"
        onClick={handleOpenComment}
      >
        Comment {data.comments.length}
      </button>
      {openComment && (
        <div>
          <CommentsBox postId={data.id} />
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handleSendComment}>Send</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
