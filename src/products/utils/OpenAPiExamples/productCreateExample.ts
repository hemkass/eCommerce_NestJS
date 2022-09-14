import { Brand, Categories } from '@prisma/client';

export let productCreateExample = {
  categories: {
    summary: '[vêtement,femmes,teeshirt]',
    value: {
      title: 'T-shirt col tunisien manches courtes ',
      sustainable: {
        isActive: true,
        description:
          'Choisir un produit labellisé « STANDARD 100 by OEKO-TEX®» (appellation assez technique, on vous l’accorde), c’est choisir un textile inoffensif et non irritant pour la peau. Un label indépendant et international de référence qui protège la santé des consommateurs. Sain et responsable à la fois.',
      },
      ref: '3743981 / GJY899',
      color: ['white', 'black', 'red'],
      description:
        "Le T-shirt bi-matière, très féminin avec son empiècement en dentelle. C'est un COUP DE CŒUR de nos clientes. Encolure tunisienne avec patte de boutonnage. ",
      brand: Brand.BURBERRY,
      DeliveryDate: 'August 1, 2022 23:15:30 GMT+11:00',
      categories: [Categories.Femme, Categories.Vetements, Categories.TeeShirt],
      price: 12,
      size: ['S', 'M', 'L'],
      quantity_available: {
        XXS: 1,
        XS: 3,
        S: 2,
        M: 4,
        L: 5,
        XL: 1,
        XXL: 6,
        XXXL: 7,
      },
      pictures: [
        {
          src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
          stylePicture: 'chill',
          morphoPicture: 'A',
          sizePicture: 'S',
        },
        {
          src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/apparel-162192_1280_k0nq7t.png',
          stylePicture: 'chill',
          morphoPicture: 'V',
          categoriesPicture: 'vêtements',
          sizePicture: 'M',
        },
      ],
    },
  },
};
