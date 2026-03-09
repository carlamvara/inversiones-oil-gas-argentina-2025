import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string | number;
  icon: LucideIcon;
  unit?: string;
}

/**
 * Componente presentacional para mostrar métricas clave.
 * Utiliza motion/react para animaciones de entrada suaves.
 */
export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  unit = 'M USD' 
}) => {
  const isPositive = Number(change) >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
          <Icon className="text-orange-500" size={24} />
        </div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
        }`}>
          {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {Math.abs(Number(change))}%
        </div>
      </div>
      <div>
        <p className="text-neutral-400 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          ${typeof value === 'number' ? value.toLocaleString() : value} 
          <span className="text-xs font-normal text-neutral-500 ml-1">{unit}</span>
        </h3>
      </div>
    </motion.div>
  );
};
