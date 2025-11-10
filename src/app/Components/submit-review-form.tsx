"use client"

import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/use-toast"
import { motion } from "framer-motion"

export default function SubmitReviewForm({
  onCancel,
  onSubmit,
}: { onCancel: () => void; onSubmit: (review: any) => void }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [program, setProgram] = useState("")
  const [reviewText, setReviewText] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !program || !reviewText || rating === 0) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to submit your review.",
        variant: "destructive",
      })
      return
    }

    const newReview = {
      name,
      avatar: "/placeholder.svg?height=40&width=40",
      rating,
      text: reviewText,
      program,
      verified: true,
    }

    onSubmit(newReview)

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review has been published.",
    })

    setRating(0)
    setName("")
    setEmail("")
    setProgram("")
    setReviewText("")
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3
        className="text-xl font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Share Your Experience
      </motion.h3>

      <motion.p
        className="text-gray-500 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Your feedback helps other students and helps us improve our services
      </motion.p>

      {/* Rating Stars */}
      <motion.div
        className="flex flex-col items-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="mb-2 font-medium">Rate your experience</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Inputs */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div
          className="space-y-2"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        </motion.div>
        <motion.div
          className="space-y-2"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </motion.div>
      </motion.div>

      {/* Select */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Label htmlFor="program">Program/Course</Label>
        <Select value={program} onValueChange={setProgram}>
          <SelectTrigger id="program">
            <SelectValue placeholder="Select the program you attended" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Quran Memorization">Quran Memorization</SelectItem>
            <SelectItem value="Quran Recitation (Tajweed)">Quran Recitation (Tajweed)</SelectItem>
            <SelectItem value="Arabic Language">Arabic Language</SelectItem>
            <SelectItem value="Islamic Studies">Islamic Studies</SelectItem>
            <SelectItem value="Children's Quran Program">Children's Quran Program</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Textarea */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with Al Hikmat Quran Academy..."
          rows={5}
        />
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>
          By submitting this review, you agree to our review guidelines. All reviews are moderated before being
          published to ensure they meet our community standards.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex justify-end gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" className="bg-[#1a5e3a] hover:bg-[#134a2e]">
            Submit Review
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  )
}
