const {GoogleGenAI} = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const Order = require('../models/order.model');

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const responseWithOrderId = async (order) => {
    console.log("Nested function started")
    console.log(order);
    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.3, // Forces the AI to be more factual and follow rules strictly
    topP: 0.1
},
    contents : `
    ### ROLE
You are the Rayeva Eco-Support Agent. 🌿

### DATA SCHEMA (STRICT JSON ONLY)
{
    "response": "Your direct reply with the order's detail like order status and trackingnumber",
}

### EXAMPLE
GIVEN : order.orderId = 1924,  order.status = packageing , trackingnumber = 123 , products = [apple, mango , banana]
AI : your order number 1924 and currently it is in "packageing" status , your tracking Number is 123 .

###Order details
orderStatus = ${order.status},
tracking number = ${order.trackingNumber},



###Go through the order perfectly
    `
    })

    console.log("The nested Call back-function ending")
    const textRes = result.candidates[0].content.parts[0].text;
    const cleanData = textRes.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();
const jsonRes = JSON.parse(cleanData);
    console.log(jsonRes);


    return jsonRes;

}

const conversation = async (req,res) => {
    const {chat} = req.body;
    console.log("chat = "+ JSON.stringify(chat))
    console.log("chat[0] = "+ chat[0].content)
    const userMessages = chat.filter(m => m.role === 'user');
    console.log("userMSG[0] = "+userMessages)
const latestQuery = userMessages[userMessages.length - 1].content;

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.3, // Forces the AI to be more factual and follow rules strictly
    topP: 0.1
},
        contents : `
You are the Rayeva Support Bot. 🌿
CHECK THE HISTORY BELOW FOR A RAY-XXXX ID.

HISTORY: ${JSON.stringify(chat)}

USER JUST SAID: "${latestQuery}"

INSTRUCTION: 
If "RAY-" is anywhere in the HISTORY or the USER QUERY, extract it into "orderId". 
If you find it, DO NOT ask for it again. 
Instead, acknowledge it (e.g., "I see your order RAY-123...").

RETURN JSON ONLY:
{ "response": "...", "mood": 1, "orderId": "RAY-XXXX or null" }
`})

const rawRes = result.candidates[0].content.parts[0].text;
console.log("rawres == "+rawRes)
const cleanData = rawRes.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();
console.log("cleanData == "+cleanData)
const jsonRes = JSON.parse(cleanData);

let result2 = {
    response : "not"
}

console.log("First API response",jsonRes);

if(jsonRes.orderId != null){
    console.log("OrderId is present")
    const order = await Order.findOne({orderId : jsonRes.orderId})
    if(order){
        console.log("Order with orderId is found")
        result2 = await responseWithOrderId(order);
    console.log("result two is called...")
    }else{
        console.log("Order not found")
    }
    
}

res.json({success : true , AIreply : jsonRes , withOrderRes : result2})

}

module.exports = {
    conversation
}

