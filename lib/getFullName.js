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
  
  if (data.length > 0) {
    // ランダムに1つのエントリーを選択
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } else {
    return { Tip: letter, SeishikiName: letter, explanation: '' };
  }
}

export async function createFullName(inputStr) {
  console.log(`Creating full name for input: ${inputStr}`);
  const fullNamesPromises = inputStr.split('').map(char => getFullName(char.toUpperCase()));
  const fullNames = await Promise.all(fullNamesPromises);
  console.log('Full names fetched:', fullNames);
  return fullNames;
}
