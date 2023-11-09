const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); 

const getAllArtworks = async () => {
  console.info("Getting all artworks...");
  const allArtworks = await prisma.artworks.findMany({
    include: {
      images: true
    }
  });
  
  return allArtworks;
}

const getContacts = async () => {
  console.info("Getting contact info...");
  const contacts = await prisma.contacts.findMany();
  return contacts;
}

const getClasses = async (languageCode) => {
  console.info("Getting classes for languageCode=" + languageCode);
  /*const classes = await prisma.classes.findMany({
    include: {
      class_type: true,
      title_info: true
    }
  });*/

  const classes = await prisma.classes.findMany({
    select: {
      start_date: true,
      online: true,
      class_type: {
        select: {
          name_info: {
            select: {
              translations: {
                select: {
                  translation: true,               
                },
                where: {
                  language: {
                    is: {
                      code: `${languageCode}`,
                    },               
                  },
                }
              },
            },
          }
        }
      },
      title_info: {
        select: {
          translations: {
            select: {
              translation: true,               
            },
            where: {
              language: {
                is: {
                  code: `${languageCode}`,
                },               
              },
            }
          },
        },
      },
      teacher_info: {
        select: {
          translations: {
            select: {
              translation: true,               
            },
            where: {
              language: {
                is: {
                  code: `${languageCode}`,
                },               
              },
            }
          },
        },
      },
      place_info: {
        select: {
          translations: {
            select: {
              translation: true,               
            },
            where: {
              language: {
                is: {
                  code: `${languageCode}`,
                },               
              },
            }
          },
        },
      },
    },
    orderBy: {
      start_date: 'desc',
    },
  });
  
  return classes;
}

const isPrismaError = (e) => {
  return e instanceof Prisma.PrismaClientKnownRequestError
    || e instanceof Prisma.PrismaClientUnknownRequestError
    || e instanceof Prisma.PrismaClientInitializationError;
}

module.exports = { getAllArtworks, getClasses, getContacts, isPrismaError };