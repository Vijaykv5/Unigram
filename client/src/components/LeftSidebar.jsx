import React from 'react'
import Tech from './channels/Tech';
import Channel from './channels/Channel';

const LeftSidebar = () => {
  return (
    <div className="bg-green-300 fixed">
      <div className="  w-60 bg-[#7BB7E3]  text-white text-xl flex justify-center">
        <div className="p-2 items-center">Technology</div>
      </div>

      <div className="mt-2">
        <Channel />
      </div>
    </div>
  );
}

export default LeftSidebar