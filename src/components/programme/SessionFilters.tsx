"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import {
  SessionType,
  SessionTheme,
  sessionTypeLabels,
  sessionThemeLabels,
  speakers,
} from "@/lib/data/sessions";

interface SessionFiltersProps {
  selectedType: SessionType | "all";
  selectedTheme: SessionTheme | "all";
  selectedSpeaker: string | "all";
  onTypeChange: (type: SessionType | "all") => void;
  onThemeChange: (theme: SessionTheme | "all") => void;
  onSpeakerChange: (speakerId: string | "all") => void;
  onReset: () => void;
}

export function SessionFilters({
  selectedType,
  selectedTheme,
  selectedSpeaker,
  onTypeChange,
  onThemeChange,
  onSpeakerChange,
  onReset,
}: SessionFiltersProps) {
  const hasFilters =
    selectedType !== "all" ||
    selectedTheme !== "all" ||
    selectedSpeaker !== "all";

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-[#0d5a75]">
          <Filter className="w-4 h-4" />
          <span className="font-medium text-sm">Filtres</span>
        </div>

        {/* Type Filter */}
        <Select
          value={selectedType}
          onValueChange={(value) => onTypeChange(value as SessionType | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {(Object.keys(sessionTypeLabels) as SessionType[]).map((type) => (
              <SelectItem key={type} value={type}>
                {sessionTypeLabels[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Theme Filter */}
        <Select
          value={selectedTheme}
          onValueChange={(value) => onThemeChange(value as SessionTheme | "all")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Thématique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les thématiques</SelectItem>
            {(Object.keys(sessionThemeLabels) as SessionTheme[]).map((theme) => (
              <SelectItem key={theme} value={theme}>
                {sessionThemeLabels[theme]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Speaker Filter */}
        <Select
          value={selectedSpeaker}
          onValueChange={(value) => onSpeakerChange(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Intervenant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les intervenants</SelectItem>
            {speakers.map((speaker) => (
              <SelectItem key={speaker.id} value={speaker.id}>
                {speaker.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-gray-500 hover:text-[#FF6B35]"
          >
            <X className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
}
