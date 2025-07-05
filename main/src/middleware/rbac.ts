import { Request, Response, NextFunction } from "express";

function RBACMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: Implement real RBAC logic
  next();
}

export { RBACMiddleware };
