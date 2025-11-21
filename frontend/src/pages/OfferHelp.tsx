import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OfferHelp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [] as string[],
    availability: "",
    location: "",
    isGoogleUser: false
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
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Registration failed.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Thank You for Volunteering!",
        description: "We'll contact you when your skills are needed.",
      });

      navigate("/");
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network Error",
        description: "Unable to reach the server.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);

    setFormData((prev) => ({
      ...prev,
      name: decoded.name || prev.name,
      email: decoded.email || "",
      isGoogleUser: true,
    }));

    toast({
      title: "Google Login Successful",
      description: "Your info has been auto-filled.",
    });
  };

  return (
    <div className="min-h-screen gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl animate-fade-in-up">

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-6 md:p-8 shadow-elegant border-success/20">

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Offer Help</h1>
            <p className="text-muted-foreground">
              Register as a volunteer. You can use Google login or fill the form manually.
            </p>
          </div>

          {/* ======================= GOOGLE LOGIN BUTTON ======================= */}
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                toast({ title: "Login Failed", variant: "destructive" })
              }
            />
          </div>

          {/* ======================= FORM ======================= */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email (auto-filled if using Google)</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label>Skills Available *</Label>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill}>{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Availability *</Label>
              <Select
                required
                value={formData.availability}
                onValueChange={(value) =>
                  setFormData({ ...formData, availability: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
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
              <Label>Current Location *</Label>
              <Input
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="City, Area"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || formData.skills.length === 0}
              className="w-full text-lg"
            >
              {loading ? "Registering..." : "Register as Volunteer"}
            </Button>
          </form>

        </Card>
      </div>
    </div>
  );
};

export default OfferHelp;
