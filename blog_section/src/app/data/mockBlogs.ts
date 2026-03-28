import { BlogPost } from "../types/blog";

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-zero-trust-architecture",
    title: "Understanding Zero Trust Architecture: Why Every Organization Needs It Now",
    excerpt: "Zero Trust has become the gold standard in cybersecurity frameworks. Here's a breakdown of what it means, how it works, and why your organization can't afford to ignore it.",
    content: `
      <h2>TL;DR:</h2>
      <ul>
        <li>Zero Trust assumes no user or device is inherently trustworthy — even inside the network perimeter</li>
        <li>Over 60% of enterprises are adopting Zero Trust strategies in 2026</li>
        <li>It reduces breach impact by 50% on average according to recent IBM reports</li>
        <li>Implementation requires identity verification, micro-segmentation, and continuous monitoring</li>
      </ul>

      <h2>What Is Zero Trust, Exactly?</h2>
      <p>Zero Trust is a security framework that requires all users, whether inside or outside the organization's network, to be authenticated, authorized, and continuously validated before being granted access to applications and data.</p>
      <p>That's the textbook definition. Here's the practical one:</p>
      <p><strong>Zero Trust means "never trust, always verify." Every access request is treated as if it originates from an untrusted network.</strong></p>

      <figure>
        <img src="https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc0MDQ0ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Network security visualization" />
        <figcaption>Figure 1: Modern network security requires continuous verification at every access point</figcaption>
      </figure>

      <h2>The Three Pillars of Zero Trust</h2>
      <h3>1. Identity Verification</h3>
      <p>Every user must prove their identity through multi-factor authentication (MFA), biometrics, or other strong authentication methods before accessing any resource.</p>

      <h3>2. Micro-Segmentation</h3>
      <p>Network resources are divided into small zones, each requiring separate authorization. This limits lateral movement in case of a breach.</p>

      <h3>3. Continuous Monitoring</h3>
      <p>Access is not a one-time event. User behavior, device health, and network conditions are continuously monitored to detect anomalies.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc3Mzk5Njg1N3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="Security monitoring dashboard" />
        <figcaption>Figure 2: A typical security monitoring dashboard tracking access patterns and anomalies</figcaption>
      </figure>

      <h2>Why It Matters for Your Organization</h2>
      <p>The traditional castle-and-moat approach to security is dead. With remote work, cloud computing, and BYOD policies, the network perimeter has dissolved. Zero Trust provides a framework that works regardless of where your users or data reside.</p>

      <blockquote>
        "The question is no longer whether to adopt Zero Trust, but how fast you can implement it." — Cybersecurity Research Team, Rakshna
      </blockquote>

      <h2>Getting Started</h2>
      <p>Start with an inventory of your critical assets. Identify who needs access to what, and implement the principle of least privilege. From there, layer in MFA, network segmentation, and continuous monitoring tools.</p>
    `,
    author: {
      name: "Arjun Mehta",
      role: "Cybersecurity Researcher",
    },
    coverImage: "https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc0MDQ0ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-19T10:00:00Z",
    readTime: 8,
    likes: 124,
    tags: ["Cybersecurity", "Zero Trust", "Enterprise"],
  },
  {
    id: "2",
    slug: "ai-in-threat-detection-2026",
    title: "AI in Threat Detection: How Machine Learning Is Reshaping Cybersecurity",
    excerpt: "From anomaly detection to automated incident response, AI is transforming how we defend against cyber threats. Here's what you need to know.",
    content: `
      <h2>The AI Security Revolution</h2>
      <p>Artificial intelligence has moved from a buzzword to a critical component in modern cybersecurity operations. In 2026, AI-powered security tools are no longer optional — they're essential.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQwNDY2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="AI technology abstract" />
        <figcaption>Figure 1: AI systems can process millions of security events per second</figcaption>
      </figure>

      <h2>Key Applications</h2>
      <h3>Behavioral Analytics</h3>
      <p>ML models establish baselines for normal user behavior and flag deviations that could indicate compromised accounts or insider threats.</p>

      <h3>Automated Incident Response</h3>
      <p>SOAR platforms powered by AI can automatically triage, investigate, and respond to security incidents, reducing response times from hours to seconds.</p>

      <h2>Challenges and Limitations</h2>
      <p>AI is not a silver bullet. Adversarial attacks, data poisoning, and false positives remain significant challenges. Human oversight is still essential.</p>

      <blockquote>"AI doesn't replace security analysts — it amplifies them." — Rakshna AI Research Wing</blockquote>
    `,
    author: {
      name: "Sneha Patel",
      role: "AI Research Lead",
    },
    coverImage: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQwNDY2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-16T14:30:00Z",
    readTime: 6,
    likes: 98,
    tags: ["AI", "Threat Detection", "Technology"],
  },
  {
    id: "3",
    slug: "secure-coding-practices-developers",
    title: "Secure Coding Practices Every Developer Should Follow in 2026",
    excerpt: "Security starts at the code level. Learn the essential practices that prevent vulnerabilities before they reach production.",
    content: `
      <h2>Shift Left: Security Starts with Code</h2>
      <p>The most cost-effective security measure is preventing vulnerabilities at the source. Here are the practices every developer on your team should adopt.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzQxMDAwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Developer coding" />
        <figcaption>Figure 1: Secure coding requires discipline and the right tooling</figcaption>
      </figure>

      <h2>Top 5 Practices</h2>
      <h3>1. Input Validation</h3>
      <p>Never trust user input. Validate, sanitize, and encode all data before processing.</p>

      <h3>2. Parameterized Queries</h3>
      <p>SQL injection remains in the OWASP Top 10. Always use parameterized queries or prepared statements.</p>

      <h3>3. Secrets Management</h3>
      <p>Never hardcode API keys or credentials. Use environment variables and secrets management tools.</p>

      <h3>4. Dependency Scanning</h3>
      <p>Over 80% of modern applications contain open-source components. Regularly scan dependencies for known vulnerabilities.</p>

      <h3>5. Code Reviews with Security Focus</h3>
      <p>Incorporate security checklists into your code review process. Automated SAST tools can catch common issues.</p>
    `,
    author: {
      name: "Rohan Kumar",
      role: "Security Engineer",
    },
    coverImage: "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzQxMDAwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-12T09:15:00Z",
    readTime: 7,
    likes: 76,
    tags: ["Development", "Secure Coding", "Best Practices"],
  },
  {
    id: "4",
    slug: "cloud-security-shared-responsibility",
    title: "Cloud Security and the Shared Responsibility Model: What You're Missing",
    excerpt: "Moving to the cloud doesn't mean your security concerns disappear. Understanding the shared responsibility model is critical.",
    content: `
      <h2>The Cloud Security Gap</h2>
      <p>Many organizations migrate to the cloud assuming their provider handles all security. This is a dangerous misconception that leads to some of the most devastating breaches.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnN8ZW58MXx8fHwxNzczOTg3NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Cloud computing infrastructure" />
        <figcaption>Figure 1: Cloud infrastructure requires a clear understanding of security boundaries</figcaption>
      </figure>

      <h2>Understanding the Model</h2>
      <p>Cloud providers secure the infrastructure. You secure your data, configurations, and access controls. The line between these responsibilities varies by service model (IaaS, PaaS, SaaS).</p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>Misconfigured S3 buckets exposing sensitive data</li>
        <li>Overly permissive IAM roles</li>
        <li>Unencrypted data at rest and in transit</li>
        <li>Lack of logging and monitoring</li>
      </ul>

      <blockquote>"The cloud is secure. Your configuration of it might not be." — Cloud Security Team, Rakshna</blockquote>
    `,
    author: {
      name: "Priya Sharma",
      role: "Cloud Security Analyst",
    },
    coverImage: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnN8ZW58MXx8fHwxNzczOTg3NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-08T11:00:00Z",
    readTime: 5,
    likes: 63,
    tags: ["Cloud Security", "Infrastructure", "Best Practices"],
  },
  {
    id: "5",
    slug: "blockchain-beyond-crypto-security",
    title: "Blockchain Beyond Crypto: Security Applications You Haven't Considered",
    excerpt: "Blockchain technology offers far more than cryptocurrency. Explore how it's being used in identity management, supply chain security, and more.",
    content: `
      <h2>Beyond the Hype</h2>
      <p>While blockchain is most commonly associated with cryptocurrency, its underlying technology offers powerful security applications that are reshaping how we think about trust and verification.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1590285836796-f772deafabfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0MTAwMDM0fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Blockchain technology" />
        <figcaption>Figure 1: Blockchain's decentralized nature makes it ideal for security applications</figcaption>
      </figure>

      <h2>Security Use Cases</h2>
      <h3>Decentralized Identity</h3>
      <p>Self-sovereign identity systems built on blockchain give users control over their digital identities without relying on centralized authorities.</p>

      <h3>Supply Chain Integrity</h3>
      <p>Immutable ledgers ensure that every step in a supply chain is recorded and verifiable, preventing tampering and fraud.</p>

      <h3>Secure Voting Systems</h3>
      <p>Blockchain-based voting systems can provide transparency and auditability while maintaining voter privacy.</p>
    `,
    author: {
      name: "Vikram Singh",
      role: "Blockchain Researcher",
    },
    coverImage: "https://images.unsplash.com/photo-1590285836796-f772deafabfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0MTAwMDM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-03-04T16:00:00Z",
    readTime: 6,
    likes: 51,
    tags: ["Blockchain", "Innovation", "Technology"],
  },
  {
    id: "6",
    slug: "rakshna-hackathon-2026-recap",
    title: "Rakshna Hackathon 2026: Building Security Tools in 48 Hours",
    excerpt: "A recap of our annual hackathon where teams built innovative security tools, from phishing detectors to vulnerability scanners.",
    content: `
      <h2>48 Hours of Innovation</h2>
      <p>Our annual hackathon brought together 120+ participants across 30 teams, all focused on building practical security tools that solve real-world problems.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwaGFja2F0aG9uJTIwY29kaW5nJTIwZXZlbnR8ZW58MXx8fHwxNzc0MTAwMDM1fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Hackathon event" />
        <figcaption>Figure 1: Teams collaborating during the 48-hour hackathon sprint</figcaption>
      </figure>

      <h2>Winning Projects</h2>
      <h3>PhishGuard — AI-Powered Phishing Detector</h3>
      <p>First place went to a team that built an ML-based browser extension capable of detecting phishing attempts in real-time with 94% accuracy.</p>

      <h3>VulnScan — Automated Vulnerability Scanner</h3>
      <p>The runner-up created an open-source vulnerability scanner that integrates with CI/CD pipelines for continuous security testing.</p>

      <blockquote>"The energy and creativity at this year's hackathon was extraordinary. These projects have real potential." — Rakshna Faculty Advisor</blockquote>
    `,
    author: {
      name: "Anjali Reddy",
      role: "Events Coordinator",
    },
    coverImage: "https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwaGFja2F0aG9uJTIwY29kaW5nJTIwZXZlbnR8ZW58MXx8fHwxNzc0MTAwMDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    publishedAt: "2026-02-28T09:00:00Z",
    readTime: 5,
    likes: 142,
    tags: ["Events", "Hackathon", "Community"],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return mockBlogs.find((blog) => blog.slug === slug);
}
