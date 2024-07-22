import { supabase } from './supabaseClient';

export async function getFullName(letter) {
  const { data, error } = await supabase
    .from('Ryakushou')
    .select('SeishikiName, explanation')
    .eq('Tip', letter);
  if (error) {
    console.error('Error fetching data:', error);
    return { name: letter, explanation: '' };
  }
  return data.length > 0 ? data[0] : { name: letter, explanation: '' };
}

export async function createFullName(inputStr) {
  const fullNamesPromises = inputStr.split('').map(char => getFullName(char.toUpperCase()));
  const fullNames = await Promise.all(fullNamesPromises);
  return fullNames;
}
