import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

let keyCounter = 0;
function key() {
  return `k${Date.now()}${keyCounter++}`;
}

function divider() {
  return {
    _type: "divider",
    _key: key(),
    style: "default",
  };
}

// ──────────────────────────────────────────
// Post 1: framer-motion-vs-gsap
// ──────────────────────────────────────────

// Map: partial text → array of phrases to bold within that text
const post1BoldMapEN = {
  "the two most talked-about animation libraries": [
    "how they think, how they feel to work with, and where each one truly shines",
  ],
  "evolved all the way from the Flash era": [
    "evolved all the way from the Flash era",
    "powerful Timeline control system",
    "all about sensory experience",
  ],
  "The undisputed king of scroll-linked": [
    "undisputed king of scroll-linked animations",
  ],
  "Automatically splits text into individual": [
    "individual characters or lines",
  ],
  "glide smoothly along complex SVG paths": [
    "complex SVG paths",
  ],
  "built specifically for the React ecosystem": [
    "built specifically for the React ecosystem",
    "mount and unmount from the DOM tree",
    "comfortable, natural, and unobtrusive micro-interactions",
  ],
  "It's so powerful that it can feel overwhelming": [
    "entirely shaped by your code craftsmanship and aesthetic taste",
  ],
  "It's extremely beginner-friendly": [
    "extremely beginner-friendly",
    "silky-smooth transition",
    "harder to customize compared to GSAP",
  ],
  "officially maintained GreenSock forum": [
    "officially maintained GreenSock forum",
  ],
  "rides the React wave": [
    "rides the React wave",
  ],
  'like a "breeze."': [
    "invisible, natural, and thoughtful",
  ],
  'like "magic."': [
    "dazzling, breathtaking, and center-stage",
    "elevating the webpage into a full-blown experiential show",
  ],
  "vestibular disorders": [
    "Prefer reduced motion",
  ],
  "built-in useReducedMotion hook": [
    "built-in useReducedMotion hook",
    "one line",
  ],
  "manually write native JavaScript": [
    "more flexible, but also more code",
  ],
  "GSAP has an absolute advantage": [
    "absolute advantage",
    "bypasses React's virtual DOM rendering mechanism",
    "zero stuttering",
  ],
  "deeply bound to React's render loop": [
    "deeply bound to React's render loop",
    "performance bottleneck",
    "better suited for localized UI interactions",
  ],
  "aren't about better or worse": [
    "aren't about better or worse",
    "different tactical positions",
  ],
  "peak visual impact": [
    "peak visual impact",
    "creativity run completely free",
  ],
  "most elegant, effortless way": [
    "most elegant, effortless way",
  ],
};

const post1BoldMapZH = {
  "最常被提及的兩大動畫": [
    "底層邏輯、開發體驗以及適用場景",
  ],
  "從 Flash 時代一路進化過來": [
    "從 Flash 時代一路進化過來",
    "時間軸（Timeline）控制力完美繼承",
    "專門為感官體驗打造的專案",
  ],
  "絕對王者": [
    "絕對王者",
  ],
  "自動拆解為單個字元": [
    "自動拆解為單個字元（Characters）或單行（Lines）",
  ],
  "專門為 React 生態系誕生": [
    "專門為 React 生態系誕生",
    "進入（Mount）」和「離開（Unmount）",
    "舒適、自然且不突兀的微互動",
  ],
  "功能強大到一開始會讓人手足無措": [
    "全憑你的代碼工藝與審美品味",
  ],
  "極其好上手": [
    "極其好上手",
    "絲滑的過渡",
    "難以像 GSAP 那樣高度客製化",
  ],
  "隱形、自然、體貼": [
    "隱形、自然、體貼",
  ],
  "華麗、震撼、主角": [
    "華麗、震撼、主角",
    "把網頁昇華成一場體驗大秀",
  ],
  "減少動態效果": [
    "減少動態效果（Prefer-reduced-motion）",
  ],
  "一鍵判斷使用者的系統設定": [
    "一鍵判斷",
  ],
  "靈活度更高，但代碼量相對較多": [
    "靈活度更高，但代碼量相對較多",
  ],
  "絕對優勢": [
    "絕對優勢",
    "跳過 React 的虛擬 DOM 渲染機制",
    "完全不會卡頓",
  ],
  "深深與 React 的渲染循環": [
    "深深與 React 的渲染循環（Render Loop）綁定",
    "效能的瓶頸",
    "更適合處理局部 UI 的互動",
  ],
  "沒有優劣之分": [
    "沒有優劣之分",
    "「戰術定位」的不同",
  ],
  "極致的視覺張力": [
    "極致的視覺張力",
    "創意不受限",
  ],
  "最優雅、最省力的方式": [
    "最優雅、最省力的方式",
  ],
};

