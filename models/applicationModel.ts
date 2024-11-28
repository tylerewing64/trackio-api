import { PrismaClient, Applications as PrismaApplications } from "@prisma/client";
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

    public async getApplication(){ 

    }

}
