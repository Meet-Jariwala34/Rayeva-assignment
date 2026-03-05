const {GoogleGenAI} = require('@google/genai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const Order = require('../models/order.model');
const User = require('../models/user.model');

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const responseWithOrderId = async (order) => {
    const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
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
    const textRes = result.candidates[0].content.parts[0].text;
    const cleanData = textRes.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();
    const jsonRes = JSON.parse(cleanData);
    return jsonRes;
}

const conversation = async (req,res) => {
    const {chat} = req.body;

    //extracting only user's message for getting his/her last message
    const userMessages = chat.filter(m => m.role === 'user');
    const latestQuery = userMessages[userMessages.length - 1].content;

    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            generationConfig: {
                responseMimeType: "application/json",   //Forcing the Ai to respond in json format
                temperature: 0.3, // Forces the AI to be more factual and follow rules strictly
                topP: 0.1
            },

            // Prompt used
            contents : `
                You are the Rayeva Support Bot. 🌿
                CHECK THE HISTORY BELOW FOR A RAY-XXXX ID.
                HISTORY: ${JSON.stringify(chat)}
                USER JUST SAID: "${latestQuery}"

                INSTRUCTION: 
                If "RAY-" is anywhere in the HISTORY or the USER QUERY, extract it into "orderId". 
                If you find it, DO NOT ask for it again. 
                Instead, acknowledge it (e.g., "I see your order RAY-123...").
                If the mood of user is frustrated or anger or any other negative emotion than give the mood : -1 

                RETURN JSON ONLY:
                { "response": "...", "mood": 1, "orderId": "RAY-XXXX or null" }`
        })

//Extracting the required data and cleaning to make it pure json 
const rawRes = result.candidates[0].content.parts[0].text;
const cleanData = rawRes.replace(/```json/g, "") // Removes the opening ```json
                            .replace(/```/g, "")     // Removes the closing ```
                            .trim();
const jsonRes = JSON.parse(cleanData);

//Storing the variable to get the details of orders
let result2 = {
    response : "not"
}

if(jsonRes.orderId != null){
    const order = await Order.findOne({orderId : jsonRes.orderId})
    if(order){
        // Find the user who had given the order !!
        const user = await User.findById(order.user);
        await User.updateOne({_id : order.user},{mood : jsonRes.mood, lastConversation : chat})
        //updated
        const updatedData ={
            name : user.name,
            mood : jsonRes.mood,
            lastConversation : chat
        }
        // Importing the socket io and send the instant update to Admin
        const io = req.app.get('socketio');
        if (io) {
            io.to("admin-room").emit("updated-data", updatedData);
            console.log("📢 Real-time update sent to Admin!");
        }
        result2 = await responseWithOrderId(order);
    }else{
        return res.json({success : false , message : "Order Doesn't exist !!"})
    }
}

res.json({success : true , AIreply : jsonRes , withOrderRes : result2})
} catch (error) {
        res.json({success : false , message : error.message})
    }
}

module.exports = {
    conversation
}

