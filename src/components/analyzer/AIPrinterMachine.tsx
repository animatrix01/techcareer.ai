"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

interface AIPrinterMachineProps {
  isProcessing: boolean;
  progress: number;
}

export function AIPrinterMachine({ isProcessing, progress }: AIPrinterMachineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      rotateY.set(deltaX * 8);
      rotateX.set(-deltaY * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl opacity-30"
        animate={{
          background: isProcessing 
            ? ["radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
               "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
               "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)"]
            : "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)"
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-md"
      >
        {/* Main printer body */}
        <motion.div
          animate={isProcessing ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Top scanner section */}
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-t-3xl p-8 shadow-2xl border border-slate-600/50">
            {/* Scanner light bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={isProcessing ? {
                opacity: [0.3, 1, 0.3],
                scaleX: [0.8, 1, 0.8]
              } : { opacity: 0.3 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* AI Brain indicator */}
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={isProcessing ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>

            {/* Status display */}
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30"
                animate={isProcessing ? {
                  borderColor: ["rgba(6,182,212,0.3)", "rgba(6,182,212,0.8)", "rgba(6,182,212,0.3)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span className="text-sm font-semibold text-cyan-400">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">Ready</span>
                  </>
                )}
              </motion.div>
            </div>

            {/* Scanning lines */}
            {isProcessing && (
              <div className="mt-6 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-full"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: [0, 1, 0], x: [-100, 100] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Middle section - Paper feed */}
          <div className="relative bg-gradient-to-br from-slate-700 to-slate-600 p-6 border-x border-slate-600/50">
            {/* Paper slot */}
            <div className="relative h-32 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-500/30">
              {/* Resume paper animation */}
              <motion.div
                className="absolute inset-x-4 top-4 h-24 bg-white rounded-lg shadow-xl"
                style={{
                  background: "linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
                animate={isProcessing ? {
                  y: [0, 20, 0],
                  rotateX: [0, -5, 0]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Paper content lines */}
                <div className="p-3 space-y-1.5">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 bg-slate-300 rounded-full"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                      animate={isProcessing ? {
                        backgroundColor: ["#cbd5e1", "#06b6d4", "#cbd5e1"]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>

                {/* Scanning overlay */}
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-cyan-500/40 to-transparent"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>

              {/* Floating particles inside */}
              {isProcessing && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Progress indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span>Processing</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom section - Output tray */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-b-3xl p-6 shadow-2xl border border-slate-600/50">
            <div className="h-16 bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center">
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">Analysis Complete</span>
                </motion.div>
              )}
            </div>

            {/* LED indicators */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {[
                { color: "bg-emerald-500", active: !isProcessing },
                { color: "bg-cyan-500", active: isProcessing },
                { color: "bg-violet-500", active: progress > 50 }
              ].map((led, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${led.color}`}
                  animate={led.active ? {
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1, 0.8]
                  } : { opacity: 0.3 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>

          {/* Floating score badge */}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
              className="absolute -right-8 top-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl p-4 shadow-2xl border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">94</div>
                    <div className="text-xs text-white/80 font-medium">ATS Score</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-slate-900/20 rounded-full blur-2xl"
          animate={isProcessing ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
