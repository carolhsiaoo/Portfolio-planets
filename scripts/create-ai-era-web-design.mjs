import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
});

let keyCounter = 0;
function key() {
  return `k${Date.now()}${keyCounter++}`;
}

function block(text, style = "h2") {
  return {
    _type: "block",
    _key: key(),
    style,
    children: [{ _type: "span", _key: key(), text, marks: [] }],
    markDefs: [],
  };
}

function paragraph(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  const children = parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return {
        _type: "span",
        _key: key(),
        text: part.slice(2, -2),
        marks: ["strong"],
      };
    }
    return { _type: "span", _key: key(), text: part, marks: [] };
  });
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    children,
    markDefs: [],
  };
}

function blockquote(text) {
  const b = paragraph(text);
  b.style = "blockquote";
  return b;
}

function divider() {
  return {
    _type: "divider",
    _key: key(),
    style: "default",
  };
}

const SLUG = "why-your-website-needs-design-in-the-ai-era";

const post = {
  _type: "post",
  slug: { _type: "slug", current: SLUG },
  publishedAt: new Date().toISOString(),

  // ─── Traditional Chinese ───
  title_zhTw: "在 AI 普及的時代，你的網站更需要設計？",
  excerpt_zhTw:
    "現在人人都能用 AI 或套版拼出一個「還不錯」的網站，那為什麼還需要客製化設計？因為當網路充滿長相雷同的數位複製品，唯有融入品牌靈魂與流暢動態的網頁，才能在滑過的三秒內讓人驚艷、建立信任，並把你的名字烙印在腦海裡。",
  body_zhTw: [
    block("當「及格的網站」滿街跑，你的品牌靠什麼被記住？"),
    paragraph(
      "現在任何人用 AI 工具下幾句 prompt，或是花幾十塊買個現成套版，幾分鐘內就能拼出一個還算好看的網頁。"
    ),
    paragraph(
      "既然自己架網站門檻變得這麼低，為什麼還需要特別找設計師與創意開發者（Creative Developer）從頭雕琢？"
    ),
    paragraph(
      "正是因為誰都能做出「還不錯」的網站，網路上才充斥著大量長相雷同的數位複製品。"
    ),
    paragraph(
      "網站是潛在客戶認識你品牌的第一前線。在這個注意力只有三秒的時代，一個套版及格的網站只能證明你的存在；而一個經過精心設計、融入品牌靈魂與流暢互動的客製化網頁，**才能讓人在滑過的瞬間產生驚艷、建立信任**，並把你的名字深深烙印在腦海裡。"
    ),

    divider(),
    block("為什麼不用套版？客製化為品牌帶來的 3 大核心優勢"),
    paragraph(
      "現在很多現成範本（Template）也很好看，為什麼不直接套用就好？"
    ),
    block("1. 打造獨一無二的辨識度", "h3"),
    paragraph(
      "套版網站再漂亮，也意味著全球可能有成千上萬個品牌正跟你用著同一套字體、同一種排版結構、同一種按鈕樣式。當你和競爭對手的網站看起來就像雙胞胎，潛在客戶該如何分辨你的獨特價值？**客製化設計能精準提煉你的品牌基因**，讓你在第一眼就與平庸拉開距離。"
    ),
    block("2. 提升停留時間與轉換率", "h3"),
    paragraph(
      "套版網站的互動與版型通常千篇一律，讀者的大腦會快速滑過那些看似熟悉的區塊，因而忽略了你精心撰寫的產品細節。客製化的空間編排能帶來視覺新鮮感，抓住使用者的目光，**讓他們願意多停留一分鐘、多讀一段你的故事**。"
    ),
    block("3. 用高級感撐起品牌價值", "h3"),
    paragraph(
      "如果你的品牌主打高質感、客製服務或高客單價產品，廉價的套版結構往往會拉低客戶對你產品的心理預期。如同高級精品店會精心設計空間動線與燈光，一個經過細緻打磨、轉場自然的客製化網頁，**能無形中散發出高奢與專業的氣場**，讓客戶深信你的服務同樣值得這個價格。"
    ),

    divider(),
    block("動態不是裝飾，而是最強的商業武器"),
    paragraph(
      "客製化網頁上的動態效果與互動，到底能為商業帶來什麼實質幫助？"
    ),
    block("1. 引導使用者完成關鍵動作", "h3"),
    paragraph(
      "動畫就像網站的導演，當使用者滾動網頁時，元素在最恰當的時間點優雅進場，自然而然地引導視線聚焦在最重要的核心賣點，**順理成章地促使他們點擊「立即預約」、「聯絡我們」或「結帳購買」**這些關鍵按鈕。"
    ),
    block("2. 引發社群自主傳播與口碑效應", "h3"),
    paragraph(
      "你一定聽過朋友這樣推薦："
    ),
    blockquote("欸，你有看過那家店的網站嗎？做得超級酷！"),
    paragraph(
      "一個帶有驚喜感、宛如數位藝術品的網站，本身就是最強的行銷素材，**能讓使用者忍不住主動截圖、轉發分享**，為你帶來免費且高信任度的口碑流量。"
    ),
    block("3. 無形中建立強大的專業信任感", "h3"),
    paragraph(
      "魔鬼藏在細節裡。當客戶看到一個網站從載入、滾動到點擊都絲滑無比，他們會直覺地投射信任："
    ),
    blockquote(
      "這家公司連網頁都做得這麼講究，他們的產品與服務品質絕對差不到哪裡去。"
    ),

    divider(),
    block("什麼樣的動態，才是真正幫品牌加分的好動態？"),
    paragraph(
      "動態不是越多越好，更不是把所有酷炫特效通通塞進網頁裡！真正頂級的動態設計，講求的是**克制與平衡**："
    ),
    block("1. 契合品牌性格與節奏", "h3"),
    paragraph(
      "動態決定了網頁的「語氣」。一個活潑新潮的街頭品牌，適合節奏明快、帶有彈性（Spring）的俐落反饋；而一個講求沉穩的高級珠寶或諮詢顧問品牌，則需要優雅、緩慢、帶有呼吸感的平滑轉場。"
    ),
    block("2. 內容才是主角，動態是配角", "h3"),
    paragraph(
      "如果使用者關掉網頁後，只記得畫面轉得天花亂墜，卻完全想不起你的品牌是做什麼的、賣什麼產品，那這就是一個失敗的設計。**所有動畫的唯一目的，都是為了輔助資訊吸收**，而不是喧賓奪主。"
    ),
    block("3. 具備無障礙意識（Accessibility）與尊重使用者", "h3"),
    paragraph(
      "網頁美感不應該以犧牲部分使用者的舒適度為代價。"
    ),
    block("支援 prefers-reduced-motion（減少動態偏好）", "h4"),
    paragraph(
      "在醫學與日常中，部分人群患有前庭系統失調（Vestibular Disorders）或動暈症（Motion Sickness），劇烈或大範圍的網頁視差滾動（Parallax）會引發他們的頭暈與噁心。專業的 Creative Dev 會在底層寫好媒體查詢（Media Query），當偵測到使用者在系統設定中開啟了「減少動態效果」時，**網頁會自動關閉大範圍位移與縮放**，轉為溫和的淡入淡出或靜態呈現。"
    ),
    block("兼顧全裝置的極致效能", "h4"),
    paragraph(
      "如果動態在頂規電腦上跑得順，到了低階手機或網路慢的地方就開始掉幀、發燙，那只會徹底摧毀使用者體驗。優秀的動態開發必須在底層運用硬體加速，並做足跨裝置的效能調校，**確保網頁在任何螢幕上都能滿幀運行**。"
    ),

    divider(),
    block("打造專屬的一個數位線上舞台"),
    paragraph(
      "在 AI 能夠快速複製平庸的時代，**美感、情緒與真實的體驗，是人類最無法被演算法取代的資產**。"
    ),
    paragraph(
      "做一個網站很簡單，但打造一個能替品牌說話、能傳遞靈魂溫度、能把訪客轉化為忠實客戶的數位空間，需要設計的感性與工程的理性共同雕琢。"
    ),
    paragraph(
      "如果你正在尋找一個能將品牌精神轉化為沉浸式體驗的合作夥伴，歡迎找我聊聊你的想法！讓我們一起為你的品牌打造一個專屬的數位線上舞台。"
    ),
  ],

  // ─── English ───
  title: "Why Your Website Needs Design in the AI Era",
  excerpt:
    "Anyone can spin up a decent-looking website with a few AI prompts or a cheap template now. So why still pay for custom design? Because when the web is flooded with look-alike digital clones, only a site with your brand's soul and fluid motion can stop someone mid-scroll, earn their trust, and burn your name into their memory.",
  body: [
    block("When \"Good Enough\" Websites Are Everywhere, What Makes Yours Memorable?"),
    paragraph(
      "These days, anyone can type a few prompts into an AI tool, or spend a few bucks on a ready-made template, and stitch together a decent-looking website in minutes."
    ),
    paragraph(
      "So if the barrier to launching a site has dropped this low, why would you still hire a designer and a Creative Developer to craft one from scratch?"
    ),
    paragraph(
      "Precisely because anyone can make a \"pretty good\" website, the internet is now drowning in look-alike digital clones."
    ),
    paragraph(
      "Your website is the front line where potential clients first meet your brand. In an era where attention lasts about three seconds, a passable template only proves you exist. A custom site with your brand's soul and smooth interactions is what **makes someone stop mid-scroll, feel a spark, and start to trust you**, and it burns your name into their memory."
    ),

    divider(),
    block("Why Not Just Use a Template? Three Big Wins of Going Custom"),
    paragraph(
      "Plenty of templates look great these days, so why not just use one?"
    ),
    block("1. A Look That's Unmistakably Yours", "h3"),
    paragraph(
      "No matter how gorgeous a template is, it means thousands of other brands around the world are using the same fonts, the same layout structure, and the same button styles as you. When your site looks like your competitor's twin, how is a potential client supposed to tell your value apart? **Custom design distills your brand's DNA** and sets you apart from the ordinary at first glance."
    ),
    block("2. Longer Time on Page, Higher Conversions", "h3"),
    paragraph(
      "Templates tend to reuse the same interactions and layouts, so a reader's brain skims right past those familiar-looking blocks and misses the product details you worked so hard on. A custom spatial layout brings visual freshness that grabs attention and **makes people willing to stay a minute longer and read one more part of your story**."
    ),
    block("3. Premium Feel That Holds Up Your Brand Value", "h3"),
    paragraph(
      "If your brand is built on quality, bespoke service, or high-ticket products, a cheap template structure quietly lowers what clients expect from you. Just like a luxury boutique carefully designs its flow and lighting, a polished custom site with natural transitions **radiates a sense of luxury and professionalism**, convincing clients your service is worth the price too."
    ),

    divider(),
    block("Motion Isn't Decoration, It's Your Strongest Business Weapon"),
    paragraph(
      "What real business value do motion and interaction on a custom site actually deliver?"
    ),
    block("1. Guiding Users Toward Key Actions", "h3"),
    paragraph(
      "Animation is the director of your website. As users scroll, elements make their entrance at exactly the right moment, naturally guiding the eye to your most important selling points and **nudging people to click \"Book Now,\" \"Contact Us,\" or \"Checkout\"** when the moment is right."
    ),
    block("2. Sparking Word of Mouth That Spreads Itself", "h3"),
    paragraph(
      "You've definitely heard a friend recommend something like this:"
    ),
    blockquote("Hey, have you seen that shop's website? It's insanely cool!"),
    paragraph(
      "A site with a sense of surprise, one that feels like a piece of digital art, is the strongest marketing material on its own. It **makes users want to screenshot it and share it around**, bringing you free, high-trust word-of-mouth traffic."
    ),
    block("3. Quietly Building Deep Professional Trust", "h3"),
    paragraph(
      "The devil is in the details. When a client sees a site that's buttery smooth from load to scroll to click, they instinctively project trust:"
    ),
    blockquote(
      "If a company sweats the details this much on their website, their products and service are surely just as good."
    ),

    divider(),
    block("So What Kind of Motion Actually Helps a Brand?"),
    paragraph(
      "More motion isn't better, and it definitely doesn't mean cramming every flashy effect into one page. Truly great motion design is all about **restraint and balance**:"
    ),
    block("1. Matching the Brand's Personality and Rhythm", "h3"),
    paragraph(
      "Motion sets the \"tone of voice\" for a site. A playful, trend-forward streetwear brand suits snappy, springy feedback, while a calm, high-end jewelry or consulting brand needs elegant, slow, breathing transitions."
    ),
    block("2. Content Is the Star, Motion Is the Supporting Act", "h3"),
    paragraph(
      "If a user closes your site and only remembers dazzling transitions but can't recall what your brand does or sells, that's a failed design. **The only purpose of any animation is to help people absorb information**, never to steal the show."
    ),
    block("3. Accessibility and Respect for the User", "h3"),
    paragraph(
      "Visual beauty should never come at the cost of some users' comfort."
    ),
    block("Support prefers-reduced-motion", "h4"),
    paragraph(
      "In medicine and everyday life, some people live with vestibular disorders or motion sickness, and intense or large-scale parallax scrolling can trigger dizziness and nausea for them. A professional Creative Dev writes the media query at the foundation, so when the system detects that a user has turned on \"reduce motion\" in their settings, **the site automatically switches off large movements and zooms** and falls back to gentle fades or a static presentation."
    ),
    block("Peak Performance Across Every Device", "h4"),
    paragraph(
      "If motion runs smoothly on a top-spec computer but starts dropping frames and overheating on a low-end phone or a slow connection, it completely destroys the experience. Great motion work has to use hardware acceleration under the hood and tune performance across devices, **making sure the site runs at full frame rate on any screen**."
    ),

    divider(),
    block("Build a Digital Stage That's Uniquely Yours"),
    paragraph(
      "In an era where AI can rapidly replicate the mediocre, **taste, emotion, and real experience are the assets humans can least be replaced on by an algorithm**."
    ),
    paragraph(
      "Making a website is easy. But building a digital space that speaks for your brand, carries the warmth of its soul, and turns visitors into loyal clients takes both the sensibility of design and the logic of engineering, carved together."
    ),
    paragraph(
      "If you're looking for a partner who can turn your brand's spirit into an immersive experience, I'd love to hear what you have in mind. Let's work together to create a digital stage made just for your brand."
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_WRITE_TOKEN=your_token node scripts/create-ai-era-web-design.mjs"
    );
    process.exit(1);
  }

  try {
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == "${SLUG}"][0]._id`
    );
    if (!existing) {
      console.log("No existing post found. Creating new one...");
      const result = await client.create(post);
      console.log(`Post created! Document ID: ${result._id}`);
      return;
    }

    const { _type, slug, ...fieldsToUpdate } = post;
    const result = await client.patch(existing).set(fieldsToUpdate).commit();
    console.log(`Post patched successfully! Document ID: ${result._id}`);
  } catch (err) {
    console.error("Failed to create/patch post:", err.message);
    process.exit(1);
  }
}

main();
