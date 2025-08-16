"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, BookOpen, Send, Globe2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const weekDays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
] as const

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Please select your gender"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(1, "Please select your country"),
  timeZone: z.string().min(1, "Please select your time zone"),

  // Course Details
  courseType: z.string().min(1, "Please select a course"),
  classFrequency: z.string().min(1, "Please select class frequency"),
  preferredDays: z.array(z.string()).min(1, "Please select at least one day"),
  preferredTimeSlot: z.string().min(1, "Please select preferred time"),
  preferredPlatform: z.string().min(1, "Please select preferred platform"),
  preferredTeacherGender: z.string().min(1, "Please select preferred teacher gender"),

  // Additional Information
  currentLevel: z.string().min(1, "Please select your current level"),
  languagePreference: z.string().min(1, "Please select preferred language"),
  specificRequirements: z.string(),
  wantTrialClass: z.boolean(),
  agreesToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function OnlineEnrollmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      country: "",
      timeZone: "",
      courseType: "",
      classFrequency: "",
      preferredDays: [],
      preferredTimeSlot: "",
      preferredPlatform: "",
      preferredTeacherGender: "",
      currentLevel: "",
      languagePreference: "",
      specificRequirements: "",
      wantTrialClass: false,
      agreesToTerms: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      console.log("Form validation state:", form.formState.isValid)
      console.log("Submitting form data:", data)

      // Replace with your Formspree form ID
      const response = await fetch(`https://formspree.io/f/xeozwjvy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("Form submission response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Form submission error response:", errorText)
        throw new Error(`Form submission failed: ${response.status} ${errorText}`)
      }

      const responseData = await response.json()
      console.log("Form submission response:", responseData)

      setFormStatus("success")

      window.scrollTo({ top: 0, behavior: "smooth" })
      form.reset()
      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 2000)
    }
  }

  return (
    <Card className="border-[#0d4b26]/20 shadow-lg">
      <CardHeader className="bg-[#0d4b26]/5 rounded-t-lg space-y-1">
        <CardTitle className="text-2xl font-bold text-[#0d4b26] flex items-center gap-2">
          <Globe2 className="h-6 w-6" />
          Online Class Enrollment
        </CardTitle>
        <CardDescription>Fill out the form below to enroll in our online Quran classes</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {formStatus === "success" && (
          <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
            <AlertDescription>
              Thank you for enrolling! We have received your application and sent a confirmation email. We will contact
              you within 24 hours to confirm your class schedule.
            </AlertDescription>
          </Alert>
        )}

        {formStatus === "error" && (
          <Alert className="mb-6 bg-red-50 border-red-200 text-red-800">
            <AlertDescription>
              There was an error submitting your enrollment. Please try again or contact us directly at
              admissions@alhikmahacademy.com or WhatsApp +923312968199.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0d4b26] flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="girls">Girls</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (WhatsApp)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your WhatsApp number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="sa">Saudi Arabia</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="bd">Bangladesh</SelectItem>
                          <SelectItem value="my">Malaysia</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                          <SelectItem value="ph">Philippines</SelectItem>
                          <SelectItem value="eg">Egypt</SelectItem>
                          <SelectItem value="tr">Turkey</SelectItem>
                          <SelectItem value="br">Brazil</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your time zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gmt">GMT (London)</SelectItem>
                          <SelectItem value="est">EST (New York)</SelectItem>
                          <SelectItem value="pst">PST (Los Angeles)</SelectItem>
                          <SelectItem value="ist">IST (India)</SelectItem>
                          <SelectItem value="cst">CST (Chicago)</SelectItem>
                          <SelectItem value="mst">MST (Denver)</SelectItem>
                          <SelectItem value="ast">AST (Atlantic)</SelectItem>
                          <SelectItem value="cet">CET (Central Europe)</SelectItem>
                          <SelectItem value="eet">EET (Eastern Europe)</SelectItem>
                          <SelectItem value="jst">JST (Japan)</SelectItem>
                          <SelectItem value="cst-china">CST (China)</SelectItem>
                          <SelectItem value="aest">AEST (Australia)</SelectItem>
                          <SelectItem value="gmt+3">GMT+3 (Saudi Arabia)</SelectItem>
                          <SelectItem value="gmt+4">GMT+4 (UAE)</SelectItem>
                          <SelectItem value="gmt+5">GMT+5 (Pakistan)</SelectItem>
                          <SelectItem value="gmt+6">GMT+6 (Bangladesh)</SelectItem>
                          <SelectItem value="gmt+7">GMT+7 (Thailand)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Class Schedule Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0d4b26] flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Class Schedule Preferences
              </h3>

              <FormField
                control={form.control}
                name="courseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic Quran Reading</SelectItem>
                        <SelectItem value="tajweed">Tajweed Course</SelectItem>
                        <SelectItem value="hifz">Hifz Program</SelectItem>
                    
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily Classes</SelectItem>
                        <SelectItem value="3days">3 Days/Week</SelectItem>
                        <SelectItem value="2days">2 Days/Week</SelectItem>
                    
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredDays"
                render={() => (
                  <FormItem>
                    <FormLabel>Preferred Days</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {weekDays.map((day) => (
                        <FormField
                          key={day.id}
                          control={form.control}
                          name="preferredDays"
                          render={({ field }) => {
                            return (
                              <FormItem key={day.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(day.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, day.id])
                                        : field.onChange(field.value?.filter((value) => value !== day.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{day.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTimeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
  
                        <SelectItem value="afternoon">Afternoon (2 PM - 4 PM)</SelectItem>
                        <SelectItem value="evening">Evening (4 PM - 6 PM)</SelectItem>
                        <SelectItem value="night">Night (9 PM - 11 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredPlatform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Online Platform</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormControl>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="zoom" id="zoom" />
                            <FormLabel htmlFor="zoom" className="font-normal">
                              Zoom
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="meet" id="meet" />
                            <FormLabel htmlFor="meet" className="font-normal">
                              Google Meet
                            </FormLabel>
                          </div>
                        
                        </div>
                      </FormControl>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Additional Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0d4b26]">Additional Preferences</h3>

              <FormField
                control={form.control}
                name="preferredTeacherGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Teacher Gender</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormControl>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <FormLabel htmlFor="female" className="font-normal">
                              Female Teacher
                            </FormLabel>
                          </div>
                          
                        </div>
                      </FormControl>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (Never learned)</SelectItem>
                        <SelectItem value="basic">Basic (Can read Arabic)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Basic Tajweed)</SelectItem>
                        <SelectItem value="advanced">Advanced (Good Tajweed)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languagePreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Language of Instruction</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="urdu">Urdu</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specificRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Requirements or Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements or additional information..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wantTrialClass"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I would like to book a free trial class</FormLabel>
                      <FormDescription>Try a free 30-minute trial class before enrolling</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreesToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the terms and conditions</FormLabel>
                      <FormDescription>
                        By enrolling, you agree to our terms of service and privacy policy
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0d4b26] hover:bg-[#0d4b26]/90"
              disabled={isSubmitting}
              onClick={() => {
                if (Object.keys(form.formState.errors).length > 0) {
                  console.log("Form has validation errors:", form.formState.errors)
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Enrollment
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
        <p>Need help? Contact us at admissions@alhikmahacademy.com</p>
      </CardFooter>
    </Card>
  )
}

