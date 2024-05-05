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
import { useLoginStore } from "@/stores/loginStore.ts";

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
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters."
  })
});

function LoginPageContent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const navigate = useNavigate();
  const { login } = useLoginStore();

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    login(data.username, data.password);
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
            <form onSubmit={form.handleSubmit(onSubmitForm)} className={"flex flex-col gap-4"}>
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
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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