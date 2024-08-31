import { useState } from "react";
import PopUpCreateClose from "./PopUpCreateClose";
import { useDispatch } from "react-redux";
import { setFeed } from "../redux/feedSlice";
import { setFeedReel } from "../redux/feedReelSlice";
import {logout} from "../redux/authSlice"
import { useNavigate } from "react-router-dom";
import { openSlice } from "../redux/slideSlice";
import FeedIcon from '@mui/icons-material/Feed';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import axios from "axios";

axios.defaults.withCredentials = true;

const FeaturesButton = ({ icon: Icon, label, isActive, onClick, disabled }) => (
  <button
    className={`flex items-center space-x-4 p-3 rounded-lg ${
      isActive ? 'text-black font-bold bg-gray-100' : 'text-gray-600 hover:bg-gray-200'
    } transition duration-200 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={disabled ? null : onClick}
    disabled={disabled}
  >
    <Icon className={`text-4xl ${isActive ? 'text-black' : 'text-gray-600'} transition duration-200 ease-in-out`} />
    <span className={`text-xl ${isActive ? 'text-black font-bold' : 'text-gray-600'} transition duration-200 ease-in-out`}>{label}</span>
  </button>
);

function Features() {
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (buttonName, action) => {
    setActiveButton(buttonName);
    action && action();
  };

  const getFilteredReels = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/reels/filtered-reels/", {
        params: { place: "Dubai" },
      });
      dispatch(setFeed(resp.data.reels));
      setActiveButton('ExploreX');
    } catch (error) {
      console.error("Error fetching filtered reels:", error);
    }
  };

  const getReels = () => {
    dispatch(setFeedReel(false));
    navigate("/app/reels");
  };

  const getFeeds = () => {
    dispatch(setFeedReel(true));
    navigate("/app");
  };

  const logout=async()=>{
    axios
    .post("http://localhost:8000/auth/logout")
    .then((res) => {
      dispatch(logout())
      navigate("/login")
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="flex flex-col place-self-start space-y-4 text-lg mt-10">
      <FeaturesButton
        icon={FeedIcon}
        label="Feed"
        isActive={activeButton === 'Feed'}
        onClick={() => handleButtonClick('Feed', getFeeds)}
      />
      <FeaturesButton
        icon={AddCircleOutlineIcon}
        label="Create"
        isActive={activeButton === 'Create'}
        onClick={() => handleButtonClick('Create', () => {
          setShowModal(true);
          dispatch(openSlice(false));
        })}
      />
      <FeaturesButton
        icon={ChatIcon}
        label="Chats"
        isActive={activeButton === 'Chats'}
        onClick={() => handleButtonClick('Chats')}
        disabled={true}  // Disable this button
      />
      <FeaturesButton
        icon={SearchIcon}
        label="Search"
        isActive={activeButton === 'Search'}
        onClick={() => handleButtonClick('Search')}
        disabled={true}  // Disable this button
      />
      <FeaturesButton
        icon={TravelExploreIcon}
        label="ExploreX"
        isActive={activeButton === 'ExploreX'}
        onClick={getFilteredReels}
        disabled={true}  // Disable this button
      />
      <FeaturesButton
        icon={VideoLibraryIcon}
        label="Shorts"
        isActive={activeButton === 'Shorts'}
        onClick={() => handleButtonClick('Shorts', getReels)}
      />
      <FeaturesButton
        icon={AlternateEmailIcon}
        label="Mentions"
        isActive={activeButton === 'Mentions'}
        onClick={() => handleButtonClick('Mentions')}
        disabled={true}  // Disable this button
      />

      <FeaturesButton
        icon={AlternateEmailIcon}
        label="Logout"
        isActive={activeButton === 'Logout'}
        onClick={() => handleButtonClick('Logout', logout)}
      />
      

      {showModal && <PopUpCreateClose onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Features;
