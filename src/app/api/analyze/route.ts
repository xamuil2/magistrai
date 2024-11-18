import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.OPENAI_API_KEY;
// console.log('API Key:', apiKey); // Log the API key for debugging

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: Request) {
  const { text } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a latin analyzer.' },
        { role: 'user', content: `
          
          Given this latin passage, identify parts of speech and output the same text with added tags.

          Verbs should be tagged as <v>example<v> and nouns as <n>example<n>. Ignore any other parts of speech for now.
          
          Do not say anything else.

          You are an expert in Latin linguistics and natural language processing. Your task is to analyze the given Latin sentence and provide a detailed grammatical annotation in a structured JSON format. Follow these steps:

          1. Analyze the sentence as a whole.
          2. Break down each word, providing detailed linguistic information.
          3. Identify syntactic relationships between words.
          4. Output the analysis in the specified JSON structure.
          5. For the given Latin sentence, provide the following information in JSON format:

        sent_id: Assign a numeric identifier to the sentence.

        text: The full text of the Latin sentence.

        words: An array of objects, each representing a word in the sentence, containing:

          id: The word's position in the sentence (starting from 1).
          form: The word as it appears in the sentence.
          lemma: The dictionary form of the word.
          upos: The Universal Part-of-Speech tag (e.g., NOUN, VERB, ADJ, ADP, AUX, NUM, PRON).
          xpos: A more specific part-of-speech tag if applicable.
          feats: An object containing morphological features (e.g., Case, Number, Gender, Tense, Mood, Voice).
          head: The ID of this word's syntactic head (use 0 for the root of the sentence).
          deprel: The type of dependency relation to the head (e.g., nsubj, obj, conj, nmod).
          Ensure that your analysis is thorough and accurate, reflecting the complexities of Latin grammar.

        Example input:
        "Gallia est omnis divisa in partes tres."

        Produce the JSON structure for the given Latin sentence, following the format demonstrated in the example output below:

{
"sent_id": 1,
"text": "Gallia est omnis divisa in partes tres.",
"words": [
{
"id": 1,
"form": "Gallia",
"lemma": "Gallia",
"upos": "NOUN",
"xpos": "N-",
"feats": {
"Case": "Nom",
"Gender": "Fem",
"Number": "Sing"
},
"head": 3,
"deprel": "nsubj"
},
// ... (similar objects for each word in the sentence)
]
}

        Now, please analyze the following Latin sentence and provide the annotation in the specified JSON format:

${text}

          `
        },
      ],
    });

    const output = completion.choices[0].message?.content?.trim();
    // Parse the output string as JSON
    const jsonResponse = output ? JSON.parse(output) : null;

    const filePath = path.join(process.cwd(), 'output.json');
    fs.writeFileSync(filePath, JSON.stringify(jsonResponse, null, 2));

    return NextResponse.json({ output: output });
  } catch (error) {
    console.error('Error during OpenAI API call:', error);
    return NextResponse.json({ error: 'Failed to fetch translation', details: (error as Error).message }, { status: 500 });
  }
}