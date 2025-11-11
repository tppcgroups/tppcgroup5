export default function AboutInfo() {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold text-cirtRed">
            Tampa Palms Professional Center
          </span>{" "}
          provides more than just office space — we create an environment where
          businesses and professionals can thrive.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          From <strong>private executive suites</strong> to{" "}
          <strong>entire office configurations</strong>, our center is designed
          for flexibility, productivity, and growth.
        </p>
        <a
          href="/pages/Features"
          className="inline-block bg-cirtRed text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition bg-gray-700"
        >
          Learn More →
        </a>
      </div>
    );
}