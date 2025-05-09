import express from 'express'
import {deleteJOB,createJOB,getAllJOBS,getSalRangeJOB, job_type, locations} from '../models/job.js'
const router = express.Router()

router.get('/loc_type', async(req,res)=>{
  const loc_type = {
   job_type,
   locations
  }
  res.status(200).send(loc_type);
});

router.post('/', async(req,res)=>{
    try{
    console.log(req.body)
    const job = req.body
    console.log(job);
    const saved_job = await createJOB(job)
    console.log(saved_job)
    res.status(201).send(saved_job)
    }
    catch(error){
        console.error(error);
        res.status(500).send({ error: 'Failed to create Job' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const delId = req.params.id;  // ✅ Correct way to access :id
      const deletedJob = await deleteJOB(delId); // ✅ Passing raw string id
      console.log(deletedJob);
      res.status(200).send({ message: 'Job deleted successfully'});
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).send({ error: 'Failed to delete Job' });
    }
  });

router.get('/', async (req, res) => {
        try {
            const saved = await getAllJOBS();
            console.log("reached : "+saved);
            res.status(200).send(saved);
        }catch(error){
            res.status(500).send("Could not get jobs")
        }})
//   router.get('/allTodos', async (req, res) => {
//     try {
//         console.log("reached");
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 5;
//       const skip = (page - 1) * limit;
//       const { todos, total } = await getAllTODO(limit,skip);
//       const pgTot = Math.ceil(total / limit);
//       res.json({
//         total: pgTot,
//         todos: todos
//       });
//     } catch (err) {
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });

export default router;