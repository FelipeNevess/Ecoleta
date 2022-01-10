import { Request, Response } from "express";
import { connection } from "../database/connection";

class ServicePoints {
  async indexPoints(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parcedItem = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parcedItem)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } =req.params;

    const point = await connection('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({
        message: 'collection point not found'
      });
    }

    const items = await connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('title');

    return res.json({ point, items });
  }

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
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertIds = await trx('points').insert(point);

    const point_id = insertIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    });

    await trx('point_items').insert(pointItems);

    trx.commit();
  
    return res.status(201).json({ id: point_id, ...point});
  }
}

export { ServicePoints }
