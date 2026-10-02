import additionalDepartments from './additionalProducts.js'

const existingProducts = [
  // =========================
  // FRUITS & VEGETABLES
  // =========================

  {
    id: 1,
    name: 'Fresh Bananas',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 1500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    stock: 50,
  },

  {
    id: 2,
    name: 'Fresh Apples',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 3500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 3,
    name: 'Fresh Oranges',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 2500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80',
    stock: 45,
  },

  {
    id: 4,
    name: 'Fresh Mangoes',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 3000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 5,
    name: 'Fresh Pineapple',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 2500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 6,
    name: 'Fresh Watermelon',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 4500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 7,
    name: 'Fresh Avocado',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 2500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 8,
    name: 'Fresh Papaya',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 2500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 9,
    name: 'Fresh Lemons',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 2000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 10,
    name: 'Fresh Grapes',
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    price: 5000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 11,
    name: 'Fresh Tomatoes',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1800,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80',
    stock: 60,
  },

  {
    id: 12,
    name: 'Fresh Potatoes',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1200,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    stock: 80,
  },

  {
    id: 13,
    name: 'Fresh Carrots',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=80',
    stock: 50,
  },

  {
    id: 14,
    name: 'Fresh Onions',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80',
    stock: 55,
  },

  {
    id: 15,
    name: 'Fresh Cabbage',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1200,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 16,
    name: 'Fresh Spinach',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1000,
    unit: 'bunch',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 17,
    name: 'Green Bell Peppers',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 2500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 18,
    name: 'Fresh Broccoli',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 3000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 19,
    name: 'Fresh Cucumbers',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1800,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 20,
    name: 'Fresh Garlic',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 3500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 21,
    name: 'Fresh Ginger',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 3000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 22,
    name: 'Fresh Sweet Corn',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 23,
    name: 'Fresh Green Beans',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 2500,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 24,
    name: 'Fresh Lettuce',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 1500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 25,
    name: 'Fresh Eggplant',
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    price: 2000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1613140739985-1c2c8f5b6d8c?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },
  // =========================
  // DAIRY & EGGS
  // =========================

  {
    id: 26,
    name: 'Fresh Whole Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 1800,
    unit: 'liter',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 27,
    name: 'Fresh Low-Fat Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 2000,
    unit: 'liter',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 28,
    name: 'Chocolate Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 2500,
    unit: 'liter',
    image:
      'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 29,
    name: 'Strawberry Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 2500,
    unit: 'liter',
    image:
      'https://images.unsplash.com/photo-1553787499-6f7e4c7e4e8a?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 30,
    name: 'Plain Yogurt',
    category: 'Dairy & Eggs',
    subcategory: 'Yogurt',
    price: 1800,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 31,
    name: 'Vanilla Yogurt',
    category: 'Dairy & Eggs',
    subcategory: 'Yogurt',
    price: 2000,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 32,
    name: 'Strawberry Yogurt',
    category: 'Dairy & Eggs',
    subcategory: 'Yogurt',
    price: 2200,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 33,
    name: 'Greek Yogurt',
    category: 'Dairy & Eggs',
    subcategory: 'Yogurt',
    price: 3000,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1571805618149-3f48c7a6f8b6?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 34,
    name: 'Fresh Eggs',
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    price: 3500,
    unit: 'tray',
    image:
      'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    stock: 50,
  },

  {
    id: 35,
    name: 'Organic Eggs',
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    price: 4500,
    unit: 'tray',
    image:
      'https://images.unsplash.com/photo-1569288052389-dac9b01c9c4d?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 36,
    name: 'Free-Range Eggs',
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    price: 5000,
    unit: 'tray',
    image:
      'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 37,
    name: 'Salted Butter',
    category: 'Dairy & Eggs',
    subcategory: 'Butter',
    price: 3500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 38,
    name: 'Unsalted Butter',
    category: 'Dairy & Eggs',
    subcategory: 'Butter',
    price: 3500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 39,
    name: 'Cheddar Cheese',
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    price: 6500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 40,
    name: 'Mozzarella Cheese',
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    price: 7000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 41,
    name: 'Gouda Cheese',
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    price: 7500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    stock: 18,
  },

  {
    id: 42,
    name: 'Cream Cheese',
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    price: 4500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 43,
    name: 'Fresh Cream',
    category: 'Dairy & Eggs',
    subcategory: 'Cream',
    price: 3000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 44,
    name: 'Whipping Cream',
    category: 'Dairy & Eggs',
    subcategory: 'Cream',
    price: 4000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 45,
    name: 'Sour Cream',
    category: 'Dairy & Eggs',
    subcategory: 'Cream',
    price: 3500,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 46,
    name: 'Cottage Cheese',
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    price: 5000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
    stock: 18,
  },

  {
    id: 47,
    name: 'Vanilla Custard',
    category: 'Dairy & Eggs',
    subcategory: 'Desserts',
    price: 2500,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 48,
    name: 'Chocolate Custard',
    category: 'Dairy & Eggs',
    subcategory: 'Desserts',
    price: 2800,
    unit: 'cup',
    image:
      'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 49,
    name: 'Fresh Buttermilk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 2200,
    unit: 'liter',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 50,
    name: 'Evaporated Milk',
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    price: 3000,
    unit: 'can',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },


  // =========================
  // BAKERY
  // =========================

  {
    id: 51,
    name: 'White Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 1500,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    stock: 40,
  },

  {
    id: 52,
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 2000,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 53,
    name: 'Brown Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 1800,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 54,
    name: 'French Baguette',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 2500,
    unit: 'piece',
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 55,
    name: 'Multigrain Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 2500,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 56,
    name: 'Milk Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 1800,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 57,
    name: 'Sweet Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 2000,
    unit: 'loaf',
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 58,
    name: 'Dinner Rolls',
    category: 'Bakery',
    subcategory: 'Bread',
    price: 2500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 59,
    name: 'Chocolate Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 12000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    stock: 15,
  },

  {
    id: 60,
    name: 'Vanilla Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 10000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80',
    stock: 15,
  },

  {
    id: 61,
    name: 'Strawberry Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 13000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    stock: 12,
  },

  {
    id: 62,
    name: 'Red Velvet Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 15000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1586788224331-947f68671cf1?auto=format&fit=crop&w=600&q=80',
    stock: 10,
  },

  {
    id: 63,
    name: 'Carrot Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 11000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
    stock: 12,
  },

  {
    id: 64,
    name: 'Black Forest Cake',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 15000,
    unit: 'cake',
    image:
      'https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=600&q=80',
    stock: 10,
  },

  {
    id: 65,
    name: 'Vanilla Cupcakes',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 5000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 66,
    name: 'Chocolate Cupcakes',
    category: 'Bakery',
    subcategory: 'Cakes',
    price: 6000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 67,
    name: 'Butter Croissants',
    category: 'Bakery',
    subcategory: 'Pastries',
    price: 3500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },

  {
    id: 68,
    name: 'Chocolate Croissants',
    category: 'Bakery',
    subcategory: 'Pastries',
    price: 4000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 69,
    name: 'Cinnamon Rolls',
    category: 'Bakery',
    subcategory: 'Pastries',
    price: 3500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 70,
    name: 'Chocolate Muffins',
    category: 'Bakery',
    subcategory: 'Pastries',
    price: 4000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80',
    stock: 20,
  },

  {
    id: 71,
    name: 'Butter Biscuits',
    category: 'Bakery',
    subcategory: 'Biscuits',
    price: 2500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    stock: 35,
  },

  {
    id: 72,
    name: 'Chocolate Biscuits',
    category: 'Bakery',
    subcategory: 'Biscuits',
    price: 3000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 73,
    name: 'Cream Biscuits',
    category: 'Bakery',
    subcategory: 'Biscuits',
    price: 2500,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 74,
    name: 'Digestive Biscuits',
    category: 'Bakery',
    subcategory: 'Biscuits',
    price: 3000,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80',
    stock: 30,
  },

  {
    id: 75,
    name: 'Ginger Biscuits',
    category: 'Bakery',
    subcategory: 'Biscuits',
    price: 2800,
    unit: 'pack',
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },
]

