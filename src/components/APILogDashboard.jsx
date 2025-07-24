import React, { useEffect, useRef, useState } from 'react';

const APILogDashboard = () => {
  const [apiLogs, setApiLogs] = useState([]);
  const scrollContainerRef = useRef(null);
  const API = import.meta.env.API || 'https://server-7x5o.onrender.com';

  const fetchApiLogs = async () => {
    try {
      const res = await fetch(`${API}/api/queue/logs`);
      const data = await res.json();
      if (data.length) {
        setApiLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchApiLogs(); // fetch immediately
    const interval = setInterval(fetchApiLogs, 3000); // then poll
    return () => clearInterval(interval);
  }, []);


  // Scroll to bottom when logs update
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [apiLogs]);

  const getLogColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400';         // 🔴 Critical errors
      case 'success':
        return 'text-green-400';       // ✅ Positive outcomes
      case 'info':
        return 'text-blue-400';        // 📘 General info
      case 'warning':
        return 'text-yellow-400';      // ⚠️ Caution
      case 'debug':
        return 'text-indigo-300';      // 🔍 Developer logs
      case 'fatal':
        return 'text-red-600';         // 💀 Critical failure
      case 'trace':
        return 'text-purple-400';      // 📈 Execution tracing
      case 'notice':
        return 'text-teal-300';        // 📝 Informational system notes
      default:
        return 'text-gray-300';        // 📎 Fallback for unknown types
    }
  };


  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '');
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen font-mono p-16 container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-white">📦 API Logs - Polling Mode</h1>

      <div
        ref={scrollContainerRef}
        className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg max-h-[70vh] overflow-y-auto"
      >
        {apiLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-4 px-4 py-2 border-b border-[#1f1f1f] hover:bg-[#151515] transition"
          >
            {/* Timestamp */}
            <div className="text-xs text-gray-400 w-[170px]">
              {formatTimestamp(log.timestamp)}
            </div>

            {/* Log type + message */}
            <div className={`flex-1 text-sm whitespace-pre-wrap ${getLogColor(log.type)}`}>
              <span className="uppercase mr-2 text-xs font-bold">{log.type}:</span>
              {log.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APILogDashboard;
