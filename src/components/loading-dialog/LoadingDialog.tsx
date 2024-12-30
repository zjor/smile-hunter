export function LoadingDialog() {
    return (
        <div className="flex fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md items-center justify-center">
            <div className="bg-amber-100 rounded-lg shadow-lg max-w-md w-full p-6 m-6 border-amber-500 border-4">
                <div className="flex justify-center font-chewy text-2xl">Loading...</div>
            </div>
        </div>
    )
}