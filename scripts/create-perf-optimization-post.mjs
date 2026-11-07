import { createClient } from "next-sanity";

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

// Split **bold** runs into Portable Text spans.
function spans(text) {
  return text.split(/(\*\*.*?\*\*)/g).map((part) =>
    part.startsWith("**") && part.endsWith("**")
      ? { _type: "span", _key: key(), text: part.slice(2, -2), marks: ["strong"] }
      : { _type: "span", _key: key(), text: part, marks: [] }
  );
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
  return { _type: "block", _key: key(), style: "normal", children: spans(text), markDefs: [] };
}

// A set-apart line rendered as a quote (the site's house "blockquote" style).
function blockquote(text) {
  return { _type: "block", _key: key(), style: "blockquote", children: spans(text), markDefs: [] };
}

// A normal paragraph with one inline hyperlink (before + link + after).
function paraWithLink(before, linkText, href, after) {
  const k = key();
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [{ _key: k, _type: "link", href }],
    children: [
      ...spans(before),
      { _type: "span", _key: key(), text: linkText, marks: [k] },
      ...spans(after),
    ],
  };
}

function bullet(text) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: spans(text),
    markDefs: [],
  };
}

// A bullet whose whole label is a clickable link (for 延伸閱讀 / Further reading).
function linkBullet(label, href) {
  const k = key();
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [{ _key: k, _type: "link", href }],
    children: [{ _type: "span", _key: key(), text: label, marks: [k] }],
  };
}

function divider() {
  return { _type: "divider", _key: key(), style: "default" };
}

/* ── 水晶螢幕錄影 ───────────────────────────────────────────────
   文章「同一塊畫面重畫幾次」那段有一支水晶錄影。影片是 Sanity file
   asset，要先把檔案上傳到 Sanity 拿到 asset _ref（形如
   "file-<hash>-mp4"），填進下面的 CRYSTAL_VIDEO_REF，就會自動插入。
   留 null 的話腳本照跑、只是不含影片；之後也可以直接在 /studio 這篇
   內文裡把影片拖進去。 */
const CRYSTAL_VIDEO_REF = "file-5b95cd82541778e582d0f672c633d46237d4a1dc-mp4"; // passes 段
const STORY_VIDEO_REF = "file-824a476fdcf4fd4fd956086f4ba1a0ddd1161264-mp4"; // 自己的故事段

// Returns an autoplay video block for the given Sanity file asset ref (or [] if null).
function videoBlock(ref) {
  if (!ref) return [];
  return [
    {
      _type: "video",
      _key: key(),
      autoplay: true,
      asset: { _type: "reference", _ref: ref },
    },
  ];
}

function crystalVideo() {
  return videoBlock(CRYSTAL_VIDEO_REF);
}

function storyVideo() {
  return videoBlock(STORY_VIDEO_REF);
}

const SLUG = "optimizing-creative-website-performance";

