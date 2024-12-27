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
                title: "What is Carbon Footprint?",
                content: "A carbon footprint measures the total greenhouse gas emissions caused by an individual, event, organization, or product.",
                image: Rectangle,
            },
            {
                title: "Measuring Impact",
                content: "It includes direct emissions like driving a car and indirect emissions from products we buy.",
                image: Rectangle2,
            },
            {
                title: "Reduction Strategies",
                content: "Learn ways to reduce your carbon footprint through daily choices and lifestyle changes.",
                image: Rectangle,
            },
        ],
    },
    Emission: {
        slides: [
            {
                title: "Carbon Emissions",
                content: "Carbon emissions are greenhouse gases released into the atmosphere, primarily from burning fossil fuels.",
                image: Rectangle2,
            },
            {
                title: "Global Impact",
                content: "These emissions trap heat in the atmosphere, leading to global warming and climate change.",
                image: Rectangle,
            },
            {
                title: "Industry Sources",
                content: "Major sources include power generation, transportation, and industrial processes.",
                image: Rectangle2,
            },
        ],
    },
    Solutions: {
        slides: [
            {
                title: "Sustainable Solutions",
                content: "Renewable energy, energy efficiency, and sustainable practices help combat climate change.",
                image: Rectangle,
            },
            {
                title: "Individual Action",
                content: "Personal choices in transportation, consumption, and energy use make a difference.",
                image: Rectangle2,
            },
            {
                title: "Policy Changes",
                content: "Government policies and corporate initiatives drive large-scale environmental improvements.",
                image: Rectangle,
            },
        ],
    },
};
