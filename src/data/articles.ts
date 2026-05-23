export interface ArticleData {
  id: string
  slug: string
  title: string
  titleTh?: string
  subtitle?: string
  subtitleTh?: string
  date: string
  datePublished: string
  dateModified?: string
  description: string
  descriptionTh?: string
  heroImage: string
  cardImage: string
  content: string
  contentTh?: string
  readMoreColor: string
  gradientFrom: string
  gradientTo: string
  gradientMid: string
  glowColor: string
  tag?: "Featured" | "Latest"
}

export const articles: ArticleData[] = [
  {
    id: "1",
    slug: "now-or-never-1st-issue",
    title: "Now or Never 1st Issue",
    titleTh: "Now or Never ฉบับที่ 1",
    subtitle: "Introducing the first issue of Now or Never magazine",
    subtitleTh: "แนะนำฉบับแรกของนิตยสาร Now or Never",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "Introducing the first issue of Now or Never magazine – a groundbreaking publication that explores cannabis from perspectives in Thailand you've never seen before. If not now, then when? Stay tuned for updates and pre-orders this November.",
    descriptionTh: "แนะนำฉบับแรกของนิตยสาร Now or Never – สิ่งพิมพ์ที่ปฏิวัติวงการ สำรวจกัญชาจากมุมมองในประเทศไทยที่คุณไม่เคยเห็นมาก่อน เพราะถ้าไม่ตอนนี้ แล้วเมื่อไหร่? ติดตามข่าวสารเพิ่มเติมและการสั่งจองหนังสือในเดือนพฤศจิกายนนี้",
    heroImage: "/cover10.webp",
    cardImage: "/cover10.webp",
    content: `Now or Never Magazine is a limited-edition print publication exploring cannabis culture in Thailand through interviews, photography, and first-person storytelling. Issue 1 was published in November 2024 with only 420 copies printed.

## Key Takeaways

- Now or Never is a bilingual English-Thai print magazine about Thai cannabis culture
- Issue 1 features interviews with 14 figures in Thailand's cannabis community
- Only 420 copies were printed, making it a collector's edition
- The magazine covers growers, advocates, artists, and community builders
- Available for purchase at ฿1,420 THB

## About Issue 1

Now or Never 1st issue is a magazine that explores cannabis from perspectives in Thailand you've never seen before.

If not now, then when?

## Inside the Magazine

Issue 1 brings together six chapters, each with its own voice, visual style, and editorial perspective. From the growers of southern Thailand to the advocates who marched in Bangkok's 2024 cannabis protests, every page captures a moment in Thai cannabis culture that might not last forever.`,
    contentTh: `Now or Never 1st

คือแมกกาซีนที่พูดถึง "กัญชา"

ในมุมที่คุณไม่เคยเห็น

เพราะถ้าไม่ตอนนี้ แล้วเมื่อไหร่?

ติดตามข่าวสารเพิ่มเติมและการสั่งจองหนังสือในเดือนพฤศจิกายนนี้…`,
    readMoreColor: "#4CAF50",
    gradientFrom: "#1B5E20",
    gradientTo: "#1B5E20",
    gradientMid: "#1B5E20",
    glowColor: "#4CAF50",
    tag: "Featured"
  },
  {
    id: "2",
    slug: "the-root-of-everything",
    title: "The Root of Everything",
    titleTh: "รากฐานของทุกสิ่ง",
    subtitle: "THE STORY-STRAIGHT FROM THE JOURNEY",
    subtitleTh: "เรื่องราวตรงจากเส้นทาง",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "At first, I never imagined that creating a magazine would be so complex and challenging. Only after diving into the process, step by step, did I realize that success required more than just \"doing the work.\" It meant \"thinking through every detail\"",
    descriptionTh: "ในช่วงเริ่มต้น ผมไม่เคยคาดคิดมาก่อนเลยว่า \"การทำแมกกาซีน\" จะเป็นงานที่ซับซ้อนและท้าทายได้ถึงเพียงนี้ จนกระทั่งได้ลงมือทำจริง ทีละขั้น ทีละวัน ผมจึงค่อย ๆ เรียนรู้ว่า หากต้องการให้แมกกาซีนฉบับนี้สำเร็จตามที่ตั้งใจไว้ ไม่ใช่เพียงแค่ \"ลงมือทำ\" เท่านั้น แต่ต้อง \"คิดให้รอบด้าน\"",
    heroImage: "/5. Root of Everything.webp",
    cardImage: "/5. Root of Everything.webp",
    content: `This article is a behind-the-scenes look at the editorial process of creating Now or Never Magazine — the planning, design decisions, and creative challenges involved in building a cannabis culture publication from scratch.

## Key Takeaways

- Creating the magazine required balancing journalistic depth with world-class visual design
- Every chapter was crafted to reflect the unique personality of each interviewee
- The author chose to publish in English to reach a global audience
- Editorial quality and attention to detail were prioritized at every stage
- The goal was to share knowledge and perspectives on cannabis with the broader public

## The Process

At first, I never imagined that creating a magazine would be so complex and challenging. Only after diving into the process, step by step, did I realize that success required more than just "doing the work." It meant "thinking through every detail," from advance planning to on-the-spot decisions at each stage.

Every step of the process involves careful attention to "details" and "steps" to ensure each section moves towards its goal with clarity. My main objective was to ensure that readers gain "knowledge" from each feature and feel the unique style and identity of each interviewee.

## Design and Vision

I placed particular emphasis on "design" and "visuals," aiming for a world-class look. To make the work more accessible globally, I decided to publish in English, believing that "content," "visuals," and "language" are key to reaching a wider audience.

The goal wasn't just to reach a niche group, but to spread "knowledge, understanding, and a perspective on cannabis" to the broader public.

## Read More in the Magazine

The full editorial journey — including the design process, visual decisions, and behind-the-scenes photography — is documented across all six chapters of Issue 1.`,
    contentTh: `ในช่วงเริ่มต้น ผมไม่เคยคาดคิดมาก่อนเลยว่า "การทำแมกกาซีน" จะเป็นงานที่ซับซ้อนและท้าทายได้ถึงเพียงนี้ จนกระทั่งได้ลงมือทำจริง ทีละขั้น ทีละวัน ผมจึงค่อย ๆ เรียนรู้ว่า หากต้องการให้แมกกาซีนฉบับนี้สำเร็จตามที่ตั้งใจไว้ ไม่ใช่เพียงแค่ "ลงมือทำ" เท่านั้น แต่ต้อง "คิดให้รอบด้าน" ทั้งในมิติของการวางแผนล่วงหน้า และการตัดสินใจเฉพาะหน้าในทุกช่วงจังหวะของการทำงาน

ทุกกระบวนการล้วนเต็มไปด้วย "ขั้นตอน" และ "รายละเอียด" ที่ต้องใส่ใจ เพื่อขับเคลื่อนให้แต่ละส่วนไปถึงเป้าหมายอย่างมีทิศทาง หนึ่งในเป้าหมายหลักของผมคือ อยากให้ผู้อ่านทุกคนได้รับ "ความรู้" จากแต่ละสกู๊ปและสัมผัสได้ถึงเอกลักษณ์เฉพาะตัวของแต่ละคอลัมน์ — ที่สะท้อน "ตัวตน" และ "สไตล์" ของพี่ ๆ ผู้ให้สัมภาษณ์ในแบบของพวกเขาเอง

ผมอยากให้ทุกหน้ามีความสวยงาม ดู World-Class และเพื่อให้ผลงานมีมิติในระดับสากล ผมจึงเลือกจัดทำในรูปแบบภาษาอังกฤษ เพราะผมเชื่อว่า "เนื้อหา" "งานภาพ" และ "ภาษา" ล้วนเป็นกุญแจสำคัญที่จะเปิดประตูให้ผู้คนจากหลากหลายกลุ่มสามารถเข้าถึงได้มากขึ้น

ไม่เพียงจำกัดอยู่ในกลุ่มเฉพาะทางเท่านั้น แต่ยังสามารถส่งต่อ "ความรู้ ความเข้าใจ และมุมมองที่สวยงามเกี่ยวกับกัญชา" ไปสู่สังคมวงกว้างได้อย่างแท้จริง`,
    readMoreColor: "#FFC107",
    gradientFrom: "#E65100",
    gradientTo: "#E65100",
    gradientMid: "#E65100",
    glowColor: "#FFC107",
    tag: "Latest"
  },
  {
    id: "3",
    slug: "through-the-lens",
    title: "Through the Lens",
    titleTh: "ผ่านเลนส์",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "We begin by capturing every light, shadow, and fiber of the cannabis. Painting stories that cannot simply be told. This is the beginning of NowOrNever Magazine—a space for knowledge, creativity, and experience.",
    descriptionTh: "เราเริ่มต้นด้วยการจับทุกแสง เงา และเส้นใยของกัญชา ถ่ายทอดเรื่องราวที่คำพูดไม่อาจอธิบายได้ นี่คือจุดเริ่มต้นของ NowOrNever Magazine—พื้นที่สำหรับความรู้ ความคิดสร้างสรรค์ และประสบการณ์",
    heroImage: "/4.Through the lens.webp",
    cardImage: "/4.Through the lens.webp",
    content: `This article explores how photography became the foundation of Now or Never Magazine — the process of capturing Thailand's cannabis culture through a lens, from botanical detail to human portraits.

## Key Takeaways

- Photography is the central storytelling tool of Now or Never Magazine
- The author's experience as both a grower and photographer informs every shot
- All images were captured on location during real interviews and fieldwork
- The visual approach bridges science and art
- No stock photography was used — every image is original

## Behind the Camera

We begin by capturing every light, shadow, and fiber of the cannabis.

Painting stories that cannot simply be told.

Next comes the scenery.

Arranging the buds, and the scenery, to express with not words, but pictures.

## The Dual Perspective

Then, the knowledge as both a budtender and a planter:

Bridging science and art, every prep, every care, every moment of resilience.

And every emotion within.

## What Now or Never Represents

This is the beginning of Now or Never Magazine.

A space for knowledge, creativity, and experience.

The stories, knowledge, and art, waiting for the readers to gaze upon.

Each page's emotions, waiting to be unraveled.

## Read More in the Magazine

The complete photo essays — with full-page prints and behind-the-scenes commentary — are featured throughout Issue 1.`,
    contentTh: `ผมเริ่มต้นด้วยเลนส์กล้อง

จับทุกแสง เงา และเส้นใยของดอกกัญชา

ถ่ายทอดเรื่องราวที่คำพูดไม่อาจอธิบายได้

ต่อมาผมออกแบบกราฟิก

จัดวางดอกไม้และองค์ประกอบให้สื่อสารด้วยภาพ

การเรียนรู้ศาสตร์ของบัดเทนเดอร์และการปลูกต้นไม้

ทำให้ผมเข้าใจความเชื่อมโยงของศาสตร์และศิลป์

ทุกการจัดเตรียมและดูแล ล้วนต้องมีความเอาใจใส่ ความอดทนและความรู้สึกจากภายใน

นี่คือจุดขับเคลื่อนของ Nowornever Magazine

พื้นที่ที่รวบรวมความรู้ ความคิดสร้างสรรค์ และประสบการณ์เข้าด้วยกัน

ให้ผู้อ่านได้สัมผัสเรื่องราว ข้อมูล และกราฟิกที่เป็นศิลปะ

พร้อมแรงบันดาลใจในทุกหน้า

—

ติดตามเว็บไซต์สำหรับการจองเล่มได้เร็วๆนี้`,
    readMoreColor: "#F44336",
    gradientFrom: "#B71C1C",
    gradientTo: "#B71C1C",
    gradientMid: "#B71C1C",
    glowColor: "#F44336",
    tag: "Latest"
  },
  {
    id: "4",
    slug: "the-beginning",
    title: "The Beginning",
    titleTh: "จุดเริ่มต้น",
    subtitle: "Now or Never 1st",
    subtitleTh: "Now or Never 1st",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "The beginning of the journey was simple. I wanted to create a book—not just as a published work, but as a record of many different journeys converging into one place: the magazine.",
    descriptionTh: "การเริ่มต้นของเส้นทางนั้นเรียบง่าย ผมอยากสร้างหนังสือ—ไม่ใช่แค่สิ่งพิมพ์ แต่เป็นบันทึกของเส้นทางที่หลากหลายมาบรรจบกันที่หนึ่ง: นิตยสาร",
    heroImage: "/3.The beginging.webp",
    cardImage: "/3.The beginging.webp",
    content: `This article tells the origin story of Now or Never Magazine — how a desire to document Thailand's cannabis culture evolved into a six-chapter publication built from months of fieldwork across Bangkok and southern Thailand.

## Key Takeaways

- The magazine started as a desire to record diverse cannabis culture journeys in one place
- Research involved traveling across Thailand gathering stories, perspectives, and visual material
- Issue 1 is divided into six chapters, each with its own editorial voice and visual style
- The editorial philosophy balances structure with creative freedom
- The magazine is designed as a gateway to a larger journey for each reader

## The Spark

The beginning of the journey was simple. I wanted to create a book — not just as a published work, but as a record of many different journeys converging into one place: the magazine.

I have traveled through many paths, places, perspectives, and sources of information. Each of them became a waypoint on a compass, guiding me in how to shape this magazine.

## Six Chapters

In the end, I decided to divide the contents into six chapters. Each has its own flavor and style — no strict rules, just pages filled with soul and passion. The goal was to ensure the chapters balance each other, like sailing: sometimes you travel with the wind, sometimes you row. But in the end, you move forward toward your destination.

## An Invitation

Now or Never 1st is not just a magazine. It's a gateway to a journey — one that may feel familiar or completely new to each reader.

Whoever joins this journey will be able to feel the sincerity in every memory shared.

This is our journey. And soon, it will be your turn to set sail.

## Read More in the Magazine

All six chapters of Issue 1 are available in print — each one a unique exploration of Thailand's cannabis culture.`,
    contentTh: `การเดินทางครั้งนี้เริ่มต้นด้วยความตั้งใจง่าย ๆ — อยากสร้างหนังสือที่ไม่ได้เป็นเพียงสิ่งพิมพ์ แต่เป็นเหมือนบันทึกเส้นทางของความคิด และภาพจำที่เราเลือกหยิบมาเล่า

ผมออกเดินทางเพื่อรวบรวมเรื่องราวมากมาย หลากหลายที่ หลากหลายมุมมอง ทั้งข้อมูลและภาพ ซึ่งได้ทำหน้าที่แทนถ้อยคำ เหมือนเป็นเข็มทิศเล็ก ๆ ที่ช่วยชี้ทางว่าหนังสือของเราควรจะมี "น้ำเสียง" แบบไหน

ผมเลือกสะท้อนเรื่องราวออกมาเป็น 6 บท แต่ละบทล้วนมีอิสระ ไม่ถูกจำกัดด้วยกฎตายตัว ถ่ายทอดผ่านถ้อยคำที่หนักแน่น ทรงพลัง และผ่านภาพที่เต็มไปด้วยจิตวิญญาณ เคลื่อนไปด้วยกันอย่างสมดุล เหมือนการแล่นเรือที่บางครั้งใช้ลม บางครั้งใช้แรงพาย แต่ยังมุ่งหน้าไปข้างหน้าอย่างมั่นคง

Now or Never 1st จึงไม่ได้เป็นเพียงการเปิดเล่มใหม่ แต่คือการเปิดประตูสู่การเดินทางครั้งใหม่ของเราทุกคน ใครที่ได้ร่วมเดินทางจะได้เห็นทั้งภาพและถ้อยคำที่ถูกเก็บบันทึกไว้อย่างตั้งใจ

นี่คือการออกเรือ ที่ไม่ช้าไม่นานจะลอยมาถึงมือคุณ`,
    readMoreColor: "#9C27B0",
    gradientFrom: "#4A148C",
    gradientTo: "#4A148C",
    gradientMid: "#4A148C",
    glowColor: "#9C27B0",
    tag: "Latest"
  },
  {
    id: "5",
    slug: "the-journey-under-the-waves",
    title: "The Journey Under the Waves",
    titleTh: "การเดินทางใต้ผืนน้ำ",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "It all started around month 6 or 8 of 2024. By that time, cannabis had been legal for almost two years. Then, suddenly, news started circulating that it might be outlawed again.",
    descriptionTh: "มันเริ่มต้นขึ้นในช่วงเดือน 7-8 ของปี 2567 ในตอนนั้นกัญชาเปิดเสรีในไทยมาประมาณเกือบ 2 ปี และเกิดกระแสของกัญชาที่จะกำลังจะกลับไปผิดกฎหมายอีกครั้งนึง",
    heroImage: "/2.Journey under the waves.webp",
    cardImage: "/2.Journey under the waves.webp",
    content: `This article is a first-person account from inside Thailand's 2024 cannabis protests — the demonstrations that erupted across Bangkok when the government announced plans to re-criminalize recreational cannabis, two years after the landmark 2022 decriminalization.

## Key Takeaways

- In mid-2024, Thailand's government signaled plans to re-criminalize recreational cannabis
- Protesters from across Thailand gathered in Bangkok to oppose the proposed ban
- The author attended the protests to interview participants and document the movement
- The experience revealed the depth of Thailand's cannabis community and culture
- The protests directly inspired the creation of Now or Never Magazine

## What Happened

It all started around month 6 or 8 of 2024. By that time, cannabis had been legal for almost two years. Then, suddenly, news started circulating that it might be outlawed again. When people caught wind of that, they came together — north, south, east, and west — to protest against the government's decision to potentially criminalize cannabis once more.

## What I Found

I went to that protest planning to interview people and hear their thoughts on cannabis. But once I got there, I ended up learning way more than I expected. I didn't just learn about cannabis itself — I discovered the rich culture around it, the communities built through it, and how much people have benefited from its legalization.

## The Birth of the Magazine

That experience opened my eyes. I came across so many stories, facts, and perspectives that inspired me to create something — a media platform to share helpful information and showcase the beauty of cannabis culture. That's how my magazine, "Now or Never," was born. I chose the name because I realized — if I don't do it now, then when?

## Read More in the Magazine

The full story of the protests — including interviews with participants and on-the-ground photography — is documented in Issue 1.`,
    contentTh: `การเดินทางใต้ผืนน้ำที่ไร้ขอบเขต

มันมาจาก ช่วงเดือน 7-8 ของปี 2567 ในตอนนั้นกัญชาเปิดเสรีในไทย มาประมาณ เกือบ 2 ปี และเกิดกระแสของกัญชา ที่จะกำลังจะกลับไปผิดกฎหมายอีกครั้งนึง ทำให้มีประชาชนและผู้คน สายนี้มากมาย จากเหนือใต้ ออก ตก ไปเข้าร่วมม้อป ในการแสดงจุดยืนทางสังคมต่างๆ ภายในวันนั้น ผมเดินทางไปด้วยจุดประสงค์ ในการอยากแสดงออกทางสังคม และอยากเห็น แนวทางความเป็นไปของพืชชนิดนี้ต่อไปสำหรับแนวทางในอนาคต. แต่พอได้ไปถึงสถานที่จริง และได้พบกับพี่ๆหลายๆท่าน ที่มีความเชื่อ และรวมถึงพิธีกรที่เผยแพร่ความรู้และข้อมูลจริง มันทำให้ได้เห็นอะไรหลายอย่าง ในมิติของพืชกัญชามากขึ้น และเป็นแรงกระตุ้น เกิด แรงบันดาลใจ และไอเดียที่อยากทำสื่อ เพื่อนำเสนอ ความสวยงามบนความเป็นจริง ที่เกิดขึ้น ผ่านมุมมองของตัวผม และเป็นที่มาของ ชื่อ Now or never magazine 1 st เพราะถ้าไม่ทำตั้งแต่ตอนนี้ ก็ไม่รู้จะมีโอกาสไหนได้ทำมันอีกไหม โปรดติดตามตอนต่อไป....`,
    readMoreColor: "#00BCD4",
    gradientFrom: "#006064",
    gradientTo: "#006064",
    gradientMid: "#006064",
    glowColor: "#00BCD4",
    tag: "Latest"
  },
  {
    id: "6",
    slug: "the-green-awakening",
    title: "The Green Awakening",
    titleTh: "การตื่นรู้สีเขียว",
    date: "November 2024",
    datePublished: "2024-11-01",
    dateModified: "2026-05-23",
    description: "The interviewing journey really opened me up to various perspectives. Each lesson I learned taught me about tenacity and resilience. It allowed me to reflect on conflicts in life—whether they stem from society, the law, or other factors.",
    descriptionTh: "การเดินทางไปสัมภาษณ์พี่ ๆ หลายท่าน เหมือนเป็นการเปิดประตูสู่ความเข้าใจในมิติใหม่ ๆ ให้กับผม ทุกมุมมองที่ได้รับล้วนเป็นบทเรียนแห่งความอดทน สะท้อนถึงการต่อสู้ที่ไม่เคยยอมแพ้ต่ออุปสรรค",
    heroImage: "/1.The Green awakening.webp",
    cardImage: "/1.The Green awakening.webp",
    content: `This article reflects on what the author learned from interviewing Thailand's cannabis community — the resilience of growers and advocates, the cultural knowledge they carry, and how their stories changed his understanding of the plant.

## Key Takeaways

- The interview process revealed perspectives the author had not anticipated
- Each conversation taught lessons about tenacity, resilience, and cultural preservation
- Thailand's cannabis community has navigated legal and social conflicts for decades
- The plant's value extends beyond commerce into culture, medicine, and community
- The Green Awakening refers to both a cultural moment and a personal transformation

## Reflections

The interviewing journey really opened me up to various perspectives. Each lesson I learned taught me about tenacity and resilience. It allowed me to reflect on conflicts in life — whether they stem from society, the law, or other factors. These experiences have helped me recognize the true value of this plant, and I want to share that with others, so they can experience its beauty for themselves.

## Read More in the Magazine

The complete interviews — with full portraits, quotes, and the author's commentary — are featured across all six chapters of Issue 1.`,
    contentTh: `การเดินทางไปสัมภาษณ์พี่ ๆ หลายท่าน เหมือนเป็นการเปิดประตูสู่ความเข้าใจในมิติใหม่ ๆ ให้กับผม ทุกมุมมองที่ได้รับล้วนเป็นบทเรียนแห่งความอดทน สะท้อนถึงการต่อสู้ที่ไม่เคยยอมแพ้ต่ออุปสรรค ไม่ว่าจะเป็นด้านสังคม กฎหมาย หรือปัจจัยอื่น ๆ ตลอดเส้นทางสายนี้ ทำให้ผมได้รับรู้ถึงคุณค่าที่แท้จริงของพืชชนิดนี้ และอยากที่จะถ่ายทอดเรื่องราวเหล่านี้ออกไปเพื่อให้โลกได้เห็น และสัมผัสกับความงดงามที่ได้เบ่งบานขึ้น

ติดตามเว็บไซต์สำหรับการจองเล่มได้เร็วๆนี้`,
    readMoreColor: "#4CAF50",
    gradientFrom: "#1B5E20",
    gradientTo: "#1B5E20",
    gradientMid: "#1B5E20",
    glowColor: "#4CAF50",
    tag: "Latest"
  }
]

export const getArticleById = (id: string): ArticleData | undefined => {
  return articles.find(article => article.id === id)
}

export const getArticleBySlug = (slug: string): ArticleData | undefined => {
  return articles.find(article => article.slug === slug)
}

export const getOtherArticles = (currentId: string, limit: number = 2): ArticleData[] => {
  const currentIndex = articles.findIndex(a => a.id === currentId)
  if (currentIndex === -1) {
    return articles.slice(0, limit)
  }
  const others: ArticleData[] = []
  for (let i = 1; i <= limit; i++) {
    const next = articles[(currentIndex + i) % articles.length]
    if (next && next.id !== currentId) {
      others.push(next)
    }
  }
  return others
}

