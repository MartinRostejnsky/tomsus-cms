"use server";

import authOptions from '@/app/utils/auth.options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface TagCreateParams {
    name: string;
}

const create = async (params: TagCreateParams) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('You must be logged in to perform this action');
    }
    
    const result = await prisma.tag.create({
        data: {
            name: params.name,
        }
    })
    
    return result.id;
};

export default create;