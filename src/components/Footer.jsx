export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-16 fixed bottom-0 w-full">
      <div className="max-w-6xl mx-auto px-6 text-center text-slate-600 text-sm md:text-base">
        © {new Date().getFullYear()} CurrencySwift. All rights reserved.
      </div>
    </footer>
  );
}
