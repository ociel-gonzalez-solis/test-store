import { StatusCodes } from 'http-status-codes'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(StatusCodes.BAD_REQUEST).json({ name: 'Debe de especificar query para la busqueda' })
}