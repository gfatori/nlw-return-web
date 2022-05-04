import { CloseButton } from "./CloseButton";
import bugImageUrl from '../Assets/Bug.svg';
import featureImageUrl from '../Assets/Idea.svg';
import suggestionImageUrl from '../Assets/Thought.svg';
import { useDebugValue, useState } from "react";
import { FeedbackChooseTypeStep } from "./WidgetForm/Steps/FeedbackChooseTypeStep";
import { FeedbackContentStep } from "./WidgetForm/Steps/FeedbackContentStep";

export const feedbackTypes = {
    BUG: {
        title: "Bug",
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    FEATURE: {
        title: "Feature",
        image: {
            source: featureImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    SUGGESTION: {
        title: "Sugestão",
        image: {
            source: suggestionImageUrl,
            alt: 'Imagem de uma nuvem de pensamento'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(): JSX.Element {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    function handleRestartFeedback() {
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {!feedbackType ? (
                <FeedbackChooseTypeStep onFeedbackTypeChange={setFeedbackType} />
            ) : (
                <FeedbackContentStep feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback} 
                />
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pelo <a className="underline underline-offset-2" href="https://rocketseat.com.br/"> Gabriel Fatori </a>
            </footer>
        </div>
    );
}
{/* <span className="text-xl leading-6"> Deixe seu feedback</span>
<CloseButton /> */}