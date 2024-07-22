import { supabase } from './supabaseClient';

export async function getFullName(letter) {
  console.log(`Fetching data for letter: ${letter}`);
  const { data, error } = await supabase
    .from('Ryakushou')
    .select('Tip, SeishikiName, explanation')
    .eq('Tip', letter);
  if (error) {
    console.error('Error fetching data:', error.message);
    return { Tip: letter, SeishikiName: letter, explanation: '' };
  }
  console.log(`Data fetched for letter: ${letter}`, data);
  return data.length > 0 ? data[0] : { Tip: letter, SeishikiName: letter, explanation: '' };
}

export async function createFullName(inputStr) {
  console.log(`Creating full name for input: ${inputStr}`);
  const fullNamesPromises = inputStr.split('').map(char => getFullName(char.toUpperCase()));
  const fullNames = await Promise.all(fullNamesPromises);
  console.log('Full names fetched:', fullNames);
  return fullNames;
}
