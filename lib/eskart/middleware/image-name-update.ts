import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../utils/cloudinary-config';

export default (req: Request, res: Response, next: NextFunction) => {
  const { image } = req.body.data;
  const oldPublicId = image.old_slug;
  const newPublicId = image.slug;

  if(oldPublicId !== newPublicId) {
    cloudinary.uploader.rename(
      `eileen-kane/${oldPublicId}`, 
      `eileen-kane/${newPublicId}`, 
      (error: string, result: string) => {
        (req as any).cloudResponse = { error, result };
        next();
      });
  } else {
    next();
  }
};
