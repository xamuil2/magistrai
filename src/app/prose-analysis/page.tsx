"use client"

import { useState } from 'react';
import { addVisualAnnotations } from './visualAnnotations'; // Import the separate script

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputString, setOutputString] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error('Failed to fetch output');
      }

      const data = await response.json();
      const output = data.translation;
      setOutputString(output);

      // Pass the output to the separate script for visual annotations
      addVisualAnnotations(output);
    } catch (error) {
      console.error('Error during output:', error);
      setOutputString('An error occurred while fetching the output.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark-blue">
      <div className="text-white text-7xl font-anek-latin font-bold -mt-8" style={{ textShadow: '3px 3px 0 black' }}>
        MagistrAI
      </div>
      <div className="text-white text-2xl italic font-anek-latin mt-4">
        ~ latin markup tool ~
      </div>
      <textarea
        className="mt-16 px-8 py-6 w-3/4 max-w-6xl h-96 text-3xl text-left text-white bg-transparent focus:outline-none resize-none tracking-widest leading-loose border-2 border-gray-500"
        placeholder="incipe scribere..."
        spellCheck="false"
        maxLength={500}
        style={{ textShadow: '1px 1px 0 black', letterSpacing: '0.1em' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        onClick={handleTranslate}
        className="mt-8 px-6 py-3 text-2xl text-white rounded-lg focus:outline-none border border-white transition-transform transform hover:scale-105" style={{ textShadow: '1px 1px 0 black' }}
      >
        Analyze
      </button>
      {outputString && (
        <div id="output" className="mt-8 px-10 py-6 w-3/4 max-w-6xl text-3xl text-left text-white bg-transparent border border-gray-500">
          {outputString}
        </div>
      )}
    </main>
  );
}