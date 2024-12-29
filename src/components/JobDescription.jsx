import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../components/utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className='w-full h-screen mx-auto  dark:bg-[#393E46] dark:text-white'>
      <div className='flex items-center justify-between py-10 px-20'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge
              className={
                "text-blue-700 font-bold dark:bg-[#222831] dark:text-[#3DC2EC]"
              }
              variant='ghost'>
              {singleJob?.postion} Positions
            </Badge>
            <Badge
              className={
                "text-[#F83002] font-bold dark:bg-[#222831] dark:text-[#E80F88]"
              }
              variant='ghost'>
              {singleJob?.jobType}
            </Badge>
            <Badge
              className={
                "text-[#7209b7] font-bold dark:bg-[#222831] dark:text-[#9290C3]"
              }
              variant='ghost'>
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed dark:bg-gray-300"
              : "bg-[#7209b7] hover:bg-[#5f32ad] dark:bg-[#77ABB7] dark:text-gray-900"
          }`}>
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4 px-20'>
        Job Description
      </h1>
      <div className='my-4 px-20 '>
        <h1 className='font-bold my-1'>
          Role:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.title}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Location:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.location}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Description:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.description}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Experience:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Salary:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Total Applicants:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Posted Date:{" "}
          <span className='pl-4 font-normal text-gray-800 dark:text-gray-400'>
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
