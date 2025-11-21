import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Need {
  id: string;
  name: string;
  phone: string;
  disasterType: string;
  needTypes: string[];
  numberOfPeople: number;
  location: string;
  description: string;
  urgency: string;
  status: string;
  createdAt: string;
}

interface NeedCardProps {
  need: Need;
}

const NeedCard = ({ need }: NeedCardProps) => {
  const navigate = useNavigate();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "urgent";
      case "medium": return "warning";
      case "low": return "success";
      default: return "muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "assigned": return "primary";
      case "resolved": return "success";
      default: return "muted";
    }
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card 
      className="p-6 hover-lift cursor-pointer group shadow-elegant border-l-4 transition-all duration-300"
      style={{ 
        borderLeftColor: need.urgency === 'high' ? 'hsl(var(--urgent))' : 
                        need.urgency === 'medium' ? 'hsl(var(--warning))' : 
                        'hsl(var(--success))' 
      }}
      onClick={() => navigate(`/need/${need.id}`)}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{need.name}</h3>
            <div className="flex gap-2 flex-shrink-0">
              <Badge variant="outline" className={`bg-${getUrgencyColor(need.urgency)}/10 text-${getUrgencyColor(need.urgency)} border-${getUrgencyColor(need.urgency)}/20 whitespace-nowrap font-medium`}>
                {need.urgency.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={`bg-${getStatusColor(need.status)}/10 text-${getStatusColor(need.status)} border-${getStatusColor(need.status)}/20 whitespace-nowrap`}>
                {need.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              <span>{need.location}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Users className="h-4 w-4" />
              <span>{need.numberOfPeople} people affected</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Clock className="h-4 w-4" />
              <span>{timeAgo(need.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-foreground line-clamp-2 leading-relaxed">{need.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {need.needTypes.map(type => (
          <Badge key={type} variant="secondary" className="hover:bg-secondary/80 transition-colors">
            {type}
          </Badge>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full sm:w-auto group/btn hover:bg-primary hover:text-primary-foreground transition-all"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/need/${need.id}`);
        }}
      >
        View Details
        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};

export default NeedCard;
