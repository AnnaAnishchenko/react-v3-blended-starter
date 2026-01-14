import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}

export default function PhotosGallery({
  photos,
  onSelect,
}): PhotosGalleryProps {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotosGalleryItem photo={photo} key={photo.id} onSelect={onSelect} />
      ))}
    </Grid>
  );
}
