import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { Buffer } from "buffer";

import './styles.scss';

type PreviewProps<T extends ElementType> = {
  as?: T;
  id: string;
  title: string;
  created?: Date;
  onClick(): void;
};

function setImageSrc(data: ArrayBuffer, id: string): void;
function setImageSrc(src: string, id: string): void;
function setImageSrc(srcOrData: string | ArrayBuffer, id: string): void {
  const src = typeof srcOrData == 'string' ? srcOrData
    : 'data:image/png;base64,'+ arrayBufferToBase64(srcOrData);

  document.querySelector(id).setAttribute("src", src);
}

function arrayBufferToBase64( buffer: ArrayBuffer ) {
  return Buffer.from(buffer).toString('base64');
}

type Props <T extends ElementType> = PropsWithChildren<PreviewProps<T>>
  & Omit<ComponentPropsWithoutRef<T>, keyof PreviewProps<T>>;

const Preview = <T extends ElementType = "span">({as, id, title, created, children, onClick,
  ...otherProps}: Props<T>) => {

  const Component = as || 'span';

  return (
    <div className="preview"  onClick={onClick} >
      <div  className="preview__content-frame">
        { <Component className="preview__content" id={`preview-${id}`} {...otherProps}>
            {children}
          </Component>
        }
        {/* <div className="preview__overlay">
              <span className='preview__overlay__title'>
                {title + (created ? ', ' + new Date(created).getFullYear().toString() : '')}
              </span>
            </div> */}
      </div>
      <div className='preview__title'>
        {title + (created ? ', ' + new Date(created).getFullYear().toString() : '')}
      </div>
    </div>
  );
};

export default Preview;