import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFeed } from "../redux/feedSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

function useGetPosts() {
  const dispatch = useDispatch();

  // Define the fetchPosts function inside the hook
  const fetchPosts = useCallback(async () => {
    try {
      const posts = await axios.get("http://localhost:8000/posts/get-posts");
      dispatch(setFeed(posts.data.posts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [dispatch]);

  // Use useEffect to fetch posts on initial load
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Return the fetchPosts function so it can be called manually
  return fetchPosts;
}

export default useGetPosts;
