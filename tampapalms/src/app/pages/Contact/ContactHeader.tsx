export default function ContactHeader() {
  return (
    <header className="relative">
      <div className="relative h-[260px] md:h-[420px]">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              'url("/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png")',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow">Contact</h1>
          <div className="mt-4 h-1 w-36 rounded-full bg-teal-600" />
          <p className="mt-3 text-center max-w-2xl text-white/85">
            We’re here to help—reach out and we’ll get back to you quickly.
          </p>
        </div>
      </div>
    </header>
  );
}
