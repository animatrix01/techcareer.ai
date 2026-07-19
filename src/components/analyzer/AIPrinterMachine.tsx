"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Gauge, Activity } from "lucide-react";

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
      
      rotateY.set(deltaX * 5);
      rotateX.set(-deltaY * 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  // Calculate score based on progress
  const currentScore = Math.floor((progress / 100) * 94);
  const scoreAngle = (currentScore / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-4xl flex gap-6 items-center"
      >
        {/* LEFT SIDE - Resume Grader Display */}
        <motion.div
          animate={isProcessing ? { y: [0, -3, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-96 bg-gradient-to-b from-[#3D5A40] to-[#5C4F3F] rounded-sm border-2 border-[#1C1C1C] shadow-[8px_8px_0px_0px_rgba(28,28,28,0.3)] p-6 flex flex-col gap-6"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        >
          {/* Top Label */}
          <div className="text-center">
            <h3 className="text-[#EFE9E1] font-black text-lg tracking-wider" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
              RESUME
            </h3>
            <h3 className="text-[#EFE9E1] font-black text-lg tracking-wider" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
              GRADER
            </h3>
          </div>

          {/* Gauge/Score Meter */}
          <div className="relative bg-[#1C1C1C] rounded-sm p-4 border-2 border-[#EFE9E1]">
            <div className="relative w-32 h-32 mx-auto">
              {/* Gauge background arc */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A0522D" />
                    <stop offset="50%" stopColor="#D4A574" />
                    <stop offset="100%" stopColor="#2F5233" />
                  </linearGradient>
                </defs>
                {/* Background arc */}
                <path
                  d="M 15 85 A 40 40 0 0 1 85 85"
                  fill="none"
                  stroke="#3D5A40"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Animated progress arc */}
                <motion.path
                  d="M 15 85 A 40 40 0 0 1 85 85"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              
              {/* Gauge needle */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-1 h-12 bg-[#EFE9E1] origin-bottom rounded-full"
                style={{
                  transform: `translate(-50%, -100%) rotate(${scoreAngle}deg)`
                }}
                animate={isProcessing ? { rotate: [scoreAngle - 5, scoreAngle + 5, scoreAngle] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#EFE9E1] rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#1C1C1C]" />
              
              {/* Score display */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
                <motion.div
                  className="text-3xl font-black text-[#EFE9E1]"
                  style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}
                  key={currentScore}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {currentScore}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Waveform Monitor */}
          <div className="relative bg-[#1C1C1C] rounded-sm p-3 border-2 border-[#EFE9E1] h-20">
            <div className="relative w-full h-full overflow-hidden">
              {isProcessing && (
                <>
                  {/* Animated waveform */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <motion.path
                      d="M0,20 L10,20 L15,10 L20,30 L25,15 L30,25 L35,20 L40,20 L45,15 L50,25 L55,18 L60,22 L65,20 L70,20 L75,10 L80,30 L85,15 L90,25 L95,20 L100,20 L105,15 L110,25 L115,18 L120,22 L125,20 L130,20 L135,10 L140,30 L145,15 L150,25 L155,20 L160,20 L165,15 L170,25 L175,18 L180,22 L185,20 L190,20 L200,20"
                      fill="none"
                      stroke="#2F5233"
                      strokeWidth="2"
                      initial={{ x: 0 }}
                      animate={{ x: -100 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                  {/* Scanning line */}
                  <motion.div
                    className="absolute top-0 left-0 w-0.5 h-full bg-[#EFE9E1]"
                    animate={{ x: [0, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-[#1C1C1C] rounded-sm overflow-hidden border-2 border-[#EFE9E1]">
              <motion.div
                className="h-full bg-[#2F5233]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* LED Indicators */}
          <div className="flex justify-center gap-3">
            {[
              { color: "bg-[#2F5233]", active: isProcessing },
              { color: "bg-[#2F5233]", active: progress > 25 },
              { color: "bg-[#A0522D]", active: progress > 50 },
              { color: "bg-[#2F5233]", active: progress === 100 }
            ].map((led, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full border-2 border-[#1C1C1C] ${led.color}`}
                animate={led.active ? {
                  opacity: [0.3, 1, 0.3],
                  boxShadow: led.active ? [
                    "0 0 0px rgba(47,82,51,0)",
                    "0 0 10px rgba(47,82,51,0.8)",
                    "0 0 0px rgba(47,82,51,0)"
                  ] : []
                } : { opacity: 0.2 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Output Slot */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#1C1C1C] rounded-sm" />
        </motion.div>

        {/* RIGHT SIDE - Printer Tray with Resume */}
        <motion.div
          animate={isProcessing ? { y: [0, -3, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="relative flex-1 h-80 bg-gradient-to-b from-[#3D5A40] to-[#1C1C1C] rounded-sm border-2 border-[#1C1C1C] shadow-[8px_8px_0px_0px_rgba(28,28,28,0.3)] p-6"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
        >
          {/* Scanner Slot - Top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#1C1C1C]" />
          
          {/* Main scanning area */}
          <div className="relative w-full h-full bg-[#2F5233]/30 rounded-sm border-2 border-[#EFE9E1]/30 overflow-hidden">
            {/* Glowing border effect when processing */}
            {isProcessing && (
              <motion.div
                className="absolute inset-0 rounded-sm"
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(47,82,51,0.5)",
                    "inset 0 0 40px rgba(47,82,51,0.8)",
                    "inset 0 0 20px rgba(47,82,51,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Resume Paper */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-64 bg-white rounded-sm shadow-2xl p-4"
              initial={{ top: "-100%", opacity: 0 }}
              animate={isProcessing ? {
                top: ["0%", "40%"],
                opacity: 1
              } : progress === 100 ? {
                top: "60%",
                opacity: 1
              } : {
                top: "-100%",
                opacity: 0
              }}
              transition={{ duration: 3, ease: "easeOut" }}
              style={{
                boxShadow: isProcessing ? "0 10px 40px rgba(47,82,51,0.3)" : "0 20px 60px rgba(28,28,28,0.4)"
              }}
            >
              {/* Resume content preview */}
              <div className="space-y-2">
                <div className="text-center mb-3">
                  <div className="text-xs font-black text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
                    Taylor Foster
                  </div>
                  <div className="text-[8px] text-[#5C4F3F]">Software Engineer</div>
                </div>
                <div className="space-y-1">
                  {[85, 70, 91, 83, 93, 75, 70, 76].map((w, i) => (
                    <motion.div
                      key={i}
                      className="h-1 bg-[#D4C5B3] rounded-full"
                      style={{ width: `${w}%` }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isProcessing ? {
                        opacity: 1,
                        scaleX: 1,
                        backgroundColor: ["#D4C5B3", "#2F5233", "#D4C5B3"]
                      } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Scanning beam */}
              {isProcessing && (
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#2F5233] to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>

            {/* Floating particles during scan */}
            {isProcessing && (
              <div className="absolute inset-0">
                {[
                  { l: 15, t: 20 }, { l: 75, t: 45 }, { l: 35, t: 70 },
                  { l: 55, t: 15 }, { l: 85, t: 60 }, { l: 25, t: 85 },
                  { l: 65, t: 30 }, { l: 45, t: 55 }, { l: 10, t: 50 },
                  { l: 90, t: 80 }, { l: 50, t: 10 }, { l: 30, t: 40 }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#2F5233] rounded-full"
                    style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Output Tray */}
          <div className="absolute -bottom-4 left-0 right-0 h-8 bg-[#1C1C1C] rounded-b-sm border-2 border-[#EFE9E1]/50 flex items-center justify-center">
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] font-bold text-[#2F5233] bg-[#EFE9E1] px-2 py-0.5 rounded-sm"
              >
                SCAN COMPLETE
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#1C1C1C]/10 rounded-full blur-xl"
          animate={isProcessing ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
