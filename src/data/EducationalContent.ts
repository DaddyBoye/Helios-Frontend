import Rectangle from '../images/Rectangle 95-1.png';
import Rectangle2 from '../images/Rectangle 95.png';

interface Slide {
    title: string;
    content: string;
    image: string;
}

interface EducationalCategory {
    slides: Slide[];
}

export const educationalContent: Record<string, EducationalCategory> = {
    Footprint: {
        slides: [
            {
                title: "Measuring Your Impact",
                content: "Every action leaves a carbon trace. Your daily choices in transportation, food, and energy use contribute to your carbon footprint. Understanding this impact is the first step toward positive change.",
                image: Rectangle,
            },
            {
                title: "The Numbers Matter",
                content: "The average person creates 32.3B tonnes of CO2 yearly. Small changes in daily habits can lead to significant reductions in your personal carbon footprint and help combat climate change.",
                image: Rectangle2,
            },
            {
                title: "Making Better Choices",
                content: "From choosing public transport to reducing energy consumption, every sustainable choice counts. Discover how your daily decisions can help create a greener future for all.",
                image: Rectangle,
            },
        ],
    },
    Emission: {
        slides: [
            {
                title: "Global Impact",
                content: "Carbon emissions are reaching critical levels, with 32.3B tonnes released annually. These emissions trap heat in our atmosphere, leading to rising temperatures and climate change.",
                image: Rectangle2,
            },
            {
                title: "Industry Effects",
                content: "Power plants, factories, and vehicles are major emission sources. Understanding where emissions come from helps us target solutions and drive meaningful change.",
                image: Rectangle,
            },
            {
                title: "Tracking Progress",
                content: "Monitoring emission levels helps us measure our progress in fighting climate change. Cities and industries worldwide are working to reduce their carbon output.",
                image: Rectangle2,
            },
        ],
    },
    Solutions: {
        slides: [
            {
                title: "Green Technology",
                content: "Renewable energy and efficient technologies are revolutionizing how we power our world. Solar, wind, and other clean energy sources are becoming more accessible and affordable.",
                image: Rectangle,
            },
            {
                title: "Smart Cities",
                content: "Cities are implementing green infrastructure and sustainable transport systems. These innovations show how we can build a cleaner, more efficient future.",
                image: Rectangle2,
            },
            {
                title: "Working Together",
                content: "From individual actions to global agreements, everyone has a role in creating sustainable solutions. Together, we can build a cleaner, healthier planet for future generations.",
                image: Rectangle,
            },
        ],
    },
};