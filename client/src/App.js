import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Features from "./Components/Features";
import Feeds from "./Components/Feeds";
import SlideSearch from "./Components/SlideSearch";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "./redux/userSlice";
import { API } from "./utils/constants";
axios.defaults.withCredentials = true;

let firstRender = true;

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user.user);
    const feedOrReel = useSelector((store) => store.feedReel.feedReel);

    const sendRequest = async () => {
        const resp = await axios.get(API+"user").catch((err) =>
            console.log(err)
        );

        const data = resp.data;
        return data;
    };

    const refreshToken = async () => {
        const resp = await axios.get(API+"auth/refresh").catch((err) =>
            console.log(err)
        );

        const data = resp.data;
        return data;
    };

    useEffect(() => {
        if (firstRender) {
            firstRender = false;
            sendRequest()
                .then((data) => {
                    dispatch(setUser(data));
                })
                .catch((err) => {
                    dispatch(setUser(null));
                    navigate("/login"); // Navigate to login on error
                });
        }

        let interval = setInterval(() => {
            refreshToken()
                .then((data) => {
                    dispatch(setUser(data));
                })
                .catch((err) => {
                    dispatch(setUser(null));
                    navigate("/login"); // Navigate to login on error
                });
        }, 1000 * 29);
        return () => clearInterval(interval);
    }, []);

    if (user === null) return <h1>Loading..</h1>;

    return (
        <div>
            {user && (<div className="flex h-screen">
                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-screen flex flex-col items-start p-4 space-y-6 w-72 bg-white shadow-lg">
                    {/* Profile and Greeting Section */}
                    <div className="flex flex-col items-start space-y-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.profilePic}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-lg"
                            />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    Hi, {user.username}!
                                </h1>
                                <h1 className="text-4xl mt-2 text-blue-600 font-bold">
                                    TravelSaga
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-6 pl-14">
                        <Features />
                    </div>
                </div>

                {/* Main Content (Feeds or Shorts) */}
                <div className="flex-1 ml-72 overflow-y-auto no-scrollbar h-screen">
                    {feedOrReel ? <Feeds /> : <Outlet />}
                </div>

                {/* Slide Search Section */}
                <div className="flex-none w-64">
                    <SlideSearch />
                </div>
            </div>)}
        </div>
    );
}

export default App;











