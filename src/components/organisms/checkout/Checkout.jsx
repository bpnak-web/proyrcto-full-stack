import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

export default function Checkout() {
  // TODO ESTUDIANTE:
  // Este checkout debe mantenerse simulado en el taller.
  // Solo personaliza estilos, estructura visual y textos.
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const total = getTotalPrice();

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text mb-2 pb-1">!Compra realizada¡</h1>
          <p className="text-gray-500 mb-6">
            Este checkout es simulado para el taller. Puedes personalizar este flujo.
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:opacity-90"
          >
            Volver a la galeria
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text mb-2 pb-1">
            No hay productos para pagar
          </h1>
          <p className="text-gray-500 mb-6">Agrega productos al carrito.</p>
          <Link
            to="/gallery"
            className="inline-flex px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:opacity-90"
          >
            Ir a productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text mb-6 pb-1">Checkout (simulado)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900">Datos del comprador</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold hover:opacity-90"
          >
            Confirmar compra simulada
          </button>
        </form>

        <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Resumen</h3>
          <div className="space-y-3 mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {product.title} x {quantity}
                </span>
                <span className="font-medium text-gray-900">
                  ${(Number(product.price) * Number(quantity)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
