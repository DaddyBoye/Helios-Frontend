import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/Components/ui/card";
import { Heart, Star, ThumbsUp, Leaf, ChevronLeft, ChevronRight, X, CheckCircle } from 'lucide-react';

interface ProjectImage {
    url: string;
    caption: string;
    description: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    carbonStandard: string;
    creditType: string;
    carbonRemoved: number;
    images: ProjectImage[];
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    telegramId: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, telegramId }) => {
    const [rating, setRating] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [feedback, setFeedback] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasExistingRating, setHasExistingRating] = useState(false);

    const feedbackOptions = [
        { icon: <Heart className="h-4 w-4" />, label: "Impactful" },
        { icon: <ThumbsUp className="h-4 w-4" />, label: "Transparent" },
        { icon: <Leaf className="h-4 w-4" />, label: "Sustainable" },
        { icon: <Heart className="h-4 w-4" />, label: "Innovative" },
        { icon: <ThumbsUp className="h-6 w-6" />, label: "Well-documented" },
        { icon: <Leaf className="h-6 w-6" />, label: "Community-focused" }
    ];

    useEffect(() => {
        const fetchExistingRating = async () => {
            if (!project || !isOpen) return;

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SERVER2_URL}/api/ratings/${project.id}/user?telegramId=${telegramId}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch rating');
                }

                const data = await response.json();
                
                if (data.hasRated) {
                    setRating(data.rating);
                    setFeedback(data.comment ? data.comment.split(', ') : []);
                    setHasExistingRating(true);
                    setIsSubmitted(true);
                }
            } catch (err) {
                console.error('Error fetching rating:', err);
                // Don't show error to user as this is a non-critical operation
            }
        };

        fetchExistingRating();
    }, [project, isOpen, telegramId]);

    useEffect(() => {
        if (isOpen) {
            // Only reset if there's no existing rating
            if (!hasExistingRating) {
                setActiveSlide(0);
                setActiveImageIndex(0);
                setRating(0);
                setFeedback([]);
                setError(null);
                setIsSubmitted(false);
            }
        }
    }, [isOpen, hasExistingRating]);

    const handleSubmitRating = async () => {
        if (!project || !rating) {
            setError("Please select a rating before submitting");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER2_URL}/api/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_id: project.id,
                    telegramId,
                    rating,
                    comment: feedback.join(', ')
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit rating');
            }

            setIsSubmitted(true);
            setHasExistingRating(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while submitting');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !project) return null;

    const slides = [
        {
            title: project.title,
            content: (
                <div className="space-y-4">
                    <img
                        src={project.images[0].url}
                        alt="Project Overview"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-gray-600 text-sm leading-relaxed max-h-24 overflow-y-auto">
                        {project.description}
                    </p>
                </div>
            )
        },
        {
            title: "Impact",
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="text-lg font-semibold text-gray-900">{project.carbonRemoved}</div>
                            <div className="text-xs text-gray-500">CO₂ Removed</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="text-lg font-semibold text-gray-900">{project.carbonStandard}</div>
                            <div className="text-xs text-gray-500">Standard</div>
                        </div>
                    </div>
                    <img
                        src={project.images[1].url}
                        alt="Impact Metrics"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            )
        },        
        {
            title: "Gallery",
            content: (
                <div className="space-y-3">
                    <div className="relative">
                        <img
                            src={project.images[activeImageIndex].url}
                            alt={`Project image ${activeImageIndex + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
                            <p className="text-white text-sm font-medium">
                            {project.images[activeImageIndex].caption}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        {project.images[activeImageIndex].description}
                    </p>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setActiveImageIndex(prev => 
                                prev > 0 ? prev - 1 : project.images.length - 1
                            )}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm active:scale-95 transition-all"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-xs font-medium text-gray-500">
                            {activeImageIndex + 1} of {project.images.length}
                        </span>
                        <button
                            onClick={() => setActiveImageIndex(prev => 
                                prev < project.images.length - 1 ? prev + 1 : 0
                            )}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm active:scale-95 transition-all"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )
        },
        {
            title: "Rate",
            content: (
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">
                            {hasExistingRating ? "Your Rating" : "How would you rate this project?"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {hasExistingRating 
                                ? "You've already rated this project"
                                : "Your rating helps improve carbon removal"
                            }
                        </p>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => !hasExistingRating && setRating(star)}
                                className={`p-1.5 ${!hasExistingRating ? 'hover:scale-110 active:scale-95' : ''} 
                                    transition-transform ${hasExistingRating ? 'cursor-default' : ''}`}
                            >
                                <Star 
                                    className={`h-8 w-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                                    fill={rating >= star ? 'currentColor' : 'none'}
                                    strokeWidth={1.5}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: isSubmitted ? "Thank You!" : "Feedback",
            content: isSubmitted ? (
                <div className="space-y-6 py-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {hasExistingRating ? "You've rated this project!" : "Thank you for your feedback!"}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Your rating helps us improve carbon removal projects
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium 
                            hover:bg-gray-200 active:scale-[0.98] transition-all"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">What did you like about it?</h3>
                        <p className="text-sm text-gray-500">Select all that apply</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {feedbackOptions.map((option) => (
                            <button
                                key={option.label}
                                onClick={() => setFeedback(prev => 
                                    prev.includes(option.label)
                                        ? prev.filter(f => f !== option.label)
                                        : [...prev, option.label]
                                )}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm 
                                    ${feedback.includes(option.label)
                                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                                        : 'bg-gray-50 text-gray-600 border-gray-200'
                                    } border hover:bg-blue-50 hover:text-blue-600 transition-colors`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    <button 
                        onClick={handleSubmitRating}
                        disabled={isSubmitting || !rating}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium 
                            hover:bg-blue-700 active:scale-[0.98] transition-all
                            disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex backdrop-blur-sm items-center justify-center bg-black/50 p-3">
            <Card className="w-full max-w-sm bg-white shadow-xl">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {slides[activeSlide].title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full active:scale-95 transition-all"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>

                    {slides[activeSlide].content}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <button
                            onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                            disabled={activeSlide === 0}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm 
                                hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 
                                active:scale-95 transition-all"
                        >
                            Back
                        </button>
                        <div className="text-xs font-medium text-gray-500">
                            {activeSlide + 1} of {slides.length}
                        </div>
                        <button
                            onClick={() => setActiveSlide(prev => Math.min(slides.length - 1, prev + 1))}
                            disabled={activeSlide === slides.length - 1}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm 
                                hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 
                                active:scale-95 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectModal;