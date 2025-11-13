import { useState, type ChangeEvent, type ReactNode } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QUESTION_DICTIONARY } from '@/constants/questions';
import { TwoSum } from '@/algorithms';

export const ListPage = () => {
  const { id } = useParams();
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [result, setResult] = useState<boolean | null>(null);

  let currentQuestion;
  if (id) {
    currentQuestion = QUESTION_DICTIONARY[Number(id)];
  }

  const handleCheckAnswer = () => {
    const result = TwoSum.validateAnswer(input, output);
    console.log(result);
    setResult(result);
  };

  let children: ReactNode;

  if (!currentQuestion) {
    children = <div>Not Found</div>;
  } else {
    const promptArray = currentQuestion.prompt.split('<br>');

    children = (
      <Card className="w-full max-w-2xl m-4">
        <CardHeader>
          <CardTitle>{currentQuestion.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {promptArray.map((prompt) => (
            <div key={prompt} className="flex flex-col gap-6 mb-1.5">
              {prompt}
            </div>
          ))}
          <div className="grid w-full max-w-sm items-center gap-3 mt-9.5">
            <Label htmlFor="input">Example Input: {currentQuestion.inputFormat}</Label>
            <Input
              id="input"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
              }}
            />

            <Label htmlFor="output">Example Output: {currentQuestion.outputFormat}</Label>
            <Input
              id="output"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setOutput(e.target.value);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleCheckAnswer} className="w-full">
            Check Answer
          </Button>
          {result !== null && <div>{result ? 'Correct' : 'Incorrect'}</div>}
        </CardFooter>
      </Card>
    );
  }
  return <div className="flex min-h-screen items-center justify-center">{children}</div>;
};
