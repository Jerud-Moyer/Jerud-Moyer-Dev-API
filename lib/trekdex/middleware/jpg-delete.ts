import { NextFunction, Request, Response } from 'express';
import ImageService from '../../services/s3-image-service';

const getImageKey = (url: URL) => {
  const postProtocol = String(url).split('//')[1];
  const extensionStart = postProtocol.lastIndexOf('.');
  return postProtocol.slice(0, extensionStart);
}; 

export default function(req: Request, res:Response, next: NextFunction) {
  const newImageKey = getImageKey(req.body.imageUrl);
  const oldImageKey = `${req.params.oldImageKey}`;
  
  if(oldImageKey !== newImageKey) {
    ImageService.deleteImage(`${oldImageKey}.jpeg`, 'trekdex')
      .then(res => {
        (req as any).s3Response = res;
        next();
      });
  } else {
    next();
  }
};
