import axios from 'axios';
import { useEffect, useState } from 'react';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const MOTIVATIONAL_KEY = process.env.EXPO_PUBLIC_MOTIVATIONAL_QUOTES_API_KEY;


export const useQuoteFetch = () => {
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const id = Math.floor(Math.random() * 623) + 1;

  useEffect(() => {
    fetchQuoteAndImage();
  }, []);

  const options = {
    method: 'GET',
    url: `https://motivational-content.p.rapidapi.com/quotes/${id}`,
    headers: {
      'x-rapidapi-key': `${MOTIVATIONAL_KEY}`,
      'x-rapidapi-host': 'motivational-content.p.rapidapi.com',
    },
  };

  const fetchQuoteAndImage = async () => {
    try {
      // Fetch a random quote
      const quoteResponse = await axios.request(options);
      const quoteData = quoteResponse.data;
      const fetchedQuote = quoteData.quote;
      setQuote(fetchedQuote);

      

      const imageResponse = await generateImage();
      if (imageResponse?.url) {
        setImageUrl(imageResponse.url);
      }
    } catch (error) {
      console.error('Error fetching quote or generating image:', error);
      setQuote('Error fetching quote');
    }
  };

  const generateImage = async () => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `A natural, serene illustration of a beautiful landscape, delicate flower, or a clear sky that evokes a nostalgic, calming feeling. The image should convey peacefulness and beauty without any text.`,
            n: 1,
            size: '256x256',
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API error: ${response.status} ${response.statusText}\n${JSON.stringify(errorData)}`
        );
      }

      const imageData = await response.json();

      // Ensure the response contains image data
      if (
        !imageData.data ||
        !Array.isArray(imageData.data) ||
        imageData.data.length === 0
      ) {
        throw new Error('Unexpected response format from OpenAI API');
      }

      return imageData.data[0]; // Return the first generated image object
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

  return { quote, fetchQuoteAndImage, imageUrl };
};
