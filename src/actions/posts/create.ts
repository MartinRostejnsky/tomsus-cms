import authOptions from '@/app/utils/auth.options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface PostCreateParams {
    post: {
        title: string;
        content: string;
    }
}

const create = async (params: PostCreateParams) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('You must be logged in to perform this action');
    }

    const { post } = params;
    
    prisma.post.create({
        data: {
            title: post.title,
            content: post.content,
            author: {
                connect: {
                    id: Number(session.id)
                }
            },
            published: new Date()
            
        }
    })
    
    
};

export default create;