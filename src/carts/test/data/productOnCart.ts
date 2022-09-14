export let productOnCartData = {
  id: '98fcc3e0-0703-4424-926e-c013624be8ca',
  created_at: '2022-08-17T08:15:44.749Z',
  assignedAt: '2022-08-17T08:15:44.749Z',
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
  DeliveryDate: null,
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

export let productPushedOnCart = {
  id: 2,
  cartId: 'b61733bb-b048-4744-b4d1-a5a6e02718d7',
  productId: '98fcc3e0-0703-4424-926e-c013624be8ca',
  assignedAt: '2022-08-17T08:15:44.749Z',
  size: 'S',
  quantityInCart: 1,
  product: {
    quantity_available: {
      QuantityID: 1,
      ProductQuantityId: '98fcc3e0-0703-4424-926e-c013624be8ca',
      XXS: 1,
      XS: 3,
      S: 2,
      M: 4,
      L: 5,
      XL: 1,
      XXL: 6,
      XXXL: 7,
    },
    price: 12,
    DeliveryDate: null,
  },
};

export let twoProductOncart = {
  created_at: '2022-08-17T08:15:44.683Z',
  delivery_date: null,
  delivery_fees: 0,
  error_Messages: [],
  id: 'b61733bb-b048-4744-b4d1-a5a6e02718d7',
  ownerId: null,
  products: [
    {
      assignedAt: '2022-08-17T08:15:44.749Z',
      cartId: 'b61733bb-b048-4744-b4d1-a5a6e02718d7',
      id: 1,
      product: {
        DeliveryDate: null,
        price: 12,
        quantity_available: {
          L: 5,
          M: 2,
          ProductQuantityId: '98fcc3e0-0703-4424-926e-c013624be8ca',
          QuantityID: 1,
          S: 2,
          XL: 1,
          XS: 3,
          XXL: 6,
          XXS: 1,
          XXXL: 7,
        },
      },
      productId: '98fcc3e0-0703-4424-926e-c013624be8ca',
      quantityInCart: 3,
      size: 'M',
    },
    {
      assignedAt: '2022-08-17T08:15:44.749Z',
      cartId: 'b61733bb-b048-4744-b4d1-a5a6e02718d7',
      id: 2,
      product: {
        DeliveryDate: null,
        price: 12,
        quantity_available: {
          L: 5,
          M: 4,
          ProductQuantityId: '98fcc3e0-0703-4424-926e-c013624be8ca',
          QuantityID: 1,
          S: 2,
          XL: 1,
          XS: 3,
          XXL: 6,
          XXS: 1,
          XXXL: 7,
        },
      },
      productId: '98fcc3e0-0703-4424-926e-c013624be8ca',
      quantityInCart: 1,
      size: 'S',
    },
  ],
  status: 'PENDING',
  total: 48,
  update_at: '2022-08-17T08:15:44.748Z',
};

export let IsProductOnCartResult = {
  id: 22,
  cartId: 'b61733bb-b048-4744-b4d1-a5a6e02718d7',
  quantityInCart: 3,
  size: 'M',
  productId: '98fcc3e0-0703-4424-926e-c013624be8ca',
};

export let productOnCartOutputAllSizes = [
  {
    id: 30,
    size: twoProductOncart.products[0].size,
    quantityInCart: twoProductOncart.products[1].quantityInCart,
  },
  {
    id: 31,
    size: twoProductOncart.products[1].size,
    quantityInCart: twoProductOncart.products[1].quantityInCart,
  },
];

export let productOnCartOutput = {
  id: 30,
  size: twoProductOncart.products[0].size,
  quantityInCart: twoProductOncart.products[0].quantityInCart,
};
