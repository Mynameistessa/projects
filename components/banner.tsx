"use client";

export default function Banner() {
  return (
    <header className="fixed top-0 w-full bg-cover bg-center">
      <div
        className="w-full bg-cover bg-center h-[8rem]"
        style={{ backgroundImage: "url(/Banner-test.png)" }}
      />
    </header>
  );
}
