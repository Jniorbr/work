import { Request, Response } from "express";
import { AuthUserService } from '../../services/users/AuthUserService';

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            email,
            password
        });

        res.json(auth);
        return;
    }
}

export { AuthUserController };