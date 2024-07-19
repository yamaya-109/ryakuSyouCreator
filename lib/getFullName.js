import { supabase } from './supabaseClient';

export async function getFullName(letter) {
  const { data, error } = await supabase
    .from('Ryakushou')
    .select('SeishikiName')
    .eq('Tip', letter);
  if (error) {
    console.error('Error fetching data:', error);
    return letter;
  }
  return data.length > 0 ? data[0].SeishikiName : letter;
}

export async function createFullName(inputStr) {
  const fullNamesPromises = inputStr.split('').map(char => getFullName(char.toUpperCase()));
  const fullNames = await Promise.all(fullNamesPromises);
  return fullNames.join(' ');
}
