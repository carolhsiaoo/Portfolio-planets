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

function numbered(text) {
  const b = paragraph(text);
  b.listItem = "number";
  b.level = 1;
  return b;
}

function divider() {
  return {
    _type: "divider",
    _key: key(),
    style: "default",
  };
}

function codeBlock(code) {
  return {
    _type: "codeBlock",
    _key: key(),
    code,
    language: "javascript",
  };
}

const post = {
  _type: "post",
  slug: { _type: "slug", current: "gsap-practical-guide" },
  publishedAt: new Date().toISOString(),

  // ─── English ───
  title: "The GSAP 80/20 Guide",
  excerpt:
    "When building creative websites, you don't need to learn every API in the docs. Master Timeline and ScrollTrigger and you can pull off most of the stunning effects you see in the wild. But beware: the pitfalls are real.",
  body: [
    // Intro
    block("Introduction"),
    paragraph(
      "When building creative websites, I realized that **you really don't need that many techniques**. Master a handful of core features and you can nail most of the jaw-dropping animations out there, that's the **80/20 rule of web animation**. In this article, I'll walk through GSAP's most essential core feature: **Timeline**, and its most powerful plugin: **ScrollTrigger**. Master these two, and you can recreate the majority of effects you see on sites featured in the GSAP Showcase (gsap.com/showcase), most of them leverage ScrollTrigger, and ScrollTrigger paired with Timeline is the perfect combo."
    ),
    paragraph(
      "However, even though these tools look easy to learn and seem universally applicable, **the hidden pitfalls in real-world projects are no joke**. Below, I've also compiled the traps I've personally fallen into."
    ),

    // Web Animation Principles
    divider(),
    block("The Underlying Principle of Web Animation"),
    paragraph(
      "The vast majority of flashy interactions on the web, when you break them down, are just a game of **value mapping**."
    ),
    paragraph(
      "We take user **input** (time, mouse position, scroll velocity) and convert it into a **0 to 1 value**, then apply that value to an element's visual properties (like transform, opacity, clip-path). In between, we smooth things out with **lerp**, **spring**, or **easing curves** to make the motion feel fluid and natural."
    ),
    block("The Real Pattern", "h3"),
    paragraph(
      "Whether it's scroll-linked animation or mouse-following effects, every top-tier visual follows this underlying loop:"
    ),
    numbered("**Read Input**: mouse, scroll, time"),
    numbered("**Normalize it**: map to a useful 0 to 1 range"),
    numbered("**Apply easing**: lerp, springs, easing curves"),
    numbered("**Move stuff**: transform, opacity, clip-path"),
    paragraph(
      "This principle is implemented through the GSAP features introduced below. Once you grasp it, you can conjure endless variations."
    ),

    // Timeline
    divider(),
    block("Timeline: Use Cases & How It Works"),
    paragraph(
      "To understand Timeline, you first need to know what a **Tween** is. A Tween is the smallest animation unit in GSAP, derived from traditional animation's \"In-between\" (tweening). You declare an object's start or end state, and GSAP's internal **Ticker** automatically fills in all the intermediate values. It controls not just common properties like opacity and scale, but also advanced ones like clip-path (mask clipping) and filter: blur (blur filters)."
    ),
    paragraph(
      "When multiple Tweens are combined, they evolve into a **Timeline**. In the old days, chaining sequential animations meant manually adding different delay values. Tweak one by 0.1 seconds and dozens of lines downstream would collapse. Timeline is an **auto-sequencing container**: just drop Tweens in order and they play one after another. With Timeline parameters like \"-=0.5\" (enter 0.5s early) or \"<\" (start with the previous), you can break free from rigid linear playback and create breathing, natural visuals."
    ),
    block("Code Example", "h3"),
    codeBlock(
      `const tl = gsap.timeline();

tl.to(".hero-title", { y: 0, opacity: 1, duration: 1 })
  .to(".hero-bg-img", { scale: 1 }, "-=0.4")   // Background starts scaling 0.4s before title finishes
  .from(".nav-item", { opacity: 0 }, "<");       // Nav fades in at the exact same moment as background`
    ),
    block("Pitfall Guide", "h3"),
    block("1. Never animate the same property with both GSAP and CSS", "h4"),
    paragraph(
      "When GSAP's Ticker is force-updating an element's style every 16ms, your CSS transition will try to intercept those values. The two systems **fight each other at the browser level**, causing the element to jitter and twitch violently. If an element is controlled by GSAP, **remove any CSS transition on that same property**. Split the properties so each system owns its own, or use GSAP's onComplete callback to hand control back to CSS after the animation finishes."
    ),
    block("2. Properties GSAP shouldn't animate", "h4"),
    paragraph(
      "top, left, margin, width, padding are **layout properties**. Animating them forces the browser to recalculate every element's position (triggering **reflow**), turning smooth animations into choppy stutters with CPU spikes. For position changes, use **x and y** (which map to CSS transform: translate()). Properties without mathematically continuous intermediate values, like switching from display: none to block, or position: absolute to fixed, are physically impossible for GSAP to tween. Use **opacity**, **autoAlpha**, or advanced plugins instead."
    ),

    // ScrollTrigger Viewport
    divider(),
    block("ScrollTrigger Viewport: Use Cases & How It Works"),
    paragraph(
      "This links animations to whether an element has entered the visible viewport, like an automatic door on a webpage: walk past it and it opens; walk away and it closes."
    ),
    paragraph(
      "Imagine two moving containers on your page:"
    ),
    numbered("**The Viewport**: It moves as you scroll and carries two **detection lines**, Viewport Start and Viewport End."),
    numbered("**The Trigger Element**: It's an element on the page, also carrying two **trigger lines**, Element Start and Element End."),
    paragraph(
      "Animation triggering is the moment **these lines cross**. When the viewport's detection line scrolls to a position where it meets the element's trigger line, the animation begins (Start). When their end lines cross, the performance concludes (End)."
    ),
    paragraph(
      "Beyond setting start and end trigger points, **toggleActions** lets you decide whether the animation plays, reverses, or resets when entering, leaving, or re-entering. It defines behaviors for four line-crossing events: **onEnter** (Viewport Start meets Element Start), **onLeave** (Viewport End meets Element End), **onEnterBack** (Viewport End backs into Element End), and **onLeaveBack** (Viewport Start meets Element Start again). If the line concept feels confusing, set **markers: true** to visualize them directly on the page."
    ),
    block("Code Example", "h3"),
    codeBlock(
      `gsap.from(".portfolio-card", {
  y: 50,
  scrollTrigger: {
    trigger: ".portfolio-card",
    start: "top 80%",    // Triggers when element's top hits viewport's 80% mark
    end: "bottom 20%",   // Ends when element's bottom hits viewport's 20% mark
    markers: true,       // Show debug markers on the page
  }
});`
    ),
    block("Pitfall Guide", "h3"),
    block("1. Element's start point is above the page top", "h4"),
    paragraph(
      "For Hero Section elements that need to animate on page load, **don't use ScrollTrigger**. Use a plain gsap.timeline() that fires immediately on load. Only use ScrollTrigger for **elements below the first screen**."
    ),
    block("2. Mobile browser toolbar resizing causes jitter", "h4"),
    paragraph(
      "When scrolling on mobile, the URL bar and bottom toolbar auto-collapse, causing the **viewport height (100vh) to suddenly change**. ScrollTrigger recalculates all detection lines to maintain accuracy, producing visible jumps. Fix: add **ScrollTrigger.config({ ignoreMobileResize: true })** at initialization to tell GSAP to ignore minor height changes from toolbar toggling."
    ),
    block("3. Lazy loading kills your animation", "h4"),
    paragraph(
      "Modern sites commonly lazy-load images for performance. But when an image finishes loading mid-scroll, it can **overwrite GSAP's initial animation frame**, causing a harsh flash with no smooth transition. **Never lazy-load Hero images** on the first screen. For images below the fold, attach ScrollTrigger only **after the image's onload event fires**, ensuring animation and loading sequence are perfectly synced."
    ),

    // ScrollTrigger Scrub
    divider(),
    block("ScrollTrigger Scrub: Use Cases & How It Works"),
    paragraph(
      "If Viewport is the automatic door, then **Scrub is the remote control in your hand**. It's progress-based binding: scroll down a little, the animation advances a little. You control the pace."
    ),
    paragraph(
      "The key difference from Viewport: Viewport just detects when two lines collide, then the animation plays on its own timeline, even if your finger stops, the animation keeps going. Scrub, on the other hand, **binds the scroll position 100% to the animation timeline's progress**."
    ),
    paragraph(
      "Scrub's best friend is **pin**, ScrollTrigger's property for pinning elements. Normally, everything scrolls off-screen as you scroll down. But with pin: true, GSAP internally applies **position: fixed** to the element, locking it in place on screen, forcing the user to watch the show before they can scroll further."
    ),
    block("Code Example", "h3"),
    codeBlock(
      `// In scrub mode, the tween's "duration" is irrelevant
// scroll distance IS the timeline!
gsap.to(".scrolling-car-parts", {
  x: 200,
  rotation: 180,
  scale: 0.8,
  ease: "none",           // Always use ease: "none" for scrub
  scrollTrigger: {
    trigger: ".product-section",
    start: "top top",
    end: "+=1500",         // 1500px of scroll distance = animation progress bar
    pin: true,             // Pin the section, user must scroll through the show
    scrub: 1.2,            // 1.2s of physical smoothing/inertia
  }
});`
    ),
    block("Pitfall Guide", "h3"),
    block("1. Scrub end of range speed burst", "h4"),
    paragraph(
      "If your scroll range (start to end distance) is **too short** (e.g., 100px) but the element travels a **long physical distance** (e.g., x: 500), GSAP will rush to catch up near the end boundary, creating an ugly acceleration burst. Fix: **widen the scroll range** and **increase the scrub value**."
    ),
    block("2. Pin breaks inside overflow containers", "h4"),
    paragraph(
      "GSAP's pin: true uses position: fixed under the hood. But per CSS spec, if any parent has **overflow-x: clip** or **overflow: hidden**, it creates a **Containing Block** that traps position: fixed, stripping away its full-screen lock and causing layout shifts. Fix: ditch GSAP's pin and use native **CSS position: sticky** combined with GSAP for the animation only."
    ),

    // Conclusion
    divider(),
    block("Conclusion"),
    paragraph(
      "In the world of Creative Coding, true masters aren't the ones who memorized every API in GSAP's documentation. They're the ones who can use **core tools** to choreograph interactions that are both stunning and user-friendly."
    ),
    paragraph(
      "But I've also realized that whether you're orchestrating with Timeline or controlling animations through ScrollTrigger's logic, what matters most is having a foundational understanding of **browser-level science**: Reflow, Containing Blocks, network download speed variations, so you can push these building blocks into endless creative possibilities."
    ),
  ],

  // ─── Traditional Chinese ───
  title_zhTw: "GSAP 實戰指南：用 20% 的核心，撬動 80% 的網頁視覺",
  excerpt_zhTw:
    "在製作創意網站時，我發現其實真正會用到的技術沒有那麼多。只要掌握 Timeline 與 ScrollTrigger 這兩項核心功能，就能搞定大部分的驚艷動畫。但實際踩進真實專案時，隱藏的暗坑可不少。",
  body_zhTw: [
    // 開頭
    block("開頭"),
    paragraph(
      "在製作創意網站（Creative Website）時，我發現了**其實真正會用到的技術沒有那麼多**。只要掌握幾項核心功能，就能搞定市面上大部分的驚艷動畫，這就是網頁動態的 **80/20 法則**。在這篇文章中，我會介紹 GSAP Library 最常用到的 Core 功能：**Timeline** 與 Plugin 功能：**ScrollTrigger**。只要精通這些，就可以做出大部分的動畫效果，可以從 GSAP Showcase（gsap.com/showcase）看到大部分的網頁都有運用到 ScrollTrigger 功能，而 ScrollTrigger 和 Timeline 就是完美搭配。"
    ),
    paragraph(
      "不過，雖然這些工具看起來好學、很萬用，但實際踩進真實專案時，**隱藏的暗坑可不少**，以下我也整理出在用這些功能時我踩過的坑。"
    ),

    // 網頁動畫互動原理
    divider(),
    block("網頁動畫互動原理"),
    paragraph(
      "網頁上絕大部分的酷炫互動，拆解起來就是一場**數值轉換的設定**而已！"
    ),
    paragraph(
      "我們將使用者的 **Input**（時間、滑鼠位置、滾輪移動速度）轉化為一個 **0 到 1 的數值**，然後把這個數值套用到元素的位移屬性上（如 transform、opacity、clip-path）。中間再透過 **lerp**、**spring** 或 **easing curves** 進行物理平滑化，畫面就會動得流暢、自然。"
    ),
    block("The Real Pattern", "h3"),
    paragraph(
      "不論是滾動聯動還是滑鼠跟隨，所有頂級視覺都逃不出這個底層循環："
    ),
    numbered("**Read Input**: mouse, scroll, time"),
    numbered("**Normalize it**: map to a useful 0 to 1 range"),
    numbered("**Apply easing**: lerp, springs, easing curves"),
    numbered("**Move stuff**: transform, opacity, clip-path"),
    paragraph(
      "這個原理可以透過底下介紹的 GSAP 功能得到實現，掌握之後就可以變出各種花樣。"
    ),

    // Timeline
    divider(),
    block("Timeline 應用方式/場景"),
    paragraph(
      "要理解 Timeline，得先認識 **Tween**，Tween 是 GSAP 中最小的動畫單元，源自傳統動畫的「In-between」（補間動畫），你只要宣告物件的「起點」或「終點」，中間的過渡數值，全由 GSAP 的 **Ticker** 自動補齊，它除了控制常見的 opacity、scale，更能調度進階的 clip-path（遮罩裁切）或 filter: blur（模糊濾鏡）。"
    ),
    paragraph(
      "而當多個 Tween 組合在一起，就進化成了 **Timeline**，過去要寫一連串的連續動畫，必須手動加上不同的 delay，只要中間微調 0.1 秒，後面幾十行程式碼就會全盤崩潰需要全部重調。Timeline 是一個**自動排列容器**，只要把 Tween 照順序放入 Timeline 中，就會一個個排序播放，透過 Timeline 的參數（如 \"-=0.5\" 提早進場、\"<\" 與上一個同時進場），也能打破生硬的線性播放，創造有呼吸感的自然視覺。"
    ),
    block("程式碼範例", "h3"),
    codeBlock(
      `const tl = gsap.timeline();

tl.to(".hero-title", { y: 0, opacity: 1, duration: 1 })
  .to(".hero-bg-img", { scale: 1 }, "-=0.4") // 標題還沒跑完，背景圖就提早 0.4 秒開始放大
  .from(".nav-item", { opacity: 0 }, "<");     // 導覽列跟「背景圖」完全在同一瞬間開始淡入`
    ),
    block("避坑指南", "h3"),
    block("1. 千萬不要在 GSAP 和 CSS 裡改同一個物件的屬性", "h4"),
    paragraph(
      "當 GSAP 在每 16 毫秒用 Ticker 暴力修改物件的 style 時，你的 CSS transition 會試圖去攔截 GSAP 的數值，導致兩者在**瀏覽器底層瘋狂打架**，畫面看起來會像在抽搐一樣瘋狂抖動。只要該物件要交給 GSAP 控制，**CSS 裡就絕對不能有該屬性的 transition**，屬性需要錯開來寫，不能同時讓兩邊控制，或是讓 GSAP 在動畫完成之後 call onComplete，把主導權還給 CSS。"
    ),
    block("2. GSAP 動不了的屬性", "h4"),
    paragraph(
      "top、left、margin、width、padding 被稱為**佈局屬性**（Layout Properties），如果用 GSAP 去改動，那網頁需要重新計算所有元素的相對位置（觸發 **Reflow**），會讓流暢的動畫變得卡頓，CPU 工作量瞬間暴增，要改位置的話用 **x, y** 也就是對應 CSS 裡的 transform: translate()。那些沒有中間數學連續值的屬性，例如從 display: none 切換到 block、position: absolute 切換到 fixed、width: auto 變到固定數值，對 GSAP 來說是物理無解的，要改用 **opacity**、**autoAlpha** 或進階插件處理。"
    ),

    // ScrollTrigger Viewport
    divider(),
    block("ScrollTrigger Viewport 應用方式/場景"),
    paragraph(
      "這是讓動畫與物件是否進入可視區域 Viewport 產生聯動，就像網頁上的感應門，人走過去門就打開，人離開門就關上。"
    ),
    paragraph(
      "想像你的網頁裡有兩個正在移動的容器："
    ),
    numbered("**螢幕視窗（Viewport）**：它是隨著你滾輪移動的視角，它身上帶有兩根**偵測線** Viewport Start 和 Viewport End。"),
    numbered("**目標元件（Trigger Element）**：它是網頁上的元素，它身上也畫了兩根**觸發線** Element Start 和 Element End。"),
    paragraph(
      "所謂的觸發動畫，就是這場**雙線交會**的時刻，當視窗的偵測線滾動到網頁的某個位置，碰上元素的觸發線時，動畫就正式開演（Start）；反之，當兩者的結束線相交時，這段表演就宣告結束（End）。"
    ),
    paragraph(
      "除了設定 start 和 end 的觸發點，**toggleActions** 可以來決定進入、離開、再次進入時動畫要播放還是反轉，能設定 4 條線不同的交會方式會 trigger 甚麼：**進入（onEnter）** 就是 Viewport Start 跟 Element Start 交疊、**離開（onLeave）** 是 Viewport End 跟 Element End 相交、**再次進入（onEnterBack）** 是 Viewport End 重新倒退碰到 Element End、**再次離開（onLeaveBack）** 是 Viewport Start 再次碰到 Element Start。如果對於兩個容器的線感到陌生不清楚，也可以把 **markers 設為 true**，就可以在網頁上看到容器的 viewport 的觸發線。"
    ),
    block("程式碼範例", "h3"),
    codeBlock(
      `gsap.from(".portfolio-card", {
  y: 50,
  scrollTrigger: {
    trigger: ".portfolio-card",
    start: "top 80%",    // 當「元素的頂部 (top)」碰到「視窗的下方 80% (80%)」時觸發
    end: "bottom 20%",   // 當「元素的底部 (bottom)」碰到「視窗的上方 20% (20%)」時結束
    markers: true,       // 顯示除錯標籤！
  }
});`
    ),
    block("避坑指南", "h3"),
    block("1. 元件的 Start 點設定比網頁頂端還高", "h4"),
    paragraph(
      "對於網頁一開屏就要播放的 Hero Section 元素，**不要用 ScrollTrigger 去觸發它**！一律直接用一般的 gsap.timeline() 讓它網頁載入完直接開演；**第二屏以下的元素**，才交給 ScrollTrigger。"
    ),
    block("2. 手機版瀏覽器工具列縮放導致的畫面抽搐", "h4"),
    paragraph(
      "手機瀏覽器在往下滑動時，上方的網址列或下方的工具列會自動收起，這會導致手機的 **Viewport 高度（100vh）突然變大**。因為視窗變高了，ScrollTrigger 為了維持精準度，會強迫在滾動中重新計算所有偵測線（Reflow），畫面因此產生瞬間位移和抽搐。透過全域設定來限制：**ScrollTrigger.config({ ignoreMobileResize: true })**"
    ),
    block("3. Lazy Load 導致動畫消失", "h4"),
    paragraph(
      "現代網頁為了效能很常使用圖片懶載入（Lazy Loading）。但這會導致網頁滾動時，圖片加載完成的瞬間直接**「蓋過」了 GSAP 動畫的初始幀**，畫面上就會看到圖片生硬地閃現，沒有任何滑順轉場。**第一屏的 Hero 圖片絕對不開 lazy load**；第二屏底下的圖片，務必確保在**圖片的 onload 事件觸發後**，才將 GSAP 的 ScrollTrigger 動態掛載上去，確保動畫與加載順序完美銜接。"
    ),

    // ScrollTrigger Scrub
    divider(),
    block("ScrollTrigger Scrub 應用方式/場景"),
    paragraph(
      "如果說 Viewport 是網頁上的感應門，那麼 **Scrub 就是你手裡的「遙控器」**，它是基於進度綁定，你往下滑動多少，動畫就走多少，動畫出現的進度快慢由你掌控。"
    ),
    paragraph(
      "與 Viewport 的核心不同：Viewport 只是去測量兩條線何時相撞，撞到後動畫就自己照著預設的時間播完，使用者的手指就算停下來，動畫也不會停。而 Scrub 則是把使用者的滾輪位置，**100% 綁定在動畫的時間軸進度上**。"
    ),
    paragraph(
      "和 Scrub 最常搭配的好夥伴 **pin**，是 ScrollTrigger 用來釘住固定元素的屬性。當你往下捲動網頁時，預設所有元素都會跟著往上推並移出螢幕。但如果你設定了 pin: true，GSAP 會在底層自動動態將該元素加上 **position: fixed**，讓該元素像黏在螢幕上一樣，強迫使用者在滾動時留在原地，直到指定的滾動範圍結束後才解鎖。"
    ),
    block("程式碼範例", "h3"),
    codeBlock(
      `// 動畫本身的 duration 在 scrub 世界裡失效了
// 因為時間現在歸滾輪管！
gsap.to(".scrolling-car-parts", {
  x: 200,
  rotation: 180,
  scale: 0.8,
  ease: "none",           // Scrub 動畫的 ease 一律設為 none
  scrollTrigger: {
    trigger: ".product-section",
    start: "top top",
    end: "+=1500",         // 延長 1500px 的滾動距離來當作這段動畫的進度條
    pin: true,             // 釘住畫面，強迫看完這段秀才能繼續往下滾
    scrub: 1.2,            // 數字代表 1.2 秒的物理緩衝煞車感
  }
});`
    ),
    block("避坑指南", "h3"),
    block("1. Scrub 結尾暴衝", "h4"),
    paragraph(
      "當你的 ScrollTrigger 滾動區間（start 到 end 的距離）設定得**太短**（例如 100px），但動畫中元素位移的**物理距離卻很長**（例如 x: 500）。因為設定了平滑緩衝（scrub: 1），當網頁快要滾動到 end 終點時，GSAP 為了在邊界強行追上進度，會在結尾處產生一陣突兀的趕進度加速。這時要**拉寬滾動範圍**，並**調高 scrub 的數值**。"
    ),
    block("2. Pin 碰上 overflow", "h4"),
    paragraph(
      "GSAP 的 pin: true 在底層是利用 CSS 的 position: fixed 來把元素鎖在螢幕上的，但在 CSS 規範中，只要父層容器設定了 **overflow-x: clip** 或 **overflow: hidden**，就會強行建立一個 **Containing Block**（包含塊）。這會沒收 position: fixed 的全螢幕鎖定能力，讓它被困在父層容器的骨架範圍內，導致畫面直接位移。這時建議放棄 GSAP 的 pin，改用網頁原生的 **CSS Sticky + GSAP 純動畫**。"
    ),

    // 總結
    divider(),
    block("總結"),
    paragraph(
      "在 Creative Coding 的世界裡，真正的大師從來不是因為他背熟了 GSAP 官網所有的 API 字典，而是他能用**核心工具**，去編演出驚艷市場且體貼使用者的絕佳互動。"
    ),
    paragraph(
      "但我也發現無論是運用 Timeline 精準調度，還是用 ScrollTrigger 的邏輯去操控動畫，最重要的仍是對**瀏覽器底層科學**（Reflow、Containing Block、網絡下載速度差）有基本的理解與掌握，才能在這些基底上變化出更多的可能性。"
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_TOKEN env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_TOKEN=your_token node scripts/create-gsap-post.mjs"
    );
    process.exit(1);
  }

  try {
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == "gsap-practical-guide"][0]._id`
    );
    if (!existing) {
      const result = await client.create(post);
      console.log(`Post created! Document ID: ${result._id}`);
      return;
    }

    const { _type, slug, ...fieldsToUpdate } = post;
    const result = await client.patch(existing).set(fieldsToUpdate).commit();
    console.log(`Post patched successfully! Document ID: ${result._id}`);
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
}

main();
