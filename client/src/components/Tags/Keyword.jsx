import React, { useState } from "react";

const useTagInput = (maxTags = 5) => {
  const [tags, setTags] = useState([]);

  const handleAddTag = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return { tags, handleAddTag, handleRemoveTag };
};

const TagField = ({ tags, addTag, removeTag, maxTags }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col w-[300px] md:w-[600px]">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Mention up to 5 tags (max. 12 characters)"
            : `You can only enter max. of ${maxTags} tags`
        }
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {tags.map((tag, index) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export { TagField, useTagInput };
