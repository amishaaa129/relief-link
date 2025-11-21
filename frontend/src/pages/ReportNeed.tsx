import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const ReportNeed = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    disasterType: "",
    needTypes: [] as string[],
    numberOfPeople: "",
    location: "",
    description: "",
    urgency: ""
  });

  const needOptions = [
    "Food",
    "Shelter",
    "Medicine",
    "Rescue",
    "Clothing",
    "Clean Water"
  ];

  const handleNeedTypeToggle = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needTypes: prev.needTypes.includes(need)
        ? prev.needTypes.filter(n => n !== need)
        : [...prev.needTypes, need]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  if (!formData.disasterType || !formData.urgency) {
    toast({
      title: "Missing Fields",
      description: "Please select disaster type and urgency level.",
      variant: "destructive",
    });
    setLoading(false);
    return;
  }

  const payload = {
    ...formData,
    numberOfPeople: Number(formData.numberOfPeople),
  };

  try {
    const response = await fetch("http://localhost:5000/api/needs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to report need");

    toast({
      title: "Need Reported Successfully",
      description: "Our team will coordinate help as soon as possible.",
    });

    navigate("/dashboard");

  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
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

        <Card className="p-6 md:p-8 shadow-elegant hover:shadow-hover transition-shadow border-urgent/20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-urgent/10 text-urgent text-sm font-medium mb-3">
              <AlertCircle className="h-4 w-4" />
              <span>Emergency Request</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Report a Need</h1>
            <p className="text-muted-foreground leading-relaxed">
              Fill out this form to request help. Our team will coordinate assistance as soon as possible.
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
                className="text-lg py-6"
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
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disasterType">Disaster Type *</Label>
              <Select
                required
                value={formData.disasterType}
                onValueChange={(value) => setFormData({ ...formData, disasterType: value })}
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="cyclone">Cyclone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type of Need * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {needOptions.map((need) => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox
                      id={need}
                      checked={formData.needTypes.includes(need)}
                      onCheckedChange={() => handleNeedTypeToggle(need)}
                    />
                    <Label htmlFor={need} className="cursor-pointer font-normal">
                      {need}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of People Affected *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                required
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                placeholder="e.g., 5"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Area, Landmark"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select
                required
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Immediate help needed</SelectItem>
                  <SelectItem value="medium">Medium - Help needed soon</SelectItem>
                  <SelectItem value="low">Low - Can wait</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your situation in detail..."
                rows={4}
                className="text-lg resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || formData.needTypes.length === 0}
              className="w-full text-lg py-6 gradient-urgent shadow-urgent hover:shadow-hover transition-all hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Submitting...</span>
                </span>
              ) : (
                "Submit Need Report"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportNeed;
