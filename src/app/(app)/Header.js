import { Bars3Icon } from '@heroicons/react/24/solid'

const Header = ({ title, isOpen, user }) => {
    return (
        <>
            <header className={`h-[72px] px-4 md:px-6 flex justify-between items-center border-b bg-blue-800`}>
                <h1 className="text-xl font-bold text-white">
                    {title} {user?.name}
                </h1>
                <Bars3Icon className="w-8 h-8 sm:hidden" onClick={isOpen} />
            </header>
            <div
                className={`transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0'
                } border-b origin-top sm:hidden sm:bg-none bg-white`}>
                <ul className="space-y-2">
                    <li className="py-2 px-6 hover:bg-slate-400 font-bold">
                        <a href="#">Home</a>
                    </li>
                    <li className="py-2 px-6 hover:bg-slate-400 font-bold">
                        <a href="#">About</a>
                    </li>
                    <li className="py-2 px-6 hover:bg-slate-400 font-bold">
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header
