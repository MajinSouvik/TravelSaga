import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Short from "./Short";
import ReelCommentModal from "./ReelCommentModal";

axios.defaults.withCredentials = true;

function Shorts() {
  const [reels, setReels] = useState([]);
  const [inViewReels, setInViewReels] = useState({});
  const [activeReelId, setActiveReelId] = useState(null); // Track the active reel
  const [showCommentModal, setShowCommentModal] = useState(false);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  const getReels = async () => {
    try {
      const response = await axios.get("https://travelsaga-frontend.vercel.app/reels/get-reels");
      setReels(response.data.reels);
    } catch (error) {
      console.error("Error fetching reels:", error);
    }
  };

  useEffect(() => {
    getReels();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInViewReels((prev) => ({
            ...prev,
            [entry.target.dataset.reelId]: entry.isIntersecting,
          }));

          // Check if the reel is not in view and the modal is open, close the modal
          if (!entry.isIntersecting && activeReelId === entry.target.dataset.reelId) {
            handleCloseCommentModal();
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeReelId]);

  useEffect(() => {
    const reelElements = document.querySelectorAll(".reel-container");
    reelElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    if (reelElements.length > 0) {
      setInViewReels({ [reels[0]._id]: true });
    }

    return () => {
      if (observerRef.current) {
        reelElements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, [reels]);

  const handleOpenCommentModal = (reelId) => {
    setActiveReelId(reelId);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setActiveReelId(null);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const reelElements = document.querySelectorAll(".reel-container");
      let foundReel = false;

      reelElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          foundReel = true;
          const reelId = el.dataset.reelId;
          if (reelId !== activeReelId) {
            handleCloseCommentModal();
          }
        }
      });

      if (!foundReel && showCommentModal) {
        handleCloseCommentModal();
      }
    }
  };

  return (
    // Wrapper div to center the Shorts component both vertically and horizontally with some offset from the top
    <div className="flex items-center justify-center h-screen">
      <div
        className="overflow-y-auto h-full snap-y snap-mandatory no-scrollbar relative mt-10"  // Added margin-top (mt-10)
        ref={containerRef}
        onScroll={handleScroll}
      >
        {reels.map((reel) => (
          <div
            key={reel._id}
            data-reel-id={reel._id}
            className="reel-container snap-start h-screen relative"
          >
            <Short
              reelID={reel._id}
              src={reel.url.url}
              name={reel.name}
              inView={inViewReels[reel._id]}
              onOpenCommentModal={() => handleOpenCommentModal(reel._id)}
            />
          </div>
        ))}

        {showCommentModal && activeReelId && (
          <ReelCommentModal reelId={activeReelId} onClose={handleCloseCommentModal} />
        )}
      </div>
    </div>
  );
}

export default Shorts;




















