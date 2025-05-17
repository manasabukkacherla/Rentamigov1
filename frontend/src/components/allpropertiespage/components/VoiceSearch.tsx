import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Loader2, X } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ 
  onResult, 
  isListening,
  setIsListening 
}) => {
  const [error, setError] = useState<string>('');
  const [isSupported, setIsSupported] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript: lastFinalTranscript,
    isFinalTranscript
  } = useSpeechRecognition({
    clearTranscriptOnListen: true
  });

  useEffect(() => {
    setIsSupported(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (isFinalTranscript && lastFinalTranscript) {
      setFinalTranscript(prev => {
        const newTranscript = prev ? `${prev} ${lastFinalTranscript}` : lastFinalTranscript;
        return newTranscript;
      });
    }
  }, [lastFinalTranscript, isFinalTranscript]);

  const startListening = useCallback(async () => {
    try {
      setError('');
      resetTranscript();
      setFinalTranscript('');
      await SpeechRecognition.startListening({ 
        continuous: true,
        language: 'en-IN' // Set to Indian English for better recognition
      });
      setIsListening(true);
      setShowModal(true);
    } catch (err) {
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  }, [setIsListening, resetTranscript]);

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setShowModal(false);
    
    // Use the accumulated final transcript plus any remaining transcript
    const fullTranscript = finalTranscript + (transcript ? ` ${transcript}` : '');
    if (fullTranscript.trim()) {
      // Process and normalize the transcript
      const normalizedTranscript = fullTranscript
        .toLowerCase()
        .replace(/rupees/g, 'rs')
        .replace(/thousand/g, 'k')
        .replace(/(\d+)\s*k/g, (_, num) => `${num}000`)
        .replace(/(\d+)\s*rupees/g, '$1')
        .replace(/price is/g, 'price')
        .replace(/cost is/g, 'cost')
        .replace(/rent is/g, 'rent')
        .trim();
      
      onResult(normalizedTranscript);
    }
  }, [transcript, finalTranscript, onResult, setIsListening]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isListening) {
        stopListening();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isListening, stopListening]);

  if (!isSupported) {
    return null;
  }

  const displayTranscript = finalTranscript + (transcript ? ` ${transcript}` : '');

  return (
    <>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-full transition-colors ${
          isListening 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isListening ? 'Stop voice search' : 'Start voice search'}
      >
        {isListening ? (
          listening ? <Mic size={20} /> : <Loader2 size={20} className="animate-spin" />
        ) : (
          <MicOff size={20} />
        )}
      </button>

      {error && (
        <div className="absolute top-full mt-2 left-0 bg-red-50 text-red-600 text-sm py-1 px-2 rounded">
          {error}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={stopListening}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                listening ? 'bg-red-500 animate-pulse' : 'bg-gray-200'
              }`}>
                <Mic size={40} className="text-white" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2">
                {listening ? 'Listening...' : 'Starting...'}
              </h2>
              
              {displayTranscript && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{displayTranscript}</p>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-4">
                {listening ? 'Press ESC or click X to stop recording' : 'Getting ready...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};