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

function divider() {
  return {
    _type: "divider",
    _key: key(),
    style: "default",
  };
}

// Windows vs Mac comparison videos already uploaded to Sanity
const VIDEOS = {
  spot1: {
    win: "file-857f21ccd01c21a48ca21657b2bf73cdeb2e423a-mp4",
    mac: "file-54ebe8d1657e385697601c1caeeeeba139b423fc-mp4",
  },
  spot2: {
    win: "file-3556d8d9b2d30470bfa29d622a6b7cff6eb4839f-mp4",
    mac: "file-e127c8af47d397a91910cedc1f868557be383958-mp4",
  },
};

function videoCompare({ win, mac }) {
  return {
    _type: "videoCompare",
    _key: key(),
    leftLabel: "Windows",
    rightLabel: "Mac",
    leftVideo: { _type: "file", asset: { _type: "reference", _ref: win } },
    rightVideo: { _type: "file", asset: { _type: "reference", _ref: mac } },
  };
}

const SLUG = "better-screens-reveal-more-flaws";

const post = {
  _type: "post",
  slug: { _type: "slug", current: SLUG },
  publishedAt: new Date().toISOString(),

  // ─── Traditional Chinese ───
  title_zhTw: "更好的螢幕讓網站有更多瑕疵？",
  excerpt_zhTw:
    "換了更好的螢幕，反而開始看到以前沒發現的鋸齒和模糊？其實不是你變挑剔，而是螢幕變好了。這篇記錄我在做作品集 shader 時，同一個光團在 Mac 和 Windows 上長得完全不一樣，繞了一大圈才發現問題出在像素密度的除錯故事。",
  body_zhTw: [
    paragraph(
      "你有沒有換過一支更好的手機，或者接上一台更好的螢幕，然後開始注意到一些以前沒發現的東西？像是某個 app 的圖示邊緣有鋸齒，或是某張存了很久的照片，突然看起來糊糊的。"
    ),
    paragraph(
      "你可能想過「是不是我變得太挑剔了」，或是「這台螢幕該不會有問題吧」。"
    ),
    paragraph(
      "其實都不是，**是因為你的螢幕變好了**，Retina、解析度、像素密度，這些在發表會上聽起來很抽象的名詞，在這些情況下具象化了！"
    ),

    divider(),
    block("在不同螢幕上效果呈現不一樣"),
    paragraph(
      "有天我發現這個狀況，是我在做我的作品集的 shader 畫面，他是電腦即時運算的光團，會隨著滑鼠互動而變化光影效果。"
    ),
    paragraph(
      "一樣的效果在 Windows 上面跟在 Mac 上面跑起來，畫面看起來差很多，而且是在 Windows 上面好看柔和很多，我一開始以為是效能的問題，但後來發現效能在兩台電腦上都沒有爆掉，都還有很多空間。"
    ),
    videoCompare(VIDEOS.spot1),
    paragraph(
      "後來來回測試，才發現是因為螢幕的燈點密度不同（也就是同樣一塊面積，裡面塞了幾顆實體的發光點），在 Windows 上被淡化柔和掉的瑕疵和邊緣銳利的鈍角，**其實一直都存在，只是 Windows 沒有顯示出來**。"
    ),

    divider(),
    block("在現實生活中也會發生"),
    paragraph(
      "其實有些現實生活中會發生的狀況，也跟這個概念相同，像是一直以為遠處那塊招牌寫的是某某某，配了眼鏡之後才發現，上面有個錯字。或是同一張解析度很低的照片，在老舊的電視上顯示，你不會覺得有什麼問題；但在高畫質的液晶螢幕上，馬賽克就一目了然。"
    ),

    divider(),
    block("繞了很久才發現問題"),
    paragraph(
      "這次寫的 shader 是讓程式碼在實際繪製光團的時候，會只先畫一個小小的圖，再放大鋪滿畫面，這樣可以讓算圖的速度快很多，但問題就出在這裡，因為 Mac 的螢幕比較細緻，放大後光團的同一個大小的格子，他會用 6.7 顆螢幕發光點去畫，密度更高，相比 Windows 螢幕只用了 3.3 顆，所以 Windows 螢幕自己的粗糙度剛好把格子的邊界糊掉了。而 Mac 夠細緻，它把那個邊界清清楚楚地畫了出來。"
    ),
    paragraph(
      "一開始我的處理方式，是調整解析度，這樣 Mac 的呈現就不會這麼銳利，調整後 Mac 畫面確實變柔了，但在 Windows 上面因而看起來移動變得更跳，邊緣開始出現鋸齒，因為我調的東西根本不對，**解析度是取樣率，柔和度是訊號本身的內容**，用前者去換後者，結果在 Windows 螢幕上面呈現出假花紋加跳格的鋸齒。為了修鋸齒我把解析度調回去，但在 Mac 上面柔和度就又沒了。我就這樣一直在這個死亡迴圈裡面跳針，一直找不到正確的處理方式。"
    ),
    paragraph(
      "後來發現，正確的方向應該是**讓光團被畫得更細，細到不管在哪個顯示器上面，放大後的細節都是一樣的**，不會因為螢幕光點呈現的密度而有所不同。"
    ),
    videoCompare(VIDEOS.spot2),

    divider(),
    block("結論"),
    paragraph(
      "這次的經驗讓我學到，**要先搞懂成因，才知道哪些方法根本不可能成立**。發現畫面太銳利後，一開始我很直覺地去降低解析度，繞了很久才發現那個方向本來就走不通，真正該調整的是光團本身的細緻度，是一次很混亂但也很好玩的學習經驗～"
    ),
    paragraph(
      "PS：以上的 Mac 跟 Windows 的螢幕不代表所有的 Mac 跟 Windows 作業系統的螢幕狀況，只是剛好我這兩個作業系統的螢幕有這樣不同的顯示，所以就以 Mac 跟 Windows 代稱～另外你可能也發現，背景線條的明亮度在四支影片裡看起來都不一樣，至於為什麼有的影片線條比較明顯⋯⋯那又是另外一個故事了～"
    ),
  ],

  // ─── English ───
  title: "Does a Better Screen Give Your Website More Flaws?",
  excerpt:
    "Upgraded to a nicer screen and suddenly started spotting jagged edges and blurry photos you never noticed before? You're not getting pickier, your screen just got better. This is the story of how the same shader looked completely different on my Mac and my Windows machine, and the long detour I took before finding out pixel density was the real culprit.",
  body: [
    paragraph(
      "Have you ever switched to a better phone, or plugged into a nicer monitor, and started noticing things you never saw before? Like jagged edges on an app icon, or an old photo you saved ages ago suddenly looking kind of blurry."
    ),
    paragraph(
      "You might have wondered, am I just getting too picky? Or is something wrong with this screen?"
    ),
    paragraph(
      "Actually, neither. **It's because your screen got better.** Retina, resolution, pixel density, all those words that sound so abstract in product keynotes suddenly become very real in moments like these!"
    ),

    divider(),
    block("The Same Effect Looks Different on Different Screens"),
    paragraph(
      "I ran into this while working on the shader scene for my portfolio. It's a blob of light computed in real time, and the glow shifts around as you move your mouse."
    ),
    paragraph(
      "The exact same effect looked wildly different running on Windows versus Mac, and strangely enough, it looked much softer and nicer on Windows. At first I assumed it was a performance issue, but it turned out neither machine was anywhere near its limit. Both had plenty of headroom."
    ),
    videoCompare(VIDEOS.spot1),
    paragraph(
      "After a lot of back and forth testing, I finally figured out it came down to the density of the screen's light dots, that is, how many physical glowing points are packed into the same patch of screen. The flaws and harsh sharp edges **had been there the whole time. The Windows screen was simply smoothing them over** and never showing them."
    ),

    divider(),
    block("It Happens in Real Life Too"),
    paragraph(
      "Some everyday situations work exactly the same way. Like when you always thought that sign in the distance said a certain thing, and then you got glasses and discovered there's a typo on it. Or the same low-resolution photo that looks perfectly fine on an old TV, but on a high-definition LCD screen, the pixelated mosaic is impossible to miss."
    ),

    divider(),
    block("The Long Detour to the Real Problem"),
    paragraph(
      "The shader I wrote renders the light blob as a small image first, then scales it up to fill the screen. That makes rendering much faster, but that's exactly where the problem was. The Mac's screen is finer, so for a grid cell of the same size in the scaled-up blob, it uses about 6.7 physical light dots to draw it. The Windows screen only uses about 3.3. So the Windows screen's own coarseness happened to blur the cell boundaries away, while the Mac was fine enough to draw those boundaries crisp and clear."
    ),
    paragraph(
      "My first move was to adjust the resolution so the Mac wouldn't render things so sharply. And the Mac did get softer, but on Windows the motion started to look choppy and the edges turned jagged, because I was tuning the wrong thing entirely. **Resolution is the sampling rate, while softness lives in the content of the signal itself.** Trading one for the other just produced fake patterns and stuttery jagged edges on the Windows screen. To fix the jaggies I turned the resolution back up, and then the softness on the Mac disappeared again. I kept skipping around inside this death loop, never finding the right way out."
    ),
    paragraph(
      "Eventually I realized the right direction was to **draw the light blob itself in finer detail. Fine enough that no matter which display you look at, the scaled-up details stay the same**, regardless of how densely the screen packs its light dots."
    ),
    videoCompare(VIDEOS.spot2),

    divider(),
    block("Takeaway"),
    paragraph(
      "This experience taught me to **understand the cause first, so I know which fixes were never going to work in the first place**. When I saw the image was too sharp, my gut reaction was to lower the resolution, and it took me a long detour to realize that road was a dead end from the start. What actually needed adjusting was the fineness of the light blob itself. A messy but really fun lesson to learn!"
    ),
    paragraph(
      "PS: The Mac and Windows screens above don't represent every Mac and Windows display out there. It just happens that my machines on these two systems show things differently, so I'm using Mac and Windows as shorthand. Also, you might have noticed that the background lines look brighter in some of the clips than in others. As for why that happens... well, that's a whole other story."
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_WRITE_TOKEN=your_token node scripts/create-better-screens-post.mjs"
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
