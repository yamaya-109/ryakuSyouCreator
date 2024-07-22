import { useState } from 'react';
import { createFullName } from '../lib/getFullName';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [fullNames, setFullNames] = useState([]);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User input:', userInput);
    try {
      const result = await createFullName(userInput);
      setFullNames(result);
      setOutput(prevOutput => [...prevOutput, `> ${command}`, ...result.map(item => `${item.Tip}: ${item.SeishikiName} - ${item.explanation}`)]);
    } catch (error) {
      console.error('Error creating full name:', error);
      setOutput(prevOutput => [...prevOutput, `> ${command}`, 'Error creating full name']);
    }
    setCommand('');
  };

  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target.value;
      console.log('Command received:', input);
      if (input.startsWith('input ')) {
        setUserInput(input.slice(6));
        await handleSubmit(e);
      } else {
        setOutput(prevOutput => [...prevOutput, `> ${input}`, 'Unknown command']);
      }
      setCommand('');
    } else {
      setCommand(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Command Line Interface</h1>
      <div className={styles.output}>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="commandInput"
          name="commandInput"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          className={styles.input}
          placeholder="Enter command"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Home;
