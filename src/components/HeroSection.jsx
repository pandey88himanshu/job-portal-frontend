import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-[#6A38C2] dark:bg-[#FFD369] text-white dark:text-[#222831] font-medium'>
          No. 1 Job Hunt Website
        </span>
        <h1 className='text-5xl font-bold dark:text-white'>
          Search, Apply & <br /> Get Your{" "}
          <span className='text-[#6A38C2] dark:text-[#FFD369]'>Dream Jobs</span>
        </h1>
        <p className='dark:text-white'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type='text'
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full dark:bg-[#222831]'
          />
          <Button
            onClick={searchJobHandler}
            className='rounded-r-full bg-[#6A38C2] dark:bg-[#FFD369]'>
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
