import ButtonBack from "@/components/common/ButtonBack";

export default function Contact() {
  return (
    <div className="relative bg-[#111] text-white min-h-screen flex flex-col items-center justify-center px-4 py-10 ">
      {/* Back Button */}

      <ButtonBack />

      {/* Card */}
      <div
        className="bg-[#1a1a1a] w-full max-w-md p-8 rounded-2xl 
      animate-[fadeIn_0.8s_ease-in-out] shadow-xl hover:shadow-green-400"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Get in Touch
        </h2>

        <form
          action="https://formspree.io/f/mqaevapl"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="bg-[#222] px-4 py-3 rounded-lg focus:bg-[#333] 
            outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="bg-[#222] px-4 py-3 rounded-lg focus:bg-[#333] 
            outline-none transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            className="bg-[#222] px-4 py-3 rounded-lg focus:bg-[#333] 
            outline-none transition resize-none"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition 
            py-3 rounded-lg font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
