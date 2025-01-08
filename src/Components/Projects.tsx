import React, { useState, useEffect, useRef } from 'react';
import { Star, StarOff } from 'lucide-react';
import Pacajai1 from "../images/Projects/Pacajai/Pacajai1.jpg";
import Pacajai2 from "../images/Projects/Pacajai/Pacajai2.png";
import Pacajai3 from "../images/Projects/Pacajai/Pacajai3.jpg";
import BRFCP1 from "../images/Projects/BRFCP/BRFC.png";
import BRFCP2 from "../images/Projects/BRFCP/BRFC2.png";
import BRFCP3 from "../images/Projects/BRFCP/BRFC3.png";
import BRFCP4 from "../images/Projects/BRFCP/BRFC4.png";
import MMR1 from "../images/Projects/MMR/MMR1.png";
import MMR2 from "../images/Projects/MMR/MMR2.png";
import MMR3 from "../images/Projects/MMR/MMR3.png";
import MMR4 from "../images/Projects/MMR/MMR4.png";
import MMR5 from "../images/Projects/MMR/MMR5.png";

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
  carbonRemoved: string;
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
            type === 'forestry' ? 'bg-green-500' : 
            type === 'water' ? 'bg-blue-500' : 
            type === 'energy' ? 'bg-yellow-500' : 
            'bg-gray-500'
            }`}>
            {type}
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
      title: "Pacajai REDD+ Project",
      type: "forestry",
      description: "In the heart of Brazil, a REDD project has been implemented to prevent deforestation on private parcels of land spanning 135,105 hectares.",
      carbonStandard: "Verra",
      creditType: "Credits Issued",
      carbonRemoved: "3,444.08",
      location: "Brazil, Portel",
      images: [
        { url: Pacajai2, caption: "The Amazon River", description: "The Amazon river is the largest river in the world." },
        { url: Pacajai1, caption: "The Amazon Rainforest", description: "Pacajai REDD+ works to protect parts of the Amazon." },
        { url: Pacajai3, caption: "Jaguar", description: "A jaguar in part of the Amazon protected by the Pacajai project." },
      ],
    },
    {
      id: "2",
      title: "Myanmar Mangrove Reforestation",
      type: "forestry",
      description: "This project in the Northern Ayeyarwady Division of Myanmar seeks to rejuvenate and safeguard 2,265.47 hectares of deteriorated land.",
      carbonStandard: "VCS",
      creditType: "Hectares Restored",
      carbonRemoved: "1000",
      location: "Myanmar, Northern Ayeyarwady",
      images: [
        { url: MMR1, caption: "A mnagrove in the Northern Ayeyarwady Division", description: "The Ayeyarwady Delta mangroves shrank by 64.2% between 1978 and 2011, from 262,300 to just 93,800 hectares" },
        { url: MMR2, caption: "Farmer at work in the mangrove", description: "Local communities recognize the value of conserving forests surrounding their dwellings both for protection against extreme weather events and as a source of sustenance given the importance of habitat conditions for crab and fish populations." },
        { url: MMR3, caption: "A mangrove drying up", description: "Mangrove drying disrupts ecosystems, biodiversity, coastal protection, and carbon storage." },
        { url: MMR4, caption: "A seed nursey shed", description: "The project has successfully planted 2.5 million magrove plant species. Mitigating 1.5 million tonnes of carbon." },
        { url: MMR5, caption: "Young mangrove saplings", description: "Mangrove forests provide essential ecosystem services like protecting coastlines from erosion, acting as nurseries for marine life, and sequestering carbon to mitigate climate change." },
      ],
    },
    {
      id: "3",
      title: "Bull Run Forest Carbon Project",
      type: "forestry",
      description: "This project preserves 666 hectares, combats deforestation, protects biodiversity, and promotes sustainable development within Central Belize.",
      carbonStandard: "Verra",
      creditType: "Credits Issued",
      carbonRemoved: "79,530.92",
      location: "Belize, Mountain Pine Ridge",
      images: [
        { url: BRFCP1, caption: "The Mountain Pine Ridge Forest Reserve", description: "The reserve was established in 1944 to protect and manage the native Belizean pine forests. It spans 106,352.5 acres (430 km2)." },
        { url: BRFCP2, caption: "Shower Falls", description: "Shower Falls is a stunning natural attraction located in the picturesque village of Cristo Rey, Belize. It falls under the reserve being protected by BRCFP." },
        { url: BRFCP3, caption: "Pablo, a local guide", description: "Cristo Rey in Belize receives numerous tourist each year who are usually attracted by the stunning landscape and waterfalls." },
        { url: BRFCP4, caption: "Jaguars caught on camera", description: "BRCFP protects one of the largest jaguar populations in the world by protecting the Mountain Pine Ridge Forest Reserve in the Cayo District." },
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
    <div className="w-full mb-4 font-sans">
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