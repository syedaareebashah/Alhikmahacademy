"use client"

import { useState, useEffect } from "react"
import { Star, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReviewCard from "./review-card"
import SubmitReviewForm from "./submit-review-form"
import { reviews } from "@/data/reviews"

interface Review {
  id: number
  name: string
  avatar?: string
  rating: number
  date: string
  text: string
  program: string
  verified: boolean
}

export default function ReviewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRating, setFilterRating] = useState("")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [allReviews, setAllReviews] = useState<Review[]>(reviews)
  const [stats, setStats] = useState({
    averageRating: 4.8,
    totalReviews: 127,
    satisfactionRate: 98,
  })

  useEffect(() => {
    const storedReviews = localStorage.getItem("alHikmahReviews")
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews)
      setAllReviews([...parsedReviews, ...reviews])
      updateStats([...parsedReviews, ...reviews])
    }
  }, [])

  const updateStats = (reviewsArray: Review[]) => {
    const totalReviews = reviewsArray.length
    const sum = reviewsArray.reduce((acc: number, review: Review) => acc + review.rating, 0)
    const averageRating = Number((sum / totalReviews).toFixed(1))
    const highRatings = reviewsArray.filter((review: Review) => review.rating >= 4).length
    const satisfactionRate = Math.round((highRatings / totalReviews) * 100)

    setStats({
      averageRating,
      totalReviews,
      satisfactionRate,
    })
  }

  const addNewReview = (newReview: Omit<Review, "id" | "date" | "verified">) => {
    const reviewWithId = {
      ...newReview,
      id: allReviews.length + 1,
      date: new Date().toISOString().split("T")[0],
      verified: true,
    }

    const existingReviews = JSON.parse(localStorage.getItem("alHikmahReviews") || "[]")
    const updatedReviews = [reviewWithId, ...existingReviews]
    localStorage.setItem("alHikmahReviews", JSON.stringify(updatedReviews))

    const newAllReviews = [
      reviewWithId,
      ...reviews,
      ...existingReviews.filter((r: Review) => r.id !== reviewWithId.id),
    ]
    setAllReviews(newAllReviews)
    updateStats(newAllReviews)
    setShowReviewForm(false)
  }

  const filteredReviews = allReviews.filter((review) => {
    const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating =
      filterRating === "all" || filterRating === "" || review.rating === Number.parseInt(filterRating)
    return matchesSearch && matchesRating
  })

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-[#236168] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Student Reviews & Testimonials
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Read what our students and parents say about their experience with Al Hikmat Quran Academy.
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Stats + Write Button */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="stats bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-wrap justify-center md:justify-start gap-8 w-full md:w-auto">
            {[
              { value: stats.averageRating, label: "Average Rating", type: "rating" },
              { value: stats.totalReviews, label: "Total Reviews" },
              { value: `${stats.satisfactionRate}%`, label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl font-bold text-[#0f7582]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.4, duration: 0.6 }}
                >
                  {stat.value}
                </motion.div>
                {stat.type === "rating" && (
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= stats.averageRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[#1a5e3a] hover:bg-[#31524d] w-full md:w-auto transition-transform hover:scale-105"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>
        </motion.div>

        {/* Review Form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="mb-12 overflow-hidden">
                <CardContent className="pt-6">
                  <SubmitReviewForm onCancel={() => setShowReviewForm(false)} onSubmit={addNewReview} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <AnimatePresence>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-500">No reviews match your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}
