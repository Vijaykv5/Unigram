import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const TrendingPage = () => {
    const channel = useParams().channel;
    const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Define a function to fetch posts based on keywords
    const fetchPosts = async () => {
      try {
        // Make an API call to your backend to fetch posts with keywords matching the channel
        const response = await fetch(
          `http://localhost:3002/posts/${channel}`
        );
        // Assuming your API returns an array of posts, update the state with the fetched posts
       const data = await response.json();
        setPosts(data);
        console.log("Posts:", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Call the fetchPosts function
    fetchPosts();
  }, [channel]); // Fetch p
  
  return <div>{channel}</div>;
}

export default TrendingPage