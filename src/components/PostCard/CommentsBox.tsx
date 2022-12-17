import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

type Props = {
  postId: string;
  currentUser: string;
  handleRefetch: any;
};

const CommentsBox: React.FC<Props> = ({
  postId,
  currentUser,
  handleRefetch,
}) => {
  const [comment, setComment] = useState<string>("");
  const getComment = trpc.comments.getCommentByPostId.useQuery(postId);
  const createComment = trpc.comments.createComment.useMutation({
    onSettled: () => {
      getComment.refetch();
      handleRefetch();
    },
  });
  const handleSendComment = (e: any) => {
    e.preventDefault();

    createComment.mutate({
      userId: currentUser,
      postId: postId,
      content: comment,
    });

    setComment("");
  };
  return (
    <>
      {getComment.data?.map((item, index) => (
        <div key={index}>
          <p className="text-yellow-500">{item.user.name}</p>
          <p>{item.content}</p>
        </div>
      ))}
      <input
        type="text"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={handleSendComment}>Send</button>
    </>
  );
};

export default CommentsBox;
