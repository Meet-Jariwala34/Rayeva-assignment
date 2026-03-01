const {GoogleGenAI} = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const Product = require('../models/product.model')

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const main = async (req,res) => {
    const {description} = req.body;
    const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    generationConfig: { 
    responseMimeType: "application/json" 
    },
    contents: `Return a JSON object for the following product description. 
    Do not include any text outside the JSON.
    And look for keywords like "GOTS," "FSC," or "Carbon Neutral"
    Structure:
    {
    "category": "String",
    "subcategory": "String",
    "seo_tags": ["Array of 10 strings"],
    "filters": ["Array of sustainability features"]
    }
    Description: "${description}"`,
    });

    const resText = result.candidates[0].content.parts[0].text;
    const cleanData = resText.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();

    const jsonData = JSON.parse(cleanData);
    res.json({success : true ,result : jsonData})
}

const dataInsert = async (req,res) =>{
    const {description , category ,subCategory, seoTags , filter, response} = req.body;

    const product = {
        description : description,
        category : category ,
        subCategory : subCategory,
        seoTags : seoTags,
        filter : filter,
        aiMetaData : {
            promptUsed :   `Return a JSON object for the following product description. 
                            Do not include any text outside the JSON.
                            And look for keywords like "GOTS," "FSC," or "Carbon Neutral"
                            Structure:
                            {
                            "category": "String",
                            "subcategory": "String",
                            "seo_tags": ["Array of 10 strings"],
                            "filters": ["Array of sustainability features"]
                            }`,
        }
    }

    const uploadedData = await Product.create(product);

    res.json({success : true, message : "Data is uploaded successfully" , product : uploadedData})

}

module.exports = {
    main,
    dataInsert,
}