const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(req, res) {
  try {
    const response = await openai.createImage({
      prompt: "Penguin in the sky",
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({
      sucess: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      sucess: false,
      error: "Image couldn't be generated",
    });
  }
}

module.exports = {
  generateImage,
};
