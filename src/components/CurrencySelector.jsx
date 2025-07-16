import { useState } from "react";

function CurrencySelector({ label, selected, onChange, options }) {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filtered = options.filter((opt) =>
        `${opt.name} ${opt.code}`.toLowerCase().includes(search.toLowerCase())
    );

    const selectedObj = options.find(opt => opt.code === selected);

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={
                    isFocused
                        ? search
                        : selectedObj
                        ? `${selectedObj.code} — ${selectedObj.name}`
                        : ""
                }
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                placeholder={`Select ${label}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {isFocused && (
                <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-xl mt-1 shadow">
                    {filtered.length === 0 ? (
                        <div className="p-2 text-gray-500 text-sm">No match found</div>
                    ) : (
                        filtered.map((item) => (
                            <div
                                key={item.code}
                                onClick={() => {
                                    onChange(item.code);
                                    setSearch("");
                                    setIsFocused(false);
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-emerald-50 cursor-pointer"
                            >
                                {item.flag && (
                                    <img src={item.flag} alt={item.name} className="w-5 h-4 rounded-sm" />
                                )}
                                <span className="text-sm">
                                    {item.code} ({item.currencySymbol}) — {item.name}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default CurrencySelector;
