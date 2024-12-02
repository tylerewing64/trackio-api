import { Request, Response } from 'express';
import Job from '../models/jobsModel'; 
import Application from '../models/applicationModel'; 

const job = new Job(); 
const application = new Application();

export const createApplicationController = async (req: Request, res: Response): Promise<void> => {
  const { job_obj, application_obj  } = req.body; 
  console.log(req.body)
   
  try {
    const newJob:any = await job.createJob(job_obj); 
    let application_obj_w_job_id = { 
        ...application_obj,
       "job_ID": newJob.job_ID
    }
    await application.createApplication(application_obj_w_job_id);

    // Send response back once the job and application are created
    res.status(200).json({ message: "Successfully Created Application" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error: Could not create application\n` });
  }
};


export const deleteApplicationControllers = async(req: Request, res: Response): Promise<void> => { 
  const {application_id, job_id} = req.body; 

  try{ 
    await job.deleteJob(job_id); 
    await application.deleteApplication(application_id);
    res.status(200).json({'Message': "Succesfully deleted the application"})
  }catch(error){ 
    console.error(error); 
    res.status(500).json({ 'Message': "Error deleting the application"})
  }

}

export const editApplicationControllers = async(req: Request, res: Response): Promise<void> => { 
  const {job_obj, job_id} = req.body; 
  try{ 
    await job.editJob(job_id, job_obj); 
    res.status(200).json({'Message': 'Succesfully edited application'});

  }catch(error){ 
    console.error(error); 
    res.status(500).json({'Mesage': "Error editing application"});

  }

}

export const filteredSearchControllers = async(req: Request, res: Response):Promise<void> =>  { 
    
    const { user_id, search_term, filter}= req.query; 
   

    try{ 
      const userId = user_id as any;
        const searchTerm = search_term as any;
        const filterField = filter as  any;

        if (!userId) {
          res.status(400).json({ message: "User ID is required and must be a number." });
        
      }

      const response = await application.getApplications(filterField, searchTerm, Number(userId) );
      res.status(200).json(response);
    
    }catch(error){ 
      console.error(error); 
      res.status(500).json({"Message": "Error getting applications"})
    }

}

export const getApplicationsByUserIDController = async(req: Request, res: Response):Promise<void> => { 
    const {user_id} = req.query;

    try{ 
      const user_id_ts: any = user_id;
      const response = await application.getAllApplicationsByUserID(Number(user_id_ts));
      console.log(response)
      res.status(200).json(response); 
    }catch(error){ 
      console.error(error); 
      res.status(500).json({"Message" : "Error getting applications by user id!"});
    }
}