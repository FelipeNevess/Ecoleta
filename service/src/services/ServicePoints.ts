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

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `https://ecoletan.herokuapp.com/uploads/${ point.image }`,
      }
    });

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } =req.params;

    const point = await connection('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({
        message: 'collection point not found'
      });
    }

    const serializedPoints = {
      ...point,
      image_url: `https://ecoletan.herokuapp.com/uploads/${ point.image }`,
    };

    const items = await connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('title');

    return res.json({ point: serializedPoints, items });
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
      image: req.file?.filename,
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

    const pointItems = items
      .split('')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
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
