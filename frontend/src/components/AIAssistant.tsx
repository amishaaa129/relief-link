import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, Sparkles } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you find urgent needs, assign volunteers, or summarize reports. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setIsTyping(true);
    
    // Simulate AI response (in real app, this would call an AI API)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm a placeholder AI assistant. In the full version, I would analyze your request and provide intelligent insights about disaster relief coordination."
      }]);
      setIsTyping(false);
    }, 1000);

    setInput("");
  };

  return (
    <Card className="p-4 sticky top-4 shadow-elegant hover:shadow-hover transition-shadow border-primary/10 animate-slide-in-right">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="p-2 rounded-lg gradient-primary">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">AI Assistant</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Powered by AI
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg animate-fade-in ${
              message.role === "assistant"
                ? "bg-muted/50 text-foreground border border-border/50"
                : "gradient-primary text-white ml-8 shadow-elegant"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        ))}
        {isTyping && (
          <div className="p-3 rounded-lg bg-muted/50 text-foreground border border-border/50 animate-pulse">
            <p className="text-sm">AI is thinking...</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask AI to help..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="hover:border-primary/30 focus:border-primary transition-colors"
        />
        <Button 
          size="icon" 
          onClick={handleSend}
          className="gradient-primary hover:shadow-elegant transition-all hover:scale-105"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 Try asking: "Show me all urgent flood needs" or "Assign volunteers to high priority cases"
        </p>
      </div>
    </Card>
  );
};

export default AIAssistant;
