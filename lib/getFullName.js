import { supabase } from './supabaseClient';

// 接続テスト関数
export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  const { data, error } = await supabase
    .from('ryakushou')
    .select('*');

  if (error) {
    console.error('Error testing Supabase connection:', error.message);
  } else {
    if (data.length === 0) {
      console.log('Supabase connection test successful, but no data found in the table.');
    } else {
      console.log('Supabase connection test successful:', data);
    }
  }
}

export async function getFullName(letter) {
  console.log(`Fetching data for letter: ${letter}`);
  const { data, error } = await supabase
    .from('ryakushou')
    .select('tip, seishikiname, explanation')
    .eq('tip', letter);

  if (error) {
    console.error(`Error fetching data for letter ${letter}:`, error.message);
    return { tip: letter, seishikiname: 'Not found', explanation: '該当のTipがありません' };
  }

  console.log(`Data fetched for letter ${letter}:`, data);
  
  if (data.length > 0) {
    // ランダムに1つのエントリーを選択
    const randomIndex = Math.floor(Math.random() * data.length);
    console.log(`Selected entry for letter ${letter}:`, data[randomIndex]);
    return data[randomIndex];
  } else {
    console.log(`No data found for letter ${letter}`);
    return { tip: letter, seishikiname: 'Not found', explanation: '該当のTipがありません' };
  }
}

export async function createFullName(inputStr) {
  console.log(`Creating full name for input: ${inputStr}`);
  const fullNamesPromises = inputStr.split('').map(char => getFullName(char.toUpperCase()));
  const fullNames = await Promise.all(fullNamesPromises);
  console.log('Full names fetched:', fullNames);
  return fullNames;
}
