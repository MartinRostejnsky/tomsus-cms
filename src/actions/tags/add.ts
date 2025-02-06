"use server";

import authOptions from '@/app/utils/auth.options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface AddCreateParams {
    tag: number;
    post: number;
}

const add = async (params: AddCreateParams) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('You must be logged in to perform this action');
    }
    
    await prisma.tag.update({
        where: { id: params.tag },
        data: {
            posts: {
                connect: { id: params.post }
            }
        }
    });
};

export default add;