import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CheckCircle,
  ExternalLink,
  Lock,
  Mail,
  MessageSquare,
  Users,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/date";
import { ModalButton } from "../_components/modal-button";

export default async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const data = await db.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      groups: true,
      questions: true,
      answers: true,
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={data.image || "/placeholder.svg"}
              alt={data.name}
            />
            <AvatarFallback className="text-lg">
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Mail className="h-4 w-4" />
              <span>{data.email}</span>
              {data.emailVerified && (
                <Badge variant="secondary" className="ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <CalendarDays className="h-4 w-4" />
              <span>Member since {formatDate(data.createdAt)}</span>
            </div>
          </div>
          <Button>Edit Profile</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{data.questions.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Questions Created
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{data.answers.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Answers Provided
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{data.groups.length}</p>
                  <p className="text-sm text-muted-foreground">Groups Joined</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Questions</CardTitle>
                <CardDescription>
                  Your latest interview questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.questions.slice(0, 3).map((question) => (
                  <div
                    key={question.id}
                    className="border-l-2 border-blue-200 pl-4"
                  >
                    <h4 className="font-medium line-clamp-2">
                      {question.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDateTime(question.createdAt)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Answers */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Answers</CardTitle>
                <CardDescription>
                  Your latest answer submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.answers.slice(0, 3).map((answer) => (
                  <div
                    key={answer.id}
                    className="border-l-2 border-green-200 pl-4"
                  >
                    <p className="text-sm line-clamp-2">
                      {answer.content || (
                        <span className="flex items-center gap-1 text-blue-600">
                          <ExternalLink className="h-3 w-3" />
                          External link provided
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(answer.createdAt)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Questions</h2>
            <ModalButton action="postQuestion">Post New Question</ModalButton>
          </div>
          <div className="grid gap-4">
            {data.questions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {question.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {question.content}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {question.groupId && (
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Group
                        </Badge>
                      )}
                      {question.companyId && (
                        <Badge variant="secondary">Company</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Created {formatDateTime(question.createdAt)}</span>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="answers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Answers</h2>
            <Badge variant="outline">{data.answers.length} total answers</Badge>
          </div>
          <div className="grid gap-4">
            {data.answers.map((answer) => (
              <Card key={answer.id}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {answer.content ? (
                      <p className="text-sm">{answer.content}</p>
                    ) : answer.contentLink ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                        <a
                          href={answer.contentLink}
                          className="text-sm hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View external answer
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No content provided
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Question ID: {answer.questionId}</span>
                      <span>Answered {formatDateTime(answer.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Groups</h2>
            <ModalButton action="joinGroup">Join New Group</ModalButton>
          </div>
          <div className="grid gap-4">
            {data.groups.map((group) => (
              <Card key={group.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={group.imageUrl || "/placeholder.svg"}
                        alt={group.name}
                      />
                      <AvatarFallback>
                        {group.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{group.name}</h3>
                        {group.isPrivate && (
                          <Badge variant="secondary">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Joined {formatDate(group.createdAt)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Invite Code: {group.inviteCode}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
