// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ReelCommentModal({ reelId, onClose }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/reels/${reelId}/comments`);
//         setComments(response.data.comments);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//     fetchComments();
//   }, [reelId]);

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:8000/reels/${reelId}/comments`, { text: newComment });
//       setComments([...comments, { text: newComment }]);
//       setNewComment('');
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div className="modal-background fixed inset-0 flex items-start justify-end bg-black bg-opacity-5">
//       <div className="modal-content bg-white w-1/3 p-4 rounded-lg relative">
//         <button onClick={onClose} className="absolute top-2 right-2 bg-gray-300 p-2 rounded">Close</button>
//         <div className="comments-list max-h-80 overflow-y-scroll mb-4">
//           {comments.map((comment, index) => (
//             <div key={index} className="comment p-2 border-b">
//               {comment.text}
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleAddComment} className="flex">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="flex-grow border p-2 rounded-l-lg"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">Post</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ReelCommentModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReelCommentModal({ reelId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/reels/${reelId}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [reelId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        await axios.post(`http://localhost:8000/reels/${reelId}/comments`, { text: newComment });
        setComments([...comments, { text: newComment }]);
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
            <p><strong>{comment.username}</strong> {comment.text}</p>
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







