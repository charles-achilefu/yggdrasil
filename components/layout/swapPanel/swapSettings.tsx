import React, { useState } from 'react';
import Image from 'next/image'

const SwapSettings = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        console.log("popUp")
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleToggle}>
                <Image
                    src="/icons/tradeSettings.svg"
                    alt="settings"
                    width="36"
                    height="36"
                />
            </button>
            {isOpen && (
                        <div className="fixed z-50 item-center flex flex-col items-start p-4 gap-4 bg-gray4 border border-borderUnselected rounded"
                        style={{
                          width: '324px',
                          height: '272px',
                          left: '610px',
                          top: '650px',
                        }}
                      >
                    {/* Add your content inside the pop-up */}
                    <p className="text-white">Pop-up Content</p>
                    <p className="text-white">More Content</p>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={handleToggle}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default SwapSettings;