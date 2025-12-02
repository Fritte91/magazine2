import CheckoutForm from "../components/CheckoutForm"

export default function Checkout() {
  return (
    <div className="pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="container-padding max-w-4xl mx-auto">
        <h1 className="mb-12 md:mb-16 text-center">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}
