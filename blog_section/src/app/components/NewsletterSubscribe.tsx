import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);

    const url = `https://rakshnamait.us22.list-manage.com/subscribe/post-json?u=cf26f75e8143f35615833944a&id=84148061aa&f_id=00b6c2e1f0&EMAIL=${encodeURIComponent(email)}&c=mailchimpCallback`;

    (window as unknown as Record<string, any>).mailchimpCallback = (response: { result: string; msg?: string }) => {
      setLoading(false);
      if (response.result === "success") {
        toast.success("Thanks for subscribing! Check your inbox for confirmation.");
        setEmail("");
      } else {
        // Mailchimp error messages often contain HTML or "0 - Message" format
        const errorMsg = response.msg?.replace(/<[^>]*>?/gm, '') || "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
      
      // Cleanup script
      const script = document.getElementById("mc-jsonp-script");
      if (script) document.body.removeChild(script);
      delete (window as unknown as Record<string, any>).mailchimpCallback;
    };

    const script = document.createElement("script");
    script.id = "mc-jsonp-script";
    script.src = url;
    // Add an error handler in case it completely fails to load (network error)
    script.onerror = () => {
      setLoading(false);
      toast.error("Network error. Please try again.");
    };
    document.body.appendChild(script);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 md:p-14 text-center">
      <h3 className="text-2xl md:text-3xl mb-2">Don't Miss an Update</h3>
      <p className="text-gray-500 mb-8 text-[15px]">
        Weekly cybersecurity insights, tech deep-dives, and community updates from the Rakshna team.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 text-xs text-gray-400">
        <p className="italic">"One of the best cybersecurity blogs I've read."</p>
        <p className="italic">"Clear, practical, and always on-point."</p>
      </div>
    </div>
  );
}
