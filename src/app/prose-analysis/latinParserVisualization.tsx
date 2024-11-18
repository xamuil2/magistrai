import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import '../output.json';

// TypeScript interfaces for the parsed data
interface MorphologicalFeatures {
  Case?: string;
  Gender?: string;
  Number?: string;
  Tense?: string;
  Mood?: string;
  Voice?: string;
  [key: string]: string | undefined;
}

interface Word {
  id: number;
  form: string;
  lemma: string;
  upos: string;
  xpos: string;
  feats: MorphologicalFeatures;
  head: number;
  deprel: string;
}

interface ParsedSentence {
  sent_id: number;
  text: string;
  words: Word[];
}

// Sample data using "Gallia est omnis divisa in partes tres"
const sampleData: ParsedSentence = JSON.stringify('../output.json');
// const sampleData: ParsedSentence = {
//   "sent_id": 1,
//   "text": "Gallia est omnis divisa in partes tres",
//   "words": [
//     {
//       "id": 1,
//       "form": "Gallia",
//       "lemma": "Gallia",
//       "upos": "NOUN",
//       "xpos": "N-",
//       "feats": {
//         "Case": "Nom",
//         "Gender": "Fem",
//         "Number": "Sing"
//       },
//       "head": 4,
//       "deprel": "nsubj"
//     },
//     {
//       "id": 2,
//       "form": "est",
//       "lemma": "sum",
//       "upos": "AUX",
//       "xpos": "V-",
//       "feats": {
//         "Mood": "Ind",
//         "Number": "Sing",
//         "Person": "3",
//         "Tense": "Pres"
//       },
//       "head": 4,
//       "deprel": "aux"
//     },
//     {
//       "id": 3,
//       "form": "omnis",
//       "lemma": "omnis",
//       "upos": "ADJ",
//       "xpos": "A-",
//       "feats": {
//         "Case": "Nom",
//         "Gender": "Fem",
//         "Number": "Sing"
//       },
//       "head": 1,
//       "deprel": "amod"
//     },
//     {
//       "id": 4,
//       "form": "divisa",
//       "lemma": "divido",
//       "upos": "VERB",
//       "xpos": "V-",
//       "feats": {
//         "Aspect": "Perf",
//         "Case": "Nom",
//         "Gender": "Fem",
//         "Number": "Sing",
//         "Voice": "Pass"
//       },
//       "head": 0,
//       "deprel": "root"
//     },
//     {
//       "id": 5,
//       "form": "in",
//       "lemma": "in",
//       "upos": "ADP",
//       "xpos": "R-",
//       "feats": {},
//       "head": 6,
//       "deprel": "case"
//     },
//     {
//       "id": 6,
//       "form": "partes",
//       "lemma": "pars",
//       "upos": "NOUN",
//       "xpos": "N-",
//       "feats": {
//         "Case": "Acc",
//         "Gender": "Fem",
//         "Number": "Plur"
//       },
//       "head": 4,
//       "deprel": "obl"
//     },
//     {
//       "id": 7,
//       "form": "tres",
//       "lemma": "tres",
//       "upos": "NUM",
//       "xpos": "M-",
//       "feats": {
//         "Case": "Acc",
//         "Gender": "Fem",
//         "Number": "Plur"
//       },
//       "head": 6,
//       "deprel": "nummod"
//     }
//   ]
// };

const LatinParserVisualization = ({ 
  parsedData = sampleData
}: { 
  parsedData?: ParsedSentence | null
}) => {
  if (!parsedData) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No parsed data available. Please enter a Latin sentence.</p>
        </CardContent>
      </Card>
    );
  }

  const getFeatureColor = (upos: string) => {
    const colors: { [key: string]: string } = {
      NOUN: 'bg-blue-100 text-blue-800',
      VERB: 'bg-green-100 text-green-800',
      ADJ: 'bg-purple-100 text-purple-800',
      ADP: 'bg-yellow-100 text-yellow-800',
      AUX: 'bg-pink-100 text-pink-800',
      NUM: 'bg-orange-100 text-orange-800',
      PRON: 'bg-indigo-100 text-indigo-800'
    };
    return colors[upos] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Latin Sentence Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Original sentence */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Original Text</h3>
            <p className="text-xl">{parsedData.text}</p>
          </div>

          {/* Word analysis grid */}
          <div className="grid gap-4">
            {parsedData.words.map((word) => (
              <Card key={word.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold">{word.form}</span>
                      <Badge variant="outline">{word.lemma}</Badge>
                      <Badge className={getFeatureColor(word.upos)}>{word.upos}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">Position: {word.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">Head: {word.head}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm font-semibold">Dependency: </span>
                        <span className="text-sm">{word.deprel}</span>
                      </div>
                    </div>

                    {/* Morphological features */}
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold mb-1">Morphological Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(word.feats || {}).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatinParserVisualization;