import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import CurrencySelector from "../components/CurrencySelector";

export default function Currencies() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [converted, setConverted] = useState(null);
    const [currencyOptions, setCurrencyOptions] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,currencies")
            .then((res) => res.json())
            .then((data) => {
                const uniqueCurrencies = {};

                data.forEach((country) => {
                    if (!country.currencies) return;

                    Object.entries(country.currencies).forEach(([code, details]) => {
                        if (!uniqueCurrencies[code]) {
                            uniqueCurrencies[code] = {
                                code,
                                currencyName: details.name,
                                currencySymbol: details.symbol,
                                name: country.name.common,
                                flag: country.flags?.svg || country.flags?.png || "",
                            };
                        }
                    });
                });

                setCurrencyOptions(Object.values(uniqueCurrencies));
            })
            .catch((err) => {
                console.error("Error fetching countries:", err);
                setCurrencyOptions([
                    {
                        code: "USD",
                        currencyName: "United States Dollar",
                        currencySymbol: "$",
                        name: "United States",
                        flag: "https://flagcdn.com/us.svg",
                    },
                    {
                        code: "EUR",
                        currencyName: "Euro",
                        currencySymbol: "€",
                        name: "Eurozone",
                        flag: "https://flagcdn.com/eu.svg",
                    },
                    {
                        code: "NGN",
                        currencyName: "Nigerian Naira",
                        currencySymbol: "₦",
                        name: "Nigeria",
                        flag: "https://flagcdn.com/ng.svg",
                    },
                ]);
            });
    }, []);

    useEffect(() => {
        if (!amount || isNaN(amount)) return;

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then((res) => res.json())
            .then((data) => {
                const rate = data.rates[toCurrency];
                setConverted((amount * rate).toFixed(2));
            });
    }, [amount, fromCurrency, toCurrency]);

    const fadeVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const getSymbol = (code) => {
        const match = currencyOptions.find((c) => c.code === code);
        if (!match) {
            console.warn(`No match found for ${code}`, currencyOptions);
        }
        return match?.currencySymbol || code;
    };

    return (
        <section className="min-h-screen bg-white text-slate-800">
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-20">
                <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 shadow-md rounded-2xl p-8 space-y-6"
                >
                    <h1 className="text-2xl font-bold text-emerald-600 text-center">
                        Currency Converter
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <CurrencySelector
                            label="From"
                            selected={fromCurrency}
                            onChange={setFromCurrency}
                            options={currencyOptions}
                        />
                        <button
                            onClick={() => {
                                setFromCurrency(toCurrency);
                                setToCurrency(fromCurrency);
                            }}
                            // className="self-center px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                        >
                            🔄
                        </button>

                        <CurrencySelector
                            label="To"
                            selected={toCurrency}
                            onChange={setToCurrency}
                            options={currencyOptions}
                        />
                    </div>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        placeholder="Enter amount"
                    />

                    {converted && currencyOptions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center text-lg font-semibold text-emerald-700"
                        >
                            {getSymbol(fromCurrency)} {amount} = {getSymbol(toCurrency)} {converted}
                        </motion.div>
                    )}
                </motion.div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Rates provided by <span className="font-medium">ExchangeRate-API</span>. Updated hourly.
                </p>
            </div>
            <Footer />
        </section>
    );
}
