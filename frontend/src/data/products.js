const products = [
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
]

export default products