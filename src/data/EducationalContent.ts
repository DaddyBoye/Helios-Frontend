import CarbonStory from "../images/Learn/Carbon Story.png";
import CarbonCredits from "../images/Learn/Carbon Credit 2.png";
import CarbonTrading from "../images/Learn/Carbon Trading 2.png";
import GreenSuper from "../images/Learn/Green Superpowers.png";
import ImpactJourney from "../images/Learn/Impact Journey.png";
import ReduceFootprint from "../images/Learn/Reduce Footprint.png";
import SpotEmissions from "../images/Learn/Spot Emissions.png";
import JoinMovement from "../images/Learn/Join Movement.png";
import LevelUp from "../images/Learn/Level Up.png";


interface Slide {
    title: string;
    content: string;
    image: string;
}

interface EducationalCategory {
    slides: Slide[];
}

export const educationalContent: Record<string, EducationalCategory> = {
    Emissions: {
        slides: [
            {
                title: "Carbon Story 🌱",
                content: "Imagine your daily life leaves a trail of invisible bubbles - that's your carbon footprint! Each time you charge your phone (170g CO2), drive to work (2.4kg CO2/mile), or enjoy a burger (3.6kg CO2), you're adding to your story. Let's discover yours!",
                image: CarbonStory,
            },
            {
                title: "Spot Emissions 🔍",
                content: "Think of carbon like a savings account in reverse - the less you spend, the better! Your morning coffee's journey from bean to cup creates about 200g CO2. A return flight from NY to LA? That's like running your AC for 3 years! Ready to start counting?",
                image: SpotEmissions,
            },
            {
                title: "Green Superpowers 💪",
                content: "You're more powerful than you think! Switching to a reusable water bottle saves 83kg CO2/year. Going meatless on Mondays? That's 331kg CO2 saved annually! What will be your first green superpower?",
                image: GreenSuper,
            },
        ],
    },
    Trading: {
        slides: [
            {
                title: "Carbon Credits 💡",
                content: "Think of carbon credits like fitness points, but for the planet! When you help the Earth (like planting trees or installing solar panels), you earn these points. One credit = stopping 1 tonne of CO2 from entering our atmosphere. Cool, right?",
                image: CarbonCredits,
            },
            {
                title: "Trade & Change 📈",
                content: "Welcome to the carbon trading market! Here, companies can buy your carbon-saving achievements (credits) to balance their emissions. It's like a global game of environmental tag - and you can be a player!",
                image: CarbonTrading,
            },
            {
                title: "Impact Journey 🌍",
                content: "Start small, dream big! Your household could earn credits by switching to solar ($15-40 per tonne). Or join community projects like local forest protection. Every credit traded is a high-five to the planet!",
                image: ImpactJourney,
            },
        ],
    },
    Action: {
        slides: [
            {
                title: "Reduce Footprint 🚀",
                content: "Ready to be a climate hero? Calculate your footprint (we'll guide you!), then explore ways to shrink it. From smart thermostats (saves 1.2 tonnes CO2/year) to composting (reduces 650kg CO2/year) - every action counts!",
                image: ReduceFootprint,
            },
            {
                title: "Join Movement 🤝",
                content: "Connect with fellow planet-savers! Join local green initiatives, start an eco-challenge at work, or create your own carbon-cutting project. Remember: alone we're a drop, together we're an ocean of change!",
                image: JoinMovement,
            },
            {
                title: "Level Up ⭐",
                content: "Transform your daily habits into climate action! Track your progress, earn green badges, and challenge friends. Did you know? If everyone made just three small changes, we'd save billions of tonnes of CO2. What will your three changes be?",
                image: LevelUp,
            },
        ],
    },
};