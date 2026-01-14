import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
const [selectedPhoto, setSelectedPhoto] = useState <Photo | null> ();


  const handleSubmit = async (newQuery: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setPhotos([]);
      const data = await getPhotos(newQuery);
      if (data.length === 0) {
        toast.error("oops");
        return;
      }
      setPhotos(data);

      console.log("data:", data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }

    // console.log("newQuery:", newQuery);
  };
  console.log("photos:", photos);

  const handleSelectedPhoto = (photo: Photo | null) => {
    selectedPhoto (photo)
  }
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text textAlign="center" > Opps, sorry</Text>/> 
                    }
{photos.length>0 && <PhotosGallery photos= {photos} onSelected = {handleSelectedPhoto}/>}
{selectedPhoto && <Modal onClose={()=> setSelectedPhoto(null)}
>
  <div
               style={{
          backgroundColor: selectedPhoto.avg_color,
          borderColor: selectedPhoto.avg_color,
        }}
        onClick={() => onSelect(photo)}
      >
        <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
      </div>
</Modal>/>}


        </Container>
      </Section>

      <Toaster />
    </>
  );
}
