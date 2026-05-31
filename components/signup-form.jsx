"use client"

import { useState } from "react"
import Confetti from "react-confetti-boom"

import { authClient } from "@/lib/auth-client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { CheckCircle2 } from "lucide-react"

function SignupForm() {
  const [tab, setTab] = useState("account")
  const [loading, setLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const [checkingUsername, setCheckingUsername] =
    useState(false)
  const [usernameAvailable, setUsernameAvailable] =
    useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
  })

  const roles = [
    {
      id: "freelancer",
      title: "Freelancer",
      description: "Offer your services and earn money.",
    },
    {
      id: "client",
      title: "Client",
      description: "Hire professionals for your projects.",
    },
    {
      id: "both",
      title: "Both",
      description: "Work and hire at the same time.",
    },
  ]

  // -----------------------------
  // STEP 1 VALIDATION
  // -----------------------------
  const handleAccountStep = () => {
    if (!formData.name.trim()) return alert("Name required")
    if (!formData.email.trim()) return alert("Email required")

    if (formData.password.length < 8) {
      return alert("Password must be 8+ characters")
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      return alert("Passwords do not match")
    }

    setTab("username")
  }

  // -----------------------------
  // USERNAME CHECK
  // -----------------------------
  const checkUsername = async () => {
    if (formData.username.length < 3) return

    try {
      setCheckingUsername(true)

      const { data } =
        await authClient.isUsernameAvailable({
          username: formData.username,
        })

      setUsernameAvailable(data?.available)
    } catch {
      setUsernameAvailable(false)
    } finally {
      setCheckingUsername(false)
    }
  }

  // -----------------------------
  // FINAL SIGNUP
  // -----------------------------
  const handleCreateAccount = async () => {
    if (!formData.role)
      return alert("Select a role")

    try {
      setLoading(true)

      await authClient.signUp.email(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          username: formData.username,
          role: formData.role,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            setIsSuccessful(true)

            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 1500)
          },
          onError: (ctx) => {
            alert(ctx.error.message)
          },
        }
      )
    } finally {
      setLoading(false)
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="mx-auto max-w-md space-y-6 p-4">

      <h1 className="text-2xl font-bold text-center">
        Create Account
      </h1>

      <Tabs value={tab} className="w-full">

        {/* PROGRESS */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account" disabled>
            Account
          </TabsTrigger>
          <TabsTrigger value="username" disabled>
            Username
          </TabsTrigger>
          <TabsTrigger value="role" disabled>
            Role
          </TabsTrigger>
        </TabsList>

        {/* ---------------- STEP 1 ---------------- */}
        <TabsContent value="account" className="space-y-3">

          <Input
            placeholder="Full name"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                name: e.target.value,
              }))
            }
          />

          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                email: e.target.value,
              }))
            }
          />

          <Input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                password: e.target.value,
              }))
            }
          />

          <Input
            placeholder="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                confirmPassword: e.target.value,
              }))
            }
          />

          <Button
            className="w-full"
            onClick={handleAccountStep}
          >
            Continue
          </Button>

        </TabsContent>

        {/* ---------------- STEP 2 ---------------- */}
        <TabsContent value="username" className="space-y-3">

          <Input
            placeholder="Username"
            value={formData.username}
            onBlur={checkUsername}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                username: e.target.value,
              }))
            }
          />

          {checkingUsername && (
            <p className="text-sm text-muted-foreground">
              Checking username...
            </p>
          )}

          {usernameAvailable === true && (
            <p className="text-sm text-green-500">
              Username available
            </p>
          )}

          {usernameAvailable === false && (
            <p className="text-sm text-red-500">
              Username already taken
            </p>
          )}

          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={() => setTab("account")}
            >
              Back
            </Button>

            <Button
              className="flex-1"
              disabled={!usernameAvailable}
              onClick={() => setTab("role")}
            >
              Continue
            </Button>

          </div>

        </TabsContent>

        {/* ---------------- STEP 3 ---------------- */}
        <TabsContent value="role" className="space-y-3">

          {roles.map((role) => (
            <Card
              key={role.id}
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  role: role.id,
                }))
              }
              className={`cursor-pointer transition border ${
                formData.role === role.id
                  ? "border-primary"
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>
                  {role.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}

          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={() => setTab("username")}
            >
              Back
            </Button>

            <Button
              className="flex-1"
              disabled={loading}
              onClick={handleCreateAccount}
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </Button>

          </div>

        </TabsContent>

      </Tabs>

      {/* ---------------- SUCCESS ---------------- */}
      {isSuccessful && (
        <div className="text-center space-y-3 pt-6">

          <Confetti mode="boom" />

          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />

          <h2 className="text-xl font-semibold">
            Account Created!
          </h2>

          <p className="text-muted-foreground">
            Redirecting to dashboard...
          </p>

        </div>
      )}

    </div>
  )
}


export default SignupForm 