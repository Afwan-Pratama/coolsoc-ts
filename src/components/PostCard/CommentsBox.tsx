import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

type Props = {
  postId: string;
};

const CommentsBox: React.FC<Props> = ({ postId }) => {
  const getComment = trpc.comments.getCommentByPostId.useQuery(postId);

  return (
    <>
      {getComment.data?.map((item, index) => (
        <div key={index}>
          <p className="text-yellow-500">{item.user.name}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsBox;
