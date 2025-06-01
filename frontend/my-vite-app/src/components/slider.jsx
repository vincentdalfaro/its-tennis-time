import React, { useRef } from 'react';

export default function Sidebar({ icon }) {
    const sliderRef = useRef(null);

    const handleInputA = (e) => {
        const value = e.target.value;
        const container = sliderRef.current;
        container.style.setProperty('--value-a', value);
        container.style.setProperty('--text-value-a', JSON.stringify(value));
    };

    const handleInputB = (e) => {
        const value = e.target.value;
        const container = sliderRef.current;
        container.style.setProperty('--value-b', value);
        container.style.setProperty('--text-value-b', JSON.stringify(value));
    };

    return (
        <div
            ref={sliderRef}
            className="range-slider flat"
            data-ticks-position="top"
            style={{
                '--min': -500,
                '--max': 500,
                '--value-a': -220,
                '--value-b': 400,
                '--suffix': '"%"',
                '--text-value-a': '"-220"',
                '--text-value-b': '"400"',
            }}
        >
            <input
                type="range"
                min="-500"
                max="500"
                defaultValue="-220"
                onInput={handleInputA}
            />
            <output></output>
            <input
                type="range"
                min="-500"
                max="500"
                defaultValue="400"
                onInput={handleInputB}
            />
            <output></output>
            <div className="range-slider__progress"></div>
        </div>
    );
}