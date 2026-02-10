// Blog Posts Data - 5 Essential Posts

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  image: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

// All Blog Posts
export const blogPosts: BlogPost[] = [
  {
    title: "How to Start Writing Your Life Story",
    slug: "how-to-start-writing-your-life-story",
    excerpt: "Beginning your life story doesn't have to be overwhelming. Discover simple techniques to capture your most meaningful memories and create a legacy that lasts.",
    category: "How-To Guides",
    publishDate: "January 15, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200",
    seoTitle: "How to Start Writing Your Life Story - Simple Guide for Beginners",
    seoDescription: "Learn how to write your life story with this beginner-friendly guide. Discover simple techniques to capture memories and create a lasting legacy for your family.",
    keywords: ["how to write life story", "writing your life story", "start writing memoir", "life story guide"],
    content: `
      <h2>Getting Started Is Easier Than You Think</h2>
      <p>Many people feel overwhelmed when they think about writing their life story. Where do you start? What do you include? The truth is, beginning your life story doesn't require perfect writing skills or a complete outline. It simply requires the willingness to start.</p>

      <h3>Start With What You Remember Most</h3>
      <p>Don't try to write chronologically from birth to present. Instead, begin with the memories that feel most vivid or meaningful. Maybe it's your wedding day, a childhood summer, or a pivotal decision that changed everything. These emotional anchors make writing easier and more authentic.</p>

      <h3>Use Simple Prompts</h3>
      <p>When you're stuck, prompts can help. Try these: "My earliest memory is...", "The person who influenced me most was...", or "One thing I want my family to know is...". These gentle nudges help words flow naturally.</p>

      <h3>Write Like You Talk</h3>
      <p>Your life story doesn't need fancy language. Write the way you speak. Imagine you're telling these stories to your grandchildren over coffee. That authentic voice is what makes your story uniquely yours.</p>

      <h3>Don't Aim for Perfect</h3>
      <p>Your first draft doesn't have to be perfect. It just has to be real. Write freely, capture the memories, and don't worry about grammar or structure yet. You can always refine later. The important thing is getting your stories out of your head and onto the page.</p>

      <h3>Make It a Habit</h3>
      <p>Set aside just 15 minutes a few times a week. Consistency matters more than marathon writing sessions. Small, regular efforts add up to a complete story faster than you'd think.</p>

      <p><strong>Before I Go makes it simple and beautiful.</strong> Our guided prompts and intuitive platform help you capture your life story without the overwhelm, creating a lasting legacy your family will treasure.</p>
    `
  },
  {
    title: "Questions to Ask Your Grandparents Before It's Too Late",
    slug: "questions-to-ask-grandparents",
    excerpt: "Time with our grandparents is precious. These thoughtful questions help unlock their most meaningful stories and preserve family history before it's lost forever.",
    category: "Family Stories",
    publishDate: "January 12, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/8617549/pexels-photo-8617549.jpeg?auto=compress&cs=tinysrgb&w=1200",
    seoTitle: "50 Questions to Ask Your Grandparents Before It's Too Late",
    seoDescription: "Preserve your grandparents' stories with these meaningful conversation starters. Learn how to capture family history and create lasting memories.",
    keywords: ["questions to ask grandparents", "preserving grandparent stories", "family history questions", "grandparent interview"],
    content: `
      <h2>Don't Wait Until It's Too Late</h2>
      <p>Every grandparent holds decades of family history, wisdom, and stories that exist nowhere else. Yet many of us wait too long to ask the questions that matter. By the time we're ready to listen, those stories are sometimes gone forever.</p>

      <h3>Questions About Their Childhood</h3>
      <p>Start with their earliest memories. "What was your house like growing up?" "What games did you play as a child?" "What was your favorite meal your mother made?" These simple questions often unlock vivid, detailed stories that paint a picture of a different era.</p>

      <h3>Questions About Family History</h3>
      <p>Ask about previous generations: "What do you remember about your grandparents?" "Are there any family legends or stories passed down?" "Where did our family come from originally?" These questions connect you to roots that stretch back generations.</p>

      <h3>Questions About Their Youth</h3>
      <p>"What was your first job?" "How did you meet Grandpa/Grandma?" "What was the proudest moment of your life?" These conversations reveal the person behind the grandparent role—their dreams, struggles, and triumphs.</p>

      <h3>Questions About Lessons Learned</h3>
      <p>Ask for their wisdom: "What's the most important thing you've learned in life?" "What would you do differently?" "What advice would you give your younger self?" Their insights, earned through decades of living, are irreplaceable gifts.</p>

      <h3>How to Have These Conversations</h3>
      <p>Choose a comfortable, quiet setting. Don't rush. Let stories unfold naturally. Record the conversation (with permission) or take notes. Most importantly, truly listen. Your genuine interest will encourage them to open up and share more.</p>

      <p><strong>Before I Go makes it simple and beautiful.</strong> Our guided questions and recording features help you capture your grandparents' stories in a meaningful way that preserves their voice and legacy forever.</p>
    `
  },
  {
    title: "The Ultimate Guide to Preserving Family Memories",
    slug: "preserving-family-memories-guide",
    excerpt: "From photos to stories, learn the essential methods for protecting your family's precious memories and ensuring they last for generations to come.",
    category: "How-To Guides",
    publishDate: "January 8, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1200",
    seoTitle: "How to Preserve Family Memories: Complete Guide for 2026",
    seoDescription: "Learn proven methods for preserving family memories including photos, stories, and heirlooms. Protect your family history for future generations.",
    keywords: ["preserving family memories", "how to preserve family memories", "family memory preservation", "protect family photos"],
    content: `
      <h2>Your Family Memories Are Irreplaceable</h2>
      <p>Photos fade, memories dim, and loved ones pass away. But with the right approach, you can preserve your family's most precious moments for generations. Whether it's old photographs, recorded stories, or cherished heirlooms, proper preservation ensures these treasures survive.</p>

      <h3>Digitize Physical Photos</h3>
      <p>Old photographs deteriorate over time. Scan them at high resolution (at least 600 DPI) and store digital copies in multiple locations—an external hard drive, cloud storage, and with family members. Label each photo with names, dates, and context while people still remember.</p>

      <h3>Record Stories and Voices</h3>
      <p>Audio and video recordings capture not just words, but tone, laughter, and personality. Record family stories, holiday conversations, and casual moments. Even simple voice memos of a grandparent telling their favorite story become priceless after they're gone.</p>

      <h3>Create a Family Archive</h3>
      <p>Organize documents, photos, and stories in one accessible place. Create both physical and digital versions. Include birth certificates, immigration papers, military records, and handwritten letters. These documents tell the story of where you came from.</p>

      <h3>Preserve Physical Heirlooms Properly</h3>
      <p>Store old photos in acid-free sleeves away from light and humidity. Keep documents flat in archival boxes. Handle old items with clean hands. Small preservation efforts now prevent irreversible damage.</p>

      <h3>Share Stories While You Can</h3>
      <p>The most important preservation happens through conversation. Sit with older family members and ask questions. Record their answers. Write down the stories they tell. Digital copies are valuable, but so is the act of listening and learning while they're still here.</p>

      <h3>Make Memories Accessible</h3>
      <p>Preserved memories are worthless if no one can find them. Share digital collections with family members. Create photo books. Tell the stories at family gatherings. Living memories that get shared and retold are the ones that truly last.</p>

      <p><strong>Before I Go makes it simple and beautiful.</strong> Our platform helps you gather, organize, and preserve your family's stories in one secure place, creating a lasting digital legacy.</p>
    `
  },
  {
    title: "Legacy Letters: How to Write a Letter to Your Children",
    slug: "legacy-letters-to-children",
    excerpt: "A heartfelt letter to your children can become one of their most treasured possessions. Learn how to write meaningful legacy letters that express your love and values.",
    category: "Life & Legacy",
    publishDate: "January 5, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1200",
    seoTitle: "How to Write Legacy Letters to Your Children - Complete Guide",
    seoDescription: "Learn how to write meaningful legacy letters to your children. Create heartfelt messages that express love, values, and life lessons they'll treasure forever.",
    keywords: ["legacy letters", "writing letters to children", "ethical will", "letters to family"],
    content: `
      <h2>Words That Last Forever</h2>
      <p>A legacy letter to your children isn't about money or possessions. It's about passing down what truly matters—your love, values, life lessons, and hopes for their future. These letters become treasured keepsakes that your children will return to throughout their lives.</p>

      <h3>Start With Why You're Writing</h3>
      <p>Begin by explaining your purpose: "I'm writing this because I want you to know..." This sets the tone and helps you focus on what truly matters. There's no need for formality—write from the heart, as if you're having a conversation.</p>

      <h3>Share What You Want Them to Know</h3>
      <p>Tell them about your values and why they matter. Share lessons you've learned, perhaps the hard way. Express what you're proud of in them. Describe your hopes and dreams for their future. Be honest, vulnerable, and authentic.</p>

      <h3>Include Specific Memories</h3>
      <p>Generic statements feel empty. Instead, include specific moments: "I'll never forget the day you..." or "When you were five, you said something that changed how I saw the world..." These details make your letter vivid and deeply personal.</p>

      <h3>Don't Forget the Simple Things</h3>
      <p>Sometimes the most powerful words are the simplest: "I'm proud of you." "I believe in you." "You are loved." These fundamental truths carry weight precisely because they're direct and undeniable.</p>

      <h3>Write Now, Not Later</h3>
      <p>Many people plan to write legacy letters "someday." But life is unpredictable. Write now while you have the chance. You can always update it, but having something written is infinitely better than waiting for the perfect time that may never come.</p>

      <h3>Consider Letters for Different Life Stages</h3>
      <p>Some parents write multiple letters meant to be opened at different times—graduations, weddings, the birth of their first child. Each letter can speak to that specific moment in their life with relevant wisdom and encouragement.</p>

      <p><strong>Before I Go makes it simple and beautiful.</strong> Our platform provides gentle prompts and a structured approach to help you write meaningful legacy letters your children will treasure forever.</p>
    `
  },
  {
    title: "Why Your Kids Need to Hear Your Stories",
    slug: "why-kids-need-family-stories",
    excerpt: "Family stories aren't just entertainment—they're essential for children's development, identity, and resilience. Discover why sharing your stories matters more than you think.",
    category: "Family Stories",
    publishDate: "January 2, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1200",
    seoTitle: "Why Kids Need Family Stories - The Science Behind Storytelling",
    seoDescription: "Discover why family stories are essential for children's development. Learn how sharing your stories builds identity, resilience, and stronger family bonds.",
    keywords: ["why kids need family stories", "importance of family stories", "family storytelling benefits", "children and family history"],
    content: `
      <h2>The Power of Family Stories</h2>
      <p>When you tell your children stories about your life, your parents' lives, and your family's history, you're doing much more than entertaining them. Research shows that children who know their family stories have higher self-esteem, stronger family connections, and greater resilience in facing life's challenges.</p>

      <h3>Stories Build Identity</h3>
      <p>Children construct their sense of self partly from understanding where they came from. When they hear about their grandfather's immigration journey, their aunt's business success, or even family struggles overcome, they develop a richer understanding of who they are and what they're capable of.</p>

      <h3>Stories Teach Resilience</h3>
      <p>Family stories about overcoming hardship are especially powerful. When children hear how their grandmother survived tough times, or how their parents navigated challenges, they learn that difficulties are normal and survivable. This builds the mental resilience they'll need throughout life.</p>

      <h3>Stories Create Connection</h3>
      <p>Shared stories create a sense of "us." They're the threads that weave individual family members into a cohesive unit. Children who feel part of a larger family narrative have stronger bonds with relatives and a greater sense of belonging.</p>

      <h3>Stories Pass Down Values</h3>
      <p>You can tell children what you value, but showing them through stories is far more powerful. When you share how your father handled a difficult ethical choice, or how your mother showed compassion to a stranger, you transmit values in a way that sticks.</p>

      <h3>The Best Time to Share Is Now</h3>
      <p>Don't wait for formal occasions. Share stories during car rides, at dinner, or at bedtime. Casual storytelling often feels more natural and creates opportunities for questions and conversation. The more stories you share, the more your children will absorb and remember.</p>

      <h3>Your Ordinary Is Their Extraordinary</h3>
      <p>You might think your life isn't interesting enough for stories. But to your children, everything about your past is fascinating. Your first job, how you met their other parent, what school was like—these "ordinary" stories are treasures to them.</p>

      <p><strong>Before I Go makes it simple and beautiful.</strong> Our guided platform helps you capture and share your family stories in a way that's meaningful, accessible, and designed to strengthen family bonds across generations.</p>
    `
  }
];

// Category colors
export const categoryColors: { [key: string]: string } = {
  "How-To Guides": "bg-blue-100 text-blue-700",
  "Family Stories": "bg-purple-100 text-purple-700",
  "Life & Legacy": "bg-amber-100 text-amber-700"
};
