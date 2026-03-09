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
  Calendar,
  Clock,
  Search,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PanchangManagementProps {
  onBack: () => void;
}

interface PanchangData {
  id: string;
  date: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  gulikaKaal: string;
  yamaganda: string;
  abhijitMuhurat: string;
  brahmaMuhurat: string;
  calendarType: string;
}

export function PanchangManagement({ onBack }: PanchangManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [panchangData, setPanchangData] = useState<PanchangData[]>([
    {
      id: "1",
      date: "2026-03-06",
      tithi: "Chaturdashi",
      nakshatra: "Rohini",
      yoga: "Siddha Yoga",
      sunrise: "6:24 AM",
      sunset: "5:47 PM",
      rahuKaal: "12:00 PM - 1:30 PM",
      gulikaKaal: "9:00 AM - 10:30 AM",
      yamaganda: "7:30 AM - 9:00 AM",
      abhijitMuhurat: "11:52 AM - 12:40 PM",
      brahmaMuhurat: "4:40 AM - 5:28 AM",
      calendarType: "Hindu",
    },
    {
      id: "2",
      date: "2026-03-07",
      tithi: "Purnima (Full Moon)",
      nakshatra: "Mrigashira",
      yoga: "Shiva Yoga",
      sunrise: "6:23 AM",
      sunset: "5:48 PM",
      rahuKaal: "10:30 AM - 12:00 PM",
      gulikaKaal: "9:00 AM - 10:30 AM",
      yamaganda: "3:00 PM - 4:30 PM",
      abhijitMuhurat: "11:53 AM - 12:41 PM",
      brahmaMuhurat: "4:39 AM - 5:27 AM",
      calendarType: "Hindu",
    },
  ]);

  const [formData, setFormData] = useState<Partial<PanchangData>>({
    date: "",
    tithi: "",
    nakshatra: "",
    yoga: "",
    sunrise: "",
    sunset: "",
    rahuKaal: "",
    gulikaKaal: "",
    yamaganda: "",
    abhijitMuhurat: "",
    brahmaMuhurat: "",
    calendarType: "Hindu",
  });

  const handleSave = () => {
    if (editingId) {
      // Update existing
      setPanchangData(
        panchangData.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      toast.success("Panchang data updated successfully");
      setEditingId(null);
    } else {
      // Add new
      const newData: PanchangData = {
        id: Date.now().toString(),
        ...formData as PanchangData,
      };
      setPanchangData([newData, ...panchangData]);
      toast.success("New Panchang data added successfully");
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      date: "",
      tithi: "",
      nakshatra: "",
      yoga: "",
      sunrise: "",
      sunset: "",
      rahuKaal: "",
      gulikaKaal: "",
      yamaganda: "",
      abhijitMuhurat: "",
      brahmaMuhurat: "",
      calendarType: "Hindu",
    });
  };

  const handleEdit = (item: PanchangData) => {
    setFormData(item);
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this Panchang data?")) {
      setPanchangData(panchangData.filter((item) => item.id !== id));
      toast.success("Panchang data deleted successfully");
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      date: "",
      tithi: "",
      nakshatra: "",
      yoga: "",
      sunrise: "",
      sunset: "",
      rahuKaal: "",
      gulikaKaal: "",
      yamaganda: "",
      abhijitMuhurat: "",
      brahmaMuhurat: "",
      calendarType: "Hindu",
    });
  };

  const filteredData = panchangData.filter((item) =>
    item.date.includes(searchTerm) ||
    item.tithi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nakshatra.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl text-gray-900">Panchang Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage daily panchang data and timings
              </p>
            </div>
          </div>
          <Button
            className="bg-[#C74225] hover:bg-[#C74225]/90"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-900">
                {editingId ? "Edit Panchang Data" : "Add New Panchang Data"}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="calendarType">Calendar Type</Label>
                <Input
                  id="calendarType"
                  value={formData.calendarType}
                  onChange={(e) =>
                    setFormData({ ...formData, calendarType: e.target.value })
                  }
                  placeholder="Hindu, Vedic, Tamil, etc."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tithi">Tithi</Label>
                <Input
                  id="tithi"
                  value={formData.tithi}
                  onChange={(e) => setFormData({ ...formData, tithi: e.target.value })}
                  placeholder="e.g., Chaturdashi"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="nakshatra">Nakshatra</Label>
                <Input
                  id="nakshatra"
                  value={formData.nakshatra}
                  onChange={(e) =>
                    setFormData({ ...formData, nakshatra: e.target.value })
                  }
                  placeholder="e.g., Rohini"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="yoga">Yoga</Label>
                <Input
                  id="yoga"
                  value={formData.yoga}
                  onChange={(e) => setFormData({ ...formData, yoga: e.target.value })}
                  placeholder="e.g., Siddha Yoga"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sunrise">Sunrise Time</Label>
                <Input
                  id="sunrise"
                  value={formData.sunrise}
                  onChange={(e) => setFormData({ ...formData, sunrise: e.target.value })}
                  placeholder="e.g., 6:24 AM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sunset">Sunset Time</Label>
                <Input
                  id="sunset"
                  value={formData.sunset}
                  onChange={(e) => setFormData({ ...formData, sunset: e.target.value })}
                  placeholder="e.g., 5:47 PM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="rahuKaal">Rahu Kaal</Label>
                <Input
                  id="rahuKaal"
                  value={formData.rahuKaal}
                  onChange={(e) =>
                    setFormData({ ...formData, rahuKaal: e.target.value })
                  }
                  placeholder="e.g., 12:00 PM - 1:30 PM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gulikaKaal">Gulika Kaal</Label>
                <Input
                  id="gulikaKaal"
                  value={formData.gulikaKaal}
                  onChange={(e) =>
                    setFormData({ ...formData, gulikaKaal: e.target.value })
                  }
                  placeholder="e.g., 9:00 AM - 10:30 AM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="yamaganda">Yamaganda</Label>
                <Input
                  id="yamaganda"
                  value={formData.yamaganda}
                  onChange={(e) =>
                    setFormData({ ...formData, yamaganda: e.target.value })
                  }
                  placeholder="e.g., 7:30 AM - 9:00 AM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="abhijitMuhurat">Abhijit Muhurat</Label>
                <Input
                  id="abhijitMuhurat"
                  value={formData.abhijitMuhurat}
                  onChange={(e) =>
                    setFormData({ ...formData, abhijitMuhurat: e.target.value })
                  }
                  placeholder="e.g., 11:52 AM - 12:40 PM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="brahmaMuhurat">Brahma Muhurat</Label>
                <Input
                  id="brahmaMuhurat"
                  value={formData.brahmaMuhurat}
                  onChange={(e) =>
                    setFormData({ ...formData, brahmaMuhurat: e.target.value })
                  }
                  placeholder="e.g., 4:40 AM - 5:28 AM"
                  className="mt-1"
                />
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
              placeholder="Search by date, tithi, or nakshatra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </Card>

        {/* Data List */}
        <div className="space-y-4">
          {filteredData.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C74225]/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-[#C74225]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <Badge className="mt-1 bg-blue-100 text-blue-700">
                      {item.calendarType}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Tithi:</span>
                  <p className="text-gray-900">{item.tithi}</p>
                </div>
                <div>
                  <span className="text-gray-600">Nakshatra:</span>
                  <p className="text-gray-900">{item.nakshatra}</p>
                </div>
                <div>
                  <span className="text-gray-600">Yoga:</span>
                  <p className="text-gray-900">{item.yoga}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sunrise:</span>
                  <p className="text-gray-900">{item.sunrise}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sunset:</span>
                  <p className="text-gray-900">{item.sunset}</p>
                </div>
                <div>
                  <span className="text-gray-600">Rahu Kaal:</span>
                  <p className="text-gray-900">{item.rahuKaal}</p>
                </div>
                <div>
                  <span className="text-gray-600">Gulika Kaal:</span>
                  <p className="text-gray-900">{item.gulikaKaal}</p>
                </div>
                <div>
                  <span className="text-gray-600">Abhijit Muhurat:</span>
                  <p className="text-gray-900">{item.abhijitMuhurat}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
