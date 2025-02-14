import { NextFunction, Request, Response } from "express";
import cloudinary from '../../utils/cloudinary-config';

export default (req: Request, res: Response, next: NextFunction) => {
  const imageString = req.body.imageBlob;
  cloudinary.uploader.upload(imageString, {
    public_id: req.body.imageData.slug,
    unique_filename: false,
    upload_preset: 'eileen-kane'
  })
    .then((response: any) => {
      (req as any).cloudImage = response;
      next();
    })
    .catch((err: Error) => next(err));
};
