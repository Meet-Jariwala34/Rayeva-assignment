const mongoose = require('mongoose');

//Schemas
const productSchema = new mongoose.Schema({
    //The description that is given by the employee to the company
    description : {
        type : String,
        required : true
    },
    //Ai suggested category and subcategory for the product
    category : String,
    subCategory : String,
    //5-10 Ai suggested tags  for the product to be used in the website for better search and seo
    seoTags : [String],
    filter : [String],  //few Ai suggested filters for the product to be used in the website for better search and seo
    aiMetaData : {
        promptUsed : String,
        aiResponse : Object,
        processedAt : {
            type : Date,
            default : Date.now
        }
    }
});

//Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;