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
        <img src="https://images.unsplash.com/photo-1759884247160-27b8465544b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdoaXRlYm9hcmR8ZW58MXx8fHwxNzczNjg3ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Team collaboration session" />
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
        <img src="https://images.unsplash.com/photo-1765018028697-2baae4577cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczNzQ3NzYyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Community volunteers at work" />
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
    coverImage: "https://images.unsplash.com/photo-1761666520005-3ffcf13e74c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0aW5nJTIwZ3JvdXB8ZW58MXx8fHwxNzczNzY5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MzY3NzI1NHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Analytics dashboard" />
        <figcaption>Figure 1: Our new analytics dashboard showing member engagement metrics</figcaption>
      </figure>
      
      <h2>New Digital Initiatives</h2>
      <p>We're excited to share some of the technological advancements we've made:</p>
      
      <h3>1. Member Portal</h3>
      <p>Our new online portal allows members to access resources, register for events, and stay updated with society news - all in one place.</p>
      
      <h3>2. Mobile App</h3>
      <p>Soon launching our mobile application that will make it even easier to stay connected on the go.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzczNjc2NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Mobile app interface mockup" />
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
    coverImage: "https://images.unsplash.com/photo-1767797852518-d3c8bc6088eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMG5ldHdvcmt8ZW58MXx8fHwxNzczNzY5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-10T14:30:00Z",
    readTime: 4,
    likes: 38,
    tags: ["Technology", "Innovation", "Digital"],
  },
  {
    id: "3",
    slug: "creative-minds-inspiring-change",
    title: "Creative Minds: Inspiring Change in Our Community",
    excerpt: "Celebrating the innovative ideas and creative solutions our members bring to address community challenges.",
    content: `
      <h2>The Art of Problem Solving</h2>
      <p>Creativity isn't just about art - it's about finding innovative solutions to everyday challenges. Our society members have consistently demonstrated remarkable creativity in addressing community needs.</p>
      
      <h2>Recent Creative Projects</h2>
      
      <h3>Community Garden Initiative</h3>
      <p>What started as a simple idea has blossomed into a thriving community garden that brings neighbors together and promotes sustainable living.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1739633829573-c68cb790973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB2ZWdldGFibGVzJTIwcGxhbnRzfGVufDF8fHx8MTc3Mzc2OTc3Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Community garden with vegetables" />
        <figcaption>Figure 1: Our thriving community garden producing fresh vegetables for local families</figcaption>
      </figure>
      
      <h3>Youth Mentorship Program</h3>
      <p>Our creative approach to mentorship pairs young members with experienced professionals, fostering growth and learning.</p>
      
      <h3>Cultural Exchange Events</h3>
      <p>Through art, music, and storytelling, we celebrate our diverse backgrounds and learn from each other.</p>
      
      <h2>Innovation Workshop</h2>
      <p>Next month, we're hosting a special workshop where members can share their innovative ideas and collaborate on new projects.</p>
      
      <blockquote>
        "Creativity is intelligence having fun. Our society provides the perfect platform for that." - Creative Team Lead
      </blockquote>
      
      <h2>Get Involved</h2>
      <p>Have a creative idea? We want to hear it! Reach out to our innovation committee and let's make it happen together.</p>
    `,
    author: {
      name: "Anjali Reddy",
      role: "Creative Director",
    },
    coverImage: "https://images.unsplash.com/photo-1699570047113-16fdf623e83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvbGxhYm9yYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczNzM2NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-08T09:15:00Z",
    readTime: 6,
    likes: 56,
    tags: ["Creativity", "Innovation", "Community"],
  },
  {
    id: "4",
    slug: "teamwork-makes-dream-work",
    title: "Teamwork Makes the Dream Work: Our Success Stories",
    excerpt: "Real stories from our members about how teamwork has led to remarkable achievements and personal growth.",
    content: `
      <h2>The Magic of Working Together</h2>
      <p>Success is sweeter when shared. This week, we're highlighting some of our most successful collaborative projects and the teams behind them.</p>
      
      <h2>Project Highlights</h2>
      
      <h3>Annual Charity Drive</h3>
      <p>Our team raised over ₹5 lakhs for local charities, demonstrating what's possible when we unite for a cause.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1587400563263-e77a5590bfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZvZ3JhcGhpYyUyMHN0YXRpc3RpY3MlMjBjaGFydHxlbnwxfHx8fDE3NzM3Njk3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Impact statistics infographic" />
        <figcaption>Figure 1: Visual breakdown of our charity drive impact across different initiatives</figcaption>
      </figure>
      
      <h3>Education Support Program</h3>
      <p>Twenty volunteers came together to provide free tutoring to underprivileged children, impacting over 100 students.</p>
      
      <h3>Environmental Clean-up Campaign</h3>
      <p>Over 50 members participated in cleaning and beautifying our local parks and public spaces.</p>
      
      <h2>Team Member Testimonials</h2>
      <p>"Working with this dedicated group has been one of the most rewarding experiences of my life. We've accomplished so much together!" - Volunteer Member</p>
      
      <h2>Building Stronger Teams</h2>
      <p>We've learned that effective teamwork requires clear communication, mutual respect, and shared vision. Our society provides training and resources to help teams succeed.</p>
      
      <h2>Join a Team</h2>
      <p>Interested in being part of something bigger? We have various teams working on different initiatives - there's something for everyone!</p>
    `,
    author: {
      name: "Vikram Singh",
      role: "Volunteer Coordinator",
    },
    coverImage: "https://images.unsplash.com/photo-1768796372063-4da660e034b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGRpc2N1c3Npb24lMjBtb2Rlcm58ZW58MXx8fHwxNzczNzY5MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-05T11:00:00Z",
    readTime: 5,
    likes: 67,
    tags: ["Teamwork", "Success", "Volunteering"],
  },
  {
    id: "5",
    slug: "annual-conference-highlights-2026",
    title: "Annual Conference 2026: Key Highlights and Takeaways",
    excerpt: "A comprehensive recap of our most successful annual conference, featuring inspiring speakers, networking opportunities, and future plans.",
    content: `
      <h2>A Memorable Event</h2>
      <p>Our Annual Conference 2026 was a resounding success, bringing together over 300 members and guests for two days of learning, networking, and celebration.</p>
      
      <h2>Day 1: Inspiration and Learning</h2>
      
      <h3>Keynote Speakers</h3>
      <p>We were honored to host renowned speakers who shared insights on leadership, community building, and social impact.</p>
      
      <h3>Workshop Sessions</h3>
      <p>Interactive workshops covered topics ranging from effective communication to project management and sustainable practices.</p>
      
      <h2>Day 2: Networking and Planning</h2>
      
      <h3>Networking Breakfast</h3>
      <p>Members connected over breakfast, sharing ideas and forming new collaborations.</p>
      
      <h3>Future Planning Session</h3>
      <p>We outlined ambitious goals for the coming year, with member input shaping our strategic direction.</p>
      
      <h2>Awards and Recognition</h2>
      <p>We celebrated outstanding members who have made exceptional contributions to our society.</p>
      
      <h2>Looking Ahead</h2>
      <p>Based on conference feedback, we're excited to announce new initiatives launching in the coming months. Stay connected for updates!</p>
      
      <h2>Thank You</h2>
      <p>A heartfelt thank you to all attendees, speakers, volunteers, and sponsors who made this event possible. See you next year!</p>
    `,
    author: {
      name: "Meera Kapoor",
      role: "Event Director",
    },
    coverImage: "https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBldmVudCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzczNzM5MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-01T16:00:00Z",
    readTime: 7,
    likes: 89,
    tags: ["Conference", "Events", "Community"],
  },
];

// Utility function to get blog by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return mockBlogs.find((blog) => blog.slug === slug);
}