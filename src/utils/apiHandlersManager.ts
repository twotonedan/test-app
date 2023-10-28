import { NextApiRequest, NextApiResponse } from 'next';

type Verbs = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ApiHandlers = {
  [k in Verbs]?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export const apiHandlersManager = (handlers: ApiHandlers) => async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as Verbs;

  try {
    if (!method) throw new Error('Method not found');
    if (!handlers[method]) throw new Error('Method not allowed');

    await handlers[method]?.(req, res);
  } catch (e) {
    const err = e as Error;

    console.log(err); // eslint-disable-line no-console
    res.status(500).json({ message: err.message });
  }
};
