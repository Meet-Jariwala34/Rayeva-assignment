const {GoogleGenAI} = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const Product = require('../models/product.model')

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

//Create the suggested AI response
const main = async (req,res) => {
    const {description} = req.body;
    const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    generationConfig: { 
    responseMimeType: "application/json" 
    },

    // Prompt 
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

    // Converting text format to json foramt
    const resText = result.candidates[0].content.parts[0].text;
    const cleanData = resText.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();

    const jsonData = JSON.parse(cleanData);
    res.json({success : true ,result : jsonData, message : "Ai successfully Response"})
}


// After the approaval of Admin , save it in db
const dataInsert = async (req,res) =>{
    try {
        const {description , category ,subCategory, seoTags , filter} = req.body;

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

    res.json({success : true, message : "Data is uploaded successfully" , product : uploadedData, message : "Data is stored in dataBase"})
    } catch (error) {
        res.json({success : false, message : error.message})
    }

}

module.exports = {
    main,
    dataInsert,
}