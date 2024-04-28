import React from 'react'
import Tech from './channels/Tech';


const LeftSidebar = () => {
  return (
    <div className="fixed">
      <div className="   bg-[#7BB7E3]  text-white text-xl flex justify-center">
        <div className="p-2 font-Platypi font-semibold items-center">
          Channels
        </div>
      </div>
      <div className="mt-2">
        <Tech />
        hi
      </div>
    </div>
  );
}

export default LeftSidebar