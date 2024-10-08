import { useEffect, useState } from 'react';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const useQuoteFetch = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchQuoteAndImage();
  }, []);

  const fetchQuoteAndImage = async () => {
    try {
      // Fetch a random quote
      const quoteResponse = await fetch('https://zenquotes.io/api/random');
      const quoteData = await quoteResponse.json();
      const fetchedQuote = { text: quoteData[0].q, author: quoteData[0].a };
      setQuote(fetchedQuote);

      const imageResponse = await generateImage(fetchedQuote.text);
      if (imageResponse?.url) {
        setImageUrl(imageResponse.url);
      }
    } catch (error) {
      console.error('Error fetching quote or generating image:', error);
      setQuote({ text: 'Failed to fetch quote', author: 'Error' });
    }
  };

  const generateImage = async (quoteText: string) => {
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
            prompt: `An artistic illustration of "${quoteText}"`,
            n: 1,
            size: '1024x1024',
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