const post = {
  _type: "post",
  slug: { _type: "slug", current: SLUG },
  publishedAt: new Date().toISOString(),

  // ─── Traditional Chinese ───
  title_zhTw: "怎麼優化一個 Creative Website 的效能",
  excerpt_zhTw:
    "一個放滿 WebGL 特效的作品集，在舊筆電上卡到不行。這篇先講怎麼定位問題，再從架構拆解怎麼優化：DOM/CSS 的渲染鏈、WebGL 的像素成本、無損 vs 有損，最後用我自己「以為最花俏的特效最貴、結果完全相反」的除錯故事收尾。優化的本質就是：當個懶惰鬼。",
  body_zhTw: [
    block("前言"),
    block("優化就是如果程式碼哪裡可以偷懶，就讓他偷懶！", "h3"),
    paragraph(
      "Creative website 通常會有很多酷炫的特效或是轉場，雖然科技日新月異，很多電腦和手機都可以提供越來越好的效能，但還是要考慮到各式各樣的情況，像是使用舊裝置的使用者，此時效能的優化就會是不可或缺的一環。"
    ),
    paragraph(
      "這篇文章會先講怎麼定位問題，再從架構的大方向來拆解可以怎麼優化，最後分享一個我自己踩到的例子。"
    ),

    divider(),
    block("解決問題前先定義問題"),
    block("發現對的問題", "h3"),
    paragraph(
      "要解決問題，就要先定義問題。關於效能上的漏洞，可以透過去量測來發現。"
    ),
    paragraph(
      "一開始可以先去猜測或分析為甚麼一個頁面會卡頓，卡頓的點在哪個區塊，哪個瀏覽器，哪個裝置，甚至是哪個行為會觸發卡頓？分析可能的原因之後，寫 Probe 去偵測是否真的是那個問題，像是把覺得可能卡頓的嫌疑犯隱藏，來觀察效能是否提升，等等的方法。"
    ),
    paragraph(
      "這一步不能跳過，因為視覺上的直覺很容易誤導你。後面我自己的故事就是一個例子，我推測的問題和量測出來的兇手完全不同。"
    ),
    block("確認問題能穩定重現", "h3"),
    paragraph(
      "還有一個跟程式無關、卻也很重要的提醒：有時候問題不是你的程式，是你的環境。"
    ),
    paragraph(
      "量測工具本身、背景在跑的其他程式，都可能製造出一個看起來很有說服力、但根本不存在的卡頓。所以在動手之前，先確認同樣的操作能穩定重現同樣的問題。"
    ),

    divider(),
    block("優化方向"),
    paragraph(
      "想要優化網頁，找到對的問題，要先了解網頁的架構，這樣才能對症下藥。網站通常會包含兩大架構：DOM / CSS 和 WebGL / 著色器。兩邊的架構都可以拆成三個子項目，也就是三個可以讓程式碼偷懶的地方。"
    ),

    block("DOM / CSS", "h3"),
    paragraph(
      "關於 DOM / CSS 的渲染，也就是 CPU 像素產線做的一連串事項：JS → Style → Layout → Paint → Composite，CPU 做的事情是線性的，前後的執行相互關聯。"
    ),
    blockquote("DOM / CSS 架構成本 ≈ 觸發哪一層執行 × 一幀觸發幾次 × 一次波及多大範圍"),

    block("改動到鏈條後面越省效能", "h4"),
    paragraph(
      "因為 CPU 會一整條鏈一起作業，所以當動畫或互動去更動一個元素的屬性時，那個屬性在這條鏈上**越後面的階段**就越省效能。例如：transform / opacity → 只會動到 **Composite 階段**；改 background → 要到 **Paint 階段**；改 width / top / 位置 → 會一路觸發到 **Layout 階段**。"
    ),
    paragraph(
      "所以優化上要知道哪個 CSS 會觸發哪個階段（csstriggers）；能用 transform/opacity（只到 Composite）做的動畫，就別用 width/top（會觸發 Layout）。"
    ),

    block("同一件事一幀只做一次", "h4"),
    paragraph(
      "同一件事一幀做很多次就是浪費。最經典的坑叫 layout thrashing，也就是寫一下新位置、又讀位置、又寫新位置，逼瀏覽器一幀內重算排版好幾次。"
    ),
    paragraph(
      "優化上，如果能量一次、就存起來、每幀只讀快取，就會是好的節能方向，譬如：在捲動時避免每做一次 scroll 就重算一次畫面，可以透過用 rAF 把捲動事件改成一幀最多只算一次。"
    ),

    block("一次改動的範圍廣度越小越好", "h4"),
    paragraph(
      "這裡的範圍是對比於整條 CPU 鏈的深度，這裡討論的是廣度，也就是會改變多少元素的狀況，如：互動觸發了一個大區塊**頂層**的 class，整棵子樹的 style 都要重算。"
    ),
    paragraph(
      "所以優化上只改真正要改的、範圍收到最小，盡量針對相對的 class 去調整 style。"
    ),

    divider(),
    block("WebGL / 著色器", "h3"),
    paragraph(
      "如果渲染 DOM / CSS 的 CPU 像一位聰明的工人，一次把一件複雜的事做到好；那處理 WebGL / 著色器的 GPU 就像一座工廠，有成千上萬個比較簡單的工人**同時開工**。每個工人負責算一個像素的顏色，而他們手上那張「計算說明書」就叫 **shader**，同一張說明書發給所有工人，每個人套用在自己那個像素上。而 GPU 的效能，就看這張說明書要**套在多少像素上**、**每個像素要算多少東西**、以及**同一塊畫面要重畫幾次**。"
    ),
    blockquote("WebGL / 著色器架構成本 ≈ 要上色的像素數 × 每個像素做的工作 × 同一塊重畫幾次。"),

    block("全螢幕和 Retina 是像素數大戶", "h4"),
    paragraph(
      "特效蓋到越多像素，shader 就跑越多次，也就是說同一個頁面的效能會因為視窗大小而不同，而 Retina 螢幕更是像素大戶，因為 Retina 每邊是兩倍像素，因此會用到比起一般螢幕總共四倍的像素。"
    ),
    paragraph(
      "所以優化上，能不滿版就不要滿版，特效覆蓋的範圍收得越小越省。"
    ),
    paraWithLink(
      "不過「像素數」這一項能調的東西其實不只一個，解析度、覆蓋範圍、放大倍率之間會互相牽動，而且在不同密度的螢幕上結果不一樣。我有一次也是在這個坑裡來回繞了很久，過程寫在",
      "更好的螢幕讓網站有更多瑕疵？",
      "/zh/blog/better-screens-reveal-more-flaws",
      "。"
    ),

    block("每個像素的說明書", "h4"),
    paragraph(
      "每個像素跑的程式裡，如果有一堆迴圈、很多次取樣、或很重的數學（像 noise 函式），這些成本全部要乘上像素數。"
    ),
    paragraph(
      "所以把 shader 寫簡單、少取樣、能先用貼圖（baked 圖，texture 圖）算好就不用每幀重算，越簡單效能越好。"
    ),

    block("同一塊畫面重畫幾次", "h4"),
    paragraph(
      "複雜特效常常不是一次畫完，而是好幾層疊起來，以下方的這顆水晶螢幕錄影為例，它看起來一幀畫完，其實背後畫了好幾次：先畫背景的隧道格線，再把水晶畫到一張**暫存圖**上，接著跑流體模擬，最後一趟才把水晶和流體合成才寫到螢幕。"
    ),
    paragraph(
      "這裡的優化方式就是能合併疊層就合併，讓效果以最少畫的次數呈現。"
    ),
    ...crystalVideo(),

    divider(),
    block("這兩條線不是用寫法分的", "h3"),
    paragraph(
      "前面分成兩條線是為了好理解，但實際上決定執行走哪一條的，其實不是你用什麼語法寫，是它實際是誰在算。像毛玻璃（backdrop-filter）寫起來是 CSS，但它的成本其實是按 GPU 那條公式在算的。"
    ),
    paragraph(
      "所以判斷的方式不是「我是用什麼寫的」，而是打開效能面板，看那段卡頓實際落在哪一列。這也呼應前面所說的，找問題要用量的不能用猜的。"
    ),

    block("無損 & 有損優化", "h3"),
    paragraph(
      "不管是 CPU 還是 GPU 的優化，都可以再歸類為無損和有損優化，無損優化：視覺完全不變，只是把不需要的執行簡化或拿掉；有損優化：把特效直接變簡單或移除，靠犧牲視覺換效能。"
    ),
    paragraph("先把所有無損優化做完，有損的優化才是最後手段。"),
    paragraph(
      "抓到問題根源之後，修起來往往不難，但是很多時候是修不了的，可能因為硬體的限制，或是相容性的問題，這時候除了把問題解決，也可以在跑不動的裝置上，給它一個比較簡化的版本，也就是降載，也等於在比較低端的裝置上做有損優化。"
    ),
    paragraph(
      "像是同樣的效果在電腦上跑得起來，可是在手機上卻會卡死，這時就要在手機上去降載，呈現比較簡單的特效效果，這也是一個可行的效能解法方向。"
    ),

    divider(),
    block("自己的故事"),
    paragraph("前面那些概念，拿我正在做的作品集來講會更具體。"),
    paragraph(
      "這個作品集放了不少 WebGL 特效，在我桌機上很順，但在一台舊筆電上卡得很嚴重，急需優化。"
    ),
    ...storyVideo(),
    paragraph(
      "要解決問題，得先定義問題，所以我沒有急著砍特效，而是先做量測。結果和我一開始的推測其實不同，我本來以為佔效能大戶是畫面上最花俏的水晶，但其實不是，因為它只佔一小塊畫面；最吃效能的反而是佔滿全螢幕的隧道背景，它看起來很低調，但因為佔的畫面大、像素多，才是最大的成本來源。"
    ),
    paragraph(
      "不過背景就是特效本身，硬砍會失去質感，所以我想要從其他地方下手。我注意到頁尾三顆按鈕本來一直有一層毛玻璃模糊。模糊要把「背後的東西」重新算一遍（也就是每一幀都要重新取樣再模糊一次），而按鈕背後就是那個每幀都在動的隧道，所以瀏覽器每一幀都在重算這塊很貴的區域。把模糊拿掉後效能就大大的升級。而且因為背景本來就偏暗，那層模糊其實不明顯，拿掉後視覺幾乎看不出差別。這就是一個典型的無損優化！刪掉多餘的每幀重算，視覺不變、效能卻回來了。"
    ),

    divider(),

    block("結語"),
    paragraph("效能優化是一套思路。"),
    paragraph(
      "**先定位，再找方向。** 用量測去找問題，別用猜的。視覺上你可能會被混淆，但量測出來的數字不會。而且動手之前，先確認問題能穩定重現。"
    ),
    paragraph(
      "**知道框架才知道可以從哪裡偷懶。** 一個 creative website 的框架：DOM / CSS 的那條渲染鏈（越後面越簡單、別重複做、範圍收小），和 WebGL 的像素（像素越少、每像素越簡單、重畫越少越好）。"
    ),
    paragraph(
      "**先嘗試無損，有損是最後手段。** 在跑不動的裝置上可以嘗試降載。"
    ),
    paragraph("說到底，優化的本質就是：當個懶惰鬼！如果程式碼哪裡可以偷懶，就讓他偷懶～"),

    divider(),

    block("延伸閱讀", "h3"),
    linkBullet("Rendering performance — web.dev", "https://web.dev/articles/rendering-performance"),
    linkBullet("CSS Triggers — 哪些改動會觸發哪個階段", "https://csstriggers.com/"),
    linkBullet("Making Software: Shaders", "https://www.makingsoftware.com/chapters/shaders"),
    linkBullet(
      "Jake Archibald：瀏覽器事件迴圈、rAF、setTimeout",
      "https://www.youtube.com/watch?v=cCOL7MC4Pl0"
    ),

    block("Glossary", "h3"),
    bullet(
      "**rAF（requestAnimationFrame）**：跟瀏覽器說「下一幀畫出來之前，幫我跑這個一次」。用來把頻繁事件收斂成一幀一次，或驅動連續動畫。"
    ),
    bullet(
      "**FPS（Frame per second）**：畫面一秒更新幾次。60fps = 每幀約 16.7 毫秒，低於它就會覺得卡。"
    ),
    bullet("**CPU**：負責 DOM/CSS 的渲染（Style/Layout/Paint），循序、一次把一件事做到好。"),
    bullet("**GPU**：負責 WebGL/著色器，幾千個核心同時平行處理大量像素。"),
    bullet(
      "**Retina**：高像素密度螢幕，每邊像素是一般的兩倍（總共約四倍），全螢幕特效在上面更吃效能。"
    ),
    bullet("**shader**：在 GPU 上「每個像素跑一次」的小程式。"),
    bullet(
      "**layout thrashing**：一幀內反覆「改版面 → 讀位置」，逼瀏覽器重算排版很多次的坑。"
    ),
  ],

  // ─── English ───
  title: "How to Optimize the Performance of a Creative Website",
  excerpt:
    "A portfolio packed with WebGL effects ran smooth on my desktop but crawled on an old laptop. This post starts with how to locate the problem, then breaks optimization down by architecture: the DOM/CSS render chain, the pixel cost of WebGL, and lossless vs lossy. It wraps up with my own debugging story, where I was sure the flashiest effect was the most expensive and measurement proved me completely wrong. The heart of optimization is simple: be lazy.",
  body: [
    block("Intro"),
    block("Optimizing is just letting your code slack off wherever it can", "h3"),
    paragraph(
      "Creative websites usually come with a lot of flashy effects and transitions. Tech keeps getting better and most phones and computers keep getting faster, but you still have to account for all kinds of situations, like someone visiting on an older device. That's where performance optimization becomes essential."
    ),
    paragraph(
      "This post starts with how to locate the problem, then breaks optimization down from a big-picture, architectural angle, and ends with an example I ran into myself."
    ),

    divider(),
    block("Define the Problem Before You Solve It"),
    block("Find the right problem", "h3"),
    paragraph(
      "To solve a problem, you first have to define it. You find performance leaks by measuring."
    ),
    paragraph(
      "Start by guessing or reasoning about why a page might stutter, which section stutters, which browser, which device, even which action triggers it. Once you've got candidate causes, write a probe to check whether that's really the problem, like hiding a suspected culprit to see if performance jumps."
    ),
    paragraph(
      "Don't skip this step, because your visual intuition fools you easily. My own story later is a perfect example, where the problem I guessed and the culprit I measured turned out to be completely different."
    ),
    block("Make sure the problem reproduces reliably", "h3"),
    paragraph(
      "Here's one more reminder that has nothing to do with code but matters just as much: sometimes the problem isn't your code, it's your environment."
    ),
    paragraph(
      "The measuring tool itself, or other programs running in the background, can manufacture a stutter that looks completely convincing but doesn't really exist. So before you start, make sure the same action reproduces the same problem reliably."
    ),

    divider(),
    block("Where to Optimize"),
    paragraph(
      "To optimize a website and find the right problem, you first need to understand how it's built, so you can treat the right problem. A site usually has two big architectures: DOM/CSS and WebGL/shaders. Each one breaks down into three sub-items, which are three places you can let your code slack off."
    ),

    block("DOM / CSS", "h3"),
    paragraph(
      "DOM/CSS rendering is the pixel assembly line the CPU runs through: JS → Style → Layout → Paint → Composite. The CPU works through this in order, and each stage depends on the ones before it."
    ),
    blockquote(
      "DOM/CSS cost ≈ which stage you trigger × how many times per frame × how wide the blast radius is."
    ),

    block("The further down the chain, the cheaper", "h4"),
    paragraph(
      "Because the CPU runs the whole chain top to bottom, when an animation or interaction changes a property, the **later that property sits in the chain**, the cheaper it is. For example: transform / opacity only touch the **Composite stage**; changing background reaches back to the **Paint stage**; changing width / top / position goes all the way back to the **Layout stage**."
    ),
    paragraph(
      "So it helps to know which CSS property triggers which stage (csstriggers). Anything you can animate with transform/opacity (Composite only), don't do with width/top (which triggers Layout)."
    ),

    block("Do each thing once per frame", "h4"),
    paragraph(
      "Doing the same thing many times in one frame is pure waste. The classic trap is layout thrashing: you write a new position, then read a position, then write again, forcing the browser to recompute layout several times within a single frame."
    ),
    paragraph(
      "A good habit is to measure once, cache it, and only read the cache each frame. For instance, instead of recomputing the scene on every single scroll event, use rAF so scrolling triggers at most one computation per frame."
    ),

    block("Keep the blast radius small", "h4"),
    paragraph(
      "If the point above was about the depth of the CPU chain, this one is about breadth, meaning how many elements a single change touches. For example, if an interaction toggles a class on the **top** of a big section, the whole subtree has to recompute its style."
    ),
    paragraph(
      "So only change what truly needs to change, keep the scope as tight as possible, and target styles on the most specific class you can."
    ),

    divider(),
    block("WebGL / Shaders", "h3"),
    paragraph(
      "If the CPU rendering DOM/CSS is like one smart worker doing a complex job well, one step at a time, then the GPU handling WebGL/shaders is like a factory with thousands of simpler workers all **clocking in at once**. Each worker computes the color of one pixel, and the instruction sheet in their hands is called a **shader**. The same sheet goes out to every worker, and each one applies it to their own pixel. GPU performance comes down to how **many pixels** that sheet covers, how **much work each pixel does**, and how **many times the same patch of screen gets repainted**."
    ),
    blockquote(
      "WebGL/shader cost ≈ pixels to color × work per pixel × how many times you repaint the same area."
    ),

    block("Fullscreen and Retina are the big pixel spenders", "h4"),
    paragraph(
      "The more pixels an effect covers, the more times the shader runs, which means the same page can perform differently just based on window size. Retina screens are an even bigger spender, because Retina doubles the pixels on each side, so it uses about four times as many pixels total as a regular screen."
    ),
    paragraph(
      "So when you optimize, avoid going fullscreen if you don't have to, and the smaller the area an effect covers, the more you save."
    ),
    paraWithLink(
      "Still, \"pixel count\" has more than one knob to turn. Resolution, coverage, and scale all pull on each other, and the result differs across screens of different densities. I once went around in circles in exactly this pit for a long time, and I wrote about it in ",
      "Does a Better Screen Give Your Website More Flaws?",
      "/en/blog/better-screens-reveal-more-flaws",
      "."
    ),

    block("The instruction sheet for each pixel", "h4"),
    paragraph(
      "If the program each pixel runs has lots of loops, many texture samples, or heavy math (like a noise function), all of that cost gets multiplied by the pixel count."
    ),
    paragraph(
      "So keep the shader simple, sample less, and bake results into a texture ahead of time when you can, so you're not recomputing every frame. The simpler it is, the better it runs."
    ),

    block("How many times the same area is repainted", "h4"),
    paragraph(
      "Complex effects often aren't drawn in one go, they're stacked up in layers. Take the crystal in the clip below. It looks like it's drawn in a single pass, but there are actually several behind the scenes: first the tunnel grid in the background, then the crystal drawn onto a **temporary image**, then a fluid simulation, and finally one last pass that composites the crystal and the fluid together and writes them to the screen."
    ),
    paragraph(
      "The way to optimize here is to merge layers wherever you can, so the effect shows up with the fewest draws possible."
    ),
    ...crystalVideo(),

    divider(),
    block("These two tracks aren't split by how you write them", "h3"),
    paragraph(
      "I split things into two tracks earlier to make them easier to understand, but what actually decides which track runs isn't the syntax you write, it's who really does the computing. Frosted glass (backdrop-filter) is written as CSS, but its cost actually follows the GPU formula."
    ),
    paragraph(
      "So the way to tell isn't \"what did I write it with,\" it's to open the performance panel and see which row that stutter actually lands on. This echoes the earlier point: find problems by measuring, not by guessing."
    ),

    block("Lossless & Lossy Optimization", "h3"),
    paragraph(
      "Whether on the CPU or the GPU, optimization falls into two buckets, lossless and lossy. Lossless: the visuals stay exactly the same, you just simplify or remove work that wasn't needed. Lossy: you make an effect simpler or drop it entirely, trading visuals for performance."
    ),
    paragraph("Do all your lossless optimization first, and treat lossy as the last resort."),
    paragraph(
      "Once you've caught the root cause, the fix is often easy. But plenty of times you can't fix it, maybe because of hardware limits or compatibility issues. In that case, besides solving the problem directly, you can hand devices that can't keep up a simplified version, which is called degrading, essentially doing lossy optimization on lower-end devices."
    ),
    paragraph(
      "For example, the same effect runs fine on a computer but freezes on a phone, so on the phone you degrade it to a simpler version. That's a perfectly valid way to solve a performance problem too."
    ),

    divider(),
    block("My Own Story"),
    paragraph("Those concepts get a lot more concrete with the portfolio I'm building."),
    paragraph(
      "This portfolio has quite a few WebGL effects. It ran smooth on my desktop, but on an old laptop it stuttered badly and clearly needed optimizing."
    ),
    ...storyVideo(),
    paragraph(
      "To solve a problem you have to define it first, so instead of rushing to cut effects, I measured. The result didn't match my guess at all. I'd assumed the biggest hog was the flashiest crystal on the screen, but it wasn't, because it only covers a small patch of screen. The real performance hog was the tunnel background filling the entire screen. It looks understated, but because it covers so much screen and so many pixels, it was the biggest source of cost."
    ),
    paragraph(
      "But the background is the effect itself, and hacking it out would lose the whole mood, so I wanted to look elsewhere. I noticed the three footer buttons had always carried a layer of frosted-glass blur. A blur has to recompute everything **behind** it (meaning every frame it has to resample and blur all over again), and behind those buttons was that tunnel moving every frame, so the browser was redoing this expensive area on every single frame. Once I removed the blur, performance jumped. And since the background was already dark, that blur was barely visible anyway, so removing it made almost no visual difference. That's a textbook lossless optimization: delete the redundant per-frame work, the visuals stay the same, and the performance comes back."
    ),

    divider(),

    block("Wrapping Up"),
    paragraph("Performance optimization is a way of thinking."),
    paragraph(
      "**Locate first, then find a direction.** Find problems by measuring, not by guessing. Your eyes can fool you, but the numbers you measure won't. And before you start, make sure the problem reproduces reliably."
    ),
    paragraph(
      "**Know the framework and you'll know where you can slack off.** The framework of a creative website: the DOM/CSS render chain (later is cheaper, don't repeat work, keep the scope small), and WebGL pixels (fewer pixels, simpler per pixel, fewer repaints)."
    ),
    paragraph(
      "**Try lossless first, keep lossy as the last resort.** On devices that can't keep up, you can degrade."
    ),
    paragraph(
      "At the end of the day, the heart of optimization is this: be lazy! Wherever your code can slack off, let it."
    ),

    divider(),

    block("Further Reading", "h3"),
    linkBullet("Rendering performance — web.dev", "https://web.dev/articles/rendering-performance"),
    linkBullet("CSS Triggers — which changes trigger which stage", "https://csstriggers.com/"),
    linkBullet("Making Software: Shaders", "https://www.makingsoftware.com/chapters/shaders"),
    linkBullet(
      "Jake Archibald on the browser event loop, rAF, and setTimeout",
      "https://www.youtube.com/watch?v=cCOL7MC4Pl0"
    ),

    block("Glossary", "h3"),
    bullet(
      "**rAF (requestAnimationFrame)**: tells the browser \"run this once, right before the next frame is painted.\" Used to collapse frequent events into one-per-frame, or to drive continuous animation."
    ),
    bullet(
      "**FPS (Frames per second)**: how many times the screen updates per second. 60fps = about 16.7ms per frame, and dropping below that starts to feel janky."
    ),
    bullet("**CPU**: handles DOM/CSS rendering (Style/Layout/Paint), sequential, one thing done well at a time."),
    bullet("**GPU**: handles WebGL/shaders, thousands of cores processing huge numbers of pixels in parallel."),
    bullet(
      "**Retina**: a high-pixel-density screen with twice the pixels on each side (about four times total), where fullscreen effects cost more."
    ),
    bullet("**shader**: a small program that runs \"once per pixel\" on the GPU."),
    bullet(
      "**layout thrashing**: the trap of repeatedly \"change layout → read position\" within one frame, forcing the browser to recompute layout many times."
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) env var is required.\n" +
        "It already exists in .env.local — pass it when you run, e.g. (Git Bash):\n" +
        "  SANITY_WRITE_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2) node scripts/create-perf-optimization-post.mjs"
    );
    process.exit(1);
  }

  try {
    const techId = await client.fetch(
      `*[_type == "category" && title == "Tech"][0]._id`
    );
    if (techId) {
      post.category = { _type: "reference", _ref: techId };
    } else {
      console.log('Note: "Tech" category not found, leaving category unset.');
    }

    // Only match the published doc — never accidentally patch a Studio draft
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == "${SLUG}" && !(_id in path("drafts.**"))][0]._id`
    );
    if (!existing) {
      console.log("No existing post found. Creating new one...");
      const result = await client.create(post);
      console.log(`Post created! Document ID: ${result._id}`);
      return;
    }

    // Patch in place; keep the original publishedAt and NEVER overwrite the
    // Chinese fields — they are hand-tuned directly in Sanity
    const {
      _type,
      slug,
      publishedAt,
      title_zhTw,
      excerpt_zhTw,
      body_zhTw,
      ...fieldsToUpdate
    } = post;
    const result = await client.patch(existing).set(fieldsToUpdate).commit();
    console.log(`Post patched successfully! Document ID: ${result._id}`);

    const draftExists = await client.fetch(
      `defined(*[_id == "drafts.${existing}"][0])`
    );
    if (draftExists) {
      console.warn(
        "Warning: a Studio draft of this post exists. Publishing it from Studio " +
          "would overwrite this update — discard or re-publish the draft."
      );
    }
  } catch (err) {
    console.error("Failed to create/patch post:", err.message);
    process.exit(1);
  }
}

main();
