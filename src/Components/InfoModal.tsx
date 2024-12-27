import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

interface InfoModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const InfoModal = ({ isVisible, onClose }: InfoModalProps) => {
  const [page, setPage] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const pages = [
    {
      title: "Earning Tokens",
      content:
        "Your Offset Rate shows how many tokens you earn per hour.",
    },
    {
      title: "Claiming Tokens",
      content:
        "When your tokens are ready, tap 'Reap' to add them to your balance.",
    },
    {
      title: "Token Accumulation Limit",
      content:
        "Offsets stop accumulating after 8 unclaimed tokens.",
    },
    {
      title: "Boosting Your Offset Rate",
      content:
        "Invite more people and complete tasks to increase your Offset Rate.",
    },
  ];

  useEffect(() => {
    if (isVisible) {
      const shakeInterval = setInterval(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 1000);
      }, 5000);

      return () => clearInterval(shakeInterval);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed font-sans inset-0 z-50">
      {/* Modal Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`absolute font-sans inset-0 flex items-center justify-center p-4 transition-all duration-500 ease-in-out ${
          isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-gradient-to-br from-[#1a1f35] to-[#0d1220] rounded-xl border border-yellow-500/50 
            shadow-2xl w-[90%] max-w-[320px] p-4 transform overflow-hidden ${
              isShaking ? "animate-shake" : ""
            }`}
        >
          {/* Modal Title */}
          <div className="relative h-[250px] overflow-hidden">
            <div
              className="h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              <div className="flex h-full">
                {pages.map((p, i) => (
                  <div
                    key={i}
                    className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-4"
                  >
                    <div className="p-1.5 bg-yellow-500/10 -mt-8 rounded-lg mb-4">
                      <Info className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-3">
                      {p.title}
                    </h2>
                    <p className="text-sm text-gray-300">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
              <button
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  page === 0
                    ? "bg-white/5 text-gray-400 cursor-not-allowed"
                    : "bg-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                }`}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
              >
                Prev
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  page === pages.length - 1
                    ? "bg-white/5 text-gray-400 cursor-not-allowed"
                    : "bg-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                }`}
                onClick={() => setPage((prev) => Math.min(prev + 1, pages.length - 1))}
                disabled={page === pages.length - 1}
              >
                Next
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 bg-yellow-500/10 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            <X className="w-5 h-5 text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