// ──────────────────────────────────────────
// Post 2: creative-website-evolution-and-tech-stack
// ──────────────────────────────────────────

const post2BoldMapEN = {
  "the ecosystem can feel overwhelming": [
    "origins and rise of Creative Websites",
    "tools commonly used to build them",
    "how different tools fit different project scenarios",
  ],
  "felt more like experiencing a story": [
    "more like experiencing a story",
  ],
  "focus on emotional delivery": [
    "emotional delivery",
    "living digital spaces that can resonate with users",
  ],
  "predecessor of today's Creative Websites was Flash": [
    "predecessor of today's Creative Websites was Flash",
  ],
  "shifted toward HTML5 and CSS": [
    "interactivity also became more limited",
  ],
  "GSAP, originally a Flash animation engine, transitioned to JavaScript": [
    "transitioned to JavaScript",
  ],
  "giving browsers direct access to the GPU": [
    "direct access to the GPU",
    "fundamentally changed what websites were capable of",
  ],
  "manipulate thousands of particles": [
    "manipulate thousands of particles, calculate real time shaders and lighting, and even build entire 3D worlds directly inside the browser",
  ],
  "even an average smartphone is more powerful": [
    "even an average smartphone is more powerful than many desktop computers during Flash's peak era",
  ],
  "miniature cinema in your pocket": [
    "miniature cinema in your pocket",
  ],
  "elevate websites into recognized forms of digital art": [
    "recognized forms of digital art",
  ],
  "brand prestige": [
    "significant brand value and global exposure",
  ],
  "HTML and CSS to define structure": [
    "structure and visual styling",
  ],
  "JavaScript is added, websites become interactive and data driven": [
    "interactive and data driven",
  ],
  "frameworks sit on top of that foundation": [
    "how websites load, manage data, and handle page transitions",
  ],
  "plain HTML, CSS, and JavaScript are often sufficient": [
    "plain HTML, CSS, and JavaScript are often sufficient",
  ],
  "scalability and maintainability": [
    "scalability and maintainability",
  ],
  "Astro is a strong choice": [
    "designed specifically for content focused websites",
  ],
  "page transitions become extremely important": [
    "page transitions become extremely important",
  ],
  "Larger teams often prefer React": [
    "maintainable architecture and component based organization",
  ],
  "it's time to bring the website to life": [
    "bring the website to life",
  ],
  "GSAP has been around for a long time": [
    "highly complex and continuous animation sequences",
    "works with almost any framework",
  ],
  "depends on React": [
    "focuses more on micro interactions",
    "smooth and polished interactions without feeling overwhelming",
  ],
  "WebGL gives browsers direct access to GPU rendering power": [
    "completely removing many of the visual limitations",
  ],
  "lower level graphics programming concepts": [
    "significantly harder to learn",
  ],
  "Three.js is considered the industry standard foundation": [
    "industry standard foundation",
  ],
  "React Three Fiber helps transform": [
    "transform complex 3D scenes into manageable React components",
  ],
  "assembling Lego blocks": [
    "almost like assembling Lego blocks",
  ],
  "no single best technical stack": [
    "no single best technical stack",
    "always depends on the type of experience you want to create",
  ],
  "continuous learning is simply part of the process": [
    "continuous learning is simply part of the process",
  ],
};

