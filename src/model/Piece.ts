import { ElementType } from 'react';
import ObjModel from '../components/3dModel';
import { getBlobUrl } from '../helpers/azure-storage-blob';
import { Layer } from 'parallax/src/model/Layer';
import Parallax from 'parallax/src/components/Parallax/Parallax';

const getElementType = (elementTypeName: string) => {
  switch(elementTypeName) {
    case 'Parallax':
      return Parallax;
    case 'ObjModel':
      return ObjModel;
    default:
      return (elementTypeName as ElementType);
  }
}

class Piece {
  id: string;
  type: ElementType;
  title: string;
  created?: Date;

  constructor(id: string, type: string, title: string, created?: Date) {
    this.id = id;
    this.type = getElementType(type);
    this.title = title;
    this.created = created;
  }
}

class Image extends Piece {
  src?: string;
  alt?: string;
  data?: ArrayBuffer;
  file_name?: string;

  constructor(id: string, type: string, title: string, file_name: string, created?: Date, alt?: string) {
    super(id, type, title, created);
    this.file_name = file_name;
    this.src = getBlobUrl(file_name);
    this.alt = alt;
  }
}

class ParallaxAnimation extends Piece {
  layers: Layer[];

  constructor(id: string, type: string, title: string, layers: Layer[], created?: Date) {
    super(id, type, title, created);
    this.layers = layers;
  }
}

export {
  Piece,
  Image,
  ParallaxAnimation
}