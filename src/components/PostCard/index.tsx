import React, { useEffect, useState } from "react";
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
    likes: { userId: string; id: string }[];
  };
  currentUser: string;
  handleRefetch: any;
};

type Like = {
  id: string | undefined;
  value: boolean;
};

const PostCard: React.FC<Props> = ({ data, currentUser, handleRefetch }) => {
  const [like, setLike] = useState<Like>({
    id: "",
    value: false,
  });

  const createLike = trpc.likes.createLike.useMutation({
    onSettled: (data) => {
      setLike({ id: data?.id, value: true });
      return handleRefetch();
    },
  });

  const deleteLike = trpc.likes.deleteLike.useMutation({
    onSettled: () => {
      return handleRefetch();
    },
  });

  const [openComment, setOpenComment] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < data.likes.length; i++) {
      if (data.likes[i]?.userId === currentUser) {
        setLike({
          id: data.likes[i] ? data.likes[i]?.id : "",
          value: true,
        });
      }
    }
  }, [data.likes, currentUser]);

  const handleToggleLike = async (e: any) => {
    e.preventDefault();
    if (like.value) {
      deleteLike.mutate(like.id);
      setLike({ id: "", value: false });
      return handleRefetch();
    }
    createLike.mutate({
      userId: currentUser,
      postId: data.id,
    });
  };

  const handleOpenComment = async (e: any) => {
    e.preventDefault();

    setOpenComment((prev) => {
      return !prev;
    });
  };

  return (
    <div className="w-full rounded-2xl bg-purple-500 p-28">
      <p className="text-yellow-400">{data.user.name}</p>
      <p className="text-white">{data.content}</p>
      <div>
        <button
          onClick={handleToggleLike}
          className="-p3 rounded-2xl bg-blue-400 p-3"
        >
          {like.value ? "i like this" : "like"}
          {data.likes.length}
        </button>
        <button
          className="rounded-2xl bg-blue-400 p-3"
          onClick={handleOpenComment}
        >
          Comment {data.comments.length}
        </button>
      </div>
      {openComment && (
        <div>
          <CommentsBox
            postId={data.id}
            currentUser={currentUser}
            handleRefetch={handleRefetch}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
