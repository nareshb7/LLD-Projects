import { useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionOptions {
    lang?: string;
    continuous?: boolean;
}

interface UseSpeechRecognitionReturn {
    isSupported: boolean;
    listening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
}

export const useSpeechRecognition = (
    options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
    const { lang = "en-US", continuous = true } = options;

    const [isSupported, setIsSupported] = useState<boolean>(false);
    const [listening, setListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognitionConstructor =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognitionConstructor) {
            setIsSupported(false);
            return;
        }

        const recognition: SpeechRecognition = new SpeechRecognitionConstructor();
        recognition.lang = lang;
        recognition.continuous = continuous;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('started::', event.results)
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const transcriptChunk = result[0].transcript;

                if (result.isFinal) {
                    setTranscript((prev) => prev + transcriptChunk + " ");
                } else {
                    interimTranscript += transcriptChunk;
                }
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
        setIsSupported(true);
    }, [lang, continuous]);

    const startListening = () => {
        if (recognitionRef.current && !listening) {
            setTranscript("");
            recognitionRef.current.start();
            setListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && listening) {
            recognitionRef.current.stop();
            setListening(false);
        }
    };

    const resetTranscript = () => {
        setTranscript("");
    };

    return {
        isSupported,
        listening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
    };
};
