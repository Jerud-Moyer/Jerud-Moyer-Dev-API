import Artwork from "../models/Artwork";

const updateFeatured = async(updateItems: Artwork[]) => {
  return await Promise.all(
    updateItems.map(item => Artwork.updateIsFeatured(item.isFeatured, item.id))
  );
};

const deleteArtWorks = async(images: Artwork[]) => {
  return await Promise.all(
    images.map(image => (
      Artwork.deleteWork(Number(image.id))
    ))
  );
};

export default {
  updateFeatured,
  deleteArtWorks
};