const post2BoldMapZH = {
  "工具和框架很多很雜": [
    "Creative Website 的來源和興起",
    "會需要甚麼工具開發",
    "不同專案場景下工具的搭配方式",
  ],
  "好像體驗了一個故事": [
    "好像體驗了一個故事",
  ],
  "情緒的傳遞": [
    "情緒的傳遞",
    "具備生命力、能與使用者產生共鳴的數位空間",
  ],
  "Flash 在 2000~2010 年盛行": [
    "GSAP 轉向支援 Javascript",
  ],
  "打開 GPU（顯示卡）大門的鑰匙": [
    "打開 GPU（顯示卡）大門的鑰匙",
    "進化成了數位造物主",
  ],
  "沉浸式體驗不再是高階電腦的專利": [
    "沉浸式體驗不再是高階電腦的專利",
  ],
  "跑動一個微型電影院的算力": [
    "跑動一個微型電影院的算力",
  ],
  "網站昇華成藝術品": [
    "網站昇華成藝術品",
  ],
  "品牌的榮譽勳章": [
    "品牌的榮譽勳章",
    "極高的品牌溢價與全球性的曝光",
  ],
  "沒有資料傳輸": [
    "靜態網頁的意思就是沒有資料傳輸",
  ],
  "資料變得可傳輸": [
    "資料變得可傳輸",
  ],
  "不同框架都有各自最適合運用的場景": [
    "不同框架都有各自最適合運用的場景",
  ],
  "不需要考慮複雜的組件維護": [
    "不需要考慮複雜的組件維護",
  ],
  "東西好找好管理": [
    "東西好找好管理",
  ],
  "為了內容導向網站所設計": [
    "為了內容導向網站所設計",
  ],
  "網頁間的轉場就會很重要": [
    "網頁間的轉場就會很重要",
  ],
  "大型團隊會更趨向用 React": [
    "好管理，程式碼架構得很整齊",
  ],
  "讓網站活起來的工具包來了": [
    "讓網站活起來",
  ],
  "極其複雜且具連續性的動畫劇本": [
    "極其複雜且具連續性的動畫劇本",
    "可以基本上跟任何框架搭配",
  ],
  "恰到好處不會讓人覺得煩但是又絲滑": [
    "恰到好處不會讓人覺得煩但是又絲滑",
  ],
  "徹底解放了網頁的視覺瓶頸": [
    "徹底解放了網頁的視覺瓶頸",
  ],
  "比較難上手": [
    "比較難上手",
  ],
  "業界公認的基石": [
    "業界公認的基石",
  ],
  "像搭積木一樣": [
    "像搭積木一樣",
  ],
  "沒有最好，只有比較適合": [
    "沒有最好，只有比較適合",
  ],
  "需要不斷學習": [
    "需要不斷學習",
  ],
};

// ──────────────────────────────────────────
// Engine
// ──────────────────────────────────────────

function applyBoldToBlock(block, boldMap) {
  if (block._type !== "block" || !block.children) return block;
  if (block.style && block.style.startsWith("h")) return block;

  const fullText = block.children.map((c) => c.text || "").join("");

  // Find which map entry matches this paragraph
  let phrasesToBold = [];
  for (const [matchKey, phrases] of Object.entries(boldMap)) {
    if (fullText.includes(matchKey)) {
      phrasesToBold.push(...phrases);
    }
  }
  if (phrasesToBold.length === 0) return block;

  // Deduplicate and sort longest first
  phrasesToBold = [...new Set(phrasesToBold)];
  phrasesToBold.sort((a, b) => b.length - a.length);

  const escaped = phrasesToBold.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "g");

  const newChildren = [];
  for (const child of block.children) {
    if (child._type !== "span" || (child.marks && child.marks.length > 0)) {
      newChildren.push({ ...child, _key: key() });
      continue;
    }
    const text = child.text || "";
    const parts = text.split(regex);
    for (const part of parts) {
      if (!part) continue;
      if (phrasesToBold.includes(part)) {
        newChildren.push({
          _type: "span",
          _key: key(),
          text: part,
          marks: ["strong"],
        });
      } else {
        newChildren.push({
          _type: "span",
          _key: key(),
          text: part,
          marks: [],
        });
      }
    }
  }

  return { ...block, children: newChildren };
}

function addDividersAndBold(body, boldMap, mainHeadingStyle) {
  const result = [];
  let isFirst = true;

  for (const block of body) {
    // Skip existing dividers
    if (block._type === "divider") continue;

    // Add divider before main section headings (skip first)
    if (block._type === "block" && block.style === mainHeadingStyle) {
      if (isFirst) {
        isFirst = false;
      } else {
        result.push(divider());
      }
      result.push(block);
      continue;
    }

    result.push(applyBoldToBlock(block, boldMap));
  }

  return result;
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Error: SANITY_TOKEN env var is required.");
    process.exit(1);
  }

  try {
    // Post 1
    const post1 = await client.fetch(
      `*[_type == "post" && slug.current == "framer-motion-vs-gsap"][0]`
    );
    if (post1) {
      const newBody = addDividersAndBold(post1.body, post1BoldMapEN, "h2");
      const newBodyZh = addDividersAndBold(
        post1.body_zhTw,
        post1BoldMapZH,
        "h2"
      );
      await client
        .patch(post1._id)
        .set({ body: newBody, body_zhTw: newBodyZh })
        .commit();
      console.log("Post 1 (framer-motion-vs-gsap) patched!");
    }

    // Post 2
    const post2 = await client.fetch(
      `*[_type == "post" && slug.current == "creative-website-evolution-and-tech-stack"][0]`
    );
    if (post2) {
      const newBody = addDividersAndBold(post2.body, post2BoldMapEN, "h3");
      const newBodyZh = addDividersAndBold(
        post2.body_zhTw,
        post2BoldMapZH,
        "h3"
      );
      await client
        .patch(post2._id)
        .set({ body: newBody, body_zhTw: newBodyZh })
        .commit();
      console.log("Post 2 (creative-website-evolution-and-tech-stack) patched!");
    }
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
}

main();
