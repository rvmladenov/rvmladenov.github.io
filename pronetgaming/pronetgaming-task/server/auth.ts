import { Request, Response } from 'express';
import { USERS } from './dummy-data';

export function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = authenticate(email, password);

  if (user) {
    res.status(200).json({ id: user.id, email: user.email });
  } else {
    res.sendStatus(403);
  }
}

function authenticate(email: string, password: string) {
  const user: any = Object.values(USERS).find((user) => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }
}
