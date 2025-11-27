"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiGlobalLine, RiCloseLine } from "react-icons/ri";

const subServices = [
  {
    id: "english",
    label: "ENGLISH",
    url: "https://english.rookiesmart-jp.com/",
  },
  {
    id: "academy",
    label: "IT ACADEMY",
    url: "https://academy.rookiesmart-jp.com/",
  },
  {
    id: "yakyu-juku",
    label: "野球塾",
    url: "https://yakyu-juku.rookiesmart-jp.com/",
  },
  {
    id: "scout",
    label: "高校野球スカウト",
    url: "https://koko-yakyu-agent.rookiesmart-jp.com/",
  },
  {
    id: "career",
    label: "CAREER",
    url: "https://agent.rookiesmart-jp.com/",
  },
];

export const SubServiceTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState<string | null>(null);

  const handleTabClick = (serviceId: string) => {
    setActiveTab(activeTab === serviceId ? null : serviceId);
    setIframeError(null);
  };

  const activeService = subServices.find((s) => s.id === activeTab);

  return (
    <div className="w-full mt-16">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {subServices.map((service) => (
          <button
            key={service.id}
            onClick={() => handleTabClick(service.id)}
            className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 border ${
              activeTab === service.id
                ? "border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)] bg-cyber-cyan/10"
                : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
            }`}
          >
            {service.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab && activeService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full border border-cyber-cyan/30 rounded-xl overflow-hidden bg-cyber-bg-sub"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyber-cyan/20 bg-cyber-bg-sub/80">
              <div className="flex items-center space-x-2">
                <RiGlobalLine className="text-cyber-cyan" />
                <span className="font-mono text-sm text-cyber-cyan">
                  {activeService.label}
                </span>
              </div>
              <button
                onClick={() => setActiveTab(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Iframe or Error */}
            <div className="relative w-full" style={{ minHeight: "600px" }}>
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-gray-400 mb-4 font-mono">
                    {iframeError}
                  </p>
                  <a
                    href={activeService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan/10 transition-colors font-mono"
                  >
                    OPEN IN NEW TAB →
                  </a>
                </div>
              ) : (
                <iframe
                  src={activeService.url}
                  className="w-full h-full border-0"
                  style={{ minHeight: "600px" }}
                  onError={() =>
                    setIframeError(
                      "このサイトは埋め込み表示に対応していません。"
                    )
                  }
                  title={activeService.label}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

