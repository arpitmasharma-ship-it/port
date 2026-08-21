import { useMemo, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../context/ThemeContext";

const AnimatedBackground = () => {
    const { theme } = useTheme();
    const [particlesLoaded, setParticlesLoaded] = useState(false);

    const isDark = theme === "dark";

    useEffect(() => {
        const initParticles = async () => {
            await loadSlim();
            setParticlesLoaded(true);
        };

        initParticles();
    }, []);

    const options = useMemo(
        () => ({
            fullScreen: {
                enable: false,
                zIndex: 0,
            },

            fpsLimit: 30,

            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },

                modes: {
                    repulse: {
                        distance: 80,
                        duration: 0.4,
                    },
                },
            },

            particles: {
                color: {
                    value: isDark
                        ? ["#00d4ff", "#0af", "#0066cc"]
                        : ["#0088b3", "#0077aa", "#006699"],
                },

                links: {
                    color: isDark ? "#00d4ff" : "#0088b3",
                    distance: 120,
                    enable: true,
                    opacity: isDark ? 0.1 : 0.06,
                    width: 1,
                },

                move: {
                    direction: "none",
                    enable: true,

                    outModes: {
                        default: "bounce",
                    },

                    random: false,
                    speed: 0.5,
                    straight: false,
                },

                number: {
                    density: {
                        enable: true,
                    },

                    value: 50,
                },

                opacity: {
                    value: isDark ? 0.2 : 0.12,
                },

                shape: {
                    type: "circle",
                },

                size: {
                    value: {
                        min: 1,
                        max: 2,
                    },
                },
            },

            detectRetina: true,
        }),
        [isDark]
    );

    if (!particlesLoaded) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Particles
                id="tsparticles"
                options={options}
                className="w-full h-full"
            />
        </div>
    );
};

export default AnimatedBackground;