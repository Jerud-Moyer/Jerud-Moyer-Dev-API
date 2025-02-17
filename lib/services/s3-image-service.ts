import s3 from '../utils/aws-config';
import crypto from 'crypto';
import { DatabaseUrl } from 'aws-sdk/clients/appflow';
import { StringIndexed } from '../nerdmeme/types.types';

const buckets: StringIndexed = {
  nerdmeme: process.env.NERDMEME_S3_BUCKET_NAME as string,
  trekdex: process.env.TREKDEX_S3_BUCKET_NAME as string
}

const getUUID = () => {
  return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
  );
};

const getBuffer = async(inputUrl: DatabaseUrl): Promise<Buffer<ArrayBuffer>> => {
  if(inputUrl.slice(0, 5) === 'data:') {
    const data = inputUrl.split(',')[1];
    const byteString = Buffer.from(data, 'base64');
    return byteString;
  } else {
    const response = await fetch(inputUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  }
};

const uploadToS3 = async(
  blob: Buffer<ArrayBuffer>,
  client: string, 
  title: string
) => {
  const uploadedImage = await s3.upload({
    Bucket: buckets[client],
    Key: `${title}-${getUUID()}.jpg`,
    Body: blob,
    ContentType: 'image/jpeg'
  }).promise();
  return uploadedImage.Location;
};

const uploadImage = async(
  url: string,
  client: string, 
  name: string = 'image'
) => {
  return await getBuffer(url)
    .then(buff => {
      return uploadToS3(buff, client, name);
    });
};

const deleteImage = async(key: string, client: string) => {
  const deletedImage = await s3.deleteObject({
    Bucket: buckets[client],
    Key: key
  }, (err, data) => {
    if(err) {
      throw new Error('tough luck kid');
    } else {
      return data;
    }
  });
  return deletedImage;
};

export default {
  uploadImage,
  deleteImage
};
