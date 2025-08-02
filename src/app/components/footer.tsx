export function Footer() {
  return (
    <footer className="mt-10 border-t pt-6 px-4 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <div className="max-w-6xl mx-auto text-center space-y-3">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600 dark:text-blue-400">My E-Commerce Store</span>. All rights reserved.
        </p>
        
        <div className="flex justify-center space-x-6 text-sm">
          <a href="/privacy" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a>
          <a href="/terms" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</a>
          <a href="/contactus" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