const categoryAliases = {
  'Fruits & Vegetables': 'Fresh Fruits & Vegetables',
  Bakery: 'Bakery & Pastry',
}

const categoryPhotoPools = {
  'Fruits & Vegetables': [
    'photo-1567306226416-28f0efdc88ce',
    'photo-1571771894821-ce9b6c11b08e',
    'photo-1542838132-92c53300491e',
    'photo-1550258987-190a2d41a8ba',
    'photo-1502741338009-cac2772e18bc',
    'photo-1518843875459-f738682238a6',
  ],
  'Dairy & Eggs': [
    'photo-1563636619-e9143da7973b',
    'photo-1550583724-b2692b85b150',
    'photo-1488477181946-6428a0291777',
    'photo-1571805618149-3f48c7a6f8b6',
    'photo-1582722872445-44dc5f7e3c8f',
  ],
  'Bakery': [
    'photo-1509440159596-0249088772ff',
    'photo-1558961363-fa8fdf82db35',
    'photo-1483695028939-5bb13f8648b0',
    'photo-1517433670267-08bbd4be890f',
  ],
  'Meat & Poultry': [
    'photo-1607623814075-e51df1bdc82f',
    'photo-1544025162-d76694265947',
    'photo-1529692236671-f1f6cf9683ba',
    'photo-1598103442097-8b74394b95c6',
  ],
  'Fish & Seafood': [
    'photo-1510130387422-82bed34b37e9',
    'photo-1544943910-4c1dc44aabef',
    'photo-1559847844-5315695dadae',
  ],
  'Pantry & Dry Goods': [
    'photo-1547592180-85f173990554',
    'photo-1604719312566-8912e9c8a213',
    'photo-1586201375761-83865001e31c',
    'photo-1509440159596-0249088772ff',
  ],
  'Rice, Pasta & Grains': [
    'photo-1586201375761-83865001e31c',
    'photo-1621996346565-e3dbc646d9a9',
    'photo-1511690743698-d9d85f2fbf38',
  ],
  'Canned & Jarred Foods': [
    'photo-1584263347416-85a696b4eda7',
    'photo-1606787619248-f301830a5a57',
    'photo-1604908556857-1e94a1f98c58',
  ],
  'Snacks & Sweets': [
    'photo-1578985545062-69928b1d9587',
    'photo-1551024601-bec78aea704b',
    'photo-1515003197210-e0cd71810b5f',
  ],
  'Beverages': [
    'photo-1544145945-f90425340c7e',
    'photo-1470337458703-46ad1756a187',
    'photo-1513558161293-cdaf765ed2fd',
  ],
  'Frozen Foods': [
    'photo-1571171681602-350896f18ef4',
    'photo-1515003197210-e0cd71810b5f',
    'photo-1556911220-bff31c812dba',
  ],
  'Breakfast Foods': [
    'photo-1517673132405-a56a62b18caf',
    'photo-1499636136210-6d10c0b2fbe7',
    'photo-1525351484163-7529414344d8',
  ],
  'Sauces, Spices & Condiments': [
    'photo-1596040033229-a9821ebd058d',
    'photo-1501004318641-b39e6451bec6',
    'photo-1504674900247-0877df9cc836',
  ],
  'Electronics & Small Appliances': [
    'photo-1498049794561-7780e7231661',
    'photo-1524758631624-e2822e304c36',
    'photo-1518770660439-463335f01d8a',
    'photo-1550009158-9ebf69173e03',
  ],
  'Stationery & School Supplies': [
    'photo-1455390582262-044cdead277a',
    'photo-1516321318423-f06f85e504b3',
    'photo-1521587760476-6c12a4b040da',
  ],
  'Clothing & Accessories': [
    'photo-1483985988355-763728e1935b',
    'photo-1521572267360-ee0c2909d518',
    'photo-1529139574466-a303027c1d8b',
  ],
  'Garden & Outdoor': [
    'photo-1466692476868-aef1dfb1e735',
    'photo-1416879595882-3373a0480b5b',
    'photo-1501004318641-b39e6451bec6',
  ],
  'Health & Personal Care': [
    'photo-1556228578-8c89e6adf883',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1571781926291-c477ebfd024b',
  ],
  'Household Cleaning': [
    'photo-1583947215259-38e31be8751f',
    'photo-1604335399105-a0c585fd81a1',
    'photo-1556911220-bff31c812dba',
  ],
  'Laundry & Dishwashing': [
    'photo-1604335399105-a0c585fd81a1',
    'photo-1581578731548-c64695cc6952',
    'photo-1527515637462-cff94eecc1ac',
  ],
  'Paper & Disposable Products': [
    'photo-1584744982498-2f4103fdc6f3',
    'photo-1501004318641-b39e6451bec6',
    'photo-1528747045269-390fe33c19f2',
  ],
  'Pet Food & Pet Care': [
    'photo-1548199973-03cce0bbc87b',
    'photo-1517849845537-4d257902454a',
    'photo-1511044568932-338cba0ad803',
  ],
  'Cosmetics & Beauty': [
    'photo-1556229010-6c3f2c9ca5f8',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1524504388940-b1c1722653e1',
  ],
  'Organic & Natural Products': [
    'photo-1542838132-92c53300491e',
    'photo-1466637574441-749b8f19452f',
    'photo-1501004318641-b39e6451bec6',
  ],
  'International Foods': [
    'photo-1547592180-85f173990554',
    'photo-1516100882582-96c3a05fe590',
    'photo-1555939594-58d7cb561ad1',
  ],
  'Deli & Ready Meals': [
    'photo-1544025162-d76694265947',
    'photo-1517248135467-4c7edcad34c4',
    'photo-1559847844-5315695dadae',
  ],
  'Alcoholic Drinks': [
    'photo-1510812431401-41d2bd2722f3',
    'photo-1514362545857-3bc16c4c7d1b',
    'photo-1528605248644-14dd04022da1',
  ],
  'Seasonal & Special Offers': [
    'photo-1542838132-92c53300491e',
    'photo-1464226184884-fa52ac9a0d3d',
    'photo-1502741338009-cac2772e18bc',
  ],
  'Home, Kitchen & Storage': [
    'photo-1555041469-a586c61ea9bc',
    'photo-1524758631624-e2822e304c36',
    'photo-1505693416388-ac5ce068fe85',
  ],
}

const buildGeneratedProductImage = (name, category) => {
  const categoryPool = categoryPhotoPools[category] || categoryPhotoPools['Fruits & Vegetables']
  const seed = `${name}-${category}`
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }

  const photoId = categoryPool[hash % categoryPool.length]
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`
}

const normalizedProducts = existingProducts.map((product) => ({
  ...product,
  category: categoryAliases[product.category] || product.category,
}))

const firstGeneratedId = Math.max(...normalizedProducts.map((product) => product.id)) + 1

const generatedProducts = additionalDepartments.flatMap((department) =>
  department.names.split('|').map((name, index) => ({
    id: firstGeneratedId + additionalDepartments
      .slice(0, additionalDepartments.indexOf(department))
      .reduce((count, previous) => count + previous.names.split('|').length, 0) + index,
    name,
    category: department.category,
    subcategory: department.category,
    price: department.price + (index % 5) * 250,
    unit: department.unit,
    image: buildGeneratedProductImage(name, department.category),
    stock: 18 + (index % 5) * 7,
    demoProduct: true,
    ageRestricted: department.category === 'Alcoholic Drinks',
  })),
)

const products = [...normalizedProducts, ...generatedProducts]

export default products