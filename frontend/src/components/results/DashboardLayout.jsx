import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white"> 
    
    {/* Background Gradient */} 
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />
    
    {/* Floating Glow */} 
    <motion.div 
    animate={{ 
      x: [0, 100, 0], 
      y: [0, -60, 0], 
    }} 
    transition={{ 
      duration: 12, 
      repeat: Infinity, 
      ease: "easeInOut", 
    }} 
    
    className="absolute top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" 
    /> 
    
    <motion.div animate={{ 
      x: [0, -120, 0], 
      y: [0, 80, 0], 
    }} 
    transition={{ 
      duration: 15, 
      repeat: Infinity, 
      ease: "easeInOut", 
    }} 
    
    className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-10"> 
      {children} 
    </div> 
  </div> 
  ); 
}