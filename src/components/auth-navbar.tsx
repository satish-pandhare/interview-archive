import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AuthNavbar() {
  const { data, isPending } = useSession()

  if (!data || !data.user || isPending) {
    return (
      <>
        <Link
          href="/sign-in"
          className="text-foreground font-medium transition-colors duration-200 hover:text-primary"
        >
          Sign In
        </Link>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/sign-in">
            <Button variant="secondary" className="rounded-full py-2 px-4">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="text-foreground font-medium transition-colors duration-200 hover:text-primary"
      >
        Dashboard
      </Link>
      <Avatar>
        <AvatarImage src={data.user.image!} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  )
}
