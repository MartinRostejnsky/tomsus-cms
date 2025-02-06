"use server";

import authOptions from '@/app/utils/auth.options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface PostRemoveParams {
    post: number;
}

const remove = async (params: PostRemoveParams) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('You must be logged in to perform this action');
    }

    const { post } = params;
    
    await prisma.post.deleteMany({
        where: {
            id: post,
            authorId: Number(session.user.id)
        }
    })
};

export default remove;