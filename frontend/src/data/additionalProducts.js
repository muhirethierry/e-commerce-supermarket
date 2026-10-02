const departments = [
  {
    category: 'Meat & Poultry', unit: 'kg', price: 6500,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    names: 'Chicken breast|Chicken drumsticks|Whole chicken|Chicken wings|Chicken thighs|Turkey breast|Turkey drumsticks|Beef steak|Beef mince|Beef stew cuts|Beef ribs|Beef brisket|Pork chops|Pork shoulder|Pork ribs|Pork sausages|Lamb chops|Lamb stew cuts|Ground turkey|Chicken liver|Beef liver|Smoked bacon|Breakfast sausages|Duck portions|Lean beef strips',
  },
  {
    category: 'Fish & Seafood', unit: 'kg', price: 7200,
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=600&q=80',
    names: 'Tilapia fillets|Whole tilapia|Nile perch fillets|Fresh salmon portions|Smoked salmon|Tuna steaks|Canned tuna|Sardines|Mackerel fillets|Whole mackerel|Sea bass fillets|Red snapper|Prawns|King prawns|Squid rings|Octopus portions|Crab meat|Fish fingers|Breaded fish fillets|Smoked trout|Herring fillets|Anchovy fillets|Seafood mix|Fish cakes|Lobster tails',
  },
  {
    category: 'Pantry & Dry Goods', unit: 'pack', price: 1800,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=600&q=80',
    names: 'All-purpose flour|Self-raising flour|Corn flour|Baking powder|Baking soda|Granulated sugar|Brown sugar|Icing sugar|Dry yeast|Breadcrumbs|Couscous|Dried lentils|Red lentils|Chickpeas|Dried kidney beans|Split peas|Quinoa|Chia seeds|Sunflower seeds|Pumpkin seeds|Rolled oats|Coconut flour|Cornmeal|Dried mushrooms|Vanilla extract',
  },
  {
    category: 'Rice, Pasta & Grains', unit: 'kg', price: 2200,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    names: 'Long-grain rice|Basmati rice|Brown rice|Jasmine rice|Parboiled rice|Short-grain rice|Whole wheat spaghetti|Penne pasta|Macaroni pasta|Fusilli pasta|Farfalle pasta|Lasagne sheets|Egg noodles|Rice noodles|Instant noodles|Rolled barley|Pearl barley|Millet grain|Sorghum grain|Buckwheat|Bulgur wheat|Couscous grains|Polenta|Wild rice blend|Whole wheat couscous',
  },
  {
    category: 'Canned & Jarred Foods', unit: 'can', price: 1600,
    image: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=600&q=80',
    names: 'Canned sweet corn|Canned green peas|Canned kidney beans|Canned chickpeas|Canned baked beans|Canned tomatoes|Canned tomato puree|Canned mushrooms|Canned pineapple|Canned peaches|Canned fruit cocktail|Canned sardines in oil|Canned tuna in brine|Canned coconut milk|Canned soup vegetables|Jarred pickled cucumbers|Jarred olives|Jarred roasted peppers|Jarred pasta sauce|Jarred peanut butter|Jarred strawberry jam|Jarred honey|Jarred capers|Canned lentil soup|Canned mixed vegetables',
  },
  {
    category: 'Snacks & Sweets', unit: 'pack', price: 1200,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2aa8c2c9?auto=format&fit=crop&w=600&q=80',
    names: 'Sea salt potato crisps|Barbecue potato crisps|Plantain chips|Roasted peanuts|Salted cashews|Mixed nuts|Dried mango slices|Raisin snack pack|Milk chocolate bar|Dark chocolate bar|White chocolate bar|Fruit gummies|Ginger sweets|Caramel toffees|Popcorn kernels|Ready salted popcorn|Chocolate wafer rolls|Peanut brittle|Granola snack bars|Oat snack bars|Pretzel twists|Cheese crackers|Rice cakes|Marshmallows|Coconut sweets',
  },
  {
    category: 'Beverages', unit: 'bottle', price: 900,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
    names: 'Still mineral water|Sparkling mineral water|Orange juice|Apple juice|Mango juice|Passion fruit juice|Pineapple juice|Cranberry juice|Lemonade|Ginger drink|Cola soft drink|Lemon-lime soda|Tonic water|Iced tea lemon|Iced tea peach|Bottled green tea|Instant coffee|Ground coffee|Black tea bags|Green tea bags|Cocoa drink mix|Malted milk drink|Coconut water|Energy drink|Fruit squash concentrate',
  },
  {
    category: 'Frozen Foods', unit: 'pack', price: 3500,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    names: 'Frozen mixed vegetables|Frozen green peas|Frozen sweet corn|Frozen spinach|Frozen broccoli florets|Frozen berries|Frozen mango chunks|Frozen fries|Frozen potato wedges|Frozen chicken nuggets|Frozen chicken burgers|Frozen fish fingers|Frozen fish fillets|Frozen prawns|Frozen beef meatballs|Frozen pizza margherita|Frozen vegetable pizza|Frozen pastry sheets|Frozen spring rolls|Frozen samosas|Frozen dumplings|Frozen ice cream vanilla|Frozen ice cream chocolate|Frozen fruit pops|Frozen ready lasagne',
  },
  {
    category: 'Breakfast Foods', unit: 'pack', price: 2400,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80',
    names: 'Corn flakes cereal|Honey oat cereal|Wheat biscuit cereal|Chocolate cereal rings|Bran flakes cereal|Granola honey almond|Granola fruit nut|Instant oats original|Instant oats cinnamon|Instant oats banana|Pancake mix|Waffle mix|Maple breakfast syrup|Breakfast muesli|Fruit and nut muesli|Breakfast cereal bars|Peanut butter spread|Hazelnut cocoa spread|Orange marmalade|Apricot jam|Strawberry jam|Breakfast honey|Breakfast sausages|Smoked breakfast bacon|Instant porridge cups',
  },
  {
    category: 'Sauces, Spices & Condiments', unit: 'bottle', price: 1700,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    names: 'Tomato ketchup|Classic mayonnaise|Yellow mustard|Soy sauce|Worcestershire sauce|Apple cider vinegar|White vinegar|Extra virgin olive oil|Sunflower cooking oil|Chilli sauce|Sweet chilli sauce|Barbecue sauce|Pasta tomato sauce|Green pesto sauce|Curry powder|Ground cinnamon|Ground cumin|Paprika powder|Turmeric powder|Black peppercorns|Garlic powder|Mixed herbs|Cajun seasoning|Sea salt grinder|Vanilla essence',
  },
  {
    category: 'Baby Food & Baby Care', unit: 'pack', price: 2800,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    names: 'Stage 1 baby cereal|Stage 2 baby cereal|Rice baby porridge|Oat baby porridge|Apple baby puree|Banana baby puree|Pear baby puree|Carrot baby puree|Sweet potato baby puree|Mixed fruit baby puree|Vegetable baby puree|Baby rice rusks|Teething biscuits|Infant formula tin|Follow-on formula tin|Toddler milk powder|Unscented baby wipes|Sensitive baby wipes|Newborn nappies small|Baby nappies medium|Baby nappies large|Baby shampoo gentle|Baby bath wash|Baby lotion gentle|Baby barrier cream',
  },
  {
    category: 'Health & Personal Care', unit: 'piece', price: 2200,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
    names: 'Antibacterial hand gel|Moisturising hand cream|Daily body lotion|Sensitive skin lotion|Aloe vera gel|Cotton wool pads|Cotton buds|Dental floss|Mint toothpaste|Sensitive toothpaste|Soft toothbrush|Medium toothbrush|Mouthwash fresh mint|Fluoride mouth rinse|Shampoo daily care|Conditioner daily care|Gentle face cleanser|Micellar cleansing water|SPF 30 sunscreen|SPF 50 sunscreen|Lip balm original|Deodorant roll-on|Sanitary pads regular|Sanitary pads overnight|Digital thermometer',
  },
  {
    category: 'Household Cleaning', unit: 'bottle', price: 2500,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    names: 'Multi-surface cleaner|Disinfectant floor cleaner|Kitchen degreaser|Bathroom cleaner|Toilet bowl cleaner|Glass window cleaner|Bleach cleaner|Antibacterial spray|Cream cleaning polish|Lemon surface spray|Lavender floor wash|Dish soap lemon|Dish soap aloe|Dishwasher rinse aid|Dishwasher cleaner tablets|Drain unblocker|Limescale remover|Furniture polish|Stainless steel cleaner|Oven cleaner|Carpet stain remover|Mould remover spray|Shoe cleaning foam|Air freshener citrus|Air freshener floral',
  },
  {
    category: 'Laundry & Dishwashing', unit: 'pack', price: 3800,
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=600&q=80',
    names: 'Laundry powder regular|Laundry powder sensitive|Laundry liquid fresh|Laundry liquid colour care|Laundry capsules regular|Laundry capsules colour care|Fabric softener floral|Fabric softener fresh|Fabric softener sensitive|Stain remover spray|Stain remover powder|Colour-safe bleach|Laundry bar soap|Delicate wash liquid|Wool wash liquid|Dishwasher tablets classic|Dishwasher tablets lemon|Dishwasher salt|Dishwasher rinse liquid|Hand dishwashing liquid|Dishwashing sponge pack|Scrubbing dish pads|Dish brush|Reusable washing gloves|Laundry scent booster',
  },
  {
    category: 'Paper & Disposable Products', unit: 'pack', price: 1800,
    image: 'https://images.unsplash.com/photo-1584744982498-2f4103fdc6f3?auto=format&fit=crop&w=600&q=80',
    names: 'Toilet tissue 2-ply|Toilet tissue 3-ply|Kitchen paper towels|Facial tissue box|Pocket tissues|Paper napkins white|Paper napkins printed|Paper plates small|Paper plates large|Paper cups|Disposable food containers|Aluminium foil roll|Baking parchment roll|Cling film roll|Freezer bags small|Freezer bags large|Bin liners small|Bin liners medium|Bin liners heavy duty|Compostable bin bags|Disposable cutlery set|Paper straws|Cotton paper towels|Wax sandwich wraps|Paper baking cases',
  },
  {
    category: 'Pet Food & Pet Care', unit: 'pack', price: 3500,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    names: 'Adult dog food chicken|Adult dog food beef|Puppy food chicken|Senior dog food|Dog food lamb and rice|Dog training treats|Dental dog chews|Dog biscuits original|Adult cat food chicken|Adult cat food tuna|Kitten food poultry|Senior cat food|Wet cat food salmon|Wet cat food beef|Cat treats crunchy|Cat litter unscented|Cat litter clumping|Pet shampoo gentle|Dog waste bags|Pet feeding bowl|Bird seed mix|Rabbit food pellets|Hamster food mix|Fish flakes food|Pet grooming brush',
  },
  {
    category: 'Cosmetics & Beauty', unit: 'piece', price: 4200,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80',
    names: 'Matte foundation light|Matte foundation medium|Matte foundation deep|Concealer natural beige|Concealer warm caramel|Pressed face powder|Loose setting powder|Black mascara volume|Brown mascara length|Liquid eyeliner black|Kohl eye pencil|Neutral eyeshadow palette|Rose blush powder|Bronzer compact|Clear lip gloss|Red satin lipstick|Nude satin lipstick|Berry lip tint|Makeup remover balm|Makeup setting spray|Nail polish classic red|Nail polish soft pink|Nail polish clear shine|Makeup sponge set|Cosmetic brush set',
  },
  {
    category: 'Organic & Natural Products', unit: 'piece', price: 3200,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    names: 'Organic brown eggs|Organic whole milk|Organic plain yogurt|Organic rolled oats|Organic basmati rice|Organic red lentils|Organic chickpeas|Organic quinoa|Organic honey|Organic peanut butter|Organic coconut oil|Organic olive oil|Organic chia seeds|Organic flax seeds|Organic dried apricots|Organic raisins|Organic green tea|Organic black tea|Organic tomato passata|Organic pasta spirals|Organic cocoa powder|Organic coconut sugar|Organic apple cider vinegar|Organic vegetable stock|Organic herbal infusion',
  },
  {
    category: 'International Foods', unit: 'pack', price: 2800,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    names: 'Thai jasmine rice|Japanese sushi rice|Korean glass noodles|Chinese egg noodles|Mexican corn tortillas|Mexican taco shells|Indian chickpea flour|Indian basmati rice|Japanese miso paste|Thai red curry paste|Thai green curry paste|Korean gochujang paste|Japanese soy seasoning|Italian arborio rice|Italian risotto mix|Greek stuffed vine leaves|Spanish paella rice|Moroccan couscous|Lebanese tahini paste|Middle Eastern falafel mix|Caribbean jerk seasoning|Jamaican coconut milk|West African cassava flour|Ethiopian berbere spice|Turkish bulgur wheat',
  },
  {
    category: 'Deli & Ready Meals', unit: 'pack', price: 4800,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    names: 'Roast chicken slices|Smoked turkey slices|Beef pastrami slices|Cooked ham slices|Chicken sausages cooked|Beef sausages cooked|Ready vegetable lasagne|Ready beef lasagne|Chicken curry meal|Vegetable curry meal|Beef stew ready meal|Chicken stew ready meal|Ready lentil dhal|Ready chickpea curry|Potato salad deli tub|Coleslaw deli tub|Hummus classic tub|Hummus roasted pepper tub|Guacamole fresh tub|Fresh pasta ravioli|Fresh pasta tortellini|Ready mac and cheese|Vegetable spring rolls|Chicken samosas|Ready chicken pie',
  },
  {
    category: 'Alcoholic Drinks', unit: 'bottle', price: 6500,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    names: 'Lager beer 330 ml|Premium lager beer 330 ml|Alcohol-free lager 330 ml|Wheat beer 330 ml|Stout beer 330 ml|Cider apple 330 ml|Cider pear 330 ml|Sparkling wine brut|Sparkling wine rose|Red table wine|White table wine|Rose table wine|Merlot red wine|Cabernet red wine|Chardonnay white wine|Sauvignon blanc white wine|Pinot noir red wine|Sweet dessert wine|Dry gin 700 ml|Vodka 700 ml|White rum 700 ml|Dark rum 700 ml|Blended whisky 700 ml|Brandy 700 ml|Alcohol-free sparkling grape drink',
  },
  {
    category: 'Seasonal & Special Offers', unit: 'piece', price: 2500,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    names: 'Seasonal fruit hamper|Seasonal vegetable box|Holiday baking bundle|Family breakfast bundle|Picnic snack bundle|Grilling essentials pack|Soup making vegetable pack|Tropical fruit selection|Citrus fruit selection|Weekend brunch bundle|Chocolate gift assortment|Festive biscuit tin|Seasonal spice collection|Barbecue sauce set|Tea tasting selection|Coffee sampler pack|Pasta night bundle|Movie night snack pack|Lunchbox filler bundle|Fresh juice variety pack|Garden herb starter set|Kitchen pantry starter pack|Family dinner meal kit|Celebration cake selection|Local favourites hamper',
  },
  {
    category: 'Home, Kitchen & Storage', unit: 'piece', price: 5500,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    names: 'Glass food storage set|Plastic food storage set|Airtight cereal container|Glass water jug|Stainless steel flask|Insulated lunch box|Reusable food containers|Kitchen utensil set|Wooden cutting board|Plastic chopping board|Stainless steel colander|Measuring cup set|Measuring spoon set|Silicone spatula|Kitchen tongs|Vegetable peeler|Can opener|Manual whisk|Mixing bowl set|Lunch bag insulated|Dish drying rack|Reusable shopping bags|Glass spice jars set|Food storage labels|Kitchen drawer organiser',
  },
  {
    category: 'Electronics & Small Appliances', unit: 'piece', price: 25000,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    names: 'Electric kettle 1.7 L|Compact toaster 2-slice|Hand blender set|Countertop blender|Digital kitchen scale|Digital food thermometer|Coffee grinder compact|French press coffee maker|Rice cooker compact|Sandwich maker|Hand mixer 5-speed|Mini food chopper|Portable phone charger|USB wall charger|USB-C charging cable|LED desk lamp|Rechargeable batteries AA|Rechargeable batteries AAA|Battery charger kit|Electric milk frother|Compact air fryer|Personal smoothie blender|Digital timer kitchen|Electric can opener|Extension lead 4-way',
  },
  {
    category: 'Stationery & School Supplies', unit: 'pack', price: 1200,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    names: 'Exercise books ruled|Exercise books squared|A4 writing paper|A4 sketch pad|HB pencil set|Colour pencil set|Wax crayon set|Blue ballpoint pens|Black ballpoint pens|Colour marker set|Highlighter set|White eraser pack|Pencil sharpener|Ruler 30 cm|Geometry set|Glue stick pack|Child-safe scissors|School folder set|Display book A4|Sticky notes assorted|Whiteboard markers|Watercolour paint set|Paint brush set|Student calculator|School backpack',
  },
  {
    category: 'Clothing & Accessories', unit: 'piece', price: 8500,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    names: 'Cotton crew T-shirt white|Cotton crew T-shirt black|Cotton crew T-shirt navy|Polo shirt classic fit|Casual button shirt|Lightweight cardigan|Pullover sweatshirt|Fleece zip jacket|Denim jeans regular fit|Chino trousers classic|Cotton shorts casual|Leggings everyday stretch|Cotton socks ankle pack|Cotton socks crew pack|Thermal socks warm pack|Baseball cap cotton|Knitted winter scarf|Leather-look belt|Canvas tote bag|Foldable rain poncho|Everyday umbrella|Cotton sleep shirt|Pajama set cotton|Kids graphic T-shirt|Reusable face covering',
  },
  {
    category: 'Garden & Outdoor', unit: 'piece', price: 4500,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    names: 'Garden hand trowel|Garden hand fork|Pruning shears|Garden gloves pair|Watering can 5 L|Garden hose nozzle|Seed starter tray|Tomato seed packet|Carrot seed packet|Spinach seed packet|Basil seed packet|Coriander seed packet|Lawn grass seed|Organic potting soil|Garden compost bag|Plant food liquid|Outdoor plant pot small|Outdoor plant pot large|Seedling pots pack|Plant labels pack|Bird feeder hanging|Outdoor solar light|Garden twine roll|Reusable leaf bags|Compact garden rake',
  },
]

export default departments