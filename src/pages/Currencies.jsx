import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Currencies() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [converted, setConverted] = useState(null);

    useEffect(() => {
        if (!amount || isNaN(amount)) return;
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(res => res.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                setConverted((amount * rate).toFixed(2));
            });
    }, [amount, fromCurrency, toCurrency]);

    const fadeVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
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
                    <h1 className="text-2xl font-bold text-emerald-600 text-center">Currency Converter</h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            placeholder="Enter amount"
                        />
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        >
                            {["USD", "EUR", "GBP", "NGN", "CAD"].map((cur) => (
                                <option key={cur} value={cur}>{cur}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-center text-2xl font-medium">⬇️</div>

                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    >
                        {["USD", "EUR", "GBP", "NGN", "CAD"].map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>

                    {converted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center text-lg font-semibold text-emerald-700"
                        >
                            {amount} {fromCurrency} = {converted} {toCurrency}
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
