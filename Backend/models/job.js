import mongoose from 'mongoose'

 const locations = {
    "cities": 
    ["Mumbai","Delhi","Bengaluru","Hyderabad","Ahmedabad","Chennai","Kolkata","Pune","Jaipur","Lucknow"]
  }
  const job_type = {
    "types" :
     ["Internship", "Full Time","Partime","Contract"]
  }

  

const jobSchema = new mongoose.Schema({
    job_title:{
        type: String,
        required: true
    },
    company:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    job_type:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    deadline:{
        type:String,
        required:true,
    },
    salary:{
        min :{type: Number, required:true},
        max:{type:Number,required:true}
    },
    },{timestamps:true});

const Job = mongoose.model('Job', jobSchema);

//ROUTE FUNCTIONS

async function deleteJOB(id){
    const job = await Job.findByIdAndDelete(id)
    return job;
}

async function createJOB(job){
    const jobin = await Job.create(
        job
    )
    console.log("backend: ",jobin);
    return jobin;
}

async function getAllJOBS(){
    try {
      const jobs = await Job.find({}).sort({ _id: -1 });
      return {jobs}
    }
    catch(error){
        console.error(error);
    }
}

async function getSalRangeJOB(min,max){
    const job = await Job.findByIdAndDelete(id)
    return job;
}

export {
    deleteJOB,
    createJOB,
    getAllJOBS,
    getSalRangeJOB,
    locations,
    job_type
  };
  

