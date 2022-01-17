import { Request, Response } from "express";
import { connection } from '../database/connection';

class ServiceItems {
  async index(_req: Request, res: Response) {
    const items = await connection('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `https://ecoletan.herokuapp.com/uploads/${ item.image }`,
      }
    });

    return res.status(200).json(serializedItems);
  }
}

export { ServiceItems }
