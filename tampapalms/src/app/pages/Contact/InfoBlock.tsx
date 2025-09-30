export default function InfoBlock() {
  return (
    <div className="space-y-4 text-lg md:text-xl text-neutral-900">
      <div>
        <p className="font-semibold">Phone</p>
        <a href="tel:+18138767697" className="text-black underline decoration-neutral-400 hover:decoration-black">
          813.876.7697
        </a>
      </div>
      <div>
        <p className="font-semibold">Email</p>
        <a href="mailto:admin@tampapalmscenter.com" className="text-black underline decoration-neutral-400 hover:decoration-black">
          admin@tampapalmscenter.com
        </a>
      </div>
      <div>
        <p className="font-semibold">Corporate Office &amp; Mailing Address</p>
        <p className="text-black">17427 Bridge Hill Court, Suite C, Tampa, FL 33647</p>
      </div>
    </div>
  );
}
