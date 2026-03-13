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
  AlertCircle,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface MythBusterManagementProps {
  onBack: () => void;
}

interface MythBuster {
  id: string;
  myth: string;
  fact: string;
  shortTeaser: string;
  fullExplanation: string;
  category: string;
  references: string[];
  isActive: boolean;
  createdAt: string;
  order: number;
}

export function MythBusterManagement({ onBack }: MythBusterManagementProps) {
  const [mythBusters, setMythBusters] = useState<MythBuster[]>([
    {
      id: "1",
      myth: "Astrology is just superstition with no scientific basis",
      fact: "Hindu Astrology (Jyotish Shastra) is a Vedic science with precise mathematical calculations",
      shortTeaser: "Is astrology just superstition?",
      fullExplanation: "Vedic Astrology, known as Jyotish Shastra, is one of the six Vedangas (limbs of the Vedas). It uses precise astronomical calculations based on the positions of planets, stars, and nakshatras. Ancient rishis observed celestial patterns and their correlation with earthly events over thousands of years.\n\nKey Scientific Aspects:\n• Based on mathematical astronomy and precise planetary positions\n• Uses sidereal zodiac aligned with actual star constellations\n• Incorporates lunar mansions (27 Nakshatras) for detailed predictions\n• Considers planetary strengths, aspects, and transits\n• Uses dasha systems for time-period analysis\n\nModern Research:\nStudies have shown correlations between planetary positions and human behavior patterns, though more research is needed. The precision of ancient calculations matches modern astronomy.",
      category: "Basics",
      references: ["Brihat Parashara Hora Shastra", "Jaimini Sutras"],
      isActive: true,
      createdAt: "2024-03-10",
      order: 1,
    },
    {
      id: "2",
      myth: "Your sun sign determines everything about you",
      fact: "Vedic astrology analyzes entire birth chart with 9 planets, 12 houses, and 27 nakshatras",
      shortTeaser: "Does your sun sign tell everything?",
      fullExplanation: "Unlike Western pop astrology that focuses mainly on Sun signs, Vedic astrology (Jyotish) considers your complete birth chart (Kundali) with multiple factors:\n\nKey Components:\n• Ascendant (Lagna) - Most important, changes every 2 hours\n• Moon Sign (Rashi) - Your emotional nature and mind\n• Sun Sign - Your soul and ego\n• 9 Planets (Navagrahas) - Including Rahu & Ketu (lunar nodes)\n• 12 Houses (Bhavas) - Different life areas\n• 27 Nakshatras - Lunar mansions for precise predictions\n• Planetary aspects (Drishti)\n• Planetary strengths (Shadbala)\n• Divisional charts (Vargas) for specific life areas\n\nYour Moon sign is actually considered more important in Vedic astrology than your Sun sign. Two people born on the same day can have completely different charts based on time and location.",
      category: "Chart Analysis",
      references: ["Brihat Jataka", "Saravali"],
      isActive: true,
      createdAt: "2024-03-09",
      order: 2,
    },
    {
      id: "3",
      myth: "Saturn (Shani) is always bad and brings only misfortune",
      fact: "Saturn is the planet of discipline, karma, and spiritual growth - teaches valuable life lessons",
      shortTeaser: "Is Saturn really the 'bad' planet?",
      fullExplanation: "Saturn (Shani Dev) is often misunderstood and feared, but it's actually a great teacher in Vedic astrology.\n\nSaturn's True Nature:\n• Planet of Karma - Delivers results of past actions\n• Teacher of Discipline - Rewards hard work and patience\n• Spiritual Catalyst - Pushes you toward moksha\n• Reality Check - Removes illusions and false hopes\n• Long-term Success - Builds lasting achievements\n\nPositive Saturn Influences:\n• Strong work ethic and responsibility\n• Wisdom through experience\n• Success in politics, law, labor, mining\n• Spiritual maturity and detachment\n• Organizational and leadership skills\n\nWell-placed Saturn:\nWhen favorably positioned, Saturn can grant wealth, authority, longevity, and spiritual wisdom. Many successful people have strong Saturn in their charts.\n\nThe key is to work with Saturn's energy through:\n• Honest hard work\n• Serving the elderly and disadvantaged\n• Patience and perseverance\n• Following dharma (righteous path)",
      category: "Planets",
      references: ["Brihat Parashara Hora Shastra - Saturn Chapter", "Phaladeepika"],
      isActive: true,
      createdAt: "2024-03-08",
      order: 3,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    myth: "",
    fact: "",
    shortTeaser: "",
    fullExplanation: "",
    category: "",
    references: "",
    order: mythBusters.length + 1,
  });

  const categories = ["Basics", "Planets", "Chart Analysis", "Remedies", "Marriage", "Philosophy", "Rituals"];

  const filteredMythBusters = mythBusters.filter(
    (mb) =>
      mb.myth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mb.fact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mb.shortTeaser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mb.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.myth || !formData.fact || !formData.shortTeaser || !formData.fullExplanation || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    const newMythBuster: MythBuster = {
      id: Date.now().toString(),
      myth: formData.myth,
      fact: formData.fact,
      shortTeaser: formData.shortTeaser,
      fullExplanation: formData.fullExplanation,
      category: formData.category,
      references: formData.references.split(",").map((ref) => ref.trim()).filter(Boolean),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      order: formData.order,
    };

    setMythBusters([...mythBusters, newMythBuster].sort((a, b) => a.order - b.order));
    setFormData({
      myth: "",
      fact: "",
      shortTeaser: "",
      fullExplanation: "",
      category: "",
      references: "",
      order: mythBusters.length + 2,
    });
    setIsAddingNew(false);
    toast.success("Myth Buster added successfully!");
  };

  const handleUpdate = () => {
    if (!editingId) return;

    setMythBusters(
      mythBusters.map((mb) =>
        mb.id === editingId
          ? {
              ...mb,
              myth: formData.myth,
              fact: formData.fact,
              shortTeaser: formData.shortTeaser,
              fullExplanation: formData.fullExplanation,
              category: formData.category,
              references: formData.references.split(",").map((ref) => ref.trim()).filter(Boolean),
              order: formData.order,
            }
          : mb
      ).sort((a, b) => a.order - b.order)
    );

    setEditingId(null);
    setFormData({
      myth: "",
      fact: "",
      shortTeaser: "",
      fullExplanation: "",
      category: "",
      references: "",
      order: mythBusters.length + 1,
    });
    toast.success("Myth Buster updated successfully!");
  };

  const handleEdit = (mb: MythBuster) => {
    setEditingId(mb.id);
    setFormData({
      myth: mb.myth,
      fact: mb.fact,
      shortTeaser: mb.shortTeaser,
      fullExplanation: mb.fullExplanation,
      category: mb.category,
      references: mb.references.join(", "),
      order: mb.order,
    });
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this myth buster?")) {
      setMythBusters(mythBusters.filter((mb) => mb.id !== id));
      toast.success("Myth Buster deleted successfully!");
    }
  };

  const toggleActive = (id: string) => {
    setMythBusters(
      mythBusters.map((mb) =>
        mb.id === id ? { ...mb, isActive: !mb.isActive } : mb
      )
    );
    toast.success("Status updated!");
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      myth: "",
      fact: "",
      shortTeaser: "",
      fullExplanation: "",
      category: "",
      references: "",
      order: mythBusters.length + 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-blue-600" />
                Myth Buster Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage daily educational content to bust astrology myths
              </p>
            </div>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Myth Buster
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Myth Busters</p>
                <h3 className="text-2xl text-gray-900 mt-1">{mythBusters.length}</h3>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Lightbulb className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <h3 className="text-2xl text-gray-900 mt-1">
                  {mythBusters.filter((mb) => mb.isActive).length}
                </h3>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <h3 className="text-2xl text-gray-900 mt-1">
                  {new Set(mythBusters.map((mb) => mb.category)).size}
                </h3>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <h3 className="text-2xl text-gray-900 mt-1">
                  {mythBusters.filter((mb) => !mb.isActive).length}
                </h3>
              </div>
              <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by myth, fact, teaser, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Add/Edit Form */}
        {(isAddingNew || editingId) && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                {editingId ? "Edit Myth Buster" : "Add New Myth Buster"}
              </h3>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="order">Display Order *</Label>
                  <Input
                    id="order"
                    type="number"
                    placeholder="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shortTeaser">Short Teaser (Question) *</Label>
                <Input
                  id="shortTeaser"
                  placeholder="e.g., Is astrology just superstition?"
                  value={formData.shortTeaser}
                  onChange={(e) =>
                    setFormData({ ...formData, shortTeaser: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="myth">Myth Statement *</Label>
                <Textarea
                  id="myth"
                  placeholder="Enter the common myth or misconception..."
                  value={formData.myth}
                  onChange={(e) => setFormData({ ...formData, myth: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="fact">Fact Statement *</Label>
                <Textarea
                  id="fact"
                  placeholder="Enter the actual fact or truth..."
                  value={formData.fact}
                  onChange={(e) => setFormData({ ...formData, fact: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="fullExplanation">Full Explanation *</Label>
                <Textarea
                  id="fullExplanation"
                  placeholder="Enter detailed explanation with sections separated by line breaks. Use bullet points with •"
                  value={formData.fullExplanation}
                  onChange={(e) =>
                    setFormData({ ...formData, fullExplanation: e.target.value })
                  }
                  rows={10}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatting tips: Use • for bullet points, headings should end with :, separate paragraphs with blank lines
                </p>
              </div>

              <div>
                <Label htmlFor="references">Vedic References (comma-separated)</Label>
                <Input
                  id="references"
                  placeholder="e.g., Brihat Parashara Hora Shastra, Jaimini Sutras"
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: e.target.value })
                  }
                />
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={editingId ? handleUpdate : handleAdd}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Myth Buster" : "Add Myth Buster"}
              </Button>
            </div>
          </Card>
        )}

        {/* Myth Busters List */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">
            All Myth Busters ({filteredMythBusters.length})
          </h3>

          {filteredMythBusters.map((mb) => (
            <Card key={mb.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 ${mb.isActive ? 'bg-blue-100' : 'bg-gray-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Lightbulb className={`h-5 w-5 ${mb.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600 text-white">#{mb.order}</Badge>
                      <Badge variant="outline" className="border-[#C74225] text-[#C74225]">
                        {mb.category}
                      </Badge>
                      <Badge variant={mb.isActive ? "default" : "outline"}>
                        {mb.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <h4 className="text-[#2C2C2C] font-medium mb-2">
                      {mb.shortTeaser}
                    </h4>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-start gap-2">
                        <div className="px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-700 flex-shrink-0">
                          MYTH
                        </div>
                        <p className="text-sm text-[#6B6B6B]">{mb.myth}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="px-2 py-1 bg-green-100 rounded text-xs font-medium text-green-700 flex-shrink-0">
                          FACT
                        </div>
                        <p className="text-sm text-[#2C2C2C]">{mb.fact}</p>
                      </div>
                    </div>

                    {mb.references.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                        <BookOpen className="h-3 w-3 text-[#C74225]" />
                        <span>{mb.references.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(mb.id)}
                  >
                    {mb.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(mb)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(mb.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredMythBusters.length === 0 && (
            <Card className="p-8 text-center">
              <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No myth busters found</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Myth Buster
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
