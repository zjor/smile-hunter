export function LoadingDialog({progress}: {progress: number | undefined}) {
    return (
        <div className="flex fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md items-center justify-center">
            <div className="bg-amber-100 rounded-lg shadow-lg max-w-md w-full p-6 m-6 border-amber-500 border-4 flex flex-col">
                <div className="flex justify-center font-chewy text-2xl">Loading...</div>
                {progress != undefined && (
                    <div className="bg-amber-500 w-full h-[12px] mt-3 relative">
                        <div
                            className="bg-red-700 absolute top-0 bottom-0 left-0"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}