import { NextPage } from 'next'
import Image from 'next/image'

const Trade: NextPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col justify-center w-1/2 min-h-1/2 p-4 rounded-lg bg-gray-900 shadow-lg">
          <div className="flex flex-row p-2 w-436 h-40 gap-26 justify-center items-center">
            <div className='flex flex-row'>
              <button className='p-4' >
                Swap
              </button>
              <button >
                Send
              </button>
            </div>
            <div className='flex flex-row p-2'>
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
          <div className='flex flex-col justify-start gap-6 w-436 h-307'>
            <div className="flex flex-col items-start px-20 w-436 h-124 bg-gray-900">
              <div className="flex items-center">
                <div className="flex-1 font-AeonikPro-700 text-32 leading-40">
                  <p>2.5</p>
                </div>
                <div className="flex-grow flex-shrink-0 box-border border border-gray-800 rounded-lg flex items-center px-3 py-2 gap-x-6">
                  <Image
                    src="/icons/cryptoIcons/eth.svg"
                    alt="settings"
                    width="64"
                    height="64"
                  />
                  <div className='flex flex-col'>
                    <p>ETH</p>
                    <p>Native</p>
                  </div>
                  <Image
                    src="/icons/dropdown.svg"
                    alt="settings"
                    width="32"
                    height="32"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center px-0 gap-x-14">
                {/* Content of the element */}
              </div>
            </div>
            <div className='w-434 h-0 border border-gray-800 transform rotate-0.13'></div>
            <div className="flex flex-row justify-center items-center gap-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex-none order-3 flex-grow">
              <button >
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width="32"
                  height="32"
                />
              </button>
            </div>
            <div className='flex flex-row justify-between items-center px-8 py-12 gap-x-177 w-436 h-40 bg-gray-900 rounded-md'>
              <div className='flex flex-row items-center px-0 gap-2 w-197 h-18'>
                <Image
                  src="/icons/info.svg"
                  alt='info'
                  width="16"
                  height="16"
                />
                <p>1 ETH = 1,956.52 USDT ($1,577.07)</p>
                <div className='flex flex-row justify-end items-center ml-24 px-0 gap-2 w-92 h-24'>
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
          </div>
          <div className="flex flex-grow text-black justify-center p-3 w-436 bg-teal-500 rounded-lg " >
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
