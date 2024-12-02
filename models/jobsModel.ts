import { PrismaClient, Jobs as PrismaJobs } from "@prisma/client";
const prisma = new PrismaClient();

export interface JobSchema { 
    job_title: string, 
    job_company: string, 
    job_location: string, 
    job_description: string, 
    job_posting_date: Date, 
    job_posting_url: string, 
    job_salary: number
}

export default class Job{ 

    public async createJob(job_obj: JobSchema):Promise<PrismaJobs | null> { 
        
        const job = await prisma.jobs.create({ 
            data: { 
                job_title: job_obj.job_title, 
                job_company: job_obj.job_company, 
                job_location: job_obj.job_location, 
                job_description: job_obj.job_description, 
                job_posting_date: job_obj.job_posting_date ?  new Date(job_obj.job_posting_date).toISOString() : null, 
                job_posting_url: job_obj.job_posting_url, 
                job_salary: job_obj.job_salary
            }
        })

        return job; 

    }

    public async deleteJob(job_id: number) { 
        const deletedJob = await prisma.jobs.delete({ 
            where: { 
                job_ID: job_id 
            }
        })

        return deletedJob
    }

    public async editJob(job_id: number, job_obj: JobSchema) { 
        const updatedJob = await prisma.jobs.update({ 
            where: { 
                job_ID: job_id
                
            }, 
            data: { 
                job_title: job_obj.job_title, 
                job_company: job_obj.job_company, 
                job_location: job_obj.job_location, 
                job_description: job_obj.job_description, 
                job_posting_date: job_obj.job_posting_date, 
                job_posting_url: job_obj.job_posting_url, 
                job_salary: job_obj.job_salary
            }
        })
        return updatedJob;
    }

    public async getFilteredJobs(filter: string, searchTerm: string ){ 
        const whereClause: any = {};
  
        // Dynamically add the filter condition to the where clause
        if (filter && searchTerm) {
            whereClause[filter] = {
            contains: searchTerm, // You can change this to match your specific condition like 'equals', 'startsWith', etc.
            mode: 'insensitive', // Optional: case insensitive search
            };
        }

        // Query the database using the dynamic where clause
        const getJob = await prisma.jobs.findMany({
            where: whereClause,
        });

        return getJob;

    }

 
    

}

