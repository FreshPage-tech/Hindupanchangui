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
  BookOpen,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ShlokaManagementProps {
  onBack: () => void;
}

interface Shloka {
  id: string;
  sanskritText: string;
  transliteration: string;
  englishTranslation: string;
  hindiTranslation: string;
  source: string;
  deity: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  scheduledDate?: string;
  order: number;
}

export function ShlokaManagement({ onBack }: ShlokaManagementProps) {
  const [shlokas, setShlokas] = useState<Shloka[]>([
    {
      id: "1",
      sanskritText: "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै ।\nॐ शान्तिः शान्तिः शान्तिः ॥",
      transliteration: "Om Saha Nāvavatu | Saha Nau Bhunaktu | Saha Vīryam Karavāvahai |\nTejasvi Nāvadhītamastu Mā Vidviṣāvahai |\nOm Śāntiḥ Śāntiḥ Śāntiḥ ||",
      englishTranslation: "May we both be protected. May we both be nourished. May we work together with great energy. May our study be enlightening and effective. May we not hate each other. Om Peace, Peace, Peace.",
      hindiTranslation: "हम दोनों की रक्षा हो। हम दोनों का पोषण हो। हम दोनों मिलकर ऊर्जा से कार्य करें। हमारा अध्ययन तेजस्वी और प्रभावी हो। हम एक दूसरे से द्वेष न करें। ॐ शांति, शांति, शांति।",
      source: "Taittiriya Upanishad",
      deity: "Universal",
      category: "Peace",
      isActive: true,
      createdAt: "2024-03-10",
      order: 1,
    },
    {
      id: "2",
      sanskritText: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
      transliteration: "Om Tryambakam Yajāmahe Sugandhim Puṣṭivardhanam |\nUrvārukamiva Bandhanānmṛtyormukṣīya Mā'mṛtāt ||",
      englishTranslation: "We worship the three-eyed one (Lord Shiva), who is fragrant and nourishes all beings. May he liberate us from death for the sake of immortality, just as a ripe cucumber is freed from its bondage to the vine.",
      hindiTranslation: "हम त्रिनेत्र भगवान शिव की पूजा करते हैं, जो सुगंधित हैं और सभी प्राणियों का पोषण करते हैं। वे हमें मृत्यु से मुक्त करें अमरता के लिए, जैसे पका हुआ खीरा बेल से मुक्त हो जाता है।",
      source: "Rigveda (7.59.12)",
      deity: "Lord Shiva",
      category: "Healing",
      isActive: true,
      createdAt: "2024-03-09",
      order: 2,
    },
    {
      id: "3",
      sanskritText: "ॐ भूर्भुवः स्वः ।\nतत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।\nधियो यो नः प्रचोदयात् ॥",
      transliteration: "Om Bhūr Bhuvaḥ Svaḥ |\nTat Savitur Vareṇyam Bhargo Devasya Dhīmahi |\nDhiyo Yo Naḥ Prachodayāt ||",
      englishTranslation: "Om, that which pervades the earth, atmosphere, and heaven. We meditate upon the sacred light of that divine Sun. May that light illuminate our minds and guide our intellect.",
      hindiTranslation: "ॐ, जो पृथ्वी, वायुमंडल और स्वर्ग में व्याप्त है। हम उस दिव्य सूर्य के पवित्र प्रकाश का ध्यान करते हैं। वह प्रकाश हमारी बुद्धि को प्रेरित और प्रकाशित करे।",
      source: "Rigveda (3.62.10)",
      deity: "Surya (Sun God)",
      category: "Wisdom",
      isActive: true,
      createdAt: "2024-03-08",
      order: 3,
    },
    {
      id: "4",
      sanskritText: "ॐ गं गणपतये नमः ।",
      transliteration: "Om Gam Ganapataye Namah |",
      englishTranslation: "Om, I bow to Lord Ganesha, the remover of obstacles and lord of new beginnings.",
      hindiTranslation: "ॐ, मैं भगवान गणेश को नमन करता हूं, जो विघ्नों को दूर करने वाले और नई शुरुआत के स्वामी हैं।",
      source: "Ganapati Upanishad",
      deity: "Lord Ganesha",
      category: "Obstacle Removal",
      isActive: true,
      createdAt: "2024-03-07",
      order: 4,
    },
    {
      id: "5",
      sanskritText: "ॐ नमो भगवते वासुदेवाय ।",
      transliteration: "Om Namo Bhagavate Vāsudevāya |",
      englishTranslation: "Om, I bow to Lord Vasudeva (Krishna), the Supreme Personality of Godhead.",
      hindiTranslation: "ॐ, मैं भगवान वासुदेव (कृष्ण) को नमन करता हूं, जो परम पुरुष हैं।",
      source: "Vishnu Purana",
      deity: "Lord Krishna",
      category: "Devotion",
      isActive: true,
      createdAt: "2024-03-06",
      order: 5,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sanskritText: "",
    transliteration: "",
    englishTranslation: "",
    hindiTranslation: "",
    source: "",
    deity: "",
    category: "",
    scheduledDate: "",
    order: shlokas.length + 1,
  });

  const categories = [
    "Peace",
    "Wisdom",
    "Healing",
    "Protection",
    "Prosperity",
    "Devotion",
    "Obstacle Removal",
    "Knowledge",
    "Success",
    "Family Harmony",
  ];

  const filteredShlokas = shlokas.filter(
    (shloka) =>
      shloka.sanskritText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shloka.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shloka.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shloka.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shloka.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (
      !formData.sanskritText ||
      !formData.englishTranslation ||
      !formData.source ||
      !formData.category
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const newShloka: Shloka = {
      id: Date.now().toString(),
      sanskritText: formData.sanskritText,
      transliteration: formData.transliteration,
      englishTranslation: formData.englishTranslation,
      hindiTranslation: formData.hindiTranslation,
      source: formData.source,
      deity: formData.deity,
      category: formData.category,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      scheduledDate: formData.scheduledDate || undefined,
      order: formData.order,
    };

    setShlokas([...shlokas, newShloka].sort((a, b) => a.order - b.order));
    setFormData({
      sanskritText: "",
      transliteration: "",
      englishTranslation: "",
      hindiTranslation: "",
      source: "",
      deity: "",
      category: "",
      scheduledDate: "",
      order: shlokas.length + 2,
    });
    setIsAddingNew(false);
    toast.success("Shloka added successfully!");
  };

  const handleUpdate = () => {
    if (!editingId) return;

    setShlokas(
      shlokas
        .map((shloka) =>
          shloka.id === editingId
            ? {
                ...shloka,
                sanskritText: formData.sanskritText,
                transliteration: formData.transliteration,
                englishTranslation: formData.englishTranslation,
                hindiTranslation: formData.hindiTranslation,
                source: formData.source,
                deity: formData.deity,
                category: formData.category,
                scheduledDate: formData.scheduledDate || undefined,
                order: formData.order,
              }
            : shloka
        )
        .sort((a, b) => a.order - b.order)
    );

    setEditingId(null);
    setFormData({
      sanskritText: "",
      transliteration: "",
      englishTranslation: "",
      hindiTranslation: "",
      source: "",
      deity: "",
      category: "",
      scheduledDate: "",
      order: shlokas.length + 1,
    });
    toast.success("Shloka updated successfully!");
  };

  const handleEdit = (shloka: Shloka) => {
    setEditingId(shloka.id);
    setFormData({
      sanskritText: shloka.sanskritText,
      transliteration: shloka.transliteration,
      englishTranslation: shloka.englishTranslation,
      hindiTranslation: shloka.hindiTranslation,
      source: shloka.source,
      deity: shloka.deity,
      category: shloka.category,
      scheduledDate: shloka.scheduledDate || "",
      order: shloka.order,
    });
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this shloka?")) {
      setShlokas(shlokas.filter((shloka) => shloka.id !== id));
      toast.success("Shloka deleted successfully!");
    }
  };

  const toggleActive = (id: string) => {
    setShlokas(
      shlokas.map((shloka) =>
        shloka.id === id ? { ...shloka, isActive: !shloka.isActive } : shloka
      )
    );
    toast.success("Status updated!");
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      sanskritText: "",
      transliteration: "",
      englishTranslation: "",
      hindiTranslation: "",
      source: "",
      deity: "",
      category: "",
      scheduledDate: "",
      order: shlokas.length + 1,
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
                <BookOpen className="h-6 w-6 text-[#C74225]" />
                Today's Shloka Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage daily Sanskrit shlokas with translations and meanings
              </p>
            </div>
          </div>
          <Button
            className="bg-[#C74225] hover:bg-[#C74225]/90"
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Shloka
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Shlokas</p>
                <h3 className="text-2xl text-gray-900 mt-1">{shlokas.length}</h3>
              </div>
              <div className="bg-orange-50 text-[#C74225] p-3 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <h3 className="text-2xl text-gray-900 mt-1">
                  {shlokas.filter((s) => s.isActive).length}
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
                  {new Set(shlokas.map((s) => s.category)).size}
                </h3>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <h3 className="text-2xl text-gray-900 mt-1">
                  {shlokas.filter((s) => s.scheduledDate).length}
                </h3>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by Sanskrit text, translation, source, deity, or category..."
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
                <BookOpen className="h-5 w-5 text-[#C74225]" />
                {editingId ? "Edit Shloka" : "Add New Shloka"}
              </h3>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C74225]"
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

                <div>
                  <Label htmlFor="scheduledDate">Schedule Date (Optional)</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="sanskritText">Sanskrit Text (Devanagari) *</Label>
                <Textarea
                  id="sanskritText"
                  placeholder="Enter the shloka in Sanskrit..."
                  value={formData.sanskritText}
                  onChange={(e) =>
                    setFormData({ ...formData, sanskritText: e.target.value })
                  }
                  rows={3}
                  className="font-sanskrit"
                />
              </div>

              <div>
                <Label htmlFor="transliteration">Transliteration (IAST/Roman)</Label>
                <Textarea
                  id="transliteration"
                  placeholder="Enter the transliteration in Roman script..."
                  value={formData.transliteration}
                  onChange={(e) =>
                    setFormData({ ...formData, transliteration: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="englishTranslation">English Translation *</Label>
                <Textarea
                  id="englishTranslation"
                  placeholder="Enter the English translation and meaning..."
                  value={formData.englishTranslation}
                  onChange={(e) =>
                    setFormData({ ...formData, englishTranslation: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hindiTranslation">Hindi Translation (Optional)</Label>
                <Textarea
                  id="hindiTranslation"
                  placeholder="हिंदी में अनुवाद..."
                  value={formData.hindiTranslation}
                  onChange={(e) =>
                    setFormData({ ...formData, hindiTranslation: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Source *</Label>
                  <Input
                    id="source"
                    placeholder="e.g., Rigveda, Bhagavad Gita, Upanishads"
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="deity">Associated Deity</Label>
                  <Input
                    id="deity"
                    placeholder="e.g., Lord Shiva, Goddess Lakshmi"
                    value={formData.deity}
                    onChange={(e) =>
                      setFormData({ ...formData, deity: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                className="w-full bg-[#C74225] hover:bg-[#C74225]/90"
                onClick={editingId ? handleUpdate : handleAdd}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Shloka" : "Add Shloka"}
              </Button>
            </div>
          </Card>
        )}

        {/* Shlokas List */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">
            All Shlokas ({filteredShlokas.length})
          </h3>

          {filteredShlokas.map((shloka) => (
            <Card key={shloka.id} className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 ${shloka.isActive ? 'bg-orange-100' : 'bg-gray-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xl ${shloka.isActive ? 'text-[#C74225]' : 'text-gray-400'}`}>ॐ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#C74225] text-white">#{shloka.order}</Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-700">
                        {shloka.category}
                      </Badge>
                      {shloka.deity && (
                        <Badge variant="outline" className="border-blue-500 text-blue-700">
                          {shloka.deity}
                        </Badge>
                      )}
                      <Badge variant={shloka.isActive ? "default" : "outline"}>
                        {shloka.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {shloka.scheduledDate && (
                        <Badge variant="outline" className="border-green-500 text-green-700">
                          📅 {shloka.scheduledDate}
                        </Badge>
                      )}
                    </div>

                    {/* Sanskrit Text */}
                    <p className="text-[#2C2C2C] mb-2 text-base font-sanskrit leading-relaxed">
                      {shloka.sanskritText}
                    </p>

                    {/* Transliteration */}
                    {shloka.transliteration && (
                      <p className="text-sm text-[#6B6B6B] italic mb-2">
                        {shloka.transliteration}
                      </p>
                    )}

                    {/* English Translation */}
                    <p className="text-sm text-[#6B6B6B] mb-2">
                      {shloka.englishTranslation}
                    </p>

                    {/* Hindi Translation */}
                    {shloka.hindiTranslation && (
                      <p className="text-sm text-[#6B6B6B] mb-2">
                        🇮🇳 {shloka.hindiTranslation}
                      </p>
                    )}

                    {/* Source */}
                    <p className="text-xs text-[#C74225]">— {shloka.source}</p>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(shloka.id)}
                  >
                    {shloka.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(shloka)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(shloka.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredShlokas.length === 0 && (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No shlokas found</p>
              <Button
                className="mt-4 bg-[#C74225] hover:bg-[#C74225]/90"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Shloka
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
