// import Slide from "./Slide";
// import useMedia from "../hooks/useMedia";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CommentIcon from '@mui/icons-material/Comment';
// import SendIcon from '@mui/icons-material/Send';
// import Post from "./Post";
// import axios from "axios";
// import { useState, useRef, useEffect } from "react";
// axios.defaults.withCredentials = true;

// function Feed(props) {
//   const { images, videos } = useMedia(props.content);
//   const [showModal, setShowModal] = useState(false);
//   const [post, setPost] = useState({});
//   const videoRefs = useRef([]);

//   const getPost = async () => {
//     const resp = await axios.get("http://localhost:8000/posts/get-post/", {
//       "params": { "ID": props.feedID }
//     });
  
//     setPost(resp.data.post);
//     setShowModal(true);
//   };

//   useEffect(() => {
//     if (showModal) {
//       // Pause all videos and disable scrolling when modal is open
//       videoRefs.current.forEach(video => {
//         if (video) video.pause();
//       });
//       document.body.style.overflow = 'hidden';
//     } else {
//       // Resume all videos and enable scrolling when modal is closed
//       videoRefs.current.forEach(video => {
//         if (video) video.play();
//       });
//       document.body.style.overflow = 'auto';
//     }

//     // Cleanup function
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showModal]);

//   return (
//     <>
//       <div className={`max-w-md mx-auto my-6 border rounded-lg shadow-lg overflow-hidden ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
//         {/* Post Header */}
//         <div className="flex items-center p-4">
//           <img
//             className="h-12 w-12 rounded-full border border-gray-300"
//             src={props.avatar}
//             alt={props.name}
//           />
//           <div className="ml-4">
//             <h2 className="font-semibold">{props.name}</h2>
//             <p className="text-gray-500 text-sm">{props.place}</p>
//           </div>
//         </div>

//         {/* Post Media */}
//         <div className="max-w-lg">
//           <Slide>
//             {[
//               ...images.map((image, index) => (
//                 <img
//                   key={`image-${index}`}
//                   src={image.url}
//                   alt={`Slide ${index + 1}`}
//                   className="object-cover w-full h-full"
//                 />
//               )),

//               ...videos.map((video, index) => (
//                 <video
//                   key={`video-${index}`}
//                   ref={el => videoRefs.current[index] = el}
//                   src={video.url}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="object-cover w-full h-full"
//                 />
//               )),
//             ]}
//           </Slide>
//         </div>

//         {/* Post Actions */}
//         <div className="flex justify-between items-center p-4">
//           <div className="flex space-x-4">
//             <button className="text-gray-700 hover:text-red-500">
//               <FavoriteBorderIcon />
//             </button>
//             <button className="text-gray-700 hover:text-blue-500">
//               <CommentIcon onClick={() => getPost()} />
//             </button>
//             <button className="text-gray-700 hover:text-yellow-500">
//               <SendIcon />
//             </button>
//           </div>
//           <button className="text-gray-700 hover:text-gray-900">
//             <i className="fas fa-bookmark"></i>
//           </button>
//         </div>

//         {/* Post Likes */}
//         <div className="px-4 py-2">
//           <p className="font-semibold">100 likes</p>
//         </div>

//         {/* Post Caption */}
//         <div className="px-4 pb-4">
//           <p>
//             <span className="font-semibold">{props.name}</span> {props.desc}
//           </p>
//           <p className="text-gray-500 text-sm mt-2">15 seconds ago</p>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && 
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <Post 
//             onClose={() => setShowModal(false)} 
//             images={images}
//             videos={videos}
//             feedID={props.feedID}
//           />
//         </div>
//       }
//     </>
//   );
// }

// export default Feed;

import React, { useState, useRef, useEffect, useCallback } from "react";
import {useSelector} from "react-redux"
import axios from "axios";
import Slide from "./Slide";
import useMedia from "../hooks/useMedia";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
// import { openSlice } from "../redux/slideSlice";
import Post from "./Post";

axios.defaults.withCredentials = true;

function Feed(props) {
  // const dispatch=useDispatch()
  const open=useSelector((store)=>store.slide.isOpen)
  console.log("open-->", open)
  const { images, videos } = useMedia(props.content);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState({});
  const videoRefs = useRef([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const observerRef = useRef(null);

  const getPost = async () => {
    const resp = await axios.get("http://localhost:8000/posts/get-post/", {
      "params": { "ID": props.feedID }
    });
    setPost(resp.data.post);
    setShowModal(true);
  };

  const handleVideoVisibility = useCallback((index, isVisible) => {
    if (isVisible) {
      setCurrentPlayingIndex(index);
    } else if (currentPlayingIndex === index) {
      setCurrentPlayingIndex(null);
    }
  }, [currentPlayingIndex]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        handleVideoVisibility(index, entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleVideoVisibility]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentPlayingIndex) {
          video.play();
        } else {
          video.pause();
        }
        observerRef.current.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observerRef.current.unobserve(video);
      });
    };
  }, [currentPlayingIndex]);

  useEffect(() => {
    if (showModal) {
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
      setCurrentPlayingIndex(null);
      document.body.style.overflow = 'hidden';
    } else {
      if (currentPlayingIndex !== null && videoRefs.current[currentPlayingIndex]) {
        videoRefs.current[currentPlayingIndex].play();
      }
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, currentPlayingIndex]);

  return (
    <>
      <div className={`max-w-md mx-auto my-6 border rounded-lg shadow-lg overflow-hidden ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
        {/* Post Header */}
        <div className="flex items-center p-4">
          <img
            className="h-12 w-12 rounded-full border border-gray-300"
            src={props.avatar}
            alt={props.name}
          />
          <div className="ml-4">
            <h2 className="font-semibold">{props.name}</h2>
            <p className="text-gray-500 text-sm">{props.place}</p>
          </div>
        </div>

        {/* Post Media */}
        <div className="max-w-lg">
          {open && (<Slide>
            {[
              ...images.map((image, index) => (
                <img
                  key={`image-${index}`}
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              )),

              ...videos.map((video, index) => (
                <video
                  key={`video-${index}`}
                  ref={el => videoRefs.current[index] = el}
                  data-index={index}
                  src={video.url}
                  // muted
                  loop
                  playsInline
                  className="object-cover w-full h-full"
                />
              )),
            ]}
          </Slide>)}
        </div>

        {/* Post Actions */}
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-red-500">
              <FavoriteBorderIcon />
            </button>
            <button className="text-gray-700 hover:text-blue-500">
              <CommentIcon onClick={() => getPost()} />
            </button>
            <button className="text-gray-700 hover:text-yellow-500">
              <SendIcon />
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900">
            <i className="fas fa-bookmark"></i>
          </button>
        </div>

        {/* Post Likes */}
        <div className="px-4 py-2">
          <p className="font-semibold">100 likes</p>
        </div>

        {/* Post Caption */}
        <div className="px-4 pb-4">
          <p>
            <span className="font-semibold">{props.name}</span> {props.desc}
          </p>
          <p className="text-gray-500 text-sm mt-2">15 seconds ago</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && 
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Post 
            onClose={() => setShowModal(false)} 
            images={images}
            videos={videos}
            feedID={props.feedID}
          />
        </div>
      }
    </>
  );
}

export default Feed;
