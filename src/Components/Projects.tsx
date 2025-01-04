import React, { useState, useEffect, useRef } from 'react';
import { Star, StarOff } from 'lucide-react';
import Rectangle from '../images/Rectangle 95-1.png';
import Rectangle2 from '../images/Rectangle 95.png';
import Helios from '../images/helios 3 mascot.png';
import Helios2 from '../images/helios 6 mascot.png';
import Helios3 from '../images/helios 7 mascot.png';

interface ProjectImage {
  url: string;
  caption: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  carbonStandard: string;
  creditType: string;
  carbonRemoved: number;
  location: string;
  images: ProjectImage[];
}

interface ProjectRating {
  hasRated: boolean;
  averageRating: number;
}

interface ProjectWithRating extends Project {
  rating: ProjectRating;
}

interface ProjectCardProps {
  title: string;
  location: string;
  image?: string;
  type: string;
  averageRating: number;
  hasRated: boolean;
  onClick: () => void;
  isLast?: boolean;
}

interface ProjectCardScrollerProps {
  onProjectClick: (project: Project) => void;
  telegramId: string;
}

const SkeletonCard = ({ isLast }: { isLast?: boolean }) => (
  <div className={`flex-shrink-0 font-sans pl-5 w-72 ${isLast ? 'mr-5' : ''}`}>
    <div className="relative rounded-lg overflow-hidden animate-pulse">
      <div className="flex justify-between absolute top-3 left-3 right-3">
        <div className="bg-gray-300 text-transparent px-6 py-1 rounded-full">
          -
        </div>
        <div className="bg-gray-300 text-transparent px-6 py-1 rounded-full">
          -
        </div>
      </div>
      <div className="w-full h-40 bg-gray-300" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
        <div className="absolute bottom-0 pb-2 px-3 w-full">
          <div className="flex justify-between items-center">
            <div className="bg-gray-300 h-4 w-32 rounded" />
            <div className="bg-gray-300 h-6 w-20 rounded-full" />
          </div>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300 h-4 w-24 rounded mt-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  location, 
  image, 
  type, 
  averageRating, 
  hasRated, 
  onClick,
  isLast 
}) => (
  <div className={`flex-shrink-0 font-sans pl-5 w-72 ${isLast ? 'mr-5' : ''}`} onClick={onClick}>
    <div className="relative rounded-lg overflow-hidden cursor-pointer">
      <div className="flex justify-between absolute top-3 left-3 right-3">
        <div className="bg-gray-800/80 text-white text-sm px-2 py-1 rounded-full">
          {averageRating ? averageRating.toFixed(1) : '-'}
        </div>
        <div className={`${hasRated ? 'bg-blue-500' : 'bg-yellow-500'} text-white text-sm px-2 py-1 rounded-full`}>
          {hasRated ? (
            <Star className="w-4 h-4" />
          ) : (
            <StarOff className="w-4 h-4" />
          )}
        </div>
      </div>
      <img 
        src={image || "/api/placeholder/400/240"} 
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      <div className="absolute bottom-0 pb-2 px-3 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">{title}</h3>
          <button className={`px-3 py-1 my-auto rounded-full text-xs ${
            type === 'energy' ? 'bg-green-500' : 
            type === 'default' ? 'bg-orange-500' : 
            type === 'water' ? 'bg-blue-500' : 
            'bg-gray-500'
          }`}>
            Learn more
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-300 mt-1">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {location}
        </div>
      </div>
    </div>
  </div>
);

const ProjectCardScroller: React.FC<ProjectCardScrollerProps> = ({ onProjectClick, telegramId }) => {
  const [projectsWithRatings, setProjectsWithRatings] = useState<ProjectWithRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "Project Gamma",
      type: "water",
      description: "Description for Project Gamma",
      carbonStandard: "Standard A",
      creditType: "Credit A",
      carbonRemoved: 100,
      location: "Location Gamma",
      images: [
        { url: Rectangle, caption: "Beautiful Landscape", description: "A breathtaking view of nature." },
        { url: Helios, caption: "Helios Mascot", description: "The vibrant Helios mascot illustration." },
        { url: Helios2, caption: "Solar Farm", description: "A thriving solar farm under a clear sky." },
        { url: Helios3, caption: "Sustainable Future", description: "A vision of a green, sustainable future." },
        { url: Rectangle2, caption: "Urban Planning", description: "Smart urban planning for sustainability." },
      ],
    },
    {
      id: "2",
      title: "Project Beta",
      type: "energy",
      description: "Description for Project Beta",
      carbonStandard: "Standard B",
      creditType: "Credit B",
      carbonRemoved: 200,
      location: "Location Beta",
      images: [
        { url: Rectangle2, caption: "Urban Planning", description: "Smart urban planning for sustainability." },
        { url: Helios, caption: "Helios Mascot", description: "The vibrant Helios mascot illustration." },
        { url: Helios2, caption: "Solar Farm", description: "A thriving solar farm under a clear sky." },
        { url: Helios3, caption: "Sustainable Future", description: "A vision of a green, sustainable future." },
        { url: Rectangle, caption: "Beautiful Landscape", description: "A breathtaking view of nature." },
      ],
    },
    {
      id: "3",
      title: "Project Gamma",
      type: "water",
      description: "Description for Project Gamma",
      carbonStandard: "Standard A",
      creditType: "Credit A",
      carbonRemoved: 100,
      location: "Location Gamma",
      images: [
        { url: Rectangle, caption: "Beautiful Landscape", description: "A breathtaking view of nature." },
        { url: Helios, caption: "Helios Mascot", description: "The vibrant Helios mascot illustration." },
        { url: Helios2, caption: "Solar Farm", description: "A thriving solar farm under a clear sky." },
        { url: Helios3, caption: "Sustainable Future", description: "A vision of a green, sustainable future." },
        { url: Rectangle2, caption: "Urban Planning", description: "Smart urban planning for sustainability." },
      ],
    },
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectDataPromises = projects.map(async project => {
          // Fetch average rating
          const averageRatingResponse = await fetch(
            `${import.meta.env.VITE_SERVER2_URL}/api/ratings/${project.id}`
          );
          const averageRatingData = await averageRatingResponse.json();

          // Fetch user rating status
          const userRatingResponse = await fetch(
            `${import.meta.env.VITE_SERVER2_URL}/api/ratings/${project.id}/user?telegramId=${telegramId}`
          );
          const userRatingData = await userRatingResponse.json();

          return {
            ...project,
            rating: {
              hasRated: userRatingData.hasRated,
              averageRating: averageRatingData.averageRating || 0
            }
          };
        });

        const projectsWithData = await Promise.all(projectDataPromises);
        setProjectsWithRatings(projectsWithData);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [projects, telegramId]);

  useEffect(() => {
    if (!isLoading && projectsWithRatings.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % projectsWithRatings.length;
        setCurrentIndex(nextIndex);
        
        // Smooth scroll to the next card
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            left: nextIndex * 288, // 288px is the width of each card (272px) + padding (16px)
            behavior: 'smooth'
          });
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isLoading, projectsWithRatings.length]);

  if (isLoading) {
    return (
      <div className="w-full font-sans">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard isLast />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="flex">
          {projectsWithRatings.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              location={project.location}
              image={project.images[0].url}
              type={project.type}
              averageRating={project.rating.averageRating}
              hasRated={project.rating.hasRated}
              onClick={() => onProjectClick(project)}
              isLast={index === projectsWithRatings.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardScroller;