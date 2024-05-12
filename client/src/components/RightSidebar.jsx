import React, { useState, useEffect } from "react";
import Trending from "./trending/Trending";
import { useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const navigateTo = useNavigate();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  useEffect(() => {
    const fetchPostsAndExtractKeywords = async () => {
      try {
        const response = await fetch("http://localhost:3002/home");
        const posts = await response.json();

        let allKeywords = [];

        // Collect all keywords from posts
        posts.forEach((post) => {
          allKeywords = allKeywords.concat(post.keyword);
        });

        // Count frequency of each keyword
        const keywordCounts = {};
        allKeywords.forEach((keyword) => {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });

        // Sort keywords by frequency
        const sortedKeywords = Object.keys(keywordCounts).sort(
          (a, b) => keywordCounts[b] - keywordCounts[a]
        );

        // Take the top 5 keywords
        const topKeywords = sortedKeywords.slice(0, 5);
        console.log("Top keywords:", topKeywords);

        // Set channels state with the top keywords
        setChannels(topKeywords);
        setSelectedChannel(topKeywords[0]); // Select the first channel by default

        // If the channels have equal number of keywords, sort them by the number of likes
        const equalChannels = topKeywords.filter(
          (keyword) => keywordCounts[keyword] === keywordCounts[topKeywords[0]]
        );
        if (equalChannels.length > 1) {
          equalChannels.sort((a, b) => {
            const likesA = posts
              .filter((post) => post.keyword.includes(a))
              .reduce((totalLikes, post) => totalLikes + post.likes, 0);
            const likesB = posts
              .filter((post) => post.keyword.includes(b))
              .reduce((totalLikes, post) => totalLikes + post.likes, 0);
            return likesB - likesA;
          });

          // Reorder topKeywords array based on sorted equalChannels
          equalChannels.forEach((channel, index) => {
            topKeywords[index] = channel;
          });

          // Update channels state with reordered topKeywords
          setChannels([...topKeywords]);
          setSelectedChannel(topKeywords[0]); // Select the first channel by default
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };


    fetchPostsAndExtractKeywords();
  }, []);

  const sendChannelToBackend = (channel) => {
    fetch("http://localhost:3002/selected-channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel: channel }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        navigateTo(`/${channel.replace("#", "")}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    sendChannelToBackend(channel);
  };

  return (
    <div className="fixed">
      <div className="bg-[#7BB7E3] w-56 text-white text-xl flex justify-center">
        <div className="p-2 font-Platypi font-semibold items-center">
          Trending Topics
        </div>
      </div>
      <div className="mt-2">
        <div>
          <Trending
            channels={channels}
            selectedChannel={selectedChannel}
            onChannelSelect={handleChannelSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
