import { useEffect, useState, useRef, useLayoutEffect } from 'react';
// import Model from 'react-3dmodelx';
import { OBJModel } from 'react-3d-viewer';
import { useTranslation } from 'react-i18next';

import './styles.scss';

interface IObjModelProps {
  src: string;
  background?: number;
  width?: number;
  height?: number;
}

const ObjModel = (props: IObjModelProps) => {
  const { t } = useTranslation();
  const componentRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  function setModelSize() {
    let newWidth: number;
    let newHeight: number;

    if (props.width && props.height) {
      newWidth = props.width;
      newHeight = props.height;
    } else {
      const parentDivWidth = componentRef.current.parentElement.clientWidth;
      const parentDivHeight = componentRef.current.parentElement.clientHeight;
      const padding = parseFloat(window.getComputedStyle(componentRef.current.parentElement).padding);

      newWidth = parentDivWidth - 2 * padding;
      newHeight = parentDivHeight - 2 * padding;
      console.log("Old size: %i; %i/ New size: %i; %i", width, height, newWidth, newHeight);
    }

    setWidth(newWidth);
    setHeight(newHeight);
  }

  useEffect(() => {
    console.log("3dModel.useEffect");
    window.addEventListener('resize', setModelSize);

    return () => {
      window.removeEventListener('resize', setModelSize)
    }
  }, []);

  useLayoutEffect(() => {
    console.log("3dModel: useLayoutEffect");
    setModelSize();
  }, []);

  return(
    <div className="obj-model" ref={componentRef}>
      {loading &&
        <div className="model-loading-screen">
          {t("commons.loading")}
        </div>
      }
      <OBJModel
          height={height}
          width={width}
          scale={{ x: 0.5, y: 0.5, z: 0.5 }}
          src={props.src}
          onLoad={() => {console.log("OBJModel onLoad..."); setLoading(false);}}
          onProgress={() => {console.log("OBJModel onProgress...")}}
          background={`${props.background ? props.background : "grey"}`} />
    </div>
  );
}

export default ObjModel;