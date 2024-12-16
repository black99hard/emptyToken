import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ContractAddress: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const address = "ExocdWVMKbZBsMo21M6c6SCj7n4k4s7vmUVz3mGvpump";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 flex items-center justify-between gap-4 max-w-2xl w-full border border-gray-800">
      <div className="overflow-hidden">
        <div className="text-sm text-gray-400 mb-1">Contract Address</div>
        <div className="font-mono text-sm text-gray-200 truncate">{address}</div>
      </div>
      <button
        onClick={copyToClipboard}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default ContractAddress;