import { Turnstile } from "@marsidev/react-turnstile";

export default function Captcha({ onVerify }) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
      options={{
        theme: "light",
        size: "normal",
      }}
      onSuccess={onVerify}
    />
  );
}
