import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){

        const category_id = req.query.category_id as string;

        const listByCategory = new ListByCategoryService();

        const products = await listByCategory.execute({
            category_id
        });

        res.json(products);
        return;
    }

}

export { ListByCategoryController }