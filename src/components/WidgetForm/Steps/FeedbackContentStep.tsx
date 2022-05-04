import { ArrowLeft } from "phosphor-react";
import { CloseButton } from "../../CloseButton"
import { FeedbackType, feedbackTypes } from "../../WidgetForm";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({
     feedbackType,  
     onFeedbackRestartRequested
    }: FeedbackContentStepProps): JSX.Element {
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    return (
        <>
            <header>
                <button 
                type="button" 
                className="top-6 left-5 absolute text-zinc-400 hover:text-zinc-100"
                onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"></img>{feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">

            </div>
        </>
    )
}