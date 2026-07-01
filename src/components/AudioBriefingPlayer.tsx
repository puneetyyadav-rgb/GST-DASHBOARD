"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Gauge, Sparkles, X, Headphones, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { GSTCase } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioBriefingPlayerProps {
  caseItem: GSTCase | null;
  onClose: () => void;
}

interface SpeechChunk {
  label: string;
  text: string;
}

export const AudioBriefingPlayer: React.FC<AudioBriefingPlayerProps> = ({
  caseItem,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [currentChunkIdx, setCurrentChunkIdx] = useState<number>(0);
  const [chunks, setChunks] = useState<SpeechChunk[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isCancelledRef = useRef<boolean>(false);
  const rateRef = useRef<number>(rate);
  rateRef.current = rate;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        const preferredVoice = availableVoices.find(v => 
          v.lang.includes('en-IN') || v.name.toLowerCase().includes('natural') || v.lang.includes('en-GB')
        ) || availableVoices[0];

        if (preferredVoice) {
          setSelectedVoice(preferredVoice.name);
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      isCancelledRef.current = true;
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (caseItem) {
      const generatedChunks: SpeechChunk[] = [
        {
          label: "1. Intro & Overview",
          text: `Lex GST A.I. Executive Briefing. Case Title: ${caseItem.title}. Jurisdiction: ${caseItem.courtOrAuthority}. Pronounced on ${caseItem.date}. Impact Score: ${caseItem.impactScore} out of 10.`
        },
        {
          label: "2. Factual Background",
          text: `First, Factual Background: ${caseItem.summary.facts}`
        },
        {
          label: "3. Substantive Question of Law",
          text: `Second, Substantive Issue of Law: ${caseItem.summary.issue}`
        },
        {
          label: "4. Final Verdict & Order",
          text: `Finally, The Verdict and Order: ${caseItem.summary.verdict}. End of verified audio briefing.`
        }
      ];

      setChunks(generatedChunks);
      setCurrentChunkIdx(0);
      isCancelledRef.current = false;
      speakChunk(0, generatedChunks, rate);
    } else {
      stopAudio();
    }
  }, [caseItem]);

  const speakChunk = (idx: number, chunkList: SpeechChunk[], speechRate: number) => {
    if (!synthRef.current || idx >= chunkList.length || idx < 0) {
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    synthRef.current.cancel();
    setCurrentChunkIdx(idx);

    const utterance = new SpeechSynthesisUtterance(chunkList[idx].text);
    utterance.rate = speechRate;

    if (selectedVoice) {
      const voiceObj = voices.find(v => v.name === selectedVoice);
      if (voiceObj) utterance.voice = voiceObj;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      if (isCancelledRef.current) return;
      if (idx + 1 < chunkList.length) {
        speakChunk(idx + 1, chunkList, rateRef.current);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utterance.onerror = () => {
      if (!isCancelledRef.current) {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    synthRef.current.speak(utterance);
  };

  const handleSkipForward = () => {
    if (chunks.length === 0) return;
    const nextIdx = Math.min(currentChunkIdx + 1, chunks.length - 1);
    isCancelledRef.current = false;
    speakChunk(nextIdx, chunks, rate);
  };

  const handleSkipBackward = () => {
    if (chunks.length === 0) return;
    const prevIdx = Math.max(currentChunkIdx - 1, 0);
    isCancelledRef.current = false;
    speakChunk(prevIdx, chunks, rate);
  };

  const togglePlayPause = () => {
    if (!synthRef.current) return;

    if (isPlaying && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    } else if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else if (caseItem && chunks.length > 0) {
      isCancelledRef.current = false;
      speakChunk(currentChunkIdx, chunks, rate);
    }
  };

  const stopAudio = () => {
    isCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIdx(0);
  };

  const changeRate = (newRate: number) => {
    setRate(newRate);
    rateRef.current = newRate;
    if (isPlaying && chunks.length > 0) {
      isCancelledRef.current = false;
      speakChunk(currentChunkIdx, chunks, newRate);
    }
  };

  if (!caseItem) return null;

  const activeChunkLabel = chunks[currentChunkIdx]?.label || "Ready";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[560px] z-50"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500 shadow-2xl p-4 sm:p-5 text-slate-900 dark:text-slate-100 flex flex-col gap-3.5 relative overflow-hidden backdrop-blur-xl">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Info Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
                <Headphones className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-extrabold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Chapter {currentChunkIdx + 1} of {chunks.length}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 truncate">
                    {activeChunkLabel}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate pr-2">
                  {caseItem.title}
                </h4>
              </div>
            </div>

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Close Audio Briefing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Chapter Indicators */}
          <div className="grid grid-cols-4 gap-1.5">
            {chunks.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  isCancelledRef.current = false;
                  speakChunk(idx, chunks, rate);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentChunkIdx
                    ? 'bg-blue-600 shadow-sm'
                    : idx < currentChunkIdx
                    ? 'bg-blue-300 dark:bg-blue-800'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
                title={`Jump to ${ch.label}`}
              />
            ))}
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1 h-6">
              {[40, 70, 30, 90, 60, 100, 50, 80, 45, 85, 35, 75, 55, 95, 65, 85].map((height, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-200 ${
                    isPlaying && !isPaused ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying && !isPaused ? `${height}%` : '20%',
                    animationDelay: `${idx * 75}ms`
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
              <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{isPlaying && !isPaused ? 'Broadcasting...' : isPaused ? 'Paused' : 'Stopped'}</span>
            </div>
          </div>

          {/* Primary Navigation Bar: Skip Back, Play/Pause, Skip Forward, Stop */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1.5">
              
              {/* Backward / Previous Chapter Button */}
              <button
                onClick={handleSkipBackward}
                disabled={currentChunkIdx === 0}
                className={`p-2 rounded-xl border transition-all ${
                  currentChunkIdx === 0
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer shadow-2xs active:scale-95'
                }`}
                title="Skip Backward to Previous Chapter"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlayPause}
                className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all transform active:scale-95 cursor-pointer"
                title={isPlaying && !isPaused ? "Pause Briefing" : "Play Briefing"}
              >
                {isPlaying && !isPaused ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* Forward / Next Chapter Button */}
              <button
                onClick={handleSkipForward}
                disabled={currentChunkIdx === chunks.length - 1}
                className={`p-2 rounded-xl border transition-all ${
                  currentChunkIdx === chunks.length - 1
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer shadow-2xs active:scale-95'
                }`}
                title="Skip Forward to Next Chapter"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>

              {/* Stop Button */}
              <button
                onClick={stopAudio}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Stop & Reset to Start"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>

            </div>

            {/* Speed Rate Selectors */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 px-1.5 hidden sm:inline flex items-center gap-1">
                <Gauge className="w-3 h-3" />
                Speed:
              </span>
              {[0.8, 1.0, 1.25, 1.5].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRate(r)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    rate === r
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
