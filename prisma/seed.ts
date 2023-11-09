import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  interface Image {
    title: string;
    fileName: string;
    created?: Date;
  }

  const images: Image[] = [{title: 'Gyumri', fileName: 'Gyumri2.jpg', created: new Date(2023, 0, 1)},
                           {title: 'The Crow', fileName: 'Crow1.jpg', created: new Date(2023, 0, 1)},
                           {title: 'The Puffin', fileName: 'Puffin1.jpg', created: new Date(2023, 0, 1)}];

  images.forEach(async (img) => {
    await prisma.artworks.upsert({    
      create: {
          title: img.title,
          type: 'img',
          uploaded: new Date(),
          created: img.created,
          images: {
            create: [
              {
                file_name: img.fileName,
              }
            ],
          }
      },
      update: {},
      where: { title: img.title }
    });
  })

  await prisma.artworks.upsert({    
    create: {
      title: 'Parallax',
      type: 'Parallax',
      uploaded: new Date(),
      images: {
        create: [
          {
            file_name: 'Parallax_Project_Final-1.png',
            z_index: -2.8,
          },
          {
            file_name: 'Parallax_Project_Final-2.png',
            z_index: -2.6,
          }
        ],
      }
    },
    update: {},
    where: { title: 'Parallax' }
  });

  await prisma.artworks.upsert({    
    create: {
      title: 'Bird',
      type: 'ObjModel',
      uploaded: new Date(),
      images: {
        create: [
          {
              file_name: 'Bird1.obj',
          }
        ],}
    },
    update: {},
    where: { title: 'Bird' }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })