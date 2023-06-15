import { useState } from 'react';
import Image from 'next/image'

const LiveSwapInfo = () => {
  const [info, setInfo] = useState([
    { title: 'Min Received', value: 'Value' },
    { title: 'Price Impact', value: 'Value' },
    { title: 'Inbound Fee', value: 'Value' },
    { title: 'Outbound Fee', value: 'Value' },
    { title: 'Time Estimate', value: 'Value' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchLiveData = () => {
    // Fetch Data
    const updatedValues = {
      minReceived: 'Updated Value',
      priceImpact: 'Updated Value',
      inboundFee: 'Updated Value',
      outboundFee: 'Updated Value',
      timeEstimate: 'Updated Value',
    };

    // Update the info array with the updated values
    setInfo((prevInfo) => [
      { title: 'Min Received', value: updatedValues.minReceived },
      { title: 'Price Impact', value: updatedValues.priceImpact },
      { title: 'Inbound Fee', value: updatedValues.inboundFee },
      { title: 'Outbound Fee', value: updatedValues.outboundFee },
      { title: 'Time Estimate', value: updatedValues.timeEstimate },
    ]);
  };

  return (
    <div>
      <div className={`relative ${isOpen ? 'flex-col' : 'h-12'}`}>
        <div
          className={`flex flex-row items-center rounded-md px-4 `}
          onClick={toggleDropdown}
        >
          <div className="flex flex-row items-center pr-4">
            <Image
              src="/icons/info.svg"
              alt="info"
              width="16"
              height="16"
            />
          </div>
          <p className="flex-1 text-white">1 ETH = 1,956.52 USDT ($1,577.07)</p>
          <div className="flex items-center">
            <Image
              src="/icons/fuel.svg"
              alt="fuel"
              width="68"
              height="24"
            />
            <button>
              <Image
                src="/icons/dropdown.svg"
                alt="fuel"
                width="24"
                height="24"
              />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="mt-4 p-4 bg-gray4 border border-borderUnselected rounded-md">
            {info.map((entry, index) => (
              <div key={index} className="flex justify-between">
                <p>{entry.title}:</p>
                <p>{entry.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSwapInfo;
