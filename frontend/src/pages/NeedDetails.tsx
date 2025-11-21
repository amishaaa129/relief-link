import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Users,
  Calendar,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const NeedDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [need, setNeed] = useState<any>(null);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch need details
  useEffect(() => {
    const fetchNeed = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/needs/${id}`);
        const data = await res.json();

        if (data.success) {
          setNeed(data.need);
          setStatus(data.need.status || "pending");
        }
      } catch (err) {
        console.error("Failed to load need:", err);
      }

      setLoading(false);
    };

    fetchNeed();
  }, [id]);

  // ⭐ Fetch volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/volunteers");
        const data = await res.json();
        if (data.success) setVolunteers(data.volunteers);
      } catch (err) {
        console.error("Failed to load volunteers:", err);
      }
    };

    fetchVolunteers();
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "urgent";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "assigned":
        return "primary";
      case "resolved":
        return "success";
      default:
        return "muted";
    }
  };

  // ⭐ Update status
  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);

    try {
      await fetch(`http://localhost:5000/api/needs/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      toast({
        title: "Status Updated",
        description: `Status changed to ${newStatus}`,
      });
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // ⭐ Assign volunteer
  const handleAssignVolunteer = async () => {
    if (!selectedVolunteer) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/needs/${id}/assign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ volunteerId: selectedVolunteer }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("assigned");

        toast({
          title: "Volunteer Assigned",
          description: "The volunteer has been notified.",
        });
      }
    } catch (err) {
      console.error("Volunteer assignment failed:", err);
    }
  };

  if (loading || !need) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading request...</p>
      </div>
    );
  }

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
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{need.name}</h1>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={`bg-${getUrgencyColor(
                      need.urgency
                    )}/10 text-${getUrgencyColor(
                      need.urgency
                    )} border-${getUrgencyColor(need.urgency)}/20`}
                  >
                    {need.urgency.toUpperCase()} PRIORITY
                  </Badge>

                  <Badge
                    variant="outline"
                    className={`bg-${getStatusColor(
                      status
                    )}/10 text-${getStatusColor(
                      status
                    )} border-${getStatusColor(status)}/20`}
                  >
                    {status.toUpperCase()}
                  </Badge>

                  <Badge variant="outline">
                    {need.disasterType.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
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
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>{need.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>{need.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <span>{need.numberOfPeople} people affected</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span>{new Date(need.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Need Types */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Required Assistance</h2>
            <div className="flex flex-wrap gap-2">
              {need.needTypes.map((n: string) => (
                <Badge key={n} variant="secondary" className="px-4 py-2">
                  {n}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <h2 className="text-xl font-semibold">Situation Details</h2>
            </div>
            <p className="leading-relaxed">{need.description}</p>
          </Card>

          {/* Assign Volunteer */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Volunteer</h2>

            <div className="space-y-4">
              <Select
                value={selectedVolunteer}
                onValueChange={setSelectedVolunteer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select volunteer..." />
                </SelectTrigger>

                <SelectContent>
                  {volunteers.length === 0 && (
                    <SelectItem value="none" disabled>
                      No volunteers available
                    </SelectItem>
                  )}

                  {volunteers.map((v) => (
                    <SelectItem key={v._id} value={v._id}>
                      {v.name} — {v.skills.join(", ")}
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
