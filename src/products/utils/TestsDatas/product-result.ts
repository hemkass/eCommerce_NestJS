import { Product } from '@prisma/client';

export let newProduct = {
  id: 'CeciEstUnIDTest',
  created_at: Date.now(),
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
  brand: 'La redoute',
  DeliveryDate: 'August 1, 2022 23:15:30 GMT+11:00',
  categories: ['vêtements', 'femme', 'tee-shirt'],
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
};

export let ProductsList = [
  {
    id: '7d09e7a1-cfc3-4458-952b-594396d48758',
    categories: ['vêtements', 'femme', 'tee-shirt'],
    ref: '3743981 / GJY899',
    title: 'T-shirt col tunisien manches courtes              ',
    description:
      "Le T-shirt bi-matière, très féminin avec son empiècement en dentelle. C'est un COUP DE CŒUR de nos clientes. Encolure tunisienne avec patte de boutonnage.                                                                                                                                                  ",
    brand: 'La redoute',
    style: '',
    DeliveryDate: null,
    price: 12,
    color: ['white', 'black', 'red'],
    size: ['S', 'M', 'L'],
    quantity_cart: 0,
    created_at: '2022-08-11T12:46:06.560Z',
    update_at: '2022-08-11T12:46:06.560Z',
    favorite: false,
    rating_avg: 0,
  },
  {
    id: '806ff71f-7636-4619-be07-e2e8d97f76f6',
    categories: ['vêtements', 'femme', 'tee-shirt'],
    ref: '3743981 / GJY899',
    title: 'T-shirt col tunisien manches courtes              ',
    description:
      "Le T-shirt bi-matière, très féminin avec son empiècement en dentelle. C'est un COUP DE CŒUR de nos clientes. Encolure tunisienne avec patte de boutonnage.                                                                                                                                                  ",
    brand: 'La redoute',
    style: '',
    DeliveryDate: null,
    price: 12,
    color: ['white', 'black', 'red'],
    size: ['S', 'M', 'L'],
    quantity_cart: 0,
    created_at: '2022-08-11T09:46:03.662Z',
    update_at: '2022-08-11T09:46:03.662Z',
    favorite: false,
    rating_avg: 0,
  },
];
