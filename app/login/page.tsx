import React, { useCallback } from "react";
import { signIn } from "next-auth/react";
function LoginPage() {
  const handleSubmitLoginForm = useCallback(async (value: any) => {
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    });

    if (res?.error) {
      //handle failure message
    } else {
      if (res?.ok) {
        // Do something
      }
    }
  }, []);

  return (
    <div>
      <form>
        <label>Enter Email</label>
        <input type="text" />
        <label>Enter password</label>
        <input type="text" />
        <button onClick={handleSubmitLoginForm}>Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
