import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const PostComments = ({ feedID }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getAll = async () => {
      const post = await axios.get(
        "https://travelsaga-frontend.vercel.app/post-comment/all-comments",
        {
          params: { postID: feedID },
        }
      );

      console.log("post-comments-->", post.data.comments);

      setComments(post.data.comments);
    };

    getAll();
  }, [feedID]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const resp = await axios.post(
      "https://travelsaga-frontend.vercel.app/post-comment/add",
      { comment: newComment, postID: feedID }
    );

    setComments(resp.data.comments);
    setNewComment("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow overflow-y-auto space-y-4 p-4 bg-gray-50">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-3 rounded-md shadow-sm flex items-center space-x-4"
          >
            {/* Display profile picture */}
            <img
              src={comment.postedBy.profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Display username and comment on the same line */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-bold">{comment.postedBy.username}</p>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            rows="3"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostComments;


