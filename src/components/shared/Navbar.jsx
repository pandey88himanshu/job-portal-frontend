import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, SunMoon, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../components/utils/constant.js";
import axios from "axios";
import { setUser } from "../../redux/authSlice.js";
import { toast } from "sonner";
import { setDarkMode } from "../../redux/darkModeSlice.js";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const HandleDarkMode = () => {
    dispatch(setDarkMode());
  };
  const mode = useSelector((state) => state.darkMode.darkMode);
  console.log(mode);
  return (
    <div className='bg-white dark:bg-[#222831] dark:text-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>
            Job
            <span className='text-[#6A38C2] dark:text-[#FFD369]'>Portal</span>
          </h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to='/admin/companies'>Companies</Link>
                </li>
                <li>
                  <Link to='/admin/jobs'>Jobs</Link>
                </li>
                <li>
                  {mode ? (
                    <Moon onClick={HandleDarkMode} />
                  ) : (
                    <SunMoon onClick={HandleDarkMode} />
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/jobs'>Jobs</Link>
                </li>
                <li>
                  <Link to='/browse'>Browse</Link>
                </li>
                <li>
                  {mode ? (
                    <Moon onClick={HandleDarkMode} />
                  ) : (
                    <SunMoon onClick={HandleDarkMode} />
                  )}
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to='/login'>
                <Button variant='outline' className=''>
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='bg-[#6A38C2] hover:bg-[#5b30a6] dark:bg-[#FFD369]'>
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt='@shadcn'
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-80 dark:bg-[#393E46]'>
                <div className=''>
                  <div className='flex gap-2 space-y-2'>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt='@shadcn'
                      />
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-muted-foreground'>
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col my-2 text-gray-600'>
                    {user && user.role === "student" && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant='link'>
                          {" "}
                          <Link to='/profile'>View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant='link'>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
