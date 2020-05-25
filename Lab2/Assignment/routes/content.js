const express = require('express');
const router = express.Router();

var menu = {
    "drink1": {
        "id":"ahfw",
        "img":"",
        "name":"Almondmilk Honey Flat White",
        "description":"This flat white intentionally pairs almondmilk and signature espresso with a hint of honey, making a perfect amount of creamy, nutty sweetness.",
        "mTitle":"Ingredients",
        "detail":"Almondmilk [Filtered Water, Almonds, Sugar, Calcium Carbonate, Sunflower Lecithin, Sea Salt, Xanthan Gum, Guar Gum, Vitamin A Palmitate, Vitamin D 2 (Ergocalciferol)], Brewed Espresso, Honey Blend [Honey, Water, Natural Flavors, Potassium Sorbate, Xanthan Gum, Citric Acid]"
    },
    "drink2": {        
        "id":"cl",
        "img":"",
        "name":"Coconutmilk Latte",
        "description":"Coconutmilk and our signature espresso are intentionally paired and topped with cascara sugar to create one serious latte.",
        "mTitle":"Ingredients",
        "detail":"Coconutmilk [Water, Coconut Cream, Cane Sugar, Contains 2 Or Less Of Tricalcium Phosphate, Coconut Water Concentrate, Sea Salt, Natural Flavors, Xanthan Gum, Gellan Gum, Corn Dextrin, Guar Gum, Vitamin A Palmitate, And Vitamin D 2], Brewed Espresso, Cascara Topping [Sugar, Coffee Cherry Extract]"
    },
    "drink3": {        
        "id":"smf",
        "img":"",
        "name":"Smoked Butterscotch Frappuccino",
        "description":"Notes of smoked butterscotch blended with Frappuccino roast, milk and ice. Just when you thought you already had a Frappuccino favorite.",
        "mTitle":"Ingredients",
        "detail":"Ice, Milk, Coffee Frappuccino Syrup [Sugar, Water, Natural Flavor, Salt, Xanthan Gum, Potassium Sorbate, Citric Acid], Coffee, Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Smoked Butterscotch Sauce [Sugar, Brown Sugar, Corn Syrup, Heavy Cream (Milk), Water, Butter (Cream, Salt), Natural Smoke Flavors, Gum Acacia, Salt, Natural Flavors, Potassium Sorbate, Xanthan Gum, Tocopherols], Smoked Butterscotch Sugar Topping [Sugar, Natural Smoke Flavor And Other Flavors, Fruit And Vegetable Colors (Apple, Purple Carrot, Hibiscus)]"
    },
    "drink4": {        
        "id":"phc",
        "img":"",
        "name":"Peppermint Hot Chocolate",
        "description":"A classic holiday hot chocolate, made with chocolate-mocha sauce, peppermint-flavored syrup and steamed milk. Topped with sweet whipped cream and dark chocolate curls.",
        "mTitle":"Ingredients",
        "detail":"Milk, Mocha Sauce [Water, Sugar, Cocoa Processed With Alkali, Natural Flavor], Peppermint Syrup [Sugar, Water, Natural Flavor, Sodium Benzoate, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Vanilla Syrup [Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid], Dark Chocolate Curls [Sugar, Chocolate Mass (Processed With Alkali), Cocoa Butter, Soy Lecithin, Vanilla Extract]"
    },
    "drink5": {        
        "id":"schc",
        "img":"",
        "name":"Salted Caramel Hot Chocolate",
        "description":"Steamed milk and mocha sauce are combined with toffee nut and vanilla syrups, then topped with sweetened whipped cream, caramel sauce and a blend of turbinado sugar and sea salt.",
        "mTitle":"Ingredients",
        "detail":"Milk, Mocha Sauce [Water, Sugar, Cocoa Processed With Alkali, Natural Flavor], Toffee Nut Syrup [Sugar, Water, Natural Flavor, Salt, Sodium Benzoate, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Vanilla Syrup [Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid], Caramel Sauce [Sugar, Corn Syrup, Butter (Cream (Milk), Salt), Water, Heavy Cream, Nonfat Dry Milk, Natural Flavors, Salt, Mono Diglycerides, Soy Lecithin, Sulfites], Sea Salt Topping [Turbinado Sugar, Smoked Sea Salt, Less Than 2 Silicon Dioxide]"
    },
    "drink6": {        
        "id":"cdc",
        "img":"",
        "name":"Cinnamon Dolce Crème",
        "description":"We combine freshly steamed milk and cinnamon dolce–flavored syrup, topped with sweetened whipped cream and a cinnamon dolce topping to give you a creamy, special treat.",
        "mTitle":"Ingredients",
        "detail":"Milk, Cinnamon Dolce Syrup [Sugar, Water, Natural Flavor, Citric Acid, Potassium Sorbate], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Cinnamon Dolce Topping [Sugar, Cinnamon, Salt, Extractives Of Butter (Milk), And Other Natural Flavor]"
    },
    "drink7": {        
        "id":"crcfbb",
        "img":"",
        "name":"Caramel Ribbon Crunch Frappuccino Blended Beverage",
        "description":"Buttery caramel syrup blended with coffee, milk and ice, then topped with a layer of dark caramel sauce, whipped cream, caramel drizzle and a crunchy caramel-sugar topping—oh-so-beautifully delicious.",
        "mTitle":"Ingredients",
        "detail":"Ice, Milk, Coffee Frappuccino Syrup [Sugar, Water, Natural Flavor, Salt, Xanthan Gum, Potassium Sorbate, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Coffee, Dark Caramel Sauce [Corn Syrup, Sweetened Condensed Milk (Milk, Sugar), Water, Sugar, Natural Flavors, Butter (Cream, Salt), Salt, Sunflower Lecithin, Potassium Sorbate], Caramel Sauce [Sugar, Corn Syrup, Butter (Cream (Milk), Salt), Water, Heavy Cream, Nonfat Dry Milk, Natural Flavors, Salt, Mono Diglycerides, Soy Lecithin, Sulfites], Caramel Sugar Topping [Cane Sugar, Natural Flavors, Vegetable Colors (Pumpkin, Apple, Purple Carrot, Hibiscus), Salt, Annatto, Baking Soda]"
    },
    "drink8": {        
        "id":"jcfbb",
        "img":"",
        "name":"Java Chip Frappuccino Blended Beverage",
        "description":"We blend mocha sauce and Frappuccino chips with coffee, milk and ice, then top it off with whipped cream and a mocha drizzle to bring you endless java joy.",
        "mTitle":"Ingredients",
        "detail":"Ice, Milk, Coffee Frappuccino Syrup [Sugar, Water, Natural Flavor, Salt, Xanthan Gum, Potassium Sorbate, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Coffee, Mocha Sauce [Water, Sugar, Cocoa Processed With Alkali, Natural Flavor], Frappuccino Chips [Confectionery Coating (Sugar, Palm Kernel And Palm Oils, Cocoa Processed With Alkali, Soy Lecithin, Vanilla, Milk), Cocoa (Processed With Alkali, 9), Cookie Crumbs (Unbleached Unenriched Wheat Flour, Sugar, Palm And Palm Kernel Oil, Cocoa Processed With Alkali, Chocolate Mass, Salt, Sodium Bicarbonate, Soy Lecithin, Natural Flavor), Chocolate Mass (2), And Salt]"
    },
    "drink9": {        
        "id":"ccccf",
        "img":"",
        "name":"Chocolate Cookie Crumble Crème Frappuccino",
        "description":"Mocha sauce and Frappuccino chips are blended with milk and ice, layered on top of whipped cream and chocolate cookie crumble and topped with vanilla whipped cream, mocha drizzle and even more chocolate cookie crumble. These layers ensure each sip is as good as the last; all the way to the end.",
        "mTitle":"Ingredients",
        "detail":"Ice, Milk, Creme Frappuccino Syrup [Sugar, Water, Natural Flavor, Salt, Xanthan Gum, Potassium Sorbate, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Mocha Sauce [Water, Sugar, Cocoa Processed With Alkali, Natural Flavor], Frappuccino Chips [Confectionery Coating (Sugar, Palm Kernel And Palm Oils, Cocoa Processed With Alkali, Soy Lecithin, Vanilla, Milk), Cocoa (Processed With Alkali, 9), Cookie Crumbs (Unbleached Unenriched Wheat Flour, Sugar, Palm And Palm Kernel Oil, Cocoa Processed With Alkali, Chocolate Mass, Salt, Sodium Bicarbonate, Soy Lecithin, Natural Flavor), Chocolate Mass (2), And Salt], Chocolate Cookie Grind Topping [Sugar, Enriched Flour (Wheat Flour, Niacin, Reduced Iron, Thiamine Mononitrate, Riboflavin, Folic Acid), Palm And Palm Kernel Oil, Cocoa Processed With Alkali, Salt, Sodium Bicarbonate, Soy Lecithin, Natural Flavor]"
    },
    "drink10": {        
        "id":"iccb",
        "img":"",
        "name":"Irish Cream Cold Brew",
        "description":"Starbucks Cold Brew with Irish cream syrup, topped with vanilla sweet cream cold foam and a strike of cocoa powder.",
        "mTitle":"Ingredients",
        "detail":"Brewed Coffee, Ice, Vanilla Sweet Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Milk, Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Irish Cream Syrup [Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid], Cocoa Powder Topping [Cocoa Powder Processed With Alkali, Sugar]"
    },
    "drink11": {        
        "id":"vsccb",
        "img":"",
        "name":"Vanilla Sweet Cream Cold Brew",
        "description":"Our slow-steeped custom blend of Starbucks Cold Brew coffee accented with vanilla and topped with a delicate float of house-made vanilla sweet cream that cascades throughout the cup. It's over-the-top and super-smooth.",
        "mTitle":"Ingredients",
        "detail":"Ice, Brewed Coffee, Vanilla Sweet Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Milk, Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Vanilla Syrup [Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid]"
    },
    "drink12": {        
        "id":"sfbb",
        "img":"",
        "name":"Strawberry Frappuccino Blended Beverage",
        "description":"Summer's favorite berry is the star of this delicious Frappuccino Blended Beverage—a blend of ice, milk and strawberry puree layered on top of a splash of strawberry puree and finished with vanilla whipped cream.",
        "mTitle":"Ingredients",
        "detail":"Ice, Milk, Creme Frappuccino Syrup [Sugar, Water, Natural Flavor, Salt, Xanthan Gum, Potassium Sorbate, Citric Acid], Strawberry Puree Sauce [Strawberry Puree, White Grape Juice Concentrate, Water, Fruit And Vegetable Juice For Color, Natural Flavors, Xanthan Gum, Citric Acid], Whipped Cream [Cream (Cream, Mono And Diglycerides, Carageenan), Vanilla Syrup (Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid)], Classic Syrup [Sugar, Water, Natural Flavors, Potassium Sorbate, Citric Acid]"
    },
};

router.get('/', async (req, res) => {
    try {
        res.render("layouts/main", {title: "PatBucks Cafe"});
    } catch (e) {
        res.status(404).json({error : "404 not found"});
    }
  });

  module.exports = router;
