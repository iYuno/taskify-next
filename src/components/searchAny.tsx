export default function searchAny() {
  return (
    <div className="px-4 my-2">
      <div className="flex border-b py-2 justify-between items-center space-x-1">

        <div
          className="p-0.5 rounded-md w-5 h-5 flex text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
               className="text-md align-text-top leading-5 text-5 w-5 stroke-text fill-transparent">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </div>
        <input
          type="text"
          className="bg-background mainText w-[100%] font-light outline-2 focus-visible:outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          placeholder="Search"
        />
        <div className="flex space-x-1">
          <div
            className="bg-gray-500 p-0.5 rounded-md w-5 h-5 flex text-center"
          >
            <p
              className="text-md align-text-top leading-4 w-4"
            >
              ⌘
            </p>
          </div>
          <div
            className="bg-gray-500 p-0.5 rounded-md w-5 h-5 flex text-center"
          >
            <p
              className="text-md align-text-top leading-4 w-4"
            >
              A
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
