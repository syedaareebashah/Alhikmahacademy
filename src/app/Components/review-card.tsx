"use client"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow, parseISO } from "date-fns"
import { motion } from "framer-motion"

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

export default function ReviewCard({ review }: { review: Review }) {
  // Handle both Date objects and ISO strings
  const date = typeof review.date === "string" ? parseISO(review.date) : new Date(review.date)
  const timeAgo = formatDistanceToNow(date, { addSuffix: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col rounded-2xl overflow-hidden">
        <CardContent className="pt-6 flex-grow">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-gray-500">{timeAgo}</div>
              </div>
            </div>

            {/* Animated Stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: star * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Star
                    className={`h-4 w-4 ${
                      star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <motion.p
            className="text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {review.text}
          </motion.p>

          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Badge variant="outline" className="bg-[#e8f3ee] text-[#1a5e3a] border-[#1a5e3a]">
              {review.program}
            </Badge>
            {review.verified && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Verified Student
              </Badge>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
