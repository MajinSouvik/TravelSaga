import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReelCommentModal({ reelId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    const fetchComments = async () => {
      try {
          const response = await axios.get("http://localhost:8000/reel-comment/all-comments", {
          params: { reelID: reelId }
    });
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const resp = await axios.post("http://localhost:8000/reel-comment/add",
          {"comment":newComment, 
          "reelID":reelId})

        setComments(resp.data.comments);
        setNewComment('');
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="fixed top-0 h-[50%] w-[30%] bg-white shadow-lg flex flex-col"
         style={{ right: 'calc(15% + 10px)' }}>
      <div className="p-4 border-b flex justify-between items-center">
        <button onClick={onClose} className="text-2xl">&times;</button>
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p><strong>SSS</strong> {comment.comment}</p>
          </div>
        ))}
      </div>

      <div className="border-t p-2 flex items-center relative">
        {/* Left-pointed arrow */}
        <div className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                        border-t-[10px] border-t-transparent 
                        border-r-[10px] border-r-white 
                        border-b-[10px] border-b-transparent">
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
        <form onSubmit={handleAddComment} className="flex-grow flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border-none outline-none"
          />
          <button type="button" className="ml-2 text-2xl">☺</button>
        </form>
        <button 
          onClick={handleAddComment}
          className="ml-2 text-blue-500 font-semibold"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default ReelCommentModal;







