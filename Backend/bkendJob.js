import express from 'express'
import cors from 'cors'
import dotenv from'dotenv'
import './db/mongo.js'
import router from './routes/job.js'

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
app.use('/jobs', router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})
