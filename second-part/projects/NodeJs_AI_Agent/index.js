import { GoogleGenerativeAI } from "@google/generative-ai";
import readlineSync from "readline-sync";
import { configDotenv } from "dotenv";
configDotenv();

const weather_apiKey = process.env.OPEN_WEATHER_API_KEY;
const gemini_apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(gemini_apiKey);
//The model uses the function name, docstring, parameters, and parameter type annotations to decide if it needs the function to best answer a prompt.

const getWeatherDetails = async (city = "") => {
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${weather_apiKey}`
    );
    const data = await resp.json();
    const obj = {
      city: city,
      temperature: `${(data.main.temp - 273).toFixed(2)}°C`,
      feelsLike: `${(data.main.feels_like - 273).toFixed(2)}°C`,
      minimumTemperature: `${(data.main.temp_min - 273).toFixed(2)}°C`,
      maximumTemperature: `${(data.main.temp_max - 273).toFixed(2)}°C`,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed}m/s`,
    };
    return obj;
  } catch (error) {
    console.log(error.message);
  }
};

const getWeatherDetailsFunctionDeclaration = {
  name: "weatherDetails",
  description:
    "weatherDetails is a function that accepts city name as string and returns the weather details",
  parameters: {
    type: "OBJECT",
    description: "Set the city to get the temperature of that city.",
    properties: {
      city: {
        type: "STRING",
        description:
          "will take some limited values : kolkata, delhi, chandigarh and bangalore for now",
      },
    },
    required: ["city"],
  },
};

// Executable function code. Put it in a map keyed by the function name
// so that you can call it once you get the name string from the model.
const functions = {
  weatherDetails: ({ city }) => {
    return getWeatherDetails(city);
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // Specify the function declaration.
  tools: {
    functionDeclarations: [getWeatherDetailsFunctionDeclaration],
  },
});

const chat = model.startChat();

while (true) {
  const query = readlineSync.question(">> ");
  // Send the message to the model.

  const result = await chat.sendMessage(query);
   console.log("AI :  Fetching Data...");
  // For simplicity, this uses the first function call found.
  const call = result.response.functionCalls()[0];
  if (call) {
    // Call the executable function named in the function call
    // with the arguments specified in the function call and
    // let it call the API.
    const apiResponse = await functions[call.name](call.args);

    // Send the API response back to the model so it can generate
    // a text response that can be displayed to the user.
    const result2 = await chat.sendMessage([
      {
        functionResponse: {
          name: "weatherDetails",
          response: apiResponse,
        },
      },
    ]);

    // Log the text response.
    console.log("AI : ", result2.response.text());
  }
}
