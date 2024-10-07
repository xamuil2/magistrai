import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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
          
          ${text}
          
          Given this latin passage, identify parts of speech and output the same text with added tags.

          Verbs should be tagged as <v>example<v> and nouns as <n>example<n>. Ignore any other parts of speech for now.
          
          Do not say anything else.

          `
        },
      ],
    });

    const output = completion.choices[0].message?.content?.trim();
    console.log(output);

    return NextResponse.json({ output: output });
  } catch (error) {
    console.error('Error during OpenAI API call:', error);
    return NextResponse.json({ error: 'Failed to fetch translation', details: (error as Error).message }, { status: 500 });
  }
}