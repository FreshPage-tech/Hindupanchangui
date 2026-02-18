import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, QrCode, CheckCircle, Wifi, WifiOff } from "lucide-react";

interface AttendanceScanProps {
  onBack: () => void;
}

export function AttendanceScan({ onBack }: AttendanceScanProps) {
  const [scanned, setScanned] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleScan = () => {
    setTimeout(() => {
      setScanned(true);
    }, 1500);
  };

  if (scanned) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
          <button onClick={onBack} className="mb-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-white">Attendance</h1>
        </div>

        <div className="p-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h2 className="text-gray-900 mb-2 text-center">
              Attendance Marked!
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              Your attendance for today's Shakha has been recorded successfully.
            </p>

            <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Date</span>
                <span className="text-gray-900">Nov 1, 2025</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Time</span>
                <span className="text-gray-900">6:05 AM</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Location</span>
                <span className="text-gray-900">Nehru Park</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="text-green-600">Present</span>
              </div>
            </div>

            <div className="flex gap-3 w-full max-w-sm">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => setScanned(false)}
                className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Scan Again
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                🎉 15-day attendance streak maintained!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Scan Attendance</h1>
        <p className="text-white/90">Sector 15 Morning Shakha</p>
      </div>

      {/* Offline Indicator */}
      <div className={`p-3 ${isOnline ? 'bg-green-100' : 'bg-yellow-100'}`}>
        <div className="flex items-center justify-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4 text-green-700" />
              <span className="text-sm text-green-700">Online Mode</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-yellow-700" />
              <span className="text-sm text-yellow-700">
                Offline Mode - Will sync when online
              </span>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* QR Scanner Frame */}
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute inset-0 border-4 border-[#C74225] rounded-3xl overflow-hidden">
              <div className="w-full h-full bg-gray-900/80 flex items-center justify-center">
                <QrCode className="h-20 w-20 text-white/50" />
              </div>
              
              {/* Scanning Line Animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C74225] animate-pulse"></div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#C74225] rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#C74225] rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#C74225] rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#C74225] rounded-br-3xl"></div>
          </div>

          <h3 className="text-gray-900 mb-2 text-center">
            Position QR Code Within Frame
          </h3>
          
          <p className="text-gray-600 text-center mb-6 max-w-sm">
            Ask your Shakha coordinator to show the attendance QR code. The code will be scanned automatically.
          </p>

          <Button
            onClick={handleScan}
            className="w-full max-w-sm bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Simulate Scan (Demo)
          </Button>

          <button
            onClick={() => setIsOnline(!isOnline)}
            className="mt-4 text-sm text-gray-500 underline"
          >
            Toggle Offline Mode
          </button>

          {/* Instructions */}
          <div className="mt-8 w-full max-w-sm bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="text-gray-900 mb-2">Instructions:</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Ensure good lighting for best results</li>
              <li>Hold camera steady</li>
              <li>Works offline - syncs automatically</li>
              <li>Contact coordinator if QR not available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
