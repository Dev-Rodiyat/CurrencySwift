import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPage() {
    const features = [
        { title: "Live Rates", desc: "Accurate exchange rates updated regularly." },
        { title: "100+ Currencies", desc: "Wide range of global currencies to choose from." },
        { title: "Fast & Responsive", desc: "Optimized for speed and mobile use." },
    ]

    const steps = [
        { step: "1", title: "Choose Currencies", desc: "Pick the currencies you want to convert between." },
        { step: "2", title: "Enter Amount", desc: "Type in the amount you want to convert." },
        { step: "3", title: "View Result", desc: "Get the conversion result instantly." },
    ]

    return (
        <div className="min-h-screen bg-white text-slate-800">
            <Header />

            <main>
                <section className="min-h-[20vh] bg-white px-6 py-20 text-center">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-500">
                        Convert Currencies Instantly
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Real-time, reliable exchange rates for over 100 currencies — made simple.
                    </p>
                    <Link to="/currencies">
                        <button className="mt-8 px-6 py-3 bg-emerald-500 text-white rounded-xl shadow hover:bg-emerald-600 transition">
                            Start Converting
                        </button>
                    </Link>
                </section>

                <section id="features" className="bg-gray-50 px-6 py-16">
                    <div className="max-w-5xl mx-auto text-center">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-10">Features</h3>
                        <div className="grid md:grid-cols-3 gap-10">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                    <h4 className="text-lg font-semibold text-emerald-600">{f.title}</h4>
                                    <p className="mt-2 text-slate-600">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how" className="px-6 py-16 bg-white">
                    <div className="max-w-5xl mx-auto text-center">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-10">How It Works</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {steps.map((item, i) => (
                                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="text-emerald-500 text-4xl font-bold">{item.step}</div>
                                    <h4 className="mt-4 text-lg font-semibold text-slate-700">{item.title}</h4>
                                    <p className="mt-2 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section id="start" className="bg-emerald-50 px-6 py-20 text-center">
                    <h3 className="text-2xl font-semibold text-emerald-700">
                        Ready to convert your first currency?
                    </h3>
                    <button className="mt-6 px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl shadow hover:bg-emerald-600 transition">
                        Get Started
                    </button>
                </section>
            </main>

            <Footer />
        </div>
    );
}
