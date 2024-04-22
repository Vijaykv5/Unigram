import React from "react";

const Channel = () => {
  const sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
  ];

  return (
    <div className="join join-vertical w-full">
      {sections.map((section, index) => (
        <div
          key={index}
          className="collapse collapse-arrow join-item border border-base-300"
        >
          <input
            type="radio"
            name={`my-accordion-${index + 1}`}
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-xl font-medium">{section}</div>
          <div className="collapse-content">
            {/* Render 6 elements inside each section */}
            {[1, 2, 3, 4, 5, 6].map((element, subIndex) => (
              <p key={subIndex}>Element {element}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Channel;
