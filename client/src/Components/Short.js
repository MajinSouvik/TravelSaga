// function Short({reelID, src, name, comment}){
//     return (
//         <div >
//             <p>{name}</p>
//             <video
//                 controls
//                 className="w-[75%] aspect-[3/2] object-contain"

//             >
//                 <source src={src} type="video/mp4"/>
//             </video>
//         </div>
//     )
// }

// export default Short

import { useEffect, useRef } from 'react';

function Short({ reelID, src, name, comment, isActive }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isActive]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[85vh] bg-black text-white">
            <video
                ref={videoRef}
                loop
                muted
                controls={false}
                playsInline
                className="w-full h-full object-contain"
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="absolute bottom-4 left-4">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-sm">{comment}</p>
            </div>
        </div>
    );
}

export default Short;

