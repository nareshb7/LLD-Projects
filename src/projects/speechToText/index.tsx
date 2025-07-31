// SpeechToTextComponent.js
import React from "react";
import { useSpeechRecognition } from "./hook";

const SpeechToTextComponent = () => {
    const {
        isSupported,
        listening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
    } = useSpeechRecognition();

    if (!isSupported) {
        return <p>Your browser does not support Speech Recognition.</p>;
    }

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-2">Speech to Text</h2>

            <div className="mb-4">
                <p className="text-gray-700">Transcript:</p>
                <textarea className="form-control p-2 border min-h-[60px]" value={transcript} />
            </div>

            <div className="flex gap-2">
                {!listening ? (
                    <button onClick={startListening} className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded">
                        Start
                    </button>
                ) : (
                    <button onClick={stopListening} className="btn btn-primary px-4 py-2 bg-red-600 text-white rounded">
                        Stop
                    </button>
                )}
                <button onClick={resetTranscript} className="btn mx-2 btn-secondary px-4 py-2 bg-gray-400 text-white rounded">
                    Clear
                </button>
            </div>
        </div>
    );
};

export default SpeechToTextComponent;
