import { Info } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/Components/ui/dialog";

const InfoButton = () => {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Earning Tokens",
      content:
        "Your Offset Rate shows how many tokens you earn per hour. The higher your rate, the more tokens you'll get!",
    },
    {
      title: "Claiming Tokens",
      content:
        "When your tokens are ready, tap 'Reap' to add them to your balance. Make sure to claim before the round ends!",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 hover:bg-white/10 rounded-full">
          <Info className="w-4 h-4 text-yellow-400" />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#1A2235] border-none p-0 max-w-[320px] rounded-lg">
        <div className="relative h-[250px] overflow-hidden rounded-lg">
          {/* Carousel container */}
          <div
            className="absolute flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((p, i) => (
              <div
                key={i}
                className="w-full h-full p-6 flex flex-col items-center justify-center text-center"
              >
                <h2 className="text-yellow-400 text-xl font-bold mb-4">{p.title}</h2>
                <p className="text-white text-sm leading-relaxed">{p.content}</p>
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
            <button
              className={`px-3 py-1 rounded-lg text-sm transition-colors bg-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black ${
                page === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              Prev
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm transition-colors bg-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black ${
                page === pages.length - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPage((prev) => Math.min(prev + 1, pages.length - 1))}
            >
              Next
            </button>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === page ? "bg-yellow-400" : "bg-white/30"
                }`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoButton;
