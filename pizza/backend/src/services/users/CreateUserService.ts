import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
    async execute({name, email, password}: UserRequest){
        
        // email prenchido ?
        if (!email) {
            throw new Error("Email missing")
        }
        // email já cadastrado ?
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
        }
    })
    // email já cadastrado ?
        if (userAlreadyExists) {
            throw new Error("User already exists")
        } 
        // criptografando a senha
        const passwordHash = await hash(password, 8)
        
        // criando o usuário
        // o select é para não retornar a senha do usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user
    }
}

export { CreateUserService }