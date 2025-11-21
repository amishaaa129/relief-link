import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MapPin, Users, Calendar, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app, fetch based on ID
const mockNeed = {
  id: "1",
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  disasterType: "flood",
  needTypes: ["Food", "Medicine", "Shelter"],
  numberOfPeople: 8,
  location: "Patiala, Sector 22",
  description: "Our entire neighborhood is flooded. We need immediate food supplies and medical assistance for elderly residents. The water level has risen to 4 feet and we're stuck on the first floor.",
  urgency: "high",
  status: "pending",
  createdAt: "2024-01-20T10:30:00Z"
};

const mockVolunteers = [
  { id: "v1", name: "Dr. Sarah Johnson", skills: ["Medical"], availability: "immediate" },
  { id: "v2", name: "Ravi Singh", skills: ["Transportation", "General Help"], availability: "within-24h" },
  { id: "v3", name: "Meera Patel", skills: ["Food Distribution"], availability: "immediate" }
];

const NeedDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [status, setStatus] = useState(mockNeed.status);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

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

  const handleAssignVolunteer = () => {
    if (!selectedVolunteer) return;
    
    toast({
      title: "Volunteer Assigned",
      description: "The volunteer has been notified and will reach out soon.",
    });
    setStatus("assigned");
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Request status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid gap-6">
          {/* Main Details Card */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{mockNeed.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`bg-${getUrgencyColor(mockNeed.urgency)}/10 text-${getUrgencyColor(mockNeed.urgency)} border-${getUrgencyColor(mockNeed.urgency)}/20`}>
                    {mockNeed.urgency.toUpperCase()} PRIORITY
                  </Badge>
                  <Badge variant="outline" className={`bg-${getStatusColor(status)}/10 text-${getStatusColor(status)} border-${getStatusColor(status)}/20`}>
                    {status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {mockNeed.disasterType.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span className="font-medium">{mockNeed.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{mockNeed.location}</span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>{mockNeed.numberOfPeople} people affected</span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Reported {new Date(mockNeed.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Needs Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Required Assistance</h2>
            <div className="flex flex-wrap gap-2">
              {mockNeed.needTypes.map(need => (
                <Badge key={need} variant="secondary" className="text-base px-4 py-2">
                  {need}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Description Card */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <h2 className="text-xl font-semibold">Situation Details</h2>
            </div>
            <p className="text-foreground leading-relaxed">{mockNeed.description}</p>
          </Card>

          {/* Assign Volunteer Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Volunteer</h2>
            <div className="space-y-4">
              <Select value={selectedVolunteer} onValueChange={setSelectedVolunteer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a volunteer..." />
                </SelectTrigger>
                <SelectContent>
                  {mockVolunteers.map(volunteer => (
                    <SelectItem key={volunteer.id} value={volunteer.id}>
                      {volunteer.name} - {volunteer.skills.join(", ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={handleAssignVolunteer}
                disabled={!selectedVolunteer || status === "resolved"}
                className="w-full"
              >
                Assign Volunteer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NeedDetails;
