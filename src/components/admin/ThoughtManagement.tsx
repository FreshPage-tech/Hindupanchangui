import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Search,
  Save,
  X,
  Lightbulb,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ThoughtManagementProps {
  onBack: () => void;
}

interface Thought {
  id: string;
  sanskritText: string;
  englishTranslation: string;
  source: string;
  isActive: boolean;
  createdAt: string;
  scheduledDate?: string;
}

export function ThoughtManagement({ onBack }: ThoughtManagementProps) {
  const [thoughts, setThoughts] = useState<Thought[]>([
    {
      id: "1",
      sanskritText: "वसुधैव कुटुम्बकम्",
      englishTranslation: "The world is one family",
      source: "Maha Upanishad",
      isActive: true,
      createdAt: "2024-03-10",
    },
    {
      id: "2",
      sanskritText: "सत्यमेव जयते",
      englishTranslation: "Truth alone triumphs",
      source: "Mundaka Upanishad",
      isActive: true,
      createdAt: "2024-03-09",
    },
    {
      id: "3",
      sanskritText: "अहिंसा परमो धर्मः",
      englishTranslation: "Non-violence is the highest virtue",
      source: "Mahabharata",
      isActive: false,
      createdAt: "2024-03-08",
    },
    {
      id: "4",
      sanskritText: "योगः कर्मसु कौशलम्",
      englishTranslation: "Yoga is skill in action",
      source: "Bhagavad Gita",
      isActive: true,
      createdAt: "2024-03-07",
    },
    {
      id: "5",
      sanskritText: "विद्या ददाति विनयम्",
      englishTranslation: "Knowledge gives humility",
      source: "Hitopadesha",
      isActive: true,
      createdAt: "2024-03-06",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sanskritText: "",
    englishTranslation: "",
    source: "",
    scheduledDate: "",
  });

  const filteredThoughts = thoughts.filter(
    (thought) =>
      thought.sanskritText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.sanskritText || !formData.englishTranslation || !formData.source) {
      toast.error("Please fill all required fields");
      return;
    }

    const newThought: Thought = {
      id: Date.now().toString(),
      sanskritText: formData.sanskritText,
      englishTranslation: formData.englishTranslation,
      source: formData.source,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      scheduledDate: formData.scheduledDate || undefined,
    };

    setThoughts([newThought, ...thoughts]);
    setFormData({
      sanskritText: "",
      englishTranslation: "",
      source: "",
      scheduledDate: "",
    });
    setIsAddingNew(false);
    toast.success("Thought added successfully!");
  };

  const handleEdit = (thought: Thought) => {
    setEditingId(thought.id);
    setFormData({
      sanskritText: thought.sanskritText,
      englishTranslation: thought.englishTranslation,
      source: thought.source,
      scheduledDate: thought.scheduledDate || "",
    });
  };

  const handleUpdate = () => {
    if (!formData.sanskritText || !formData.englishTranslation || !formData.source) {
      toast.error("Please fill all required fields");
      return;
    }

    setThoughts(
      thoughts.map((thought) =>
        thought.id === editingId
          ? {
              ...thought,
              sanskritText: formData.sanskritText,
              englishTranslation: formData.englishTranslation,
              source: formData.source,
              scheduledDate: formData.scheduledDate || undefined,
            }
          : thought
      )
    );

    setEditingId(null);
    setFormData({
      sanskritText: "",
      englishTranslation: "",
      source: "",
      scheduledDate: "",
    });
    toast.success("Thought updated successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this thought?")) {
      setThoughts(thoughts.filter((thought) => thought.id !== id));
      toast.success("Thought deleted successfully!");
    }
  };

  const toggleActive = (id: string) => {
    setThoughts(
      thoughts.map((thought) =>
        thought.id === id ? { ...thought, isActive: !thought.isActive } : thought
      )
    );
    toast.success("Status updated successfully!");
  };

  const cancelForm = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      sanskritText: "",
      englishTranslation: "",
      source: "",
      scheduledDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">Thought of the Day Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage daily inspirational thoughts and wisdom quotes
            </p>
          </div>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-[#C74225] hover:bg-[#C74225]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Thought
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Add/Edit Form */}
        {(isAddingNew || editingId) && (
          <Card className="p-6 border-l-4 border-[#C74225]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900 font-medium">
                {editingId ? "Edit Thought" : "Add New Thought"}
              </h3>
              <Button variant="ghost" size="icon" onClick={cancelForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="sanskritText" className="text-gray-700">
                  Sanskrit Text <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="sanskritText"
                  value={formData.sanskritText}
                  onChange={(e) =>
                    setFormData({ ...formData, sanskritText: e.target.value })
                  }
                  placeholder="वसुधैव कुटुम्बकम्"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="englishTranslation" className="text-gray-700">
                  English Translation <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="englishTranslation"
                  value={formData.englishTranslation}
                  onChange={(e) =>
                    setFormData({ ...formData, englishTranslation: e.target.value })
                  }
                  placeholder="The world is one family"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="source" className="text-gray-700">
                  Source <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  placeholder="Maha Upanishad, Bhagavad Gita, etc."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="scheduledDate" className="text-gray-700">
                  Scheduled Date (Optional)
                </Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledDate: e.target.value })
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to make it available for random selection
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="bg-[#C74225] hover:bg-[#C74225]/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update" : "Save"} Thought
                </Button>
                <Button variant="outline" onClick={cancelForm}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search thoughts by text, translation, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Thoughts</p>
                <p className="text-2xl text-gray-900">{thoughts.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <ToggleRight className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl text-gray-900">
                  {thoughts.filter((t) => t.isActive).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl text-gray-900">
                  {thoughts.filter((t) => t.scheduledDate).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Thoughts List */}
        <div className="space-y-3">
          {filteredThoughts.length === 0 ? (
            <Card className="p-8 text-center">
              <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No thoughts found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery
                  ? "Try a different search query"
                  : "Add your first thought to get started"}
              </p>
            </Card>
          ) : (
            filteredThoughts.map((thought) => (
              <Card key={thought.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-[#C74225]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={thought.isActive ? "default" : "secondary"}
                            className={
                              thought.isActive
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }
                          >
                            {thought.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {thought.scheduledDate && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              {thought.scheduledDate}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleActive(thought.id)}
                          className="h-8 w-8"
                        >
                          {thought.isActive ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(thought)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(thought.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg text-gray-900 italic">
                        {thought.sanskritText}
                      </p>
                      <p className="text-sm text-gray-700">
                        {thought.englishTranslation}
                      </p>
                      <p className="text-xs text-gray-500">— {thought.source}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Created: {new Date(thought.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Help Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-blue-900 font-medium mb-1">Tips</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Active thoughts will be shown in rotation on the dashboard</li>
                <li>• Use scheduled dates for specific festivals or occasions</li>
                <li>• Sanskrit text should be in Devanagari script for authenticity</li>
                <li>• Keep translations concise and meaningful</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
