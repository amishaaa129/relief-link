import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Filter,
  ArrowLeft,
  TrendingUp,
  Clock,
  AlertTriangle,
  Users,
  CheckCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import NeedCard from "@/components/NeedCard";
import AIAssistant from "@/components/AIAssistant";

const Dashboard = () => {
  const navigate = useNavigate();

  const [needs, setNeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDisaster, setFilterDisaster] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch needs from backend API
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/needs");
        const data = await res.json();

        console.log("Fetched needs:", data); // DEBUG

        if (data.success && Array.isArray(data.needs)) {
          setNeeds(data.needs);
        } else {
          console.warn("Unexpected API response", data);
        }
      } catch (error) {
        console.error("API fetch error:", error);
      }

      setLoading(false);
    };

    fetchNeeds();
  }, []);

  // Filtering logic
  const filteredNeeds = needs.filter((need) => {
    const name = need.name || "";
    const location = need.location || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisaster =
      filterDisaster === "all" || need.disasterType === filterDisaster;

    const matchesUrgency =
      filterUrgency === "all" || need.urgency === filterUrgency;

    const matchesStatus =
      filterStatus === "all" || need.status === filterStatus;

    return matchesSearch && matchesDisaster && matchesUrgency && matchesStatus;
  });

  // Stats
  const highPriority = needs.filter((n) => n.urgency === "high").length;
  const pending = needs.filter((n) => n.status === "pending").length;
  const assigned = needs.filter((n) => n.status === "assigned").length;
  const resolved = needs.filter((n) => n.status === "resolved").length;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="border-b border-border gradient-hero shadow-elegant">
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Organizer Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and coordinate relief efforts
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 bg-gradient-to-br from-card to-warning/5 border-warning/20 shadow-elegant">
              <AlertTriangle className="h-5 w-5 text-warning mb-2" />
              <div className="text-2xl font-bold text-warning">{highPriority}</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card to-warning/5 border-warning/20 shadow-elegant">
              <Clock className="h-5 w-5 text-warning mb-2" />
              <div className="text-2xl font-bold text-warning">{pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card to-warning/5 border-warning/20 shadow-elegant">
              <Users className="h-5 w-5 text-warning mb-2" />
              <div className="text-2xl font-bold text-warning">{assigned}</div>
              <div className="text-sm text-muted-foreground">Assigned</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-card to-warning/5 border-warning/20 shadow-elegant">
              <CheckCircle className="h-5 w-5 text-warning mb-2" />
              <div className="text-2xl font-bold text-warning">{resolved}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {/* Filters */}
            <Card className="p-5 mb-6 shadow-elegant border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or location…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select
                  value={filterDisaster}
                  onValueChange={setFilterDisaster}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="cyclone">Cyclone</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterUrgency}
                  onValueChange={setFilterUrgency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Needs List */}
            {loading ? (
              <p className="text-muted-foreground">Loading…</p>
            ) : filteredNeeds.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No requests found</p>
              </Card>
            ) : (
              filteredNeeds.map((need) => (
                <NeedCard key={need._id} need={need} />
              ))
            )}
          </div>

          {/* AI Assistant */}
          <div className="lg:w-96">
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
