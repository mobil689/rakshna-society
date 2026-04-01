import { BlogPost } from "../types/blog";

// Mock data - Replace this with your backend API
export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    slug: "building-stronger-community-through-collaboration",
    title: "Building a Stronger Community Through Collaboration",
    excerpt: "Discover how our society members are coming together to create meaningful impact through collaborative initiatives and shared goals.",
    content: `
      <h2>Introduction</h2>
      <p>At Rakshna Mait, we believe that the strength of our community lies in our ability to work together towards common goals. This week, we explore how collaboration has become the cornerstone of our society's success.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=80" alt="Team collaboration session" />
        <figcaption>Figure 1: Our members collaborating on community initiatives during a planning session</figcaption>
      </figure>
      
      <h2>The Power of Unity</h2>
      <p>When we first started this journey, we understood that individual efforts, while valuable, could only take us so far. It's through collaborative efforts that we've been able to amplify our impact and reach more people in our community.</p>
      
      <h3>Key Initiatives</h3>
      <ul>
        <li>Community outreach programs that have touched over 500 families</li>
        <li>Educational workshops conducted by our expert members</li>
        <li>Sustainable development projects in local neighborhoods</li>
        <li>Cultural events that celebrate our diversity</li>
      </ul>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1593113580332-ceb47bf23d1d?auto=format&fit=crop&w=1080&q=80" alt="Community volunteers at work" />
        <figcaption>Figure 2: Volunteers distributing resources during our community outreach program</figcaption>
      </figure>
      
      <h2>Member Spotlight</h2>
      <p>This month, we're proud to highlight the incredible work done by our volunteer team. Their dedication has been instrumental in organizing our largest community event yet.</p>
      
      <blockquote>
        "Together we can achieve what seems impossible alone. This society has shown me the true meaning of community." - A dedicated member
      </blockquote>
      
      <h2>Looking Forward</h2>
      <p>As we move forward, we're excited to announce new initiatives that will further strengthen our bonds. Stay tuned for upcoming events and opportunities to get involved!</p>
    `,
    author: {
      name: "Priya Sharma",
      role: "Community Coordinator",
    },
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1080&q=80",
    publishedAt: "2026-03-15T10:00:00Z",
    readTime: 5,
    likes: 42,
    tags: ["Community", "Collaboration", "Impact"],
  },
  {
    id: "2",
    slug: "technology-innovation-society-future",
    title: "Embracing Technology for Our Society's Future",
    excerpt: "How we're leveraging modern technology to enhance communication, streamline operations, and create better experiences for all members.",
    content: `
      <h2>Digital Transformation Journey</h2>
      <p>In today's fast-paced world, technology plays a crucial role in how we connect and collaborate. Our society has embraced this change, implementing various digital solutions to improve member experience.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80" alt="Analytics dashboard" />
        <figcaption>Figure 1: Our new analytics dashboard showing member engagement metrics</figcaption>
      </figure>
      
      <h2>New Digital Initiatives</h2>
      <p>We're excited to share some of the technological advancements we've made:</p>
      
      <h3>1. Member Portal</h3>
      <p>Our new online portal allows members to access resources, register for events, and stay updated with society news - all in one place.</p>
      
      <h3>2. Mobile App</h3>
      <p>Soon launching our mobile application that will make it even easier to stay connected on the go.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1080&q=80" alt="Mobile app interface mockup" />
        <figcaption>Figure 2: Preview of our upcoming mobile application interface</figcaption>
      </figure>
      
      <h3>3. Virtual Events</h3>
      <p>We've successfully hosted multiple virtual events, ensuring that distance is no barrier to participation.</p>
      
      <h2>Member Feedback</h2>
      <p>The response has been overwhelmingly positive. Members appreciate the convenience and accessibility these tools provide.</p>
      
      <h2>What's Next?</h2>
      <p>We're continuously working on improving our digital infrastructure. Your suggestions and feedback are always welcome!</p>
    `,
    author: {
      name: "Rahul Verma",
      role: "Technology Lead",
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80",
    publishedAt: "2026-03-10T14:30:00Z",
    readTime: 4,
    likes: 38,
    tags: ["Technology", "Innovation", "Digital"],
  }
];

// Utility function to get blog by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return mockBlogs.find((blog) => blog.slug === slug);
}