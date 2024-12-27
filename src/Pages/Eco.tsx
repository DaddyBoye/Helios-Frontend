import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BookOpen, Sprout } from 'lucide-react';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
import CarbonStats from '@/Components/CarbonStats';
import Projects from "../Components/Projects";
import InfoCards from "../Components/InfoCards";
import EducationalModal from '../Components/EducationalModal';
import ProjectModal from '../Components/ProjectModal';
import { educationalContent } from '../data/EducationalContent';
import '../App.css';

interface Friend {
    id: number;
    name: string;
    score: number;
    avatar: string;
    referralCount: number;
}

interface OutletContext {
    friends: Friend[];
    minerate: number | null;
    avatarPath: string | null;
    telegramId: string | null;
}

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

function Eco() {
    const { friends, minerate, avatarPath, telegramId } = useOutletContext<OutletContext>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<typeof educationalContent[keyof typeof educationalContent] | null>(null);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleCardClick = (title: keyof typeof educationalContent) => {
        setModalContent(educationalContent[title]);
        setModalOpen(true);
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setProjectModalOpen(true);
    };

    return (
        <div className="relative flex flex-col font-sans overflow-scroll h-full pb-20">
            <StarryBackground />
            <div className="relative h-full flex-col flex items-center">
                <Header
                    minerate={minerate}
                    friendsCount={friends.length}
                    avatarPath={avatarPath}
                />
                
                <div className="w-full mt-16">
                    {/* Global Stats */}
                    <section>
                        <CarbonStats />
                    </section>
                    
                    {/* Learning */}
                    <section>
                        <div className="flex items-center gap-2 pl-4">
                            <BookOpen className="text-white" size={20} />
                            <h2 className="text-lg font-bold text-white">Learn</h2>
                        </div>
                        <InfoCards onCardClick={handleCardClick} />
                    </section>

                    {/* Projects */}
                    <section>
                        <div className="flex items-center gap-1 mt-2 mb-2 pl-4">
                            <Sprout className="text-white" size={24} />
                            <h2 className="text-lg font-bold text-white">Projects</h2>
                        </div>
                        <Projects onProjectClick={handleProjectClick} telegramId={telegramId ?? ''} />
                    </section>
                </div>
            </div>

            <EducationalModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                content={modalContent}
            />
            <ProjectModal
                project={selectedProject}
                isOpen={isProjectModalOpen}
                onClose={() => setProjectModalOpen(false)}
                telegramId={telegramId ?? ''}
            />
        </div>
    );
}

export default Eco;