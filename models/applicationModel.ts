import { PrismaClient, Applications as PrismaApplications } from "@prisma/client";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";
const prisma = new PrismaClient();

interface ApplicationSchema{ 
    user_ID: number, 
    job_ID: number, 
    status: string
}


export default class Application{ 

    public async createApplication(application_obj: ApplicationSchema ): Promise<PrismaApplications | null>{ 
        const application = await prisma.applications.create({ 
            data: { 
                user_ID: application_obj.user_ID, 
                job_ID: application_obj.job_ID, 
                status: 'Applied'
            } 
        })
        return application; 

    }

    public async deleteApplication(application_id: number) {
        const deletedApplication = await prisma.applications.delete({ 
            where: { 
                application_ID: application_id
            }
        }) 
        return deletedApplication; 

    }

    public async editApplication(application_id: number, application_obj: ApplicationSchema) { 
        const updatedApplication = await prisma.applications.update({ 
            where: { 
                application_ID: application_id
            }, 
            data: { 
                 
                    status: application_obj.status
                 

            }
        })
    }

    public async getApplications(filter: string, searchTerm: string, user_id: number){ 

        const whereClause: any = {
            user_ID:user_id
        };
  
        if (filter && searchTerm) {
            whereClause.job = {
                [filter]: {
                    contains: searchTerm
                   
                },
            };
        }

        const getFiteredApplications = await prisma.applications.findMany({ 
           where : whereClause, 
           include:{ 
            job:true
           }
           
        })
        return getFiteredApplications;
            
    }

    public async getAllApplicationsByUserID(user_id: number){ 
        const getAllApplicationsByUserID = await prisma.applications.findMany({ 
            where: { 
                user_ID: user_id
            }, 
            include: { 
                job:true
            }
        })

        return getAllApplicationsByUserID;
    }



}
