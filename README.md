<!-- Live Links -->
#NOTE : I am using Free Render and Gemini studio for backend and AI simultaniously , So kindly please wait for 10-15 second so that my backend refresh .

https://rayeva-assignment.vercel.app
<!-- Landing Page & User Experience -->

Gateway Design : A professional, responsive landing page that introduces the Rayeva ecosystem, highlighting its commitment to sustainable commerce.

Dual Entry : Separate entry points for Admins (to access Module 1 & 4 Dashboard) and Customers (to access the AI Support Bot).

<!-- Secure Signup & Login -->

Bcrypt Password Hashing: To ensure industry-standard security, user passwords are never stored in plain text. I implemented Bcrypt.js, which uses a salt-round (10) to generate a secure hash. Even if the database is compromised, user credentials remain protected.

JWT Authorization: Upon successful login, the server issues a JSON Web Token (JWT). This token is required for all sensitive API requests, ensuring that only authorized Admins can approve AI-generated products or view customer chat logs.

<!-- Session Management & Expiry -->

Token Expiration: To prevent "perpetual session" security risks, JWTs are configured with an expiration time (e.g., 6h). This forces a re-authentication after the period ends, protecting the system from stale sessions on public devices.

Secure Storage: Tokens are handled via secure headers/cookies to prevent Cross-Site Scripting (XSS) attacks.


<!-- Module 1 -->
Module 1: AI Auto-Category & Tag Generator
    Workflow: When an Admin adds a new product, the system sends the title and description to the Gemini API.

    AI Capabilities: * Categorization: Auto-assigns a primary category from a predefined list and suggests a niche sub-category.

    SEO & Filters: Generates 5-10 SEO tags and relevant sustainability filters (e.g., Plastic-free, Vegan, Carbon-neutral).

    Human-in-the-Loop: To ensure 100% data accuracy, the AI returns a Structured JSON preview. The Admin must manually click "Approve" before the data is committed to the MongoDB database.

    Technical Highlight: Uses strict schema validation to ensure the AI output never breaks the frontend UI.

<!-- Module 4 -->

Module 4: AI Customer Support & Real-Time Escalation
    Database Grounding: Unlike a generic chatbot, this bot queries the Orders collection. It requires an orderId to provide specific status updates, ensuring the AI responses are grounded in real business data.

    Sentiment Analysis (Mood Score): Every user message is analyzed for sentiment. The AI returns a "Mood Score" : -1 (Very Frustrated) Or 1 (Happy) , by default 0 (If not talked with Ai).

    Real-Time Admin Dashboard (Socket.io): * Chat logs are pushed instantly to the Admin view using WebSockets.

    Visual Escalation: If the AI detects a Mood Score of 1 or 2 (High Priority), the Admin Dashboard triggers a Dynamic Red Glowing Effect around that specific chat tile, alerting the Admin to intervene immediately.

    Security: Customer data is protected; user passwords in the system are hashed using Bcrypt with Salt to ensure privacy.

<!-- Module 2  -->

Module 2: AI B2B Proposal Generator
Objective: To automate the creation of sustainable product proposals based on a client's budget and eco-goals.

Workflow:

1 . Input: The system receives a client’s budget_limit and sustainability_focus (e.g., "Plastic-Free" or "Recycled Materials").

2 . AI Engine: The backend queries the existing Product Database for items matching the focus. This list is sent to Gemini AI with a specific prompt: "Select a mix of these products that maximizes impact while staying under [Budget]."

3 . Processing: The AI calculates the quantity and allocation, ensuring the total cost is optimized.

4 . Structured Output: The AI returns a JSON object containing:

    4.1 suggested_mix: Array of product IDs and quantities.

    4.2 cost_breakdown: Detailed pricing for each item.

    4.3 impact_positioning: A 2-sentence marketing summary for the client.

5 . Storage: The proposal is saved in a Proposals collection for Admin review.

<!-- Module 3 -->

Module 3: AI Impact Reporting Generator
    Objective: To turn raw purchase data into human-readable environmental achievements.

    Workflow:

    1 . Trigger: Activated automatically when an order status is updated to "Delivered."

    2 . Logic-Based Estimation: The system retrieves the product details and applies pre-defined environmental coefficients (e.g., 1kg of recycled polyester = 0.5kg of plastic saved).

    3 . AI Synthesis: The raw numbers (Plastic saved, Carbon avoided) are sent to Gemini to be "humanized."

    4 . Prompt Strategy: "Convert these metrics: [X kg plastic saved] into a relatable story for a customer."

    5 . Output: The AI generates a human_readable_impact_statement (e.g., "By choosing this order, you saved the equivalent of 50 plastic bottles from entering the ocean!").

    6 . Persistence: This statement is stored in the Orders database and displayed on the customer's "Impact Dashboard."

