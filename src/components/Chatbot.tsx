import React from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { TripContext } from '../types/travel';
import { askTravelMindAI } from '../services/aiService';

interface ChatbotProps {
  tripContext: TripContext;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ tripContext }) => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your TRAVELMIND AI tourism assistant for **${tripContext.verified_destination?.name || tripContext.selected_district || 'your journey'}**.
You can ask me anything about:
• Day-by-day itineraries & optimal time slots
• What to pack or remaining items to pack
• Live weather & climate clothing recommendations
• Dietary & allergy safety precautions in ${tripContext.selected_district}
• Directions, nearby attractions & local transport`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map(m => ({ role: m.sender, text: m.text }));
      const response = await askTravelMindAI(query, tripContext, history);

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

      // Speak response if speech synthesis available
      if ('speechSynthesis' in window) {
        speakResponse(response);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          sender: 'assistant',
          text: "I'm checking verified travel records for your district. Please ask again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    try {
      window.speechSynthesis.cancel();
      const plainText = text.replace(/[*#•_]/g, '');
      const utterance = new SpeechSynthesisUtterance(plainText);
      
      // Match voice language
      const lang = tripContext.preferred_language || 'en';
      const langMap: Record<string, string> = {
        en: 'en-US',
        ta: 'ta-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ml: 'ml-IN',
        kn: 'kn-IN'
      };
      utterance.lang = langMap[lang] || 'en-US';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Web Speech Recognition for voice queries
  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser environment. Please type your query.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      const lang = tripContext.preferred_language || 'en';
      recognition.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const quickPrompts = [
    "What should I pack?",
    "Show my Day 2 plan",
    "Is it suitable for seniors?",
    "What is the weather?"
  ];

  return (
    <div className="flex flex-col h-[520px] bg-[#FFF8E6]/95 border-[3px] border-[#7A421F] rounded-3xl shadow-xl overflow-hidden">
      {/* Chatbot Header */}
      <div className="bg-[#7A421F] text-amber-50 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F28A20] text-white flex items-center justify-center border border-amber-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base leading-tight">
              TRAVELMIND AI Tourism Assistant
            </h3>
            <p className="text-xs text-amber-200/90 font-medium">
              Grounded in {tripContext.verified_destination?.name || tripContext.selected_district} context
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-1 text-xs font-bold"
              title="Stop speaking"
            >
              <VolumeX className="w-3.5 h-3.5" />
              Stop
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-amber-50/40">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-[#F28A20] text-white flex items-center justify-center shrink-0 border border-[#7A421F] mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-sm leading-relaxed border-2 ${
                  isUser
                    ? 'bg-[#F28A20] text-white border-[#B85D07] rounded-tr-none'
                    : 'bg-white text-[#4A2412] border-[#7A421F] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-medium">{m.text}</div>
                <div
                  className={`text-[10px] mt-1.5 font-bold ${
                    isUser ? 'text-amber-100 text-right' : 'text-[#7A421F]/70'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-amber-200 text-[#4A2412] flex items-center justify-center shrink-0 border border-[#7A421F] mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-bold text-[#7A421F] bg-amber-100/90 p-2.5 rounded-xl border border-[#7A421F] w-fit">
            <RefreshCw className="w-4 h-4 animate-spin text-[#F28A20]" />
            TRAVELMIND AI is retrieving travel intelligence...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Fast Prompts */}
      <div className="px-3 py-2 bg-amber-100/60 border-t border-[#7A421F]/30 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold text-[#4A2412] no-scrollbar">
        <span className="shrink-0 text-[#7A421F] flex items-center gap-0.5">
          <Sparkles className="w-3 h-3 text-[#F28A20]" /> Ask:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-white/90 border border-[#7A421F] hover:bg-amber-100 shadow-2xs transition-all active:scale-95"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#FFF8E6] border-t-2 border-[#7A421F] flex items-center gap-2">
        <button
          type="button"
          onClick={toggleVoiceInput}
          className={`p-2.5 rounded-xl border-2 border-[#7A421F] font-bold shadow-sm transition-all btn-3d ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#3FA9DD] text-white hover:bg-[#3296c6]'
          }`}
          title="Voice input"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask about ${tripContext.verified_destination?.name || 'itinerary, packing, food'}...`}
          className="flex-1 bg-white border-2 border-[#7A421F] rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#4A2412] focus:outline-none focus:ring-2 focus:ring-[#F28A20]"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs sm:text-sm shadow-sm hover:bg-[#de7b17] disabled:opacity-50 btn-3d"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
