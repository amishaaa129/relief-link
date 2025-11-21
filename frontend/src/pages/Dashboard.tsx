import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// removed unused import Badge
import { Search, Filter, ArrowLeft, TrendingUp, Clock, AlertTriangle, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NeedCard from "@/components/NeedCard";
import AIAssistant from "@/components/AIAssistant";

// Mock data - will be replaced with API calls
const mockNeeds = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    disasterType: "flood",
    needTypes: ["Food", "Medicine", "Shelter"],
    numberOfPeople: 8,
    location: "Patiala, Sector 22",
    description: "Our entire neighborhood is flooded. We need immediate food supplies and medical assistance for elderly residents.",
    urgency: "high",
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z"
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    disasterType: "fire",
    needTypes: ["Clothing", "Shelter"],
    numberOfPeople: 4,
    location: "Chandigarh, Industrial Area",
    description: "Factory fire destroyed our housing. Need temporary shelter and clothing for family.",
    urgency: "high",
    status: "assigned",
    createdAt: "2024-01-20T09:15:00Z"
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 76543 21098",
    disasterType: "earthquake",
    needTypes: ["Rescue", "Medicine"],
    numberOfPeople: 2,
    location: "Mohali, Phase 7",
    description: "Building partially collapsed. Two people trapped but conscious. Need rescue team urgently.",
    urgency: "high",
    status: "pending",
    createdAt: "2024-01-20T11:00:00Z"
  },
  {
    id: "4",
    name: "Sanjay Verma",
    phone: "+91 65432 10987",
    disasterType: "flood",
    needTypes: ["Clean Water", "Food"],
    numberOfPeople: 5,
    location: "Ludhiana, Civil Lines",
    description: "Water supply contaminated due to flooding. Need clean drinking water and packaged food.",
    urgency: "medium",
    status: "resolved",
    createdAt: "2024-01-19T14:20:00Z"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDisaster, setFilterDisaster] = useState<string>("all");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredNeeds = mockNeeds.filter(need => {
    const matchesSearch = need.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDisaster = filterDisaster === "all" || need.disasterType === filterDisaster;
    const matchesUrgency = filterUrgency === "all" || need.urgency === filterUrgency;
    const matchesStatus = filterStatus === "all" || need.status === filterStatus;
    
    return matchesSearch && matchesDisaster && matchesUrgency && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="border-b border-border gradient-hero shadow-elegant">
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Organizer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage and coordinate relief efforts</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/")} className="hover:bg-muted/50 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 hover-lift cursor-pointer group shadow-elegant bg-gradient-to-br from-card to-urgent/5 border-urgent/20">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="h-5 w-5 text-urgent group-hover:scale-110 transition-transform" />
                <TrendingUp className="h-4 w-4 text-urgent/50" />
              </div>
              <div className="text-2xl font-bold text-urgent mb-1">{mockNeeds.filter(n => n.urgency === 'high').length}</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </Card>
            <Card className="p-4 hover-lift cursor-pointer group shadow-elegant bg-gradient-to-br from-card to-warning/5 border-warning/20">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-warning group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-warning/70">Active</span>
              </div>
              <div className="text-2xl font-bold text-warning mb-1">{mockNeeds.filter(n => n.status === 'pending').length}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </Card>
            <Card className="p-4 hover-lift cursor-pointer group shadow-elegant bg-gradient-to-br from-card to-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-primary/70">In Progress</span>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{mockNeeds.filter(n => n.status === 'assigned').length}</div>
              <div className="text-sm text-muted-foreground">Assigned</div>
            </Card>
            <Card className="p-4 hover-lift cursor-pointer group shadow-elegant bg-gradient-to-br from-card to-success/5 border-success/20">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-5 w-5 text-success group-hover:scale-110 transition-transform" />
                <TrendingUp className="h-4 w-4 text-success/50" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">{mockNeeds.filter(n => n.status === 'resolved').length}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 animate-fade-in-up">
            {/* Filters */}
            <Card className="p-5 mb-6 shadow-elegant hover:shadow-hover transition-shadow border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 hover:border-primary/30 transition-colors"
                  />
                </div>

                <Select value={filterDisaster} onValueChange={setFilterDisaster}>
                  <SelectTrigger>
                    <SelectValue placeholder="Disaster Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Disasters</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                    <SelectItem value="cyclone">Cyclone</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency</SelectItem>
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
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Needs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredNeeds.length} {filteredNeeds.length === 1 ? 'Request' : 'Requests'}
                </h2>
              </div>

              {filteredNeeds.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No requests match your filters</p>
                </Card>
              ) : (
                filteredNeeds.map(need => (
                  <NeedCard key={need.id} need={need} />
                ))
              )}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:w-96">
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
