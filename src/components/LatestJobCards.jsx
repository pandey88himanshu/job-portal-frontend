import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer dark:bg-[#393E46] dark:shadow-[#8FD6E1] dark:shadow-lg dark:text-white'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-200'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {job?.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4 '>
        <Badge
          className={
            "text-blue-700 font-bold dark:bg-[#222831] dark:text-[#3DC2EC]"
          }
          variant='ghost'>
          {job?.position} Positions
        </Badge>
        <Badge
          className={
            "text-[#F83002] font-bold dark:bg-[#222831] dark:text-[#E80F88]"
          }
          variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge
          className={
            "text-[#7209b7] font-bold dark:bg-[#222831] dark:text-[#9290C3]"
          }
          variant='ghost'>
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
