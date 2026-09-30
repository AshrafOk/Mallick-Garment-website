import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FIT_DESCRIPTIONS, FitType } from '../data/products';
import { X, Ruler, CheckCircle2, Info } from 'lucide-react';

export const FitGuideModal: React.FC = () => {
  const { isFitGuideOpen, setIsFitGuideOpen } = useShop();

  const [garmentType, setGarmentType] = useState<'top' | 'bottom'>('top');
  const [measurement, setMeasurement] = useState<number>(38);
  const [selectedFit, setSelectedFit] = useState<FitType>('Regular Fit');

  if (!isFitGuideOpen) return null;

  const calculateRecommendedSize = () => {
    if (garmentType === 'top') {
      // Tops based on chest inches:
      // S: 36-37, M: 38-39, L: 40-41, XL: 42-43, XXL: 44-45, 3XL: 46-47, 4XL: 48+
      let baseSize = 'M';
      if (measurement <= 37) baseSize = 'S';
      else if (measurement <= 39) baseSize = 'M';
      else if (measurement <= 41) baseSize = 'L';
      else if (measurement <= 43) baseSize = 'XL';
      else if (measurement <= 45) baseSize = 'XXL';
      else if (measurement <= 47) baseSize = '3XL';
      else baseSize = '4XL';

      // Adjust for oversized vs slim
      if (selectedFit === 'Oversized Fit') {
        return {
          size: baseSize,
          advice: `True to intentional oversized look. For a boxy drop-shoulder silhouette, order your standard ${baseSize}. If you want a more conventional fit, size down to ${
            baseSize === 'S' ? 'S' : 'one size smaller'
          }.`,
        };
      }
      if (selectedFit === 'Slim Fit') {
        return {
          size: baseSize,
          advice: `Tailored close to chest and torso. Size ${baseSize} will fit snug with clean definition.`,
        };
      }
      return {
        size: baseSize,
        advice: `Standard relaxed proportion. Size ${baseSize} ensures comfortable all-day shoulder movement.`,
      };
    } else {
      // Bottoms based on waist inches
      const evenWaist = Math.round(measurement / 2) * 2;
      const clampedWaist = Math.min(Math.max(evenWaist, 28), 48);

      if (selectedFit === 'Baggy Fit') {
        return {
          size: `${clampedWaist}`,
          advice: `Order your actual waist size ${clampedWaist}. The baggy silhouette is engineered directly into the leg cut with an authentic wide puddle hem.`,
        };
      }
      if (selectedFit === 'Slim Fit') {
        return {
          size: `${clampedWaist}`,
          advice: `Tapered through thigh and calf with comfort stretch. Size ${clampedWaist} will sit comfortably at your natural waistline.`,
        };
      }
      return {
        size: `${clampedWaist}`,
        advice: `Classic straight or regular fit. Size ${clampedWaist} provides clean lines with standard break at shoes.`,
      };
    }
  };

  const recommendation = calculateRecommendedSize();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0d11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 md:p-8">
        <button
          onClick={() => setIsFitGuideOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
          <Ruler className="w-4 h-4" />
          <span>Interactive Fit & Measurement Studio</span>
        </div>

        <h2 className="font-editorial text-2xl md:text-3xl tracking-wide text-white mt-1">
          FIND YOUR PERFECT FIT IN BOKARO
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Precision tailored sizing calibrated for Mallick Garments silhouettes.
        </p>

        {/* Toggle Garment Type */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-xl mt-6 border border-white/5">
          <button
            onClick={() => {
              setGarmentType('top');
              setMeasurement(38);
            }}
            className={`py-2 text-xs font-semibold tracking-wider rounded-lg transition-all cursor-pointer ${
              garmentType === 'top'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Shirts & T-Shirts (S - 4XL)
          </button>
          <button
            onClick={() => {
              setGarmentType('bottom');
              setMeasurement(32);
            }}
            className={`py-2 text-xs font-semibold tracking-wider rounded-lg transition-all cursor-pointer ${
              garmentType === 'bottom'
                ? 'bg-[#d4af37] text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Jeans, Trousers & Pants (28 - 48)
          </button>
        </div>

        {/* Interactive Measurement Input Slider */}
        <div className="mt-6 p-5 bg-zinc-950/80 rounded-xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-300">
              {garmentType === 'top' ? 'Your Chest Measurement:' : 'Your Natural Waist Size:'}
            </label>
            <span className="font-editorial text-2xl text-[#d4af37]">
              {measurement} INCHES
            </span>
          </div>

          <input
            type="range"
            min={garmentType === 'top' ? 34 : 28}
            max={garmentType === 'top' ? 52 : 48}
            step={garmentType === 'top' ? 1 : 2}
            value={measurement}
            onChange={(e) => setMeasurement(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
          />

          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>{garmentType === 'top' ? '34" (Chest)' : '28" (Waist)'}</span>
            <span>{garmentType === 'top' ? '52" (Chest)' : '48" (Waist)'}</span>
          </div>
        </div>

        {/* Preferred Fit Style Selector */}
        <div className="mt-5 space-y-2">
          <label className="text-xs font-medium text-zinc-300 block">
            Select Your Desired Fit Silhouette:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                'Slim Fit',
                'Regular Fit',
                'Straight Fit',
                'Relaxed Fit',
                'Baggy Fit',
                'Oversized Fit',
              ] as FitType[]
            ).map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  selectedFit === fit
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-white font-semibold'
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20'
                }`}
              >
                {fit}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 italic mt-1">
            {FIT_DESCRIPTIONS[selectedFit].details}
          </p>
        </div>

        {/* Result Card */}
        <div className="mt-6 p-5 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-[#d4af37]/30 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-[#d4af37]/10 rounded-xl text-[#d4af37] border border-[#d4af37]/20 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 uppercase tracking-wider">
                Recommended Mallick Size:
              </span>
              <span className="font-editorial text-2xl text-white">
                SIZE {recommendation.size}
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              {recommendation.advice}
            </p>
          </div>
        </div>

        {/* Free Alteration Note */}
        <div className="mt-5 flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#d4af37]" />
            Complimentary in-store length adjustment available at Siwandih & Sector 4
          </span>
          <button
            onClick={() => setIsFitGuideOpen(false)}
            className="text-[#d4af37] font-semibold hover:underline"
          >
            Apply & Browse
          </button>
        </div>
      </div>
    </div>
  );
};
