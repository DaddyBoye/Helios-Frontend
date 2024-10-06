import React, { useEffect, useState } from 'react';

const StarryBackground: React.FC = () => {
    const [stars, setStars] = useState<JSX.Element[]>([]);
    const [shootingStar, setShootingStar] = useState<JSX.Element | null>(null);

    // Function to create stars
    const createStars = (numStars: number): JSX.Element[] => {
        const stars: JSX.Element[] = [];
        const minSpeed = 150; // Slower minimum speed (100 seconds)
        const maxSpeed = 200; // Slower maximum speed (150 seconds)

        for (let i = 0; i < numStars; i++) {
            const isLargeStar = Math.random() < 0.1; // 10% of stars are large
            const starSize = isLargeStar ? Math.random() * 1.5 + 1.5 : Math.random() * 0.5 + 0.3; // Larger or smaller stars

            const starStyle: React.CSSProperties = {
                position: 'absolute',
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                width: `${starSize}px`,
                height: `${starSize}px`,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: isLargeStar ? Math.random() * 0.8 + 0.2 : Math.random() * 0.6 + 0.2, // More opacity for large stars
                boxShadow: isLargeStar ? '0px 0px 2px 1px white' : '0px 0px 1px 0.5px white', // Glow effect
                animation: `twinkle ${Math.random() * 2 + 1}s infinite alternate, 
                             move-${i} ${Math.random() * (maxSpeed - minSpeed) + minSpeed}s linear infinite`,
            };

            stars.push(<div key={i} style={starStyle} className="star" />);
        }
        return stars;
    };

    // Function to create a shooting star
    const createShootingStar = (): JSX.Element => {
        const startX = Math.random() * 100; // Random start position on X axis (in vw)
        const startY = Math.random() * 100; // Random start position on Y axis (in vh)
        const directionX = Math.random() > 0.5 ? 1 : -1; // Randomly go left or right
        const directionY = Math.random() > 0.5 ? 1 : -1; // Randomly go up or down
        const distanceX = Math.random() * 50 * directionX; // Random distance on X axis (positive or negative)
        const distanceY = Math.random() * 50 * directionY; // Random distance on Y axis (positive or negative)

        const shootingStarStyle: React.CSSProperties = {
            position: 'absolute',
            top: `${startY}vh`,
            left: `${startX}vw`,
            width: '2px',
            height: '2px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 6px 3px white',
            borderRadius: '50%',
            opacity: 1,
            animation: `shootingStar 1s ease-out 1`,
            transform: `translate(${distanceX}vw, ${distanceY}vh)` // Random direction and distance
        };

        return <div style={shootingStarStyle} key="shootingStar" />;
    };

    useEffect(() => {
        const starsArray = createStars(200); // Adjust the number of stars here
        setStars(starsArray);

        // Generate dynamic keyframes for each star
        const styleSheet = document.styleSheets[0];
        starsArray.forEach((_, i) => {
            const keyframes = `
                @keyframes move-${i} {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(${Math.random() * 100 - 50}vw, ${Math.random() * 100 - 50}vh);
                    }
                }
            `;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        });

        // Create shooting star at random intervals
        const shootingStarInterval = setInterval(() => {
            setShootingStar(createShootingStar());

            // Shooting star disappears after the animation ends
            setTimeout(() => {
                setShootingStar(null);
            }, 1000); // Match the animation duration of the shooting star
        }, Math.random() * 5000 + 5000); // Shooting star appears every 5-10 seconds

        return () => clearInterval(shootingStarInterval); // Cleanup on component unmount
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0D2E48] to-[#0D151A]"> {/* Set background color */} 
            {stars}
            {shootingStar && shootingStar} {/* Render the shooting star */}
            <style>
                {`
                    @keyframes twinkle {
                        0% {
                            opacity: 0.5;
                        }
                        100% {
                            opacity: 1;
                        }
                    }

                    @keyframes shootingStar {
                        0% {
                            opacity: 1;
                            transform: translate(0, 0) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translate(50vw, 20vh) scale(0.5);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default StarryBackground;
