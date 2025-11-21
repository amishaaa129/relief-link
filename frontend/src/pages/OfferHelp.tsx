import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OfferHelp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: [] as string[],
    availability: "",
    location: ""
  });

  const skillOptions = [
    "Medical",
    "Logistics",
    "Transportation",
    "Rescue",
    "General Help",
    "Food Distribution"
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual API call
    // await fetch('/api/volunteers', { method: 'POST', body: JSON.stringify(formData) });
    
    toast({
      title: "Thank You for Volunteering!",
      description: "We'll contact you when your skills are needed.",
    });
    
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl animate-fade-in-up">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-6 md:p-8 shadow-elegant hover:shadow-hover transition-shadow border-success/20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-3">
              <span>Volunteer Registration</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Offer Help</h1>
            <p className="text-muted-foreground leading-relaxed">
              Register as a volunteer to help those in need during disasters. Your skills can save lives.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="text-lg py-6 hover:border-primary/30 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="text-lg py-6 hover:border-primary/30 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label>Skills Available * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2 hover-scale">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="cursor-pointer font-normal">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability Status *</Label>
              <Select
                required
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
              >
                <SelectTrigger className="text-lg py-6 hover:border-primary/30 transition-colors">
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Available Immediately</SelectItem>
                  <SelectItem value="within-24h">Within 24 hours</SelectItem>
                  <SelectItem value="within-week">Within a week</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Current Location *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Area"
                className="text-lg py-6 hover:border-primary/30 transition-colors"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || formData.skills.length === 0}
              className="w-full text-lg py-6 gradient-primary shadow-elegant hover:shadow-hover transition-all hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Registering...</span>
                </span>
              ) : (
                "Register as Volunteer"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default OfferHelp;
