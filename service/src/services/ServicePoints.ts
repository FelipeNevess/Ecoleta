import { Request, Response } from "express";
import { connection } from "../database/connection";

class ServicePoints {
  async createPoint(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;

    const trx = await connection.transaction();

    const point = {
      image: 'fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertIds = await trx('points').insert(point);

    const point_id = insertIds[0]

    const pointItems = items.map((item_id: number) => {
      return {
        point_id,
        item_id,
      }
    });

    trx('poin_items').insert(pointItems);

    trx.commit();
  
    return res.status(201).json({ point_id, ...point});
  }

  async show(req: Request, res: Response) {
    const { id } =req.params;

    const point = await connection('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({
        message: 'collection point not found'
      });
    }

    return res.status(200).json(point);
  }
}

export { ServicePoints }
