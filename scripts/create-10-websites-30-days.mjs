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

function bullet(text) {
  const b = paragraph(text);
  b.listItem = "bullet";
  b.level = 1;
  return b;
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

const SLUG = "10-websites-in-30-days";

const post = {
  _type: "post",
  slug: { _type: "slug", current: SLUG },
  publishedAt: new Date().toISOString(),

  // ─── Traditional Chinese ───
  title_zhTw: "我在 30 天內打造了 10 個互動網頁",
  excerpt_zhTw:
    "在這個挑戰開始前，我從沒想過自己能做到。30 天、10 個為當地品牌重新設計的互動網站，這是一場沒有人監督、沒有人付錢，完全由我自導自演的瘋狂挑戰，也是我找到人生最愛做的事的起點。",
  body_zhTw: [
    block("成果 Showreel！"),
    paragraph(
      "在這個挑戰開始前，我從沒想過自己能做到。話不多說，先上這 10 個網站的精華螢幕錄影，這是我這 30 天的血淚成果："
    ),
    paragraph(
      "（Showreel 影片：請在 Sanity Studio 的 /studio 後台，於此處插入影片區塊或 Showreel 連結。）"
    ),

    divider(),
    block("挑戰背後的故事"),
    paragraph(
      "我一直對那些美到多巴胺大爆炸的酷酷網站毫無抵抗力。每次看到，心裡總有一個聲音在喊："
    ),
    blockquote("好想成為創造這種體驗的人啊！"),
    paragraph(
      "在這場挑戰之前，我憑著熱情做過兩個好玩的沉浸式實驗網站。做完後我很快樂，但心裡同時也很空落落。因為身為 UI/UX，我骨子裡希望我的設計能「解決真實問題、創造商業價值」，而不僅僅是好看而已。因為不知道這種技術怎麼落地到商業市場，我只好默默摸著鼻子，回去做原本常規的 UI/UX 工作。"
    ),
    paragraph("直到有天，我無意間看到 Olivier 的影片。"),
    paragraph(
      "那支影片像雷一樣劈中了我。我才驚覺，原來網頁世界有兩條截然不同的路：一條是比較廣為人知、講求規格與邏輯的 SaaS 產品；另一條則是強調感官體驗、專門用來品牌行銷與說故事的互動網頁。看完影片的那一刻我頭皮發麻，我以前總覺得自己不務正業、在浪費時間做沒意義的漂亮特效，**其實只是因為我不知道自己該歸屬於什麼框架。** 原來在國外，這群人叫做 Creative Developer。"
    ),
    paragraph(
      "知道了方向，我像是看到了歸途的小鳥，接下來，我必須努力茁壯翅膀飛到屬於我的巢穴中。"
    ),
    paragraph("**於是，這場 30 天做 10 個網站的瘋狂挑戰，誕生了。**"),
    paragraph(
      "我一開始的初衷很簡單：我想證明自己除了做藝術實驗，也能幫當地的真實品牌重新設計，透過頂級的動態視覺提升他們的品牌形象。但又覺得：誰會相信一個只有玩樂作品的毛頭小子？既然沒有機會，那我就自己去創造機會。我決定直接去研究當地的質感店家，親自幫他們重新設計、開發全新的網站，完成後直接把 demo 影片寄給老闆進行冷開發（Cold Outreach），這個瘋狂的點子也是受到 Olivier 的啟發，他的第一個案子，就是幫一個根本不知道自己需要網站的朋友做的。"
    ),

    divider(),
    block("中間的掙扎，自導自演的孤獨"),
    paragraph(
      "有了構想，但對自己的設計和開發能力還是滿滿的懷疑，再加上這是一場完全由我發起的挑戰，沒有人監督、沒有人期待、更沒有人會付我一毛錢，一切都是我自導自演。在卡關時，我常覺得自己很像電影裡的蜘蛛人，獨自一人打擊罪犯，那種不被理解、也沒人知道的孤獨感。"
    ),
    paragraph("在這個過程中，我的想法也一改再改："),
    bullet(
      "**前幾個網站：學到技能與經驗 > 真的接到案子。** 我只關注自己對這個品牌有沒有視覺想像、我想用的技術（如 GSAP）是不是我想學的，但持續了幾個網站，完全沒有任何店家回覆。"
    ),
    bullet(
      "**後幾個網站：真的接到案子 > 學到技能與經驗。** 挫折感讓我很現實地調整了策略，我開始思考這家店到底有沒有經費改版？現有網站到底有什麼嚴重的斷點是我的設計能幫他解決的？我也開始修改 Cold Email 的文案，深怕自己看起來就像另一個討人厭的垃圾推銷信。"
    ),
    paragraph(
      "對我來說最艱辛的，其實從來不是設計與寫程式碼，而是內心不斷 murmuring 的聲音。"
    ),
    paragraph("我每天找 target 店家時，腦袋裡總有惡魔的聲音在旋繞："),
    blockquote(
      "「人家現在網頁就用得好好的，你要改什麼？」「他們說不定根本不需要網頁找顧客啊。」「現有的網頁是別的設計師做的，你去瞎攪和什麼？」「老闆說不定根本不在乎網站長怎樣。」"
    ),
    paragraph(
      "伴隨著零回覆的巨大壓力，很多時候我真的覺得自己一事無成。"
    ),
    paragraph(
      "但神奇的是，每當我咬著牙把網頁開發完、親眼看到成品在瀏覽器裡流暢動起來的那一瞬間，內心的成就感又會瞬間爆棚，我能清晰地看到自己進步的痕跡，流程越來越順、卡關時能更快找到解法。"
    ),
    paragraph(
      "雖然始終沒有店家回信，但我突然發現：**天啊，我好像找到我這輩子最喜歡做的事了。** 這比我以前做 SaaS 產品時畫 User Flow、做競品調查，有意思太多了！"
    ),

    divider(),
    block("這場挑戰，我獲得了什麼？"),
    paragraph("「所以你真的做了一個月的白工嗎？」你可能會這麼問。"),
    paragraph(
      "其實在第一個禮拜，當 Cold Email 全部石沉大海時，我就覺得要有另一條路，於是決定要把這個歷程 Build in Public，一方面是讓我這個自導自演的過程能受到網友的遠端督促，另一方面或許能吸引到同頻、且真正有需求的業主。"
    ),
    paragraph(
      "一開始我其實也不抱期待，心想：誰想看一個人在網路上自嗨做網站啊？"
    ),
    paragraph(
      "但沒想到，真的有一群同頻的網友，開始對我正在做的事感到好奇，他們在底下留言、給我鼓勵和支持，更奇蹟的是，**我竟然真的因為這些公開紀錄，找到了主動想跟我合作的業主！** 這份幸運砸在我頭上時，我整個人都是懵的，雖然我的追蹤或觀看數字不是甚麼誇張大的數字，但對我來說已經足夠多、也足夠溫暖了。"
    ),
    paragraph(
      "回頭想想，在 30 天內爆發性做出 10 個網站，雖然有很大一部分是來自實作的成就感，但如果沒有這群網友的支持，我很有可能中途放棄，或是拖延到最後直接當作沒這回事，是社群的溫度，陪我把這場孤獨的挑戰給完成的。"
    ),

    divider(),
    block("下一步，然後呢？"),
    paragraph("做完這個挑戰，我就真的變成酷酷網站大師了嗎？"),
    paragraph(
      "當然還沒，我的路還很長，還有太多技術想學、太多視覺想嘗試，接下來就是跟願意相信我的業主們，把合作案完美上線，我希望有一天，我的開發與設計能力，可以真正並肩那些住在蒙特婁、巴黎大城市 Studio 的頂級創意開發者。"
    ),
    paragraph(
      "現在 AI 發展飛速，過去在做 SaaS UI/UX 時，我常常害怕自己有天會被 AI 取代；**但現在轉向做酷酷網站之後，我反而巴不得 AI 進步得更快一點！** 因為當它幫我處理掉那些重複的工作後，我才能釋放有更多時間精力，去創造出更前所未見的作品。"
    ),
    paragraph(
      "總之，這個挑戰結束後，我突然覺得自己對未來的想像，變得無比開闊與明朗，雖然路上或許依然會跌跌撞撞，但至少這條路是我自己選的，也是我真心熱愛的。"
    ),
    paragraph(
      "我是住在加拿大的 Carol，我的故事才剛開始，謝謝你看到最後，希望能帶給你一點啟發，也歡迎跟我聊聊或是追蹤我的社群帳號～"
    ),
  ],

  // ─── English ───
  title: "I Created 10 Creative Websites in 30 Days",
  excerpt:
    "Before this challenge started, I never thought I could pull it off. 30 days, 10 interactive websites redesigned for local brands, no one watching, no one paying me. It was a wild, self-directed challenge, and the moment I found the thing I love doing most.",
  body: [
    block("The Showreel"),
    paragraph(
      "Before this challenge started, I never thought I could pull it off. Enough talk, let me show you the highlight reel from all 10 sites first. This is what 30 days of blood, sweat, and tears looks like:"
    ),
    paragraph(
      "(Showreel video: add the video block or your showreel link right here from the Sanity Studio at /studio.)"
    ),

    divider(),
    block("The Story Behind the Challenge"),
    paragraph(
      "I've always been powerless against those jaw-dropping, dopamine-spiking websites. Every time I see one, a little voice inside me shouts:"
    ),
    blockquote("I so badly want to be the person who creates experiences like this!"),
    paragraph(
      "Before this challenge, I'd built two fun, immersive experimental sites purely out of passion. Finishing them made me happy, but there was also this hollow feeling afterward. As a UI/UX designer, deep down I want my work to solve real problems and create business value, not just look pretty. And because I had no idea how to bring this kind of craft into an actual market, I quietly swallowed my doubts and went back to my regular UI/UX job."
    ),
    paragraph("Then one day, I stumbled onto one of Olivier's videos."),
    paragraph(
      "That video hit me like a bolt of lightning. It made me realize there are two completely different paths in the web world. One is the more widely known SaaS product path, all about specs and logic. The other is the interactive web path, focused on sensory experience, built for brand marketing and storytelling. The second that video ended, my scalp was tingling. I used to think I was slacking off, wasting my time on pretty effects that meant nothing. **The truth was, I just didn't know which world I belonged to.** Turns out, in other countries, people like this have a name: Creative Developer."
    ),
    paragraph(
      "Once I knew the direction, I felt like a little bird that had finally spotted its way home. Now I just had to grow my wings strong enough to fly back to the nest that was meant for me."
    ),
    paragraph("**And so, this crazy challenge of building 10 websites in 30 days was born.**"),
    paragraph(
      "My original intention was simple. I wanted to prove that beyond art experiments, I could also redesign for real local brands and lift their image with top-tier motion visuals. But then I thought: who's going to trust some kid with nothing but playful side projects? If no one was going to give me the chance, then I'd create the chance myself. I decided to research beautiful local shops directly, redesign and build brand new sites for them on my own, and once finished, email the demo videos straight to the owners as cold outreach. This wild idea was also inspired by Olivier. His very first project was for a friend who didn't even know they needed a website."
    ),

    divider(),
    block("The Struggle in the Middle, and the Loneliness of a One-Person Show"),
    paragraph(
      "I had the idea, but I was still full of doubt about my own design and development skills. On top of that, this was a challenge I started entirely on my own. No one watching, no one expecting anything, and definitely no one paying me a cent. It was all a one-person show. Whenever I got stuck, I felt like Spider-Man in the movies, fighting crime alone, carrying that quiet loneliness of not being understood and not being seen."
    ),
    paragraph("Along the way, my thinking kept shifting:"),
    bullet(
      "**Early websites: learning skills and experience > actually landing a client.** I only cared whether I had a visual vision for the brand, and whether the tech I wanted to use (like GSAP) was something I actually wanted to learn. But after several sites, not a single shop replied."
    ),
    bullet(
      "**Later websites: actually landing a client > learning skills and experience.** The frustration made me get real and adjust my strategy. I started asking whether this shop even had the budget for a redesign, and what serious pain points in their current site my design could actually fix. I also started rewriting my cold emails, terrified of coming across as just another annoying spam pitch."
    ),
    paragraph(
      "For me, the hardest part was never the design or the code. It was the voice constantly murmuring inside my head."
    ),
    paragraph(
      "Every day, while hunting for target shops, a little devil's voice kept circling in my mind:"
    ),
    blockquote(
      "\"Their site works perfectly fine right now, so what are you even going to change?\" \"Maybe they don't need a website to find customers at all.\" \"Their current site was made by another designer, so who are you to butt in?\" \"The owner probably doesn't even care what the site looks like.\""
    ),
    paragraph(
      "With the crushing weight of zero replies, there were plenty of moments when I genuinely felt like I'd accomplished nothing."
    ),
    paragraph(
      "But here's the magical part. Every time I gritted my teeth, finished building a site, and watched the final product come to life smoothly in the browser, the sense of accomplishment inside me would instantly explode. I could clearly see the traces of my own progress. My process got smoother, and when I hit a wall, I found solutions faster."
    ),
    paragraph(
      "Even though no shop ever wrote back, I suddenly realized: **oh my gosh, I think I've found the thing I love doing most in my whole life.** This was so much more fun than drawing user flows and doing competitor research back when I worked on SaaS products!"
    ),

    divider(),
    block("So What Did I Actually Gain From This Challenge?"),
    paragraph("\"So did you really just work for free for a whole month?\" you might ask."),
    paragraph(
      "Actually, during the first week, when every cold email vanished into the void, I already felt I needed another path. So I decided to build this whole journey in public. Partly so my one-person show could get a little remote accountability from people online, and partly in the hope of attracting the kind of clients who were on the same wavelength and genuinely had a need."
    ),
    paragraph(
      "At first I honestly had no expectations. I figured, who wants to watch some person hyping themselves up building websites online?"
    ),
    paragraph(
      "But to my surprise, there really was a group of like-minded people who started getting curious about what I was doing. They left comments, cheered me on, and gave me support. Even more miraculously, **because of these public records, I actually found clients who wanted to work with me.** When that bit of luck landed on my head, I was completely stunned. My follower and view counts aren't some crazy huge numbers, but for me they were already more than enough, and warm enough."
    ),
    paragraph(
      "Looking back, building 10 websites in a 30-day burst came in large part from the thrill of actually making things. But without the support of these online friends, there's a real chance I would have given up halfway, or dragged it out until I quietly pretended it never happened. It was the warmth of the community that walked with me and helped me finish this lonely challenge."
    ),

    divider(),
    block("So, What's Next?"),
    paragraph("Now that the challenge is done, did I suddenly become a master of cool websites?"),
    paragraph(
      "Of course not. My road is still long. There's still so much tech I want to learn and so many visuals I want to try. Next up is bringing the projects with the clients who chose to believe in me perfectly to launch. My hope is that one day, my development and design skills can truly stand shoulder to shoulder with the top creative developers sitting in studios in big cities like Montreal and Paris."
    ),
    paragraph(
      "AI is developing at breakneck speed right now. Back when I did SaaS UI/UX, I often feared that one day I'd be replaced by AI. **But now that I've turned toward building cool websites, I actually can't wait for AI to get better even faster!** Because once it takes the repetitive work off my plate, I can free up more time and energy to create work the world has never seen before."
    ),
    paragraph(
      "In the end, once this challenge wrapped up, I suddenly felt like my vision for the future had become incredibly wide and clear. The road ahead might still be bumpy, but at least this is a path I chose for myself, and one I genuinely love."
    ),
    paragraph(
      "I'm Carol, living in Canada, and my story is only just beginning. Thank you for reading all the way to the end. I hope it brings you a little inspiration, and feel free to chat with me or follow my socials~"
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_WRITE_TOKEN=your_token node scripts/create-10-websites-30-days.mjs"
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
