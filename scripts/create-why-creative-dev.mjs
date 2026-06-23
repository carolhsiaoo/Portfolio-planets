import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "z4kjle0n",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
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

const post = {
  _type: "post",
  slug: { _type: "slug", current: "why-creative-developer" },
  publishedAt: new Date().toISOString(),

  // ─── Traditional Chinese ───
  title_zhTw: "為什麼我選擇成為創意開發者",
  excerpt_zhTw:
    "身而為人，我可以為我的生命帶來什麼意義？過去我很長一段時間都在糾結這個大哉問，直到有天我看到一句話，直接點醒了我的迷茫。",
  body_zhTw: [
    block("大哉問的終點，是創造的起點"),
    paragraph(
      "身而為人，我可以為我的生命帶來什麼意義？"
    ),
    paragraph(
      "過去我很長一段時間都在糾結這個大哉問，不斷地追逐和尋找：我到底為什麼要誕生在世界上？直到有天我看到這句話，直接點醒了我的迷茫："
    ),
    blockquote(
      "「不要去思考人生有什麼意義，而是你可以為你的生命帶來什麼意義。」"
    ),
    paragraph(
      "對啊，人生本來就很像一場**沙盒遊戲**，我們生來就是為了**體驗**和**創造**。既然死了之後什麼都帶不走，那何不就透過創造來豐富過程，自己賦予這場遊戲一個好玩的意義？"
    ),

    divider(),
    block("那些閃閃發光的創造者們"),
    paragraph(
      "放眼望去，在我眼中閃閃發光的人生，幾乎都跟「創造」脫離不了關係。不管是歌手、藝術家、設計師、攝影師還是作家，他們透過自己的媒介，傳達出靈魂深處的聲音，讓人們在螢幕前感到共鳴和療癒。這種**想像與情緒的傳達**，就是人類最無可取代的價值。"
    ),
    paragraph(
      "其實從高中開始，我就很喜歡科技，總覺得科技可以改變人類，甚至因此立下了進入科技業的目標。因為同時也熱愛設計，我後來順理成章地成為了一名 UI/UX 設計師。"
    ),
    paragraph(
      "一路上矇矇懂懂地學習，實習、畢業、進入科技公司。我完成了當初設定的目標，卻發現自己陷入了**前所未有的空虛**。"
    ),
    paragraph(
      "我發現，真實的科技業與我當初想像的「改變世界」有著巨大的落差。我沒有不喜歡這份工作，但也沒有到真的熱愛。很多時候，我只是在日復一日地**「生存」**著。直到後來生活環境迎來一場大轉變，強迫我停下腳步，重新審視我的職涯道路。"
    ),

    divider(),
    block("為什麼是創意網頁？因為我想打造極致的體驗"),
    paragraph(
      "就在那個迷茫的時期，我在社群上讀到了一句話："
    ),
    blockquote(
      "\"We survive on technology, but we live for art.\" (我們依靠科技生存，卻為了藝術而活。)"
    ),
    paragraph(
      "如果說科技是為了讓我們活著，那**藝術與美**，就是我們想生活下去的唯一動力。我曾夢想用科技改變世界，但我發現這個世界其實已經被科技改變得太快了，而且那個掌控權從不在我們手裡，是在科技巨頭的董事會與大老闆手中。"
    ),
    paragraph(
      "那一刻我突然明白了：我能為生命帶來的意義，不是去科技公司當一顆隨時可被取代的螺絲釘，而是成為那個**透過創作、去表達內心聲音的人**。"
    ),
    paragraph(
      "而且，如果人生來是為了體驗，那麼「**成為創造體驗的人**」，該是一件多麼夢幻的工作？這就是為什麼我決定把自己重新定義為一名 **Creative Developer（創意開發者）**。"
    ),
    paragraph(
      "我不再滿足於設計出標準化的介面，或是寫出死板的網頁功能。我想要**融合設計的感性與程式的理性**，去掌控網頁上的空間和感官體驗。利用程式碼作為畫筆，在數位世界裡創造出讓人產生共鳴、感到幸福、療癒、震撼甚至醒悟的**極致體驗**。"
    ),

    divider(),
    block("我們靠科技生存，卻為藝術而活"),
    paragraph(
      "看看現在的世界，人類其實什麼也不匱乏了。在大部分地方，我們不再需要為了生存去捕獵種田，輕鬆就能取得食物與遮風避雨的家。科技只會越來越發達，甚至等到馬斯克預言的「人類不再需要工作」的那一天到來，我時常在想：到那時候，**我的價值會是什麼**？"
    ),
    paragraph(
      "既然沒有標準答案，那就**自己創造**！我想要透過創作為我的人生帶來意義。"
    ),
    paragraph(
      "這就是我的 **Why**！這條路或許沒有標準公式，也許一開始會走得跌跌撞撞，但一成不變、一眼望到頭的人生，從來就不是我所嚮往的。"
    ),
    paragraph(
      "謝謝你看到最後～希望這篇文章可以給你一些啟發，如果你也是一個注重體驗、想傳遞靈魂溫度的創作者或品牌主，我想我們是**同頻的人**。"
    ),
  ],

  // ─── English ───
  title: "Why I Chose to Become a Creative Developer",
  excerpt:
    "What meaning can I bring to my life? I spent a long time wrestling with this existential question, until one day a single sentence cut straight through the fog.",
  body: [
    block("Where the Big Question Ends, Creation Begins"),
    paragraph(
      "As a human being, what meaning can I bring to my own life?"
    ),
    paragraph(
      "I spent a long time tangled up in this existential question, constantly chasing and searching: why was I even put on this earth? Until one day I stumbled upon a line that snapped me wide awake:"
    ),
    blockquote(
      "\"Don't ask what meaning life has. Ask what meaning you can bring to your life.\""
    ),
    paragraph(
      "Of course. Life is essentially a **sandbox game**. We're born to **experience** and to **create**. Since we can't take anything with us when we leave, why not enrich the journey through creation and give this whole game a meaning worth playing for?"
    ),

    divider(),
    block("The Creators Who Shine the Brightest"),
    paragraph(
      "When I look around, the lives that glow the brightest in my eyes are almost always inseparable from **creation**. Singers, artists, designers, photographers, writers: they each channel the voice buried deep in their soul through their chosen medium, sparking resonance and healing in people sitting behind their screens. This **transmission of imagination and emotion** is humanity's most irreplaceable superpower."
    ),
    paragraph(
      "Ever since high school, I've been fascinated by technology. I genuinely believed tech could transform the human experience, and I set my sights on breaking into the industry. Because I also loved design, I naturally gravitated toward becoming a UI/UX designer."
    ),
    paragraph(
      "I fumbled my way through learning, interning, graduating, and landing a job at a tech company. I hit the goal I'd set for myself, only to discover I was sinking into an **emptiness I'd never felt before**."
    ),
    paragraph(
      "The real tech industry had a massive gap from the \"changing the world\" narrative I'd bought into. I didn't hate the work, but I didn't truly love it either. Most days, I was just **surviving** on autopilot. Then a major life upheaval forced me to stop and take a hard look at where my career was actually headed."
    ),

    divider(),
    block("Why Creative Web? Because I Want to Craft Experiences That Move People"),
    paragraph(
      "Right in the middle of that fog, I came across a quote on social media:"
    ),
    blockquote(
      "\"We survive on technology, but we live for art.\""
    ),
    paragraph(
      "If technology keeps us alive, then **art and beauty** are the reason we want to stay alive. I once dreamed of changing the world through tech, but I realized the world was already being reshaped by technology at breakneck speed, and the steering wheel was never in our hands. It's in the boardrooms and corner offices of tech giants."
    ),
    paragraph(
      "In that moment, it hit me: the meaning I can bring to my life isn't being a replaceable cog inside a tech corporation. It's becoming the person who **expresses their inner voice through creation**."
    ),
    paragraph(
      "And think about it: if we're born to experience, then \"**becoming the person who creates experiences**\" has to be one of the most dreamlike jobs in existence. That's exactly why I decided to redefine myself as a **Creative Developer**."
    ),
    paragraph(
      "I'm no longer satisfied designing cookie-cutter interfaces or writing rigid web features. I want to **fuse the sensibility of design with the precision of code**, to orchestrate space and sensation on the web. Using code as my paintbrush, I want to craft **ultimate experiences** in the digital world that make people feel resonance, joy, healing, awe, even a moment of awakening."
    ),

    divider(),
    block("We Survive on Technology, but We Live for Art"),
    paragraph(
      "Look at the world today. Humanity doesn't really lack for anything anymore. In most places, we no longer need to hunt or farm to survive; food and shelter are a tap away. Technology will only keep accelerating, and when the day Elon Musk predicts finally arrives, the day humans no longer need to work, I keep asking myself: **what will my value be then?**"
    ),
    paragraph(
      "Since there's no standard answer, I'll **create my own**. I want to bring meaning to my life through the act of creation."
    ),
    paragraph(
      "This is my **Why**. This path has no standard formula, and the early steps might be rough, but a life that's unchanging and predictable from start to finish was never what I aspired to."
    ),
    paragraph(
      "Thanks for reading all the way to the end. I hope this piece sparks something in you. If you're a creator or brand builder who cares deeply about experience and wants to transmit the warmth of the human soul, I have a feeling we're **on the same wavelength**."
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_WRITE_TOKEN=your_token node scripts/create-why-creative-dev.mjs"
    );
    process.exit(1);
  }

  try {
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == "why-creative-developer"][0]._id`
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
