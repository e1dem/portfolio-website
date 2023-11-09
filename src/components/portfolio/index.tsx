import { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-responsive-modal';

import Preview from '../../components/preview';
import { Piece } from '../../model/Piece';

import 'react-responsive-modal/styles.css';
import './styles.scss';

interface IPortfolioProps {
  artworks: Piece[];
  activeIndex: number;
  onSelectArtwork: (index: number) => void;
  onCloseModal: () => void;
}

const Portfolio = (props: IPortfolioProps) => {
  const { t } = useTranslation();

  function arrayBufferToBase64( buffer: ArrayBuffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }

    return window.btoa( binary );
  }

  const ActivePiece: ElementType = props.artworks.length > 0 ? props.artworks.at(props.activeIndex).type : null;

  const openModal = () => props.activeIndex > -1;

  return(
    <div className="portfolio">
      <p>
        {t("portfolio.description")}
      </p>
      <div className="portfolio__content">
        {props.artworks.map((piece, index) => {
          const {type, ...otherProps} = piece;
          return <Preview as={type}
                          {...otherProps}
                          onClick={() => props.onSelectArtwork(index)} />

        })}
        {/* Without "openModal() &&", there is the modal flickering during its closing. See https://github.com/pradel/react-responsive-modal/issues/495*/}
        {openModal() && <Modal open={openModal()} onClose={props.onCloseModal} center classNames={{overlay: 'customModalOverlay', modal: 'customModal'}}>
          <ActivePiece className="active-piece" {...props.artworks.at(props.activeIndex)} />
        </Modal>}
      </div>
    </div>
  );
}


export default Portfolio;