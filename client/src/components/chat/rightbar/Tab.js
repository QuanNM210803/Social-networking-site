function Tab({ label, isActive, onClick }) {
	return (
		<button
			className={`text-gray-700 sm:px-4 px-2 py-2 ${isActive ? 'bg-slate-200 rounded-t-md' : ''}`}
			onClick={onClick}
		>
			{label}
			{isActive && <div className="h-1 bg-blue-500 mt-1"></div>}
		</button>
	)
}
export default Tab 