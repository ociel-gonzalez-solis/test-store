import { IOrder } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
    
        default:
            res.status(400).json({ message: 'Bad Requested' })
    }
    
}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder;
    // console.log({req});

    //! Verificar que tengamos un usuario
    const session: any = await getServerSession(req, res, authOptions);
    // const session: any = await getSession({req});

    return res.status(200).json(session);
}
