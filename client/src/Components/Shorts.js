import {useEffect, useState, useRef} from "react"
import axios from "axios"
import Short from "./Short"
axios.defaults.withCredentials = true;

function Shorts() {
  const [reels, setReels] = useState([]);
  const [inViewReels, setInViewReels] = useState({});
  const observerRef = useRef(null);

  const getReels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reels/get-reels");
      console.log("Reels in shorts-->", response.data.reels);
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
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const reelElements = document.querySelectorAll('.reel-container');
    reelElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    // Automatically mark the first reel as in view
    if (reelElements.length > 0) {
      setInViewReels({ [reels[0]._id]: true });
    }

    return () => {
      if (observerRef.current) {
        reelElements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, [reels]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {reels.map(reel => (
        <div key={reel._id} data-reel-id={reel._id} className="reel-container snap-start h-screen">
          <Short
            reelID={reel._id}
            src={reel.url.url}
            name={reel.name}
            comment={reel.comments}
            inView={inViewReels[reel._id]}
          />
        </div>
      ))}
    </div>
  );
}

export default Shorts;





