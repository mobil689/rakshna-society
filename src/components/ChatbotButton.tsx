import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotButton = () => {
    const [hasBeenClicked, setHasBeenClicked] = useState(false);

    const handleClick = () => {
        setHasBeenClicked(true);
        // Trigger the existing Chatbase chatbot
        if (window.chatbase) {
            window.chatbase('open');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
                fixed bottom-6 right-6 z-50 
                bg-primary hover:bg-primary-dark 
                text-primary-foreground 
                rounded-full p-4 
                shadow-lg hover:shadow-xl 
                transition-all duration-300 
                transform hover:scale-110 
                group
                ${hasBeenClicked ? '' : 'animate-float'}
            `}
            title="Chat with our AI Assistant"
        >
            <MessageCircle 
                className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" 
            />
            
            {/* Pulse ring effect */}
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-0 group-hover:opacity-100"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Ask me anything!
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-foreground"></div>
            </div>
        </button>
    );
};

// Extend the Window interface to include chatbase
declare global {
    interface Window {
        chatbase: any;
    }
}

export default ChatbotButton;
