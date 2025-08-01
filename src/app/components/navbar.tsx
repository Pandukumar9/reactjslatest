import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 rounded-md mb-6">
      <Link href="/" className="text-lg font-semibold text-blue-600">🛍️ E-Store</Link>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/cart" className="hover:underline">Cart</Link>
        <Link href="/contactus" className="hover:underline">Contact Us</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/product/123" className="hover:underline">Product 123</Link>
        <Link href="/routescomp/mainsection" className="hover:underline">Mainsec</Link>
      </div>
    </nav>
  );
}
