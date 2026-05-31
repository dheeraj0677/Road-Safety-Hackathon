const TABS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 11-1.06 1.06l-.97-.97V19.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-3.75h-3v3.75a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-6.88l-.97.97a.75.75 0 01-1.06-1.06l8.69-8.69z" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Map',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0L9.17 18.92a.188.188 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md border-t border-white/5 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                isActive
                  ? 'text-sos-red scale-110'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? 'drop-shadow-[0_0_8px_rgba(204,0,0,0.5)]' : ''}`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-sos-red' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 bg-sos-red rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
