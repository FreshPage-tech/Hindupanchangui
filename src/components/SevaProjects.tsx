import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Heart, Users, TrendingUp, Calendar, MapPin, HandHeart } from "lucide-react";

interface SevaProjectsProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function SevaProjects({ onNavigate }: SevaProjectsProps) {
  const projects = [
    {
      id: 1,
      title: "Education for Underprivileged",
      category: "Education",
      description: "Providing free education and study materials to children from economically weaker sections",
      location: "Multiple Centers",
      volunteers: 45,
      impact: "320 children supported",
      progress: 75,
      goal: "500 children",
      status: "active",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    },
    {
      id: 2,
      title: "Community Health Drive",
      category: "Healthcare",
      description: "Free health checkups and medical camps in rural areas",
      location: "Rural Villages",
      volunteers: 32,
      impact: "1,200+ people screened",
      progress: 60,
      goal: "2,000 people",
      status: "active",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    },
    {
      id: 3,
      title: "Environmental Conservation",
      category: "Environment",
      description: "Tree plantation and waste management initiatives",
      location: "City Parks & Areas",
      volunteers: 68,
      impact: "5,000 trees planted",
      progress: 50,
      goal: "10,000 trees",
      status: "active",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    },
    {
      id: 4,
      title: "Food Distribution",
      category: "Social Welfare",
      description: "Daily meal distribution to homeless and needy people",
      location: "Urban Areas",
      volunteers: 28,
      impact: "500 meals/day",
      progress: 85,
      goal: "1,000 meals/day",
      status: "active",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    },
    {
      id: 5,
      title: "Skill Development Program",
      category: "Education",
      description: "Vocational training for youth employment",
      location: "Training Centers",
      volunteers: 15,
      impact: "180 youth trained",
      progress: 45,
      goal: "400 youth",
      status: "active",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <h1 className="text-white mb-2">Seva Projects</h1>
        <p className="text-white/90">Serving the community with dedication</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <HandHeart className="h-6 w-6 text-[#C74225] mx-auto mb-2" />
            <div className="text-gray-900 mb-1">12</div>
            <div className="text-xs text-gray-600">Active Projects</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="h-6 w-6 text-[#C74225] mx-auto mb-2" />
            <div className="text-gray-900 mb-1">188</div>
            <div className="text-xs text-gray-600">Volunteers</div>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-[#C74225] mx-auto mb-2" />
            <div className="text-gray-900 mb-1">7K+</div>
            <div className="text-xs text-gray-600">Lives Impacted</div>
          </Card>
        </div>

        {/* Your Contribution */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gradient-to-r from-orange-50 to-white">
          <h3 className="mb-3">Your Contribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#C74225] mb-1">28 Hours</div>
              <div className="text-sm text-gray-600">Seva Time</div>
            </div>
            <div>
              <div className="text-[#C74225] mb-1">3 Projects</div>
              <div className="text-sm text-gray-600">Participated</div>
            </div>
          </div>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          <h3>Active Projects</h3>
          
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-l-4 border-[#C74225]">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-gray-900">{project.title}</h4>
                      <Badge className="bg-green-100 text-green-700">
                        {project.status}
                      </Badge>
                    </div>
                    <Badge className="bg-[#C74225]/10 text-[#C74225] mb-2">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  {project.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[#C74225]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-[#C74225]" />
                    <span>{project.volunteers} volunteers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-[#C74225]" />
                    <span>{project.impact}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Progress</span>
                    <span className="text-sm text-[#C74225]">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">
                    Goal: {project.goal}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => onNavigate("projectDetails", project)}
                    className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Volunteer
                  </Button>
                  <Button
                    onClick={() => onNavigate("donate", { project: project.id })}
                    variant="outline"
                    className="flex-1 border-[#C74225] text-[#C74225]"
                  >
                    Donate
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Start New Project */}
        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-white border-2 border-dashed border-[#C74225]/30">
          <HandHeart className="h-12 w-12 text-[#C74225] mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">Have a Project Idea?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your seva initiative with the community
          </p>
          <Button
            variant="outline"
            className="border-[#C74225] text-[#C74225]"
          >
            Propose Project
          </Button>
        </Card>
      </div>
    </div>
  );
}
