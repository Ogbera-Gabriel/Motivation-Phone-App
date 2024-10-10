import axios from 'axios';
import { useEffect, useState } from 'react';

const MOTIVATIONAL_KEY = process.env.EXPO_PUBLIC_MOTIVATIONAL_QUOTES_API_KEY;


export const useQuoteFetch = () => {
  const [quote, setQuote] = useState('');
  

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
      
    } catch (error) {
      console.error('Error fetching quote or generating image:', error);
      setQuote('Error fetching quote');
    }
  };

    return { quote, fetchQuoteAndImage };
};
