import React, { useEffect, useState } from 'react';



interface CountdownTimerProps {
    reset: boolean; // Prop to trigger the reset
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ reset }) => {
    const [timeLeft, setTimeLeft] = useState<number>(30); // Set to 30 seconds

    useEffect(() => {
        if (reset) {
            setTimeLeft(30); // Reset to 30 seconds
        } else {
            const countdown = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
    
            return () => clearInterval(countdown); // Cleanup the interval on unmount
        }
    }, [reset]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    return (
        <div className="text-center">
            <p className="text-xl font-bold">{formatTime(timeLeft)}</p>
        </div>
    );
};

export default CountdownTimer;