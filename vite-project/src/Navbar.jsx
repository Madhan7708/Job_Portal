import { MdWork } from "react-icons/md";

export function Navbar({mod}){
    return (
         <div className='relative flex justify-center my-3'>
            <div className='flex items-center gap-5 bg-blue-200 rounded-3xl px-6 py-4'>
              <MdWork className='text-3xl text-blue-900' />
              <div className='flex gap-5 text-blue-900 font-medium'>
                <h3>Home</h3>
                <h3>Find Jobs</h3>
                <h3>Find Talents</h3>
                <h3>About Us</h3>
                <h3>Testimonials</h3>
                <button onClick={()=>mod(1)} className='bg-green-900 rounded-3xl px-3 py-1 text-white font-semibold hover:bg-green-700'>
                  Create Jobs
                </button>
              </div>
            </div>
          </div>
    )
}