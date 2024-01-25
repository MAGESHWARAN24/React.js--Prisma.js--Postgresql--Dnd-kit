"use server";

import { currentUser } from "@clerk/nextjs";
import prisma  from "@/lib/Prisma"
class UserNotFoundErr extends Error{}
 
export async function GetFormStats() {
    const user = await currentUser();
    if(!user) {
        throw new UserNotFoundErr();
    }

    const stats = await prisma.form.aggregate({
        where:{
            userId : user.id,
        },
        _sum:{
            visits: true,
            subnissions :true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.subnissions || 0;
    let submissionsRate = 0;
    if(visits >0){
        submissionsRate = (submissions / visits) *100;
    }
    const bounceRate = 100-submissionsRate;

    return{
        visits,submissions,submissionsRate,bounceRate
    }
}