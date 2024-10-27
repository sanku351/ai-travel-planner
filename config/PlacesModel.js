
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Location : Chennai, Tamil Nadu, India, for 3 Days and 2 Night for Just Me with a Moderate budget with a Flight details , Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image Url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format."},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"flightDetails\": {\n    \"airline\": \"IndiGo\",\n    \"flightNumber\": \"6E-2345\",\n    \"departureAirport\": \"Delhi (DEL)\",\n    \"arrivalAirport\": \"Chennai (MAA)\",\n    \"departureDate\": \"2024-03-15\",\n    \"departureTime\": \"10:00 AM\",\n    \"arrivalDate\": \"2024-03-15\",\n    \"arrivalTime\": \"12:30 PM\",\n    \"price\": \"₹5,000\",\n    \"bookingUrl\": \"https://www.goindigo.in/\"\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The Leela Palace Chennai\",\n      \"hotelAddress\": \"81, G.N. Chetty Road, Nungambakkam, Chennai, Tamil Nadu 600006\",\n      \"price\": \"₹8,000/night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898500/898545/898545_1280x960.jpg\",\n      \"geoCoordinates\": \"13.0667, 80.2333\",\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel with stunning views of the Bay of Bengal, offering fine dining, a spa and an outdoor pool.\"\n    },\n    {\n      \"hotelName\": \"ITC Grand Chola, a Luxury Collection Hotel, Chennai\",\n      \"hotelAddress\": \"63, Anna Salai, Teynampet, Chennai, Tamil Nadu 600018\",\n      \"price\": \"₹6,000/night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898500/898539/898539_1280x960.jpg\",\n      \"geoCoordinates\": \"13.0464, 80.2278\",\n      \"rating\": 4.0,\n      \"description\": \"Elegant hotel with multiple dining options, a spa, and a rooftop infinity pool.\"\n    },\n    {\n      \"hotelName\": \"Taj Coromandel, Chennai\",\n      \"hotelAddress\": \"37, Sardar Patel Road, Alwarpet, Chennai, Tamil Nadu 600018\",\n      \"price\": \"₹5,000/night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/899000/898500/898505/898505_1280x960.jpg\",\n      \"geoCoordinates\": \"13.0504, 80.2375\",\n      \"rating\": 4.2,\n      \"description\": \"Historic hotel with a blend of colonial charm and modern amenities, offering multiple dining options and a spa.\"\n    }\n  ],\n  \"travelPlan\": [\n    {\n      \"day\": 1,\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Kapaleeshwarar Temple\",\n      \"placeDetails\": \"Hindu temple dedicated to Lord Shiva, known for its intricate carvings and vibrant architecture.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kapaleeshwarar_Temple_Chennai_India.jpg/1280px-Kapaleeshwarar_Temple_Chennai_India.jpg\",\n      \"geoCoordinates\": \"13.0565, 80.2727\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"day\": 1,\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Marina Beach\",\n      \"placeDetails\": \"World's second longest urban beach, perfect for a leisurely stroll, enjoying the sunset, and trying local street food.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chennai_Marina_Beach.jpg/1280px-Chennai_Marina_Beach.jpg\",\n      \"geoCoordinates\": \"13.0488, 80.2702\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"30 minutes\"\n    },\n    {\n      \"day\": 1,\n      \"time\": \"Evening (6:00 PM - 8:00 PM)\",\n      \"placeName\": \"Fort St. George\",\n      \"placeDetails\": \"Historic fort built by the British East India Company, now home to the Madras High Court and various museums.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Fort_St_George_Chennai.jpg/1280px-Fort_St_George_Chennai.jpg\",\n      \"geoCoordinates\": \"13.0824, 80.2704\",\n      \"ticketPricing\": \"₹10\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"day\": 2,\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Government Museum\",\n      \"placeDetails\": \"Museum showcasing a diverse collection of artifacts from Tamil Nadu's history, art, and culture.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Government_Museum_Chennai%2C_India.jpg/1280px-Government_Museum_Chennai%2C_India.jpg\",\n      \"geoCoordinates\": \"13.0633, 80.2696\",\n      \"ticketPricing\": \"₹10\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"day\": 2,\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"San Thome Basilica\",\n      \"placeDetails\": \"Historic church built over the tomb of St. Thomas, an apostle of Jesus.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/San_Thome_Basilica%2C_Chennai_India.jpg/1280px-San_Thome_Basilica%2C_Chennai_India.jpg\",\n      \"geoCoordinates\": \"13.0473, 80.2665\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"day\": 2,\n      \"time\": \"Evening (6:00 PM - 8:00 PM)\",\n      \"placeName\": \"Parthasarathy Temple\",\n      \"placeDetails\": \"Hindu temple dedicated to Lord Krishna, known for its intricate carvings and vibrant architecture.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Parthasarathy_Temple_Chennai_India.jpg/1280px-Parthasarathy_Temple_Chennai_India.jpg\",\n      \"geoCoordinates\": \"13.0673, 80.2582\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"day\": 3,\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"placeName\": \"Valluvar Kottam\",\n      \"placeDetails\": \"Monument dedicated to the Tamil poet and philosopher Thiruvalluvar, known for its intricate carvings and beautiful architecture.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Valluvar_Kottam%2C_Chennai.jpg/1280px-Valluvar_Kottam%2C_Chennai.jpg\",\n      \"geoCoordinates\": \"13.0682, 80.2486\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"1 hour\"\n    },\n    {\n      \"day\": 3,\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"placeName\": \"Anna University\",\n      \"placeDetails\": \"Renowned university in Chennai, offering a campus tour to explore the academic facilities and surrounding area.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Anna_University_Campus%2C_Chennai.jpg/1280px-Anna_University_Campus%2C_Chennai.jpg\",\n      \"geoCoordinates\": \"13.0420, 80.2111\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"day\": 3,\n      \"time\": \"Evening (6:00 PM - 8:00 PM)\",\n      \"placeName\": \"Chennai Central Railway Station\",\n      \"placeDetails\": \"Historic railway station with beautiful architecture, offering a glimpse into the city's colonial past.\",\n      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chennai_Central_Railway_Station_India.jpg/1280px-Chennai_Central_Railway_Station_India.jpg\",\n      \"geoCoordinates\": \"13.0817, 80.2676\",\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"30 minutes\"\n    }\n  ]\n}\n```\n"},
            ],
          },
      ],
    });
  
    
  