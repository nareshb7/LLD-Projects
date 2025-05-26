import React, { useState } from "react";
import "./style.css";
import { commentsData } from "./config";
import Comment from "./Comment";
import useCommentsTree from "./hook";

const NestedCommentsWrapper = () => {
  const { comments, insertComment, editComment, deleteComment, updateVote } =
    useCommentsTree(commentsData);
  const [commentContent, setCommentContent] = useState("");
  const handleSubmit = () => {
    setCommentContent("");
    insertComment(undefined, commentContent);
  };

  const handleReplySubmit = (
    commentId: number | undefined,
    content: string
  ) => {
    insertComment(commentId, content);
  };

  return (
    <div className="nested-comments-section">
      <h3>Nested Comments </h3>
      <div className="comment-wrapper">
        <div className="main-comment">
          <textarea
            className="comment-input"
            rows={3}
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <div>
            <button className="action-button" onClick={handleSubmit}>
              Add Comment
            </button>
          </div>
        </div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReplySubmit={handleReplySubmit}
            onEditSubmit={editComment}
            onDeleteComment={deleteComment}
            onVoteUpdate={updateVote}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedCommentsWrapper;
