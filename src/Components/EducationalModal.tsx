import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Leaf, Wind, TreePine, Sprout, Droplets, Sun, ArrowLeft, ArrowRight, X } from "lucide-react";

interface Slide {
    title: string;
    content: string;
    image: string;
    icon?: string;
}

const icons = {
    leaf: Leaf,
    wind: Wind,
    tree: TreePine,
    sprout: Sprout,
    droplets: Droplets,
    sun: Sun,
};

interface EducationalModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: { slides: Slide[] } | null;
}

const EducationalModal: React.FC<EducationalModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen || !content) return null;
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const slides = content.slides;
    const currentSlide = slides[currentSlideIndex];
    const Icon = currentSlide.icon ? icons[currentSlide.icon as keyof typeof icons] : Leaf;
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed font-sans inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={handleOutsideClick}>
            <Card className="w-full max-w-md bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <CardContent className="p-4">
                    <button onClick={onClose} className="absolute right-3 top-3 text-emerald-600 hover:text-emerald-800">
                        <X className="h-5 w-5" />
                    </button>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-emerald-600 animate-pulse" />
                            <h2 className="text-lg font-bold text-emerald-800">{currentSlide.title}</h2>
                        </div>

                        <div className="relative h-40">
                            <img
                                src={currentSlide.image}
                                alt={currentSlide.title}
                                className="rounded-md object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-md" />
                        </div>

                        <div className="relative">
                            <p className={`text-sm text-emerald-800 transition-all duration-300 ${isExpanded ? '' : 'max-h-16 overflow-hidden'}`}>
                                {currentSlide.content}
                            </p>
                            {currentSlide.content.length > 100 && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-xs text-emerald-600 hover:text-emerald-800 mt-1 font-medium"
                                >
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <button
                                onClick={() => {
                                    setIsExpanded(false);
                                    setCurrentSlideIndex(i => Math.max(0, i - 1));
                                }}
                                disabled={currentSlideIndex === 0}
                                className="p-2 rounded-full disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </button>

                            <span className="px-3 py-1 bg-emerald-100 rounded-full text-xs text-emerald-800 font-medium">
                                {currentSlideIndex + 1}/{slides.length}
                            </span>

                            <button
                                onClick={() => {
                                    setIsExpanded(false);
                                    setCurrentSlideIndex(i => Math.min(slides.length - 1, i + 1));
                                }}
                                disabled={currentSlideIndex === slides.length - 1}
                                className="p-2 rounded-full disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EducationalModal;