import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Pass via: SANITY_TOKEN=xxx node scripts/create-post.mjs
});

// Helper functions for Portable Text
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

function bullet(text) {
  const b = paragraph(text);
  b.listItem = "bullet";
  b.level = 1;
  return b;
}

const post = {
  _type: "post",
  slug: { _type: "slug", current: "framer-motion-vs-gsap" },
  publishedAt: new Date().toISOString(),

  // English
  title: "The Interplay of Breeze and Magic: A Hands-On Showdown Between GSAP and Framer Motion",
  excerpt:
    "In the universe of web development, the two most talked-about animation libraries for bringing static pages to life are Framer Motion and GSAP. After building with both, here are my observations on their underlying philosophies, developer experience, and ideal use cases.",
  body: [
    block("What Are Framer Motion and GSAP?"),
    paragraph(
      "In the universe of web development, the two most talked-about animation libraries for bringing static pages to life are Framer Motion and GSAP. After building with both and comparing them side by side, I picked up some interesting observations about how they think, how they feel to work with, and where each one truly shines. I wanted to write it all down in this post."
    ),

    block("How Were They Created?"),

    paragraph(
      "GSAP (GreenSock Animation Platform) actually evolved all the way from the Flash era. Because of that history, it comes with an incredibly rich pool of learning resources and a strong, loyal community. When Flash left the stage, GSAP pivoted to JavaScript and carried over its powerful Timeline control system perfectly. GSAP can do virtually anything, which makes it a natural fit for projects that are all about sensory experience: single-page brand marketing sites, interactive digital ads, 3D immersive showrooms, you name it. Some of GSAP's signature superpowers include:"
    ),
    bullet("ScrollTrigger: The undisputed king of scroll-linked animations. It gives you precise control over pinning and scrubbing objects at specific scroll positions."),
    bullet("SplitText: Automatically splits text into individual characters or lines, making it effortless to create dramatic text fly-in or typewriter effects."),
    bullet("MotionPathPlugin: Lets elements glide smoothly along complex SVG paths like waves, circles, or custom curves."),

    paragraph(
      "Motion (formerly Framer Motion) is a more modern library built specifically for the React ecosystem. React is commonly used in complex projects involving large team collaboration (think web apps and SaaS products). Framer Motion was created to solve a very specific pain point: handling animations when React components mount and unmount from the DOM tree. It excels at providing comfortable, natural, and unobtrusive micro-interactions within the details of functional products."
    ),

    block("The Developer Experience Difference"),
    block("1. Learning Curve", "h3"),

    paragraph(
      "GSAP (Imperative): It's so powerful that it can feel overwhelming at first. It won't assume any default animations for you. You need a clear understanding of timelines, garbage collection, and DOM nodes before you can really get going. But once you've got the hang of it, it becomes incredibly precise. The flow, pauses, and reversals of objects are entirely shaped by your code craftsmanship and aesthetic taste."
    ),
    paragraph(
      "Framer Motion (Declarative): It's extremely beginner-friendly. You simply specify an element's starting point (initial) and endpoint (animate), much like writing HTML attributes, and it automatically calculates a silky-smooth transition in between. This pre-paved \"Happy Path\" handles about 80% of UI needs. However, when you need highly intricate, cross-component, precisely sequenced complex animations, you'll find it harder to customize compared to GSAP, and you may get stuck on edge cases."
    ),

    block("2. Community Size", "h3"),
    paragraph(
      "GSAP has been around for a long time and has an officially maintained GreenSock forum where you can find answers from the founder or core developers for virtually any issue you've run into. Learning resources include exhaustive official docs, CreativeCodingClub, and open-source breakdowns from Awwwards winners."
    ),
    paragraph(
      "Framer Motion is younger, but it rides the React wave and enjoys high visibility on GitHub and in frontend communities like the Vercel ecosystem. Learning resources include official Framer examples and rich React UI libraries (like the animation layer of Shadcn/ui)."
    ),

    block("The Sensory Difference in Output"),
    block("1. User Experience Feel", "h3"),
    paragraph(
      "Framer Motion is like a \"breeze.\" It's invisible, natural, and thoughtful. It blends into the details of button clicks, menu slides, and tab transitions. Users won't even realize \"there's an animation here,\" but the entire experience just feels incredibly refined and comfortable."
    ),
    paragraph(
      "GSAP is like \"magic.\" It's dazzling, breathtaking, and center-stage. When users land on a page and follow their mouse or scroll, watching 3D objects rotate and text deconstruct and reassemble, GSAP is the spotlight on stage. It's there to deliver surprise and wonder, elevating the webpage into a full-blown experiential show."
    ),

    block("2. Accessibility & Reduced Motion", "h3"),
    paragraph(
      "Modern web development places strong emphasis on accessibility. Some users with vestibular disorders (dizziness) enable \"Prefer reduced motion\" in their OS settings."
    ),
    paragraph(
      "Framer Motion has a thoughtfully modern approach here. You can use its built-in useReducedMotion hook to detect the user's system preference with one line, automatically switching animations to simple fades or complete stillness when enabled."
    ),
    paragraph(
      "GSAP is equally capable, but it requires developers to manually write native JavaScript using window.matchMedia('(prefers-reduced-motion: reduce)') for conditional checks, wrapped in ScrollTrigger.matchMedia(). It's more flexible, but also more code."
    ),

    block("3. Performance", "h3"),
    paragraph(
      "This is where GSAP has an absolute advantage. GSAP has its own highly optimized ticker (based on requestAnimationFrame) that bypasses React's virtual DOM rendering mechanism and directly modifies low-level DOM attributes or WebGL objects. When you need to simultaneously manipulate thousands of DOM nodes or Canvas particles, GSAP keeps CPU consumption extremely low with zero stuttering."
    ),
    paragraph(
      "Framer Motion has its limits here. Because it's deeply bound to React's render loop, if too many complex components trigger animate simultaneously on the same page, React's re-rendering mechanism can become a performance bottleneck. That makes it better suited for localized UI interactions."
    ),

    block("Conclusion"),
    paragraph(
      "At the end of the day, these two libraries aren't about better or worse. They just have different tactical positions:"
    ),
    bullet(
      "When your project demands peak visual impact, full-page scroll fluidity, or involves 3D/Canvas operations, go with GSAP without hesitation. It lets your creativity run completely free."
    ),
    bullet(
      "When you're using React to build a SaaS or tool platform that prioritizes smooth operations, product polish, and silky micro-interactions, Framer Motion is the most elegant, effortless way to give your users that thoughtful, premium breeze."
    ),
  ],

  // Traditional Chinese
  title_zhTw: "微風與魔法的交織：GSAP 與 Framer Motion 的實戰 PK",
  excerpt_zhTw:
    "在網頁開發的宇宙中，想讓靜態畫面動起來，最常被提及的兩大動畫 Libraries 就是 Framer Motion 與 GSAP。在親自實作並比較這兩者後，我對它們的底層邏輯、開發體驗以及適用場景有一些有趣的觀察。",
  body_zhTw: [
    block("甚麼是 Framer Motion 跟 GSAP?"),
    paragraph(
      "在網頁開發的宇宙中，想讓靜態畫面動起來，最常被提及的兩大動畫 Libraries 就是 Framer Motion 與 GSAP。在親自實作並比較這兩者後，我對它們的底層邏輯、開發體驗以及適用場景有一些有趣的觀察，想透過這篇文章記錄下來。"
    ),

    block("它們是怎麼被發明的？"),

    paragraph(
      "GSAP (GreenSock Animation Platform)：它是從 Flash 時代一路進化過來的。正因如此，它擁有極其豐富的學習資源與強大的社群支撐。當年在 Flash 退出舞台後，GSAP 轉向支援 JavaScript，並將其在 Flash 時強大的時間軸（Timeline）控制力完美繼承。GSAP 幾乎無所不能，因此非常適合應用在專門為感官體驗打造的專案中，例如：一頁式品牌行銷網站、互動式數位廣告、3D 沉浸式展間。GSAP 最具代表性的超能力功能包括："
    ),
    bullet("ScrollTrigger：網頁捲動聯動動畫的絕對王者，能精準控制物件在特定滾動位置的吸附（Pinning）與擦除（Scrubbing）。"),
    bullet("SplitText：能將整段文字自動拆解為單個字元（Characters）或單行（Lines），能輕鬆做出極具張力的文字飛入或打字機效果。"),
    bullet("MotionPathPlugin：讓網頁物件可以沿著複雜的 SVG 路徑（如波浪、圓圈或自訂曲線）滑順地移動。"),

    paragraph(
      "Motion（過去名為 Framer Motion)：相較之下，它是近代專門為 React 生態系誕生的 Library。React 常用於大型團隊協作的複雜專案（如 Web App、SaaS 工具型產品）。Framer Motion 的誕生就是為了解決 React 組件在「進入（Mount）」和「離開（Unmount）」DOM 樹時動畫難以處理的痛點。它非常擅長在功能型產品的細節中，提供舒適、自然且不突兀的微互動。"
    ),

    block("Developer 的開發體感差別"),
    block("1. 學習曲線", "h3"),

    paragraph(
      "GSAP (命令式開發)：功能強大到一開始會讓人手足無措。它不會幫你預設任何理所當然的動畫，你需要對時間軸、記憶體回收、DOM 節點有清晰的想法。但只要你掌握了用法，它就可以便得非常精準。物體的流動、停頓、反轉，全憑你的代碼工藝與審美品味。"
    ),
    paragraph(
      "Framer Motion (聲明式開發)：它極其好上手。你只需要像寫 HTML 屬性一樣，指定物件的起點（initial）與終點（animate），它就會自動幫你計算好中間絲滑的過渡。這條它幫你規劃好的「Happy Path（快樂路徑）」能應付 80% 的 UI 需求。然而，當你需要做非常刁鑽、跨組件、需要精準依序執行的複雜長動畫時，你會發現它難以像 GSAP 那樣高度客製化，容易卡在邊界案例中。"
    ),

    block("2. 社群規模", "h3"),
    paragraph(
      "GSAP：歷史悠久，擁有官方營運的 Greenfield 論壇，幾乎所有你踩過的坑，都能在論壇上找到創辦人或核心開發者的親自解答。教學資源：官方文件極其詳盡、CreativeCodingClub、各大 Awwwards 獲獎者的開源解析。"
    ),
    paragraph(
      "Framer Motion：雖然年輕，但因為乘著 React 的大浪，在 GitHub 和前端社群（如 Vercel 生態系）中也有極高的討論度。教學資源：Framer 官方範例、豐富的 React UI 庫（如 Shadcn/ui 的動畫底層）。"
    ),

    block("呈現效果的感官差別"),
    block("1. 使用者操作體感", "h3"),
    paragraph(
      "Framer Motion 像「微風」：隱形、自然、體貼。它融合在按鈕點擊、選單滑出、分頁切換的細節中。使用者甚至不會意識到「這裡有動畫」，但整個操作過程就是讓他們感到無比的精緻與舒適。"
    ),
    paragraph(
      "GSAP 像「魔法」：華麗、震撼、主角。當使用者進入網頁，跟隨著滑鼠或滾動條，看著 3D 物件旋轉、文字拆解重組。GSAP 是舞台上的焦點，負責帶給使用者驚喜與新奇，把網頁昇華成一場體驗大秀。"
    ),

    block("2. 殘障輔助與動態減損 (Accessibility & Motion Reduced)", "h3"),
    paragraph(
      "現代網頁非常注重無障礙體驗，部分使用者因為前庭系統疾病（暈眩），會在作業系統中開啟「減少動態效果（Prefer-reduced-motion）」。"
    ),
    paragraph(
      "Framer Motion：具有現代化的貼心設計。你可以透過內建的 useReducedMotion Hook，一鍵判斷使用者的系統設定，當偵測到開啟時，自動將動畫切換成單純的淡入淡出（Fade）或完全靜止。"
    ),
    paragraph(
      "GSAP：同樣做得到，但需要開發者自己手動撰寫原生 JavaScript 的 window.matchMedia('(prefers-reduced-motion: reduce)') 來做條件判斷，並在外層包裹 ScrollTrigger.matchMedia()。雖然靈活度更高，但代碼量相對較多。"
    ),

    block("3. 效能表現 (Performance)", "h3"),
    paragraph(
      "GSAP 的絕對優勢：GSAP 擁有獨立的優化高效 Ticker（基於 requestAnimationFrame），它會跳過 React 的虛擬 DOM 渲染機制，直接去修改最底層的 DOM 屬性或 WebGL 物件。當畫面上需要同時操縱數千個 DOM 節點或 Canvas 粒子時，GSAP 的 CPU 消耗極低，完全不會卡頓。"
    ),
    paragraph(
      "Framer Motion 的極限：因為它深深與 React 的渲染循環（Render Loop）綁定，如果同一個頁面有過多複雜的組件同時觸發 animate，React 的重新渲染（Re-render）機制可能會成為效能的瓶頸，因此更適合處理局部 UI 的互動。"
    ),

    block("總結"),
    paragraph(
      "所以說這兩個函式庫沒有優劣之分，只有「戰術定位」的不同："
    ),
    bullet(
      "當你的專案需要追求極致的視覺張力、全網頁滾動流暢度、甚至涉及 3D/Canvas 的操作，可以毫不猶豫選擇 GSAP，它能讓你的創意不受限。"
    ),
    bullet(
      "當正在使用 React 開發一款講求操作體驗、產品細節與絲滑微互動的 SaaS 或工具平台，Framer Motion 能用最優雅、最省力的方式，為用戶吹拂一陣體貼的高級微風。"
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_TOKEN env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_TOKEN=your_token node scripts/create-post.mjs"
    );
    process.exit(1);
  }

  try {
    // Find existing post by slug
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == "framer-motion-vs-gsap"][0]._id`
    );
    if (!existing) {
      console.error("No existing post found with slug 'framer-motion-vs-gsap'. Creating new one...");
      const result = await client.create(post);
      console.log(`Post created! Document ID: ${result._id}`);
      return;
    }

    const { _type, slug, ...fieldsToUpdate } = post;
    const result = await client.patch(existing).set(fieldsToUpdate).commit();
    console.log(`Post patched successfully! Document ID: ${result._id}`);
  } catch (err) {
    console.error("Failed to patch post:", err.message);
    process.exit(1);
  }
}

main();
