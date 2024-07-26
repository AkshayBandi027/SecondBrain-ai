import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabSwitcherProps {
  SignUpForm: React.ReactNode
  SignInForm: React.ReactNode
}

export default function TabSwitcher({
  SignUpForm,
  SignInForm,
}: TabSwitcherProps) {
  return (
    <Tabs className="max-w-[500px]" defaultValue="sign-in">
      <TabsList>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">{SignUpForm}</TabsContent>
      <TabsContent value="sign-in">{SignInForm}</TabsContent>
    </Tabs>
  )
}
