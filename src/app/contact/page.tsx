import ContactForm from "../Components/contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#0d4b26] mb-8">Contact Us</h1>
        <ContactForm/>
      </div>
    </main>
  )
}

