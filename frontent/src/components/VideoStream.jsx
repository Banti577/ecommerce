import React from "react";

const VideoStream = () => {
  return (
    <div className="flex p-2">
      {/* Video Player Section */}
      <div className="w-[70%]">
        <div>
          <video controls>
  <source src="http://localhost:3000/video" type="video/mp4" />
</video>
        </div>
        <h2 className="text-2xl mt-2">Video Streaming in Node.js</h2>
      </div>

      <div className="w-[30%] border mx-5 p-2">
        Cart / Playlist
      </div>
    </div>
  );
};

export default VideoStream;