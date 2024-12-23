import React from 'react';

interface ProjectCardProps {
  title: string;
  location: string;
  image?: string; // Optional prop (you can omit the `?` if it's required)
  type: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, location, image, type }) => (
    <div className="flex-shrink-0 w-72 mr-4">
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex justify-between absolute top-3 left-3 right-3">
        <div className="bg-gray-800/80 text-white text-sm px-2 py-1 rounded-full">
          4.2
        </div>
        <div className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
      <img 
        src={image || "/api/placeholder/400/240"} 
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      <div className="absolute bottom-0 p-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">{title}</h3>
          <button className={`px-3 py-1 rounded-full text-xs ${type === 'energy' ? 'bg-green-500' : 'bg-orange-500'}`}>
            Learn more
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-300 mt-1">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M12 6v6l4 2" strokeWidth="2"/>
          </svg>
          {location}
        </div>
      </div>
    </div>
  </div>
);

const ProjectCardScroller = () => {
  return (
    <div className="w-full bg-gray-900 p-6">
      <div className="overflow-x-auto">
        <div className="flex">
          <ProjectCard
            title="Project name"
            location="Circle, Opposite Kilimanjaro"
            type="default"
          />
          <ProjectCard
            title="Project name"
            location="Circle, Opposite Kilimanjaro"
            type="energy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardScroller;