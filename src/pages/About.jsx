import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Badge from "../components/Badge";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        fetch("https://api.exchangerate-api.com/v4/latest/USD")
            .then((res) => res.json())
            .then((data) => setRate(data.rates.EUR.toFixed(2)))
            .catch((err) => console.error("Error fetching rate:", err));
    }, []);

    const fadeVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const stagger = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15 },
        }),
    };

    const features = [
        "Real-time exchange rate fetch",
        "Simple and responsive UI",
        "Fast and lightweight",
        "Currency swap toggle",
        "Live currency preview",
        "Mobile-first design",
    ]

    return (
        <section className="min-h-screen bg-white text-slate-800">
            <Header />
            <div className="max-w-4xl mx-auto space-y-16 px-6 py-12">
                {/* Title */}
                <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-emerald-600 mb-2">About CurrencySwift</h1>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg">
                        Seamless, real-time currency conversion with a clean and modern UI.
                    </p>
                    {rate && (
                        <div className="mt-4 text-sm text-gray-500">
                            💱 Live USD → EUR rate:{" "}
                            <span className="font-semibold text-emerald-700">{rate}</span>
                        </div>
                    )}
                </motion.div>

                {/* Mission */}
                <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-semibold text-emerald-600">Our Mission</h2>
                    <p>
                        We believe everyone deserves fast, accessible financial tools. CurrencySwift simplifies
                        exchange rates with clean visuals and reliable data — whether you're a traveler,
                        developer, or remote worker.
                    </p>
                </motion.div>

                {/* Use Cases */}
                <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-semibold text-emerald-600">Use Cases</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Planning travel budgets with live conversion rates</li>
                        <li>Freelancers converting foreign client payments</li>
                        <li>Remote workers estimating global expenses</li>
                    </ul>
                </motion.div>

                {/* Features */}
                <motion.div
                    variants={fadeVariant}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-semibold text-emerald-600">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm"
                            >
                                ✅ {feature}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </section>
    );
}
