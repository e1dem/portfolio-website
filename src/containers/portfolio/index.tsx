import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Portfolio from '../../components/portfolio';
import { Image, ParallaxAnimation, Piece } from '../../model/Piece';
import { getBlobUrl } from '../../helpers/azure-storage-blob';
import { Layer } from 'parallax/src/model/Layer';

const PortfolioContainer = () => {
  const { t } = useTranslation();

  const [artworks, setArtworks] = useState([] as Piece[]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    fetch('/api/get-artworks')
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(err => { throw new Error(err.message) });
      })
      .then((data): Piece[] => {
        return data
          // TODO: fix size change for displaying at flex portfolio layout correctly
          .filter((a) => {return a.type != "ObjModel";})
          .map((artwork) => {
          switch(artwork.type) {
            case "Parallax":
              const layers = artwork.images.map((img: any) => {
                return new Layer(getBlobUrl(img.file_name), img.z_index);
              });
              return new ParallaxAnimation(artwork.id, artwork.type, artwork.title, layers, artwork.created);
            case "ObjModel":
              return new Image(artwork.id, artwork.type, t("portfolio.3dModel"), artwork.images[0].file_name, artwork.created);
            default:
              return new Image(artwork.id, artwork.type, artwork.title, artwork.images[0].file_name, artwork.created, artwork.alt);
          }
        })})
      .then((pieces: Piece[]) => {
        setArtworks(pieces);
      })
      .catch((e: Error) => {
        console.error("Error while loading artworks: " + e.message);
      })
  }, []);

  const selectArtwork = (index: number) => {
    setActiveIndex(index);
  }

  const closeModal = () => {
    setActiveIndex(-1);
  }

  return (
    <Portfolio artworks={artworks} activeIndex={activeIndex} onSelectArtwork={selectArtwork} onCloseModal={closeModal} />
  );
}

export default PortfolioContainer;