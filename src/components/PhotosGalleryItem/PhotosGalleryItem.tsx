import type { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  photo,
  onSelect,
}): PhotosGalleryItemProps {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
        onClick={() => onSelect(photo)}
      >
        <img src={photo.src.large} alt={photo.alt} />
      </div>
    </GridItem>
  );
}
