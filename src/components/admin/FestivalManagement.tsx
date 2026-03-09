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
  Save,
  X,
  Sparkles,
  Search,
  Upload,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FestivalManagementProps {
  onBack: () => void;
}

interface Festival {
  id: string;
  name: string;
  date: string;
  category: string;
  description: string;
  significance: string;
  rituals: string;
  mantras: string;
  audioUrl: string;
  isPremium: boolean;
}

export function FestivalManagement({ onBack }: FestivalManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [festivals, setFestivals] = useState<Festival[]>([
    {
      id: "1",
      name: "Mahashivratri",
      date: "2026-03-10",
      category: "Major Festival",
      description: "The Great Night of Shiva, a Hindu festival celebrated annually in honor of Lord Shiva.",
      significance: "Marks the convergence of Shiva and Shakti, symbolizing the union of consciousness and energy.",
      rituals: "Fasting, night-long vigil, offering of Bilva leaves, chanting Om Namah Shivaya",
      mantras: "Om Namah Shivaya, Mahamrityunjaya Mantra",
      audioUrl: "https://example.com/mahashivratri-mantras.mp3",
      isPremium: false,
    },
    {
      id: "2",
      name: "Holi",
      date: "2026-03-17",
      category: "Major Festival",
      description: "Festival of Colors celebrating the victory of good over evil and the arrival of spring.",
      significance: "Commemorates the burning of Holika and the divine love of Radha and Krishna.",
      rituals: "Holika Dahan bonfire, playing with colors, singing and dancing",
      mantras: "Om Sri Krishnaya Namah, Radhe Krishna mantras",
      audioUrl: "https://example.com/holi-songs.mp3",
      isPremium: false,
    },
  ]);

  const [formData, setFormData] = useState<Partial<Festival>>({
    name: "",
    date: "",
    category: "Major Festival",
    description: "",
    significance: "",
    rituals: "",
    mantras: "",
    audioUrl: "",
    isPremium: false,
  });

  const handleSave = () => {
    if (editingId) {
      setFestivals(
        festivals.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      toast.success("Festival updated successfully");
      setEditingId(null);
    } else {
      const newFestival: Festival = {
        id: Date.now().toString(),
        ...formData as Festival,
      };
      setFestivals([newFestival, ...festivals]);
      toast.success("New festival added successfully");
      setShowAddForm(false);
    }
    
    setFormData({
      name: "",
      date: "",
      category: "Major Festival",
      description: "",
      significance: "",
      rituals: "",
      mantras: "",
      audioUrl: "",
      isPremium: false,
    });
  };

  const handleEdit = (item: Festival) => {
    setFormData(item);
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this festival?")) {
      setFestivals(festivals.filter((item) => item.id !== id));
      toast.success("Festival deleted successfully");
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      date: "",
      category: "Major Festival",
      description: "",
      significance: "",
      rituals: "",
      mantras: "",
      audioUrl: "",
      isPremium: false,
    });
  };

  const filteredData = festivals.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl text-gray-900">Festival Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Add and manage festivals, celebrations, and pujas
              </p>
            </div>
          </div>
          <Button
            className="bg-[#C74225] hover:bg-[#C74225]/90"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Festival
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-900">
                {editingId ? "Edit Festival" : "Add New Festival"}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Festival Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Mahashivratri"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Major Festival, Regional"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="audioUrl">Audio URL</Label>
                  <Input
                    id="audioUrl"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    placeholder="URL to audio file"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the festival"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="significance">Significance</Label>
                <Textarea
                  id="significance"
                  value={formData.significance}
                  onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                  placeholder="Religious and cultural significance"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="rituals">Rituals</Label>
                <Textarea
                  id="rituals"
                  value={formData.rituals}
                  onChange={(e) => setFormData({ ...formData, rituals: e.target.value })}
                  placeholder="How to perform the rituals"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="mantras">Mantras</Label>
                <Textarea
                  id="mantras"
                  value={formData.mantras}
                  onChange={(e) => setFormData({ ...formData, mantras: e.target.value })}
                  placeholder="Important mantras to chant"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={formData.isPremium}
                  onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isPremium" className="cursor-pointer">
                  Premium Content (Requires Premium Subscription)
                </Label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                className="bg-[#C74225] hover:bg-[#C74225]/90"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update" : "Save"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search festivals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </Card>

        {/* Festivals List */}
        <div className="space-y-4">
          {filteredData.map((festival) => (
            <Card key={festival.id} className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-gray-900">{festival.name}</h3>
                      {festival.isPremium && (
                        <Badge className="bg-[#FFD700] text-gray-900">Premium</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-blue-100 text-blue-700">
                        {festival.category}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {new Date(festival.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(festival)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(festival.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600 font-medium">Description:</span>
                  <p className="text-gray-900 mt-1">{festival.description}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Significance:</span>
                  <p className="text-gray-900 mt-1">{festival.significance}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Rituals:</span>
                  <p className="text-gray-900 mt-1">{festival.rituals}</p>
                </div>
                {festival.audioUrl && (
                  <div>
                    <span className="text-gray-600 font-medium">Audio:</span>
                    <p className="text-blue-600 mt-1">{festival.audioUrl}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
