import { login } from "@/lib/fetching";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  (async () => {
    const valid = await login("john@gmail.com", "123456");
    if (valid) {
      await router.push("/");
    }
  })();

  return <>Login Page</>;
}
