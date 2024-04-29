import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@/stores/loginStore.tsx";

export function LoginPage() {
  return (
    <div className={"min-h-screen"}>
      <div className={"relative flex min-h-screen flex-col justify-center"}>
        <div className={"container"}>
          <LoginPageContainer />
        </div>
      </div>
    </div>
  );
}

function LoginPageContainer() {
  return (
    <Card>
      <LoginPageContent />
    </Card>
  );
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
});

function LoginPageContent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ""
    }
  });

  const navigate = useNavigate();
  const { login } = useLoginStore();

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    login(data.username);
    navigate("/");
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your username to join the chat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"w-full flex gap-4 flex-col"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className={"flex flex-col"}>
              <FormField
                control={form.control}
                name={"username"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className={"flex-1"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}>
              </FormField>
              <Button variant={"outline"} className={"mt-4 flex-1"} type={"submit"}>Join</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}