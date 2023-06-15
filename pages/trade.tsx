import { NextPage } from 'next'
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import LiveSwapInfo from '@/components/layout/swapPanel/swapInfo';
import SwapSettings from '@/components/layout/swapPanel/swapSettings';

const Trade: NextPage = ({ }) => {
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAdress] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [connected, setConnected] = useState(false);
  const [amount, setAmount] = useState(0.00);
  const [amountOut, setAmountOut] = useState(0.00);


  const handleInputAmountChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Only update the value state if the input consists of digits only
      setAmount(inputValue);
    }
  };


  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const handleConnected = () => {
    setConnected(!connected)
  }

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setAdress(e.target.value);
    console.log(address)
  };

  const handleInputClick = () => {
    if (address === '') {
      setAdress('');
    }
  };

  const handleAction = () => {
    setAction(!action);
  };

  const handleSend = () => {
    if (address === '') {
      setLoading(false);
    } else {
      setLoading(true);
      console.log('send')
      // Simulating an asynchronous action
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }
  const handleSwap = () => {
    if (amount === 0) {
      setLoading(false)
    } else {
      setLoading(true);
      console.log('swap')
      // Simulating an asynchronous action
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <main>
      <div className="flex flex-col items-center h-screen justify-center my-8">
        <div className="flex flex-col justify-center p-4 rounded-lg bg-gray4 shadow-lg">
          <div className="flex flex-row gap-26 justify-center items-center">
            <div className='flex-1 flex-row p-2'>
              <button className={`p-2 ${action ? '' : 'text-gray-400'}`}
                onClick={handleAction}>
                Swap
              </button>
              <button className={`p-2 ${action ? 'text-gray-400' : ''}`}
                onClick={handleAction}
              >
                Send
              </button>
            </div>
            <div className='flex flex-row space-x-4 px-2 '>
              {!refresh ? <button className='hover:' onClick={handleRefresh}>
                <Image
                  src="/icons/refresh.svg"
                  alt="Example Image"
                  width="36"
                  height="36"
                />
              </button> : <button className='animate-spin' onClick={handleRefresh}>
                <Image
                  src="/icons/refresh.svg"
                  alt="Example Image"
                  width="36"
                  height="36"
                />
              </button>}
              < SwapSettings />
            </div>
          </div>
          <div className='flex flex-col justify-start '>
            <div className="flex-1 flex-col items-start p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <input type='text'
                    className='font-AeonikPro-700 font-normal font-bold text-4xl bg-gray4 text-white box-border  rounded w-1/2 outline-none'
                    placeholder='0.0'
                    value={amount}
                    onChange={handleInputAmountChange} />
                </div>
                <div className="flex flex-shrink box-border border border-borderUnselected rounded-lg flex items-center px-3 py-2 gap-x-6">
                  <Image
                    src="/icons/cryptoIcons/eth.svg"
                    alt="settings"
                    width="44"
                    height="44"
                  />
                  <div className='flex flex-col'>
                    <p>ETH</p>
                    <p>Native</p>
                  </div>
                  <button>
                    <Image
                      src="/icons/dropdown.svg"
                      alt="settings"
                      width="32"
                      height="32"
                    />
                  </button>
                </div>
              </div>
              {connected ? <> <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                {/* <p>${tokenToUsd}</p> */}
                <div className='flex items-center w-124 p-2'>
                  <p>
                    Balance: 0.00
                  </p>
                  <button className='text-blue-400 pl-2'>MAX</button>
                </div>
              </div></> :
                <> <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                  <p>$0.00</p>
                  <div className='flex items-center w-124 p-2'>
                    <p>
                      Balance: 0.00
                    </p>
                  </div>
                </div></>}
            </div>
            {action ? <><div className="flex flex-row items-center justify">
              <div className='flex-1 h-0 border border-borderUnselected item-start' />
              <button >
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width="32"
                  height="32"
                />
              </button>
              <div className='flex-1 h-0 border border-borderUnselected' />
            </div>
              <div className="flex-1 flex-col items-start p-4">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className='font-AeonikPro-700 font-normal font-bold text-4xl leading-10'>{amountOut}</p>
                  </div>
                  <div className="flex flex-shrink box-border border border-borderUnselected rounded-lg flex items-center px-3 py-2 gap-x-6">
                    <Image
                      src="/icons/cryptoIcons/usdt.svg"
                      alt="settings"
                      width="44"
                      height="44"
                    />
                    <div className='flex flex-col'>
                      <p>USDT</p>
                      <p>Native</p>
                    </div>
                    <button>
                      <Image
                        src="/icons/dropdown.svg"
                        alt="settings"
                        width="32"
                        height="32"
                      />
                    </button>
                  </div>
                </div>
                {connected ? <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                  <p>$5,271.39</p>
                  <div className='flex items-center w-124 p-2'>
                    <p>
                      Balance: 300
                    </p>
                  </div>
                </div> : <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                  <p>$0.00</p>
                  <div className='flex items-center w-124 p-2'>
                    <p>
                      Balance: 0.00
                    </p>
                  </div>
                </div>}
              </div></> : <>
              <div className="flex-1 flex-row my-4 p-2 box-border border border-borderUnselected rounded-md">
                <input className='font-AeonikPro-700 mx-4 text-2xl bg-gray4 text-white outline-none'
                  type="text"
                  placeholder='Address'
                  value={address}
                  onChange={handleInputChange}
                  onClick={handleInputClick} />
              </div></>}
            {action ? <><LiveSwapInfo/></> : <></>}
           </div>
          <div className="flex flex-grow text-black justify-center py-3 my-2 mt-4 bg-teal-500 rounded-lg">
            <button
              className={`font-bold text-lg ${!loading && !action ? 'w-full' : ''}`}
              onClick={!loading && !action ? handleSend : undefined}
              disabled={loading}
            >
              {!loading && !action ? 'Send' : ''}
              {loading && !action && (
                <div className="animate-spin">
                  <Image src="/icons/refresh.svg" alt="refresh" width="32" height="32" />
                </div>
              )}
            </button>
            <button
              className={`font-bold text-lg ${!loading && action ? 'w-full' : ''}`}
              onClick={!loading && action ? handleSwap : undefined}
              disabled={loading}
            >
              {!loading && action ? 'Swap' : ''}
              {loading && action && (
                <div className="animate-spin">
                  <Image src="/icons/refresh.svg" alt="refresh" width="32" height="32" />
                </div>
              )}
            </button>
          </div>

        </div>
      </div>
    </main >
  )
}

export default Trade
