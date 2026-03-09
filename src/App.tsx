import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Droplets, 
  Activity, 
  Factory, 
  ChevronRight, 
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Importación de constantes y tipos (Separación de Lógica)
import { DATA_2024, DATA_2025, COLORS } from './constants';
import { DashboardTab, PieChartData } from './types';

// Importación de componentes modulares
import { MetricCard } from './components/MetricCard';
import { CustomTooltip } from './components/CustomTooltip';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Aplicación de Dashboard para Inversiones Oil & Gas 2025.
 * Arquitectura: Separación de componentes presentacionales y lógica de datos.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Lógica de Negocio: Cálculos de agregados
  // Se utiliza useMemo para evitar re-cálculos costosos en cada renderizado.
  const totals = useMemo(() => {
    const total2024 = DATA_2024.reduce((acc, curr) => acc + curr.explotacion + curr.exploracion, 0);
    const total2025 = DATA_2025.reduce((acc, curr) => acc + curr.explotacion + curr.exploracion, 0);
    const growth = (((total2025 - total2024) / total2024) * 100).toFixed(1);
    
    const explotacionTotal = DATA_2025.reduce((acc, c) => acc + c.explotacion, 0);
    const exploracionTotal = DATA_2025.reduce((acc, c) => acc + c.exploracion, 0);
    const complementariaTotal = DATA_2025.reduce((acc, c) => acc + c.complementaria, 0);

    const pieData: PieChartData[] = [
      { name: 'Explotación', value: explotacionTotal },
      { name: 'Exploración', value: exploracionTotal },
      { name: 'Complementaria', value: complementariaTotal },
    ];

    return { total2025, growth, pieData };
  }, []);

  // Lógica de Negocio: Descarga de Reporte CSV
  const handleDownloadReport = () => {
    const headers = ['Empresa', 'Exploracion (M USD)', 'Explotacion (M USD)', 'Complementaria (M USD)', 'Total (M USD)'];
    const rows = DATA_2025.map(row => [
      row.empresa,
      row.exploracion.toFixed(2),
      row.explotacion.toFixed(2),
      row.complementaria.toFixed(2),
      (row.exploracion + row.explotacion + row.complementaria).toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_inversiones_oil_gas_2025.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans p-4 md:p-8 selection:bg-orange-500/30">
      {/* Efecto de Luces de Fondo (Atmospheric Design) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Encabezado Principal */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Ministerio de Energía - RES2057</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Inversiones <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Oil & Gas 2025</span>
            </h1>
            <p className="text-neutral-500 mt-2 max-w-xl">
              Análisis interactivo de las declaraciones juradas de inversión en cuencas argentinas. Proyecciones y comparativa interanual.
            </p>
            <p className="text-orange-500 font-bold mt-1">por Carla Mariel Vara</p>
          </motion.div>
          
          <div className="flex bg-neutral-900/80 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {(['overview', 'empresas'] as DashboardTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'overview' ? 'Vista General' : 'Top Empresas'}
              </button>
            ))}
          </div>
        </header>

        {/* Grilla de Métricas (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Inversión Prevista 2025" 
            value={totals.total2025.toFixed(1)} 
            change={totals.growth} 
            icon={TrendingUp} 
          />
          <MetricCard 
            title="Segmento Explotación" 
            value={6225.4} 
            change={12.4} 
            icon={Factory} 
          />
          <MetricCard 
            title="Foco en Exploración" 
            value={113.3} 
            change={24.8} 
            icon={Droplets} 
          />
          <MetricCard 
            title="Eficiencia Operativa" 
            value={88.5} 
            change={5.2} 
            icon={Activity} 
            unit="Index"
          />
        </div>

        {/* Sección de Gráficos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gráfico 1: Inversión por Operadora */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-neutral-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Inversión por Operadora (USD M)</h2>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-500"></span> 2025 Prevista</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-neutral-700"></span> 2024 Realizada</span>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_2025} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis 
                    dataKey="empresa" 
                    stroke="#525252" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#525252" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="explotacion" name="Explotación" fill={COLORS.primary} radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="exploracion" name="Exploración" fill={COLORS.secondary} radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gráfico 2: Mix de Capital (Donut Chart) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col"
          >
            <h2 className="text-xl font-bold text-white mb-2">Mix de Capital</h2>
            <p className="text-sm text-neutral-500 mb-8">Distribución por actividad productiva</p>
            
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totals.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.primary} stroke="transparent" />
                    <Cell fill={COLORS.secondary} stroke="transparent" />
                    <Cell fill={COLORS.muted} stroke="transparent" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold">Total</p>
                <p className="text-2xl font-black text-white">${(totals.total2025 / 1000).toFixed(1)}B</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 flex-grow">
              {totals.pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: [COLORS.primary, COLORS.secondary, COLORS.muted][idx] }}></div>
                    <span className="text-sm font-medium text-neutral-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-mono text-white font-semibold">
                    {((item.value / totals.total2025) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vista Detallada: Tabla de Empresas */}
        <AnimatePresence>
          {activeTab === 'empresas' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Detalle de Operadoras</h2>
                <button 
                  onClick={handleDownloadReport}
                  className="text-orange-500 text-sm flex items-center hover:underline transition-all"
                >
                  Descargar Reporte <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-neutral-400 text-xs uppercase tracking-wider font-bold">
                      <th className="px-8 py-4">Empresa / Operadora</th>
                      <th className="px-8 py-4 text-right">Exploración</th>
                      <th className="px-8 py-4 text-right">Explotación</th>
                      <th className="px-8 py-4 text-right">Total 2025</th>
                      <th className="px-8 py-4 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {DATA_2025.map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-5 font-bold text-white group-hover:text-orange-400 transition-colors">
                          {row.empresa}
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-neutral-400">
                          ${row.exploracion.toFixed(2)}M
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-neutral-400">
                          ${row.explotacion.toFixed(2)}M
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-white font-bold">
                          ${(row.explotacion + row.exploracion).toFixed(2)}M
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase rounded-full border border-orange-500/20">
                            Confirmado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pie de Página Informativo */}
        <footer className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="flex items-center gap-6 text-neutral-500 text-sm">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span>Fuente: Datos Abiertos Argentina - SIESE</span>
            </div>
            <span>Última actualización: 2025</span>
          </div>
          <div className="text-xs text-neutral-600 bg-neutral-900 p-2 rounded-lg italic border border-white/5">
            * Los valores están expresados en Millones de USD.
          </div>
        </footer>
      </div>
    </div>
  );
}
