import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de BioTech Farm. Puedo ayudarte con información sobre tus animales, vacunaciones, ganancia de peso y más. ¿En qué puedo ayudarte?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Vacunación
    if (message.includes("vacuna") || message.includes("vacunación")) {
      return `📋 **Calendario de Vacunación:**\n\n**Esta semana necesitan vacunación:**\n• Corral 3: 15 bovinos - Vacuna antiaftosa (Jueves)\n• Corral 5: 8 bovinos - Refuerzo vitamínico (Viernes)\n• Sector Avícola A: 120 aves - Newcastle (Miércoles)\n\n**Próxima semana:**\n• Corral 1: 12 porcinos - Vacuna contra peste porcina`;
    }

    // Ganancia de peso
    if (
      message.includes("ganancia") ||
      message.includes("peso") ||
      message.includes("lote")
    ) {
      return `📊 **Análisis de Ganancia de Peso:**\n\n**Mejor rendimiento:**\n🥇 Lote B-12 (Bovinos): +42 kg promedio en 30 días\n🥈 Lote P-8 (Porcinos): +28 kg promedio en 30 días\n🥉 Lote O-5 (Ovinos): +8 kg promedio en 30 días\n\n**Requiere atención:**\n⚠️ Lote B-7: Ganancia inferior al promedio (-15%)`;
    }

    // Salud de animales
    if (
      message.includes("salud") ||
      message.includes("enfermo") ||
      message.includes("enfermedad")
    ) {
      return `🏥 **Estado de Salud del Ganado:**\n\n**Estado General:** ✅ Bueno\n\n**Casos activos:**\n• 2 bovinos en observación (Corral 4) - Infección respiratoria leve\n• 1 porcino en tratamiento (Corral 2) - Cojera\n\n**Última revisión veterinaria:** Hace 3 días\n**Próxima visita programada:** 5 de diciembre`;
    }

    // Alimentación
    if (
      message.includes("aliment") ||
      message.includes("comida") ||
      message.includes("ración")
    ) {
      return `🌾 **Programa de Alimentación:**\n\n**Consumo diario:**\n• Bovinos: 1,200 kg de forraje + 450 kg de concentrado\n• Porcinos: 280 kg de alimento balanceado\n• Ovinos: 150 kg de forraje\n\n**Inventario de alimento:**\n✅ Forraje: Suficiente para 15 días\n⚠️ Concentrado bovino: Reabastecer en 5 días\n✅ Alimento porcino: Suficiente para 20 días`;
    }

    // Producción
    if (
      message.includes("producción") ||
      message.includes("leche") ||
      message.includes("huevo")
    ) {
      return `🥛 **Producción Actual:**\n\n**Leche (Bovinos):**\n• Producción diaria: 850 litros\n• Promedio por vaca: 22 litros/día\n• Incremento vs mes anterior: +8%\n\n**Huevos (Avicultura):**\n• Producción diaria: 2,400 unidades\n• Tasa de postura: 85%\n• Calidad: Categoría A (92%)`;
    }

    // Total de animales
    if (
      message.includes("cuántos") ||
      message.includes("total") ||
      message.includes("cantidad")
    ) {
      return `🐄 **Inventario de Ganado:**\n\n**Total de animales:** 438\n\n**Distribución:**\n• Bovinos: 156 (8 corrales)\n• Porcinos: 89 (4 corrales)\n• Ovinos: 123 (3 corrales)\n• Aves: 70 (Sector avícola)\n\n**Últimas incorporaciones:**\n• 12 bovinos (hace 5 días)\n• 25 aves (hace 2 semanas)`;
    }

    // Clima/ambiente
    if (
      message.includes("clima") ||
      message.includes("temperatura") ||
      message.includes("ambiente")
    ) {
      return `🌡️ **Condiciones Ambientales:**\n\n**Ambiente actual:**\n• Temperatura: 22°C (Óptimo)\n• Humedad: 65%\n• Ventilación: Normal\n\n**Instalaciones:**\n✅ Corrales: Temperatura controlada\n✅ Galpones avícolas: 21°C\n⚠️ Sector C: Revisar sistema de ventilación`;
    }

    // Recomendaciones
    if (
      message.includes("recomend") ||
      message.includes("suger") ||
      message.includes("consejo")
    ) {
      return `💡 **Recomendaciones:**\n\n**Acciones prioritarias:**\n1. Programar vacunación Corral 3 (esta semana)\n2. Revisar alimentación Lote B-7 (bajo rendimiento)\n3. Reabastecer concentrado bovino\n4. Mantenimiento sistema ventilación Sector C\n\n**Oportunidades:**\n• Incrementar producción lechera (+12% potencial)\n• Optimizar conversión alimenticia en porcinos`;
    }

    // Default response
    return `Puedo ayudarte con:\n\n🔸 Vacunaciones y calendario sanitario\n🔸 Ganancia de peso por lote\n🔸 Estado de salud del ganado\n🔸 Programas de alimentación\n🔸 Producción (leche, huevos)\n🔸 Inventario de animales\n🔸 Condiciones ambientales\n🔸 Recomendaciones\n\n¿Sobre qué te gustaría saber?`;
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button with Enhanced Animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all z-50 group"
          >
            <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window with Enhanced Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col border-2 border-green-200 z-50 overflow-hidden"
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-t-3xl flex items-center justify-between relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3>Asistente BioTech</h3>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-300 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="opacity-90">En línea</p>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="hover:bg-white/20 p-2 rounded-xl transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-green-50/30 to-emerald-50/30">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-start gap-2 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-green-600 to-emerald-600"
                          : "bg-gradient-to-br from-green-100 to-emerald-100"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-green-600" />
                      )}
                    </motion.div>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 shadow-md ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-tr-none"
                          : "bg-white text-green-900 rounded-tl-none border border-green-100"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-green-100"
                            : "text-green-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-green-100 shadow-md">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input with Enhanced Design */}
            <div className="p-4 border-t-2 border-green-100 bg-white rounded-b-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-green-600 mt-2 text-center flex items-center justify-center gap-1 text-xs">
                <Sparkles className="w-3 h-3" />
                Pregunta sobre vacunación, peso, salud y más
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
