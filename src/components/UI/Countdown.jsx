import React from "react";
import { useState, useEffect } from "react";

export const Countdown = ({ expiryTime }) => {
    
    const getTimeLeft = () => {
		const difference = expiryTime - Date.now();

		if (difference <= 0) {
			return "Expired";
		}

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);
        
		const parts = [];

		if (days > 0) parts.push(`${days}d`);
		if (hours > 0 || days > 0) parts.push(`${hours}h`);
		if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
		parts.push(`${seconds}s`);

		return parts.join(" ");
	};
    
    const [countdown, setCountdown] = useState(getTimeLeft());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(getTimeLeft());
		}, 1000);

		return () => clearInterval(interval);
	}, [expiryTime]);

	return <div className="de_countdown">{countdown}</div>;
};
