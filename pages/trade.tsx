import { NextPage } from 'next'
import Image from 'next/image'

const Trade: NextPage = () => {
  return (
    <main>
     
        <div className="flex flex-col items-start p-12 gap-12 absolute w-460 h-451 left-490 top-286 bg-gray-900 rounded-lg">

          <div className="flex flex-row justify-between px-12 py-8 gap-26 w-436 h-40 flex-none order-0">
            <div className="flex flex-row items-start p-0 gap-4 w-76 h-32 flex-none order-1">
              <button >
                Swap
              </button>
              <button >
                Send
              </button>
              <button>
                <Image
                  src="/icons/refresh.svg"
                  alt="Example Image"
                  width="32"
                  height="32"
                />
              </button>
              <button>
                <Image
                  src="/icons/tradeSettings.svg"
                  alt="Example Image"
                  width="32"
                  height="32"
                />
              </button>
            </div>
          </div>
          <button className=" flex text-black flex-row justify-center items-center p-7 gap-2 w-436 h-56 bg-teal-500 rounded-lg flex-none order-3">
            Swap
          </button>
        </div>
    </main>
  )
}

export default Trade
