import OnlineEnrollmentForm from "../Components/Enroll"

export default function OnlineEnrollmentPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#0d4b26] mb-4">Online Quran Classes Enrollment</h1>
          <p className="text-center text-muted-foreground mb-8">
            Join our online Quran learning program from anywhere in the world
          </p>
          <OnlineEnrollmentForm />
        </div>
      </div>
    </main>
  )
}

