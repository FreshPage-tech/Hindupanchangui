import { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, X } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  mini?: boolean;
}

export function AudioPlayer({ title, subtitle, onClose, mini = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes mock duration
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(80);
  
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) {
              return 0;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, isLooping]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const progress = (currentTime / duration) * 100;

  if (mini) {
    return (
      <Card className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-white border border-gray-100 shadow-lg z-50">
        <div className="p-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center text-white flex-shrink-0"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#2C2C2C] truncate">{title}</div>
              <div className="text-xs text-[#6B6B6B] truncate">{subtitle}</div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 flex-shrink-0"
              >
                <X className="h-4 w-4 text-[#6B6B6B]" />
              </button>
            )}
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-[#C74225] h-1 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-gray-100">
      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <h3 className="text-[#2C2C2C] mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-[#6B6B6B]">{subtitle}</p>}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#6B6B6B]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isLooping ? "bg-[#C74225] text-white" : "hover:bg-gray-100 text-[#6B6B6B]"
            }`}
          >
            <Repeat className="h-4 w-4" />
          </button>

          <button
            onClick={handleSkipBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#6B6B6B]"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-14 h-14 bg-[#C74225] rounded-full flex items-center justify-center text-white hover:bg-[#C74225]/90 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>

          <button
            onClick={handleSkipForward}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#6B6B6B]"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Volume2 className="h-4 w-4 text-[#6B6B6B]" />
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <Volume2 className="h-4 w-4 text-[#6B6B6B]" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-[#6B6B6B] w-8">{volume}%</span>
        </div>
      </div>
    </Card>
  );
}
