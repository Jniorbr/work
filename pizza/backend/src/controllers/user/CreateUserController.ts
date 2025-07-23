import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){
        const { name, email, password } = req.body

        const createUserService = new CreateUserService();

        // require name, email and password
        const user = await createUserService.execute({
            name, 
            email,
            password
        });

        res.json(user)
        return;
    }
}

export { CreateUserController }