import { NextPage } from 'next'
import Image from 'next/image'

const Trade: NextPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center h-screen justify-center my-8">
        <div className="flex flex-col justify-center p-4 rounded-lg bg-gray-900 shadow-lg">
          <div className="flex flex-row gap-26 justify-center items-center">
            <div className='flex-1 flex-row p-2'>
              <button className='p-2'>
                Swap
              </button>
              <button className='p-2 text-gray-400' >
                Send
              </button>
            </div>
            <div className='flex flex-row px-4'>
              <button>
                <Image
                  src="/icons/refresh.svg"
                  alt="Example Image"
                  width="32"
                  height="32"
                />
              </button>
              <button >
                <Image
                  src="/icons/tradeSettings.svg"
                  alt="settings"
                  width="32"
                  height="32"
                />
              </button>
            </div>
          </div>
          <div className='flex flex-col justify-start '>
            <div className="flex-1 flex-col items-start p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className='font-AeonikPro-700 font-normal font-bold text-4xl leading-10'>2.5</p>
                </div>
                <div className="flex flex-shrink box-border border border-gray-800 rounded-lg flex items-center px-3 py-2 gap-x-6">
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
              <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                <p>$5,271.39</p>
                <div className='flex items-center w-124 p-2'>
                  <p>
                    Balance: 52.49
                  </p>
                  <button className='text-blue-400 pl-2'>MAX</button>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify">
              <div className='flex-1 h-0 border border-gray-800 item-start' />
              <button >
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width="32"
                  height="32"
                />
              </button>
              <div className='flex-1 h-0 border border-gray-800' />
            </div>
            <div className="flex-1 flex-col items-start p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className='font-AeonikPro-700 font-normal font-bold text-4xl leading-10'>2.5</p>
                </div>
                <div className="flex flex-shrink box-border border border-gray-800 rounded-lg flex items-center px-3 py-2 gap-x-6">
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
              <div className="flex flex-row justify-between items-center py-2 gap-x-14">
                <p>$5,271.39</p>
                <div className='flex items-center w-124 p-2'>
                  <p>
                    Balance: 300
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-row items-center rounded-md px-4'>
              <div className='flex flex-row items-center pr-4'>
                <Image
                  src="/icons/info.svg"
                  alt='info'
                  width="16"
                  height="16"
                />
              </div>
              <p className='flex-1 '>1 ETH = 1,956.52 USDT ($1,577.07)</p>
              <div className='flex items-center '>
                <Image
                  src="/icons/fuel.svg"
                  alt='fuel'
                  width="68"
                  height="24"
                />
                <button>
                  <Image
                    src="/icons/dropdown.svg"
                    alt='fuel'
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-grow text-black justify-center py-3 my-2 mt-4 bg-teal-500 rounded-lg " >
            <button >
              Swap
            </button>
          </div>
        </div>
      </div>
    </main >
  )
}

export default Trade
