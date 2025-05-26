import React, { useState } from "react";

export interface CommentType {
  author: string;
  id: number;
  content: string;
  votes: number;
  timeStamp: string;
  replies: CommentType[];
}

export type VoteType = "UP" | "DOWN";

export interface CommentProps {
  comment: CommentType;
  onReplySubmit: (commentId: number | undefined, content: string) => void;
  onEditSubmit: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  onVoteUpdate: (commentId: number, type: VoteType) => void;
}

const Comment = ({
  comment,
  onReplySubmit,
  onEditSubmit,
  onDeleteComment,
  onVoteUpdate,
}: CommentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");
  const [showReply, setShowReply] = useState(false);

  const toggleEditMode = () => {
    setEditContent(comment.content);
    setIsEditMode(!isEditMode);
  };

  const handleEditSubmit = () => {
    onEditSubmit(comment.id, editContent);
    setIsEditMode(false);
    setEditContent("");
  };

  const toggleReplyMode = () => {
    setShowReply(!showReply);
  };

  const handleVote = (type: VoteType) => {
    onVoteUpdate(comment.id, type);
  };

  const handleDelete = () => {
    onDeleteComment(comment.id);
  };

  const handleSubmit = () => {
    onReplySubmit(comment.id, replyContent);
    setReplyContent("");
    setShowReply(false);
  };
  return (
    <div className="comment">
      {isEditMode ? (
        <div className="main-comment">
          <textarea
            className="comment-input"
            rows={3}
            placeholder="Enter the reply.."
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div>
            <button className="action-button" onClick={handleEditSubmit}>
              Save Edit
            </button>
            <button className="action-button" onClick={toggleEditMode}>
              Cancel Edit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p className="comment-author">{comment.author}</p>
            <p className="comment-content">{comment.content}</p>
            <p className="comment-info">Votes: {comment.votes}</p>
            <p className="comment-info">
              {new Date(comment.timeStamp).toLocaleString()}
            </p>
          </div>
        </>
      )}

      <div>
        <button className="action-button" onClick={() => handleVote("UP")}>
          👍
        </button>
        <button className="action-button" onClick={() => handleVote("DOWN")}>
          👎
        </button>
        <button className="action-button" onClick={toggleReplyMode}>
          {showReply ? "Hide Replies" : "Reply"}
        </button>
        <button className="action-button" onClick={toggleEditMode}>
          Edit
        </button>
        <button className="action-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        {showReply && (
          <div className="main-comment">
            <textarea
              className="comment-input"
              rows={3}
              placeholder="Enter the reply.."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              autoFocus
            />
            <div>
              <button className="action-button" onClick={handleSubmit}>
                Reply Comment
              </button>
            </div>
          </div>
        )}
        {comment?.replies.length > 0 &&
          comment.replies.map((replyComment) => (
            <Comment
              key={replyComment.id}
              comment={replyComment}
              onReplySubmit={onReplySubmit}
              onEditSubmit={onEditSubmit}
              onDeleteComment={onDeleteComment}
              onVoteUpdate={onVoteUpdate}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
