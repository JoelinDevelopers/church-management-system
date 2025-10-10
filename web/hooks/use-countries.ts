import { Country } from '@/types/system.contact.schema';
import { useState, useEffect } from 'react';



export const useCountryData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        // Assuming your JSON file is in public/data/countries.json
        // Adjust the path based on where you place your JSON file
        const response = await fetch('/data/countries.json');
        
        if (!response.ok) {
          throw new Error('Failed to load countries data');
        }
        
        const data = await response.json();
        
        // Handle both array format and object format
        const countriesArray = Array.isArray(data) ? data : data.countries || [];
        
        setCountries(countriesArray);
        setError(null);
      } catch (err) {
        console.error('Error loading countries:', err);
        setError('Failed to load countries data');
        // Fallback to empty array
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return { countries, loading, error };
};