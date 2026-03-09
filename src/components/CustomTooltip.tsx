import React from 'react';

/**
 * Tooltip personalizado para los gráficos de Recharts.
 * Diseñado para mantener la estética oscura y técnica de la aplicación.
 */
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-orange-500/30 p-4 rounded-lg shadow-xl backdrop-blur-sm z-50 relative">
        <p className="text-orange-400 font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-white flex items-center gap-2">
            <span 
              className="inline-block w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: <span className="font-mono">${entry.value.toLocaleString()}M</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
