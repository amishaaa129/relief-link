import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Heart, Users, CheckCircle } from "lucide-react";

const Index = () => {
  const disasterTypes = [
    { img: "/images/floods.png", label: "Floods" },
    { img: "/images/fires.png", label: "Fires" },
    { img: "/images/earthquakes.png", label: "Earthquakes" },
    { img: "/images/cyclones.png", label: "Cyclones" },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Alert Banner */}
      <div className="bg-urgent text-urgent-foreground px-4 py-3 text-center shadow-urgent animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <span className="font-medium">High flood warning in Patiala region</span>
        </div>
      </div>

      {/* Hero Section with Background */}
      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url('/images/hero-bg.png')` }} // <-- Place your image here
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-2 animate-scale-in">
            <span>Connecting communities in crisis</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Disaster Relief Coordination Platform
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Connecting victims, volunteers, and organizers during emergencies. Fast, simple, and reliable coordination when it matters most.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/report-need" className="group">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 gradient-urgent shadow-urgent">
                Report a Need
              </Button>
            </Link>
            <Link to="/offer-help" className="group">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                Offer Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="justify-center text-center pt-16 px-4 bold text-2xl md:text-3xl">
      We coordinate Relief Efforts for:
      </div>
          {/* Disaster Type Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
            {disasterTypes.map((type, index) => (
              <Card
                key={type.label}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, height: "200px" }}
              >
                <img
                  src={type.img}
                  alt={type.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl drop-shadow-lg">
                    {type.label}
                  </span>
                </div>
              </Card>
            ))}
          </div>
      

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 py-12 max-w-2xl mx-auto text-center">
        <div className="group cursor-pointer">
          <div className="text-3xl md:text-4xl font-bold mb-2">1,234</div>
          <div className="text-sm text-muted-foreground flex justify-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Needs Resolved
          </div>
        </div>
        <div className="group cursor-pointer">
          <div className="text-3xl md:text-4xl font-bold text-success mb-2">567</div>
          <div className="text-sm text-muted-foreground flex justify-center gap-1">
            <Users className="h-4 w-4" />
            Active Volunteers
          </div>
        </div>
        <div className="group cursor-pointer">
          <div className="text-3xl md:text-4xl font-bold text-urgent mb-2 animate-pulse-subtle">89</div>
          <div className="text-sm text-muted-foreground flex justify-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Urgent Requests
          </div>
        </div>
      </div>

      {/* Organizer Dashboard */}
      <section className="border-t border-border py-8 bg-muted/30 text-center">
        <Link to="/dashboard" className="group inline-flex items-center gap-2">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Organizer Dashboard <span className="ml-1 group-hover:translate-x-1 transition">→</span>
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
