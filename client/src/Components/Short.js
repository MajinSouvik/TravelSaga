import React, { useRef, useEffect } from 'react';

function Short({ reelID, src, name, comment, inView }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div className="reel-container w-full max-w-[400px] h-[calc(100vh-56px)] mx-auto relative">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        // muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
        <p className="font-bold">{name}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  )
}

export default Short;


