import Layout from '../components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h1>
        
        {/* Introduction Section */}
        <section className="mb-12 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700">
            At Surfboard Rental, our mission is to provide surf enthusiasts of all levels with access to high-quality surfboards, ensuring everyone can experience the thrill of riding the waves. We are passionate about surfing and strive to make it accessible and enjoyable for everyone.
          </p>
        </section>
        
        {/* Story Section */}
        <section className="mb-12 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2023, Surfboard Rental began as a small local business by a group of surf enthusiasts who wanted to share their love of the ocean with the community. Over the years, we have grown into a trusted name in the surfboard rental industry, known for our quality boards and excellent customer service.
          </p>
        </section>
        
        {/* Team Section */}
        <section className="mb-12 bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Example Team Member */}
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <Image
                src="/images/team-member1.webp"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Add more team members as needed */}
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <Image
                src="/images/team-member2.webp"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-md">
              <Image
                src="/images/team-member3.webp"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Mike Johnson</h3>
              <p className="text-gray-600">Surfboard Specialist</p>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-700">
            We are always here to help! Feel free to reach out to us with any questions, feedback, or to book your next surfboard rental. You can contact us at:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Email: info@surfboardrental.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Ocean Avenue, Surf City</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}