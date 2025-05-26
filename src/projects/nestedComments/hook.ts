import { useState } from "react";
import { CommentType, VoteType } from "./Comment";

const useCommentsTree = (initialComments: CommentType[]) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  const insertNode = (
    tree: CommentType[],
    commentId: number,
    newComment: CommentType
  ): CommentType[] => {
    return tree?.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [newComment, ...comment.replies],
        };
      } else if (comment?.replies?.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, newComment),
        };
      }

      return comment;
    });
  };

  const insertComment = (commentId: number | undefined, content: string) => {
    const newComment = {
      author: "Naresh Baleboina",
      id: new Date().getTime(),
      votes: 0,
      content,
      timeStamp: new Date().toISOString(),
      replies: [],
    };
    if (commentId) {
      setComments((prev) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const editNode = (
    tree: CommentType[],
    commentId: number,
    content: string
  ): CommentType[] => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
        };
      } else if (comment.replies?.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const editComment = (commentId: number, content: string) => {
    setComments((prev) => editNode(prev, commentId, content));
  };
  const deleteNode = (
    tree: CommentType[],
    commentId: number
  ): CommentType[] => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc;
      } else if (comment.replies?.length > 0) {
        comment.replies = deleteNode(comment.replies, commentId);
      }
      return [...acc, comment];
    }, [] as CommentType[]);
  };

  const deleteComment = (commentId: number) => {
    setComments((prev) => deleteNode(prev, commentId));
  };

  const voteHandler = (
    tree: CommentType[],
    commentId: number,
    type: VoteType
  ): CommentType[] => {
    return tree?.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes:
            type == "UP"
              ? comment.votes + 1
              : comment.votes > 0
              ? comment.votes - 1
              : 0,
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: voteHandler(comment.replies, commentId, type),
        };
      }

      return comment;
    });
  };

  const updateVote = (commentId: number, type: VoteType) => {
    setComments((prev) => voteHandler(prev, commentId, type));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    updateVote,
  };
};

export default useCommentsTree;
