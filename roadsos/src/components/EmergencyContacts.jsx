import { useState } from 'react';
import { getCustomContacts, saveCustomContacts } from '../utils/storage';

/* ── Default Indian Emergency Numbers ── */
const DEFAULT_CONTACTS = [
  { id: 'amb', name: 'Ambulance', number: '108', emoji: '🚑', color: 'bg-red-600/20 text-red-400 border-red-500/20' },
  { id: 'pol', name: 'Police', number: '100', emoji: '👮', color: 'bg-purple-600/20 text-purple-400 border-purple-500/20' },
  { id: 'fire', name: 'Fire Brigade', number: '101', emoji: '🔥', color: 'bg-orange-600/20 text-orange-400 border-orange-500/20' },
  { id: 'hwy', name: 'Highway Helpline', number: '1073', emoji: '🛣️', color: 'bg-blue-600/20 text-blue-400 border-blue-500/20' },
  { id: 'women', name: 'Women Helpline', number: '1091', emoji: '👩', color: 'bg-pink-600/20 text-pink-400 border-pink-500/20' },
  { id: 'disaster', name: 'Disaster Mgmt', number: '1078', emoji: '🆘', color: 'bg-amber-600/20 text-amber-400 border-amber-500/20' },
  { id: 'child', name: 'Child Helpline', number: '1098', emoji: '👶', color: 'bg-teal-600/20 text-teal-400 border-teal-500/20' },
];

export default function EmergencyContacts() {
  const [customContacts, setCustomContacts] = useState(getCustomContacts());
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) return;
    const updated = [...customContacts, { id: Date.now(), name: newName, number: newPhone }];
    setCustomContacts(updated);
    saveCustomContacts(updated);
    setNewName('');
    setNewPhone('');
    setShowAdd(false);
  };

  const removeContact = (id) => {
    const updated = customContacts.filter((c) => c.id !== id);
    setCustomContacts(updated);
    saveCustomContacts(updated);
  };

  return (
    <div className="px-4 py-4 pb-24 overflow-y-auto space-y-6 screen-enter">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight">Emergency Contacts</h2>
        <p className="text-xs text-white/30 mt-1">One-tap call emergency services</p>
      </div>

      {/* Default Emergency Numbers */}
      <div className="space-y-2">
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-1">🇮🇳 India Emergency Numbers</p>
        <div className="grid grid-cols-2 gap-2">
          {DEFAULT_CONTACTS.map((c) => (
            <a
              key={c.id}
              href={`tel:${c.number}`}
              id={`emergency-${c.id}`}
              className={`glass-card p-3 flex items-center gap-3 border hover:scale-[1.02] transition-transform active:scale-95 ${c.color}`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{c.name}</p>
                <p className="text-lg font-black">{c.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Custom Contacts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Custom Contacts</p>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="text-xs font-bold text-sos-red hover:text-sos-red-glow transition-colors"
          >
            {showAdd ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div className="glass-card p-4 space-y-3 animate-slide-up">
            <input
              type="text"
              placeholder="Contact Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-dark-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sos-red/50 placeholder:text-white/20"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-dark-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sos-red/50 placeholder:text-white/20"
            />
            <button
              onClick={addContact}
              className="w-full bg-sos-red text-white text-sm font-bold py-2.5 rounded-xl hover:bg-sos-red-dark transition-colors active:scale-95"
            >
              Save Contact
            </button>
          </div>
        )}

        {/* Custom Contact List */}
        {customContacts.length > 0 ? (
          <div className="space-y-2">
            {customContacts.map((c) => (
              <div key={c.id} className="glass-card p-3 flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{c.name}</p>
                  <p className="text-xs text-white/40">{c.number}</p>
                </div>
                <a
                  href={`tel:${c.number}`}
                  className="px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-xs font-bold hover:bg-green-600/30 transition-colors"
                >
                  Call
                </a>
                <button
                  onClick={() => removeContact(c.id)}
                  className="text-white/20 hover:text-red-400 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          !showAdd && (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">📇</p>
              <p className="text-sm text-white/30">No custom contacts yet</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
