function Navbar() {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className='text-white text-xl'>Groceries</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;