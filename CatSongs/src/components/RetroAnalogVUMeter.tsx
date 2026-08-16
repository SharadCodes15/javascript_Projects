import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Zap, Sparkles } from 'lucide-react';

interface RetroAnalogVUMeterProps {
  isPlaying: boolean;
  songTitle?: string;
  artist?: string;
  compact?: boolean;
}

export const RetroAnalogVUMeter: React.FC<RetroAnalogVUMeterProps> = ({
  isPlaying,
  songTitle,
  artist,
  compact = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [backlightColor, setBacklightColor] = useState<'amber' | 'emerald' | 'warm'>('amber');
  const [peakL, setPeakL] = useState(false);
  const [peakR, setPeakR] = useState(false);

  // Ballistics state for needles
  const needleLRef = useRef({ val: 0, target: 0, velocity: 0 });
  const needleRRef = useRef({ val: 0, target: 0, velocity: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const tapBounceRef = useRef<number>(0);

  const handleTapMeter = () => {
    // Mechanical bump simulation when tapping the glass
    tapBounceRef.current = 0.35 + Math.random() * 0.25;
  };

  const cycleBacklight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBacklightColor(prev => {
      if (prev === 'amber') return 'warm';
      if (prev === 'warm') return 'emerald';
      return 'amber';
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let beatPhase = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Generate dynamic simulated audio signal when playing
      if (isPlaying) {
        beatPhase += dt * 5.2;
        // Multi-frequency rhythmic beat generator
        const bassKick = Math.pow(Math.max(0, Math.sin(beatPhase * 1.8)), 4) * 0.55;
        const snarePulse = Math.pow(Math.max(0, Math.sin(beatPhase * 3.6 + 1.2)), 6) * 0.35;
        const melodyFlutter = (Math.sin(time * 0.006) * 0.15 + Math.sin(time * 0.013) * 0.1 + Math.random() * 0.08);
        
        const rawL = Math.min(1.1, Math.max(0.05, 0.25 + bassKick + melodyFlutter + (tapBounceRef.current > 0 ? tapBounceRef.current : 0)));
        const rawR = Math.min(1.1, Math.max(0.05, 0.22 + bassKick * 0.9 + snarePulse + melodyFlutter * 1.1 + (tapBounceRef.current > 0 ? tapBounceRef.current * 0.9 : 0)));
        
        needleLRef.current.target = rawL;
        needleRRef.current.target = rawR;
      } else {
        // Rest position with tap reaction
        needleLRef.current.target = tapBounceRef.current > 0 ? tapBounceRef.current : 0.03;
        needleRRef.current.target = tapBounceRef.current > 0 ? tapBounceRef.current * 0.8 : 0.03;
      }

      if (tapBounceRef.current > 0) {
        tapBounceRef.current = Math.max(0, tapBounceRef.current - dt * 2.5);
      }

      // Physics Spring simulation (VU meter needle ballistics: fast attack, damped decay)
      const updateNeedle = (state: { val: number; target: number; velocity: number }) => {
        const tension = 32.0;
        const damping = 7.5;
        const displacement = state.target - state.val;
        const springForce = displacement * tension;
        const dampingForce = -state.velocity * damping;
        const accel = springForce + dampingForce;

        state.velocity += accel * dt;
        state.val += state.velocity * dt;
        state.val = Math.max(0, Math.min(1.15, state.val));
      };

      updateNeedle(needleLRef.current);
      updateNeedle(needleRRef.current);

      // Check Peak Overload (+1dB to +3dB area)
      setPeakL(needleLRef.current.val > 0.85);
      setPeakR(needleRRef.current.val > 0.85);

      // Meter Geometry: Dual Gauges
      const meterWidth = (width - 24) / 2;
      const meterHeight = height - 12;

      const drawSingleGauge = (
        centerX: number,
        centerY: number,
        gaugeW: number,
        gaugeH: number,
        needleVal: number,
        channelLabel: string
      ) => {
        ctx.save();
        ctx.translate(centerX - gaugeW / 2, centerY - gaugeH / 2);

        // 1. Gauge Background Backlit Plate
        const bgGrad = ctx.createLinearGradient(0, 0, 0, gaugeH);
        if (backlightColor === 'amber') {
          bgGrad.addColorStop(0, isPlaying ? '#2a1a08' : '#17110a');
          bgGrad.addColorStop(0.7, isPlaying ? '#ff9a3c22' : '#38220f11');
          bgGrad.addColorStop(1, '#0d0905');
        } else if (backlightColor === 'emerald') {
          bgGrad.addColorStop(0, isPlaying ? '#08251a' : '#0a1410');
          bgGrad.addColorStop(0.7, isPlaying ? '#10b98122' : '#0f382911');
          bgGrad.addColorStop(1, '#050d09');
        } else {
          bgGrad.addColorStop(0, isPlaying ? '#282414' : '#14120a');
          bgGrad.addColorStop(0.7, isPlaying ? '#fbbf2422' : '#38331a11');
          bgGrad.addColorStop(1, '#0d0c07');
        }

        // Rounded gauge plate
        ctx.fillStyle = bgGrad;
        ctx.strokeStyle = '#3a2e24';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(0, 0, gaugeW, gaugeH, 8);
        ctx.fill();
        ctx.stroke();

        // 2. Vintage Cream/Amber Dial Face Arch
        const pivotX = gaugeW / 2;
        const pivotY = gaugeH + 12;
        const radius = gaugeH * 0.95;

        // Dial face subtle grid / texture arc
        ctx.save();
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, radius, Math.PI * 1.18, Math.PI * 1.82);
        ctx.strokeStyle = backlightColor === 'amber' ? 'rgba(249, 115, 22, 0.25)' : backlightColor === 'emerald' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(251, 191, 36, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Red Overload / Danger Zone Arch (+0 to +3 dB)
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, radius, Math.PI * 1.62, Math.PI * 1.82);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Safe Normal Zone Arch (-20 to 0 dB)
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, radius, Math.PI * 1.18, Math.PI * 1.62);
        ctx.strokeStyle = backlightColor === 'amber' ? 'rgba(249, 115, 22, 0.6)' : backlightColor === 'emerald' ? 'rgba(52, 211, 153, 0.6)' : 'rgba(252, 211, 77, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 3. Tick Marks & Numbers (-20, -10, -7, -5, -3, -1, 0, +1, +2, +3)
        const ticks = [
          { val: 0.05, label: '-20', isRed: false, major: true },
          { val: 0.20, label: '-10', isRed: false, major: true },
          { val: 0.35, label: '-7',  isRed: false, major: false },
          { val: 0.48, label: '-5',  isRed: false, major: true },
          { val: 0.62, label: '-3',  isRed: false, major: false },
          { val: 0.74, label: '-1',  isRed: false, major: false },
          { val: 0.82, label: '0',   isRed: true,  major: true },
          { val: 0.90, label: '+1',  isRed: true,  major: false },
          { val: 0.98, label: '+2',  isRed: true,  major: false },
          { val: 1.05, label: '+3',  isRed: true,  major: true },
        ];

        const startAngle = Math.PI * 1.20;
        const endAngle = Math.PI * 1.80;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ticks.forEach(t => {
          const angle = startAngle + t.val * (endAngle - startAngle);
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          const rInner = t.major ? radius - 10 : radius - 6;
          const rOuter = radius + 2;

          ctx.beginPath();
          ctx.moveTo(pivotX + cos * rInner, pivotY + sin * rInner);
          ctx.lineTo(pivotX + cos * rOuter, pivotY + sin * rOuter);
          ctx.strokeStyle = t.isRed ? '#ef4444' : '#d4af37';
          ctx.lineWidth = t.major ? 1.5 : 1;
          ctx.stroke();

          // Labels
          if (t.major && gaugeW > 110) {
            const rText = radius - 18;
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = t.isRed ? '#f87171' : '#fef3c7';
            ctx.fillText(t.label, pivotX + cos * rText, pivotY + sin * rText);
          }
        });

        // 4. Vintage Center Dial Lettering
        ctx.font = 'bold 9px serif';
        ctx.fillStyle = backlightColor === 'amber' ? '#ea580c' : backlightColor === 'emerald' ? '#059669' : '#d97706';
        ctx.fillText('VU', pivotX, 16);

        ctx.font = '600 7px monospace';
        ctx.fillStyle = '#a8a29e';
        ctx.fillText(channelLabel, pivotX, gaugeH - 18);

        // 5. Needle Shadow
        const needleAngle = startAngle + needleVal * (endAngle - startAngle);
        const needleLen = radius * 0.96;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pivotX + 2, pivotY + 2);
        ctx.lineTo(
          pivotX + Math.cos(needleAngle) * needleLen + 2,
          pivotY + Math.sin(needleAngle) * needleLen + 2
        );
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // 6. Analog Red Indicator Needle
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(
          pivotX + Math.cos(needleAngle) * needleLen,
          pivotY + Math.sin(needleAngle) * needleLen
        );
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
        ctx.shadowBlur = isPlaying ? 3 : 0;
        ctx.stroke();
        ctx.restore();

        // 7. Metallic Pivot Hub Pin
        const hubGrad = ctx.createRadialGradient(pivotX, pivotY, 1, pivotX, pivotY, 9);
        hubGrad.addColorStop(0, '#f59e0b');
        hubGrad.addColorStop(0.5, '#78350f');
        hubGrad.addColorStop(1, '#1c1917');

        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
        ctx.fillStyle = hubGrad;
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      };

      // Draw Left Channel Gauge
      drawSingleGauge(
        8 + meterWidth / 2,
        height / 2,
        meterWidth,
        meterHeight,
        needleLRef.current.val,
        'CH-LEFT (L)'
      );

      // Draw Right Channel Gauge
      drawSingleGauge(
        width - 8 - meterWidth / 2,
        height / 2,
        meterWidth,
        meterHeight,
        needleRRef.current.val,
        'CH-RIGHT (R)'
      );

      // Screw bolts on corners
      const drawScrew = (x: number, y: number) => {
        ctx.fillStyle = '#44403c';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 2, y);
        ctx.lineTo(x + 2, y);
        ctx.strokeStyle = '#1c1917';
        ctx.stroke();
      };

      drawScrew(6, 6);
      drawScrew(width - 6, 6);
      drawScrew(6, height - 6);
      drawScrew(width - 6, height - 6);

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, backlightColor]);

  return (
    <div 
      onClick={handleTapMeter}
      className={`relative select-none group cursor-pointer rounded-2xl bg-gradient-to-b from-[#1c1917] via-[#0c0a09] to-[#040404] p-3 border-2 border-[#44382c] shadow-[0_8px_30px_rgba(0,0,0,0.85)] ring-1 ring-orange-500/20 backdrop-blur-md transition-all hover:border-orange-500/50 ${
        compact ? 'max-w-xs' : 'w-full max-w-md'
      }`}
      title="Tap meter glass to bump needles • Click backlight button to change warm lamp"
    >
      {/* Top Header Plate: Brushed Metal Aesthetic */}
      <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[#3e3427] text-neutral-300">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isPlaying ? 'bg-orange-500 animate-ping' : 'bg-neutral-600'
          }`} />
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-400">
            ANALOG VU METER • CAT-1994
          </span>
        </div>

        {/* Status Indicators & Backlight Switcher */}
        <div className="flex items-center gap-2">
          {/* Overload Peak LED L */}
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-mono text-neutral-400">PEAK</span>
            <div className={`w-2 h-2 rounded-full transition-all duration-75 ${
              peakL || peakR 
                ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]' 
                : 'bg-red-950 border border-red-900/60'
            }`} />
          </div>

          {/* Backlight Color Switcher */}
          <button
            type="button"
            onClick={cycleBacklight}
            className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-[9px] font-mono text-orange-300 hover:text-white transition-colors"
            title="Switch Backlight Hue"
          >
            {backlightColor === 'amber' ? 'AMBER' : backlightColor === 'emerald' ? 'EMERALD' : 'WARM'}
          </button>
        </div>
      </div>

      {/* Canvas VU Meter Display */}
      <div className="relative w-full h-24 md:h-28 rounded-xl overflow-hidden bg-black/80 border border-black/90 shadow-inner">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Vintage Glass Reflection Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08]" />
      </div>

      {/* Bottom Track / Station Label Display */}
      <div className="mt-2 pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-[#292218]">
        <div className="truncate flex-1 pr-2">
          {isPlaying ? (
            <span className="text-orange-300 truncate inline-block font-semibold">
              ▶ {songTitle || 'Stereo Highway Transmission'} {artist ? `— ${artist}` : ''}
            </span>
          ) : (
            <span className="text-neutral-500 italic">
              ■ Standby Mode • Ready for Playback
            </span>
          )}
        </div>

        <span className="text-[9px] uppercase tracking-widest text-orange-400/80 font-bold shrink-0">
          {isPlaying ? 'ACTIVE STEREO' : 'IDLE'}
        </span>
      </div>
    </div>
  );
};
