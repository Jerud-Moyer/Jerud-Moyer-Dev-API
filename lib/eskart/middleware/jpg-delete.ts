import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../utils/cloudinary-config';
import Artwork from '../models/Artwork';

export default (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as unknown as { images: Artwork[] };
  const publicIds: string[] = body.images.map((item: Artwork) => (
    `eileen-kane/${item.slug}`
  ));

  if (publicIds.length) {
    cloudinary.api.delete_resources(publicIds, (error: string, result: string) => {
      console.log('jpeg-delete => ', error, result);
      (req as any).cloudResponse = { error, result };
      next();  
    });
  } else {
    next();
  }
};
