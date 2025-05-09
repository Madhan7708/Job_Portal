import { useState, useEffect } from 'react'
import { DualRangeSlider } from './DualSlider';
import { IoTrashBin } from "react-icons/io5";

import { CreateModal } from './CreateModal';
import { FaPersonCirclePlus } from "react-icons/fa6";

import { FaSearchengin } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdAddHomeWork } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";

import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { Navbar } from './Navbar';
import axios from 'axios'

function App() {
  const [mod, setMod] = useState(0);
//Home, Find Jobs, Find Talents, About us, Testimonials
const [locs, setLocs] = useState([]);
const [types, setTypes] = useState([]);
const [jobs, setJobs] = useState([]);
const [msg, setMsg] = useState("");
const [trigger, setTrigger] = useState(false);

  async function handleDelete(e, id) {
    e.preventDefault();
  
    const isConfirmed = window.confirm("Are you sure you want to delete this job post?");
    if (!isConfirmed) return;
  
    try {
      const res = await axios.delete(`http://localhost:3001/jobs/${id}`);
      setJobs(preJobs => preJobs.filter(job => job._id !== id));
      setMsg("✅ Job Post Deleted Successfully!");
      setTrigger(!trigger);
      setTimeout(() => {
        setMsg(null);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }
  

useEffect(() => {
  async function fetch_loc_type() {
    try {
      const res1 = await axios.get("http://localhost:3001/jobs/loc_type");
      const res2 = await axios.get("http://localhost:3001/jobs");

      setLocs(res1.data.locations.cities);
      setTypes(res1.data.job_type.types);

      console.log(res1);
      console.log(res2);

      const jobsWithFormattedDate = res2.data.jobs.map((job) => {
        const isoDate = new Date(job.createdAt);
        const formatted = `${isoDate.toLocaleDateString()} ${isoDate.getHours()}:00`;
        return {
          ...job,
          createdAt: formatted
        };
      });

      setJobs(jobsWithFormattedDate);

    } catch (error) {
      console.log(error);
    }
  }
  fetch_loc_type();
}, [trigger]);

return (
    <>  
    {mod==1? <CreateModal mod={setMod} locs={locs} types={types} trig={trigger} setTrig={setTrigger}/>: null}  
     <div className='fixed w-screen h-screen bg-purple-100 flex flex-col px-2 '>
        <Navbar mod={setMod}/>
        <div className='bg-white shadow-lg text-purple-900 px-3 py-3 w-full flex gap-10 justify-evenly border border-blue-200 px-10'>
          <div> <FaSearchengin className='inline-block' /> <input placeholder=" Search By Job Title, Role" /></div>
          <div> <IoLocation className='inline-block' /> Preferred Location   
          <select className="border border-pink-800/20 text-l px-2 text-purple-900 font-semibold" type="text" placeholder="Choose Preferred Location">
                        {
                            locs.map((l,ind)=>(
                              <option key={ind}>{l}</option>
                            ))
                        }
                    </select></div>
          <div> <MdAddHomeWork className='inline-block' /> Job Type
          <select className="border border-pink-800/20 text-l px-2 text-purple-900 font-semibold" type="text" placeholder="Choose Preferred Location">
                        {
                            types.map((t,ind)=>(
                              <option key={ind}>{t}</option>
                            ))
                        }
                    </select>
          </div>
          <div> <FaMoneyCheckAlt className='inline-block' /> 
        <label> Salary per Month</label>  
          <DualRangeSlider/>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-x-5 gap-y-5 my-2">
         {msg? <div className='text-green-900 bg-green-200 p-4'>{msg}</div> : null}
        {jobs.map((job, ind)=>(

        <div key={ind} className="relative aspect-square bg-blue-200 p-3 rounded my-2 flex flex-col justify-evenly text-lg ml-2 h-70">
        <div className=' flex justify-left w-fit p-2 bg-purple-900 text-white shadow-lg rounded'>{job.company}</div>
        <label className='absolute top-2 right-28 text-[12px] inline-block'>Posted on: </label>
          <p className='absolute mt-2 w-[100px] h-5 top-0 right-1 bg-purple-100 rounded text-[12px]'>{job.createdAt}</p>
          <label className='absolute top-8 right-28 text-[12px] inline-block'>Deadline: </label>
          <p className='absolute mt-2 w-[70px] h-5 top-6 right-1 bg-purple-100 rounded text-[12px]'>{job.deadline}</p>
          
          <h3 className='text-[16px]'>Role: {job.job_title}</h3>
          <div className='flex justify-between text-[15px] text-blue-900'>
            <h4><FaPersonCirclePlus className='inline-block mr-1' />{job.job_type}</h4> <h4><MdAddHomeWork className='inline-block mr-1'/> {job.location} </h4> <h4><RiMoneyDollarBoxFill className='inline-block mr-1' /> {job.salary.max/100000+" "}Lpa</h4>
          </div>
          <ul className='list-disc list-inside text-[14px]'>
          <li>{job.description}</li>
          </ul>
          <div className='flex flex-between'>
          <button className='inline-block w-[150px] py-1 mt-5 bg-green-300 border border-green-900 rounded hover:bg-green-500 hover:text-white'>Apply</button>
          <button className="border border-red-700 bg-red-100 rounded-lg ml-12 mt-5 inline px-4 py-2 border border-gray-300 text-red-600 cursor-pointer hover:bg-red-200"
                  onClick={(e) => handleDelete(e, job._id)}
                >
                  <IoTrashBin className="inline-block hover:text-red-800 hover:scale-110 transition" size={22} />
                </button>
                </div>
        </div>
      
      ))}
       
      {/*Ends here*/}
        </div>
        
    </div>
    </>
  )


}

export default App
