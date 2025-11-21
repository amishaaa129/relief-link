import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Flame, Waves, Wind, Mountain, Heart, Users, CheckCircle } from "lucide-react";

const Index = () => {
  const disasterTypes = [
    { icon: Waves, label: "Floods", color: "text-primary" },
    { icon: Flame, label: "Fires", color: "text-urgent" },
    { icon: Mountain, label: "Earthquakes", color: "text-warning" },
    { icon: Wind, label: "Cyclones", color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Alert Banner */}
      <div className="bg-urgent text-urgent-foreground px-4 py-3 text-center shadow-urgent animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <AlertCircle className="h-5 w-5 animate-pulse-subtle" />
          <span className="font-medium">High flood warning in Patiala region</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="gradient-hero container mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-scale-in">
            <Heart className="h-4 w-4" />
            <span>Connecting communities in crisis</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Disaster Relief Coordination Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connecting victims, volunteers, and organizers during emergencies. Fast, simple, and reliable coordination when it matters most.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/report-need" className="group">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 gradient-urgent shadow-urgent hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                Report a Need
                <AlertCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
            <Link to="/offer-help" className="group">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-elegant">
                Offer Help
                <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Disaster Types */}
          <div className="pt-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-6 font-medium">We coordinate relief for:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {disasterTypes.map((type, index) => (
                <Card 
                  key={type.label} 
                  className="p-6 hover-lift cursor-pointer group shadow-elegant"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${type.color} group-hover:scale-110 transition-transform duration-300`}>
                      <type.icon className="h-10 w-10" />
                    </div>
                    <span className="font-medium text-foreground">{type.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
            <div className="text-center group cursor-pointer hover-scale">
              <div className="text-3xl md:text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">1,234</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Needs Resolved
              </div>
            </div>
            <div className="text-center group cursor-pointer hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">567</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                Active Volunteers
              </div>
            </div>
            <div className="text-center group cursor-pointer hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-urgent mb-2 animate-pulse-subtle">89</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Urgent Requests
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access for Organizers */}
      <section className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Link to="/dashboard" className="group inline-flex items-center gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors">
              Organizer Dashboard 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
