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

// Supports **bold** and [link text](https://url) inline.
function paragraph(text) {
  const markDefs = [];
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  const children = parts
    .filter((part) => part !== "")
    .map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return {
          _type: "span",
          _key: key(),
          text: part.slice(2, -2),
          marks: ["strong"],
        };
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const defKey = key();
        markDefs.push({ _type: "link", _key: defKey, href: linkMatch[2] });
        return {
          _type: "span",
          _key: key(),
          text: linkMatch[1],
          marks: [defKey],
        };
      }
      return { _type: "span", _key: key(), text: part, marks: [] };
    });
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    children,
    markDefs,
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

// References an already-uploaded file asset in the Sanity dataset.
function video(assetRef, captionText, autoplay = false) {
  return {
    _type: "video",
    _key: key(),
    asset: { _type: "reference", _ref: assetRef },
    ...(autoplay ? { autoplay: true } : {}),
    caption: [paragraph(captionText)],
  };
}

const DEMO_VIDEO = "file-9874de25105efedbc8e9642f51ec2409da930824-mp4";
const SPIKE_VIDEO = "file-c376053b4e783d85beb5f4256964e134c31e21ab-mp4";
const LAB_VIDEO = "file-4544fac10ece29d221e3e649e1c614a48a9420ce-mp4";

const SLUG = "how-i-built-rewrite-in-two-weeks";
const PLAY_URL = "https://rewrite.carolhsiao.com/";

const post = {
  _type: "post",
  slug: { _type: "slug", current: SLUG },
  publishedAt: "2026-07-17T20:26:39.884Z",

  // ─── Traditional Chinese ───
  title_zhTw: "Re:write，改寫你的人生！我用兩週實作了一個互動敘事網站",
  excerpt_zhTw:
    "「人生就像一場電腦遊戲，你一直握有掌控權。」這篇文章拆解我如何在 AI 的幫助下，兩週內完成 Re:write 這個互動敘事網站，以及「把素材變成程式碼」這個關鍵決定，如何徹底改變了迭代速度。",
  body_zhTw: [
    block("Re:write，你是人生這場遊戲的主角！"),
    blockquote("人生就像一場電腦遊戲，你一直握有掌控權"),
    paragraph(
      `這是 Re:write 這個互動網頁想帶來的啟發。這篇文章將會拆解我是怎麼透過 AI 幫助，實作兩週就完成這個專案，若還沒有體驗過 Re:write，歡迎先[去玩玩看](${PLAY_URL})！`
    ),
    video(DEMO_VIDEO, "Re:write Demo Video"),

    divider(),
    block("起心動念"),
    paragraph(
      "起初是看到一個 Instagram reel，內容在講人生就像遊戲一樣，大家都擁有掌控權，但是不知道 controller 就握在自己手裡。我對這篇 reel 很有共鳴，因為一直很想做一個運用 three.js 講故事的網頁，就決定動手了！"
    ),

    divider(),
    block("架構與發想過程"),
    paragraph(
      "一開始畫了 wireframe，來思考甚麼時候斷句、甚麼時候當作一個 scene、甚麼時候會需要轉折、哪些地方是 highlight 等等。"
    ),
    paragraph(
      "但就算畫好畫面、腦海中有大概的方向，還是不確定在實作上能做到甚麼程度，所以決定要先做 spike：全部用 placeholder 去把會有甚麼圖層、文字會怎麼出現、角色會怎麼移動，還有轉場的特效會怎麼呈現都先做出來。"
    ),
    paragraph(
      "我想要的畫面是可以互動的 2.5D 視覺，滑鼠在上面移動會有視覺落差，並且角色會隨著滾輪滑動而移動，文字也會跟著角色和背景出現。在這階段主要是確認想要實現的畫面技術上可行。"
    ),
    video(SPIKE_VIDEO, "Re:write Spike Video"),
    paragraph(
      "就算 spike 證明技術上可實現，轉場的畫面也很重要，所以也做了一個轉場的 lab，套用 post-processing 的特效，去實驗這些特效在畫面上的實際效果如何。"
    ),
    video(LAB_VIDEO, "Re:write Demo Video"),

    divider(),
    block("正式實作"),
    paragraph(
      "畫面的 spike 跟轉場的實驗都告一段落後，在正式開始量產內容之前，我先做了整備：把資料模型寫成規格，這樣後續增加場景只要照規格填表就好，不用一直重寫架構；並且訂下整個網站的座標軸，讓全部的故事線是一個 0~1 的進度值，所有場景、文字、動畫都掛在這個數字上，而且避免讓捲動的更新導致 React 重繪，讓效能不要崩潰。"
    ),
    paragraph(
      "整備完，接下來就要來面對素材了！對於素材我是最沒有把握的，因為想要走手繪風格，但又怕自己的畫畫能力不足以呈現夠好的畫面。動手設計了主角小幽靈的造型、定調了風格之後，就有點半放棄，覺得這樣產素材不知道要做到何年何月，但我發現 Claude Fable 竟然可以寫一支程式把圖算出來！"
    ),

    divider(),
    block("兩週完成實作的關鍵！我的素材是程式碼"),
    paragraph(
      "Fable 先幫自己寫了一套手繪筆刷，並且幫每個場景都寫函式套用這些筆刷組合，所以**我的素材不是圖檔，是程式碼，改圖不用重畫！**"
    ),
    paragraph(
      "舉例來說，如果我要改主角的樣子，我只要下一個 prompt 像是：給幽靈加上小手，它改個幾行程式碼後重跑一次腳本，就能產出新的圖。這就是迭代速度的關鍵，如果素材是一張一張畫的，就絕對沒辦法這麼快完成。"
    ),
    paragraph(
      "而且那時候 Fable 剛出來，說只會開放幾天能用，所以我有天一次推了 54 個 commit，一天內把主要素材都產完了。做完之後才發現 Fable reset 了，根本可以慢慢來不用急…。"
    ),

    divider(),
    block("收尾"),
    paragraph(
      "雖然一天內做完主要的素材，但後續的收尾工作其實也持續了一週左右。最花功夫的是手機：滑鼠滾輪的體驗在觸控螢幕上完全是另一回事，思考了一下後重新做了手勢按鈕和進度 UI，還要處理手機瀏覽器的自動播放限制，讓靜音模式下開了聲音後也可以聽到音效。"
    ),
    paragraph(
      "最後加上了 reduced-motion 支援，如果系統有設定「減少動態效果」的使用者，進來時背景動畫就會自動停用。到此這個專案就差不多告一段落了。"
    ),

    divider(),
    block("工作流程"),
    paragraph("這個專案如下："),
    numbered("先問清楚要解決什麼（概念先行，而不是先挑效果）。"),
    numbered("投入之前就知道技術行不行，先 spike 確認技術狀況。"),
    numbered("把架構寫成規格，讓後面的內容能量產、能交接、能改。"),
    numbered("效能和真實使用者，手機、無障礙、瀏覽器限制都是交付的一部分。"),
    paragraph(
      "AI 改變的是執行速度，但概念、故事、美術方向，還有上千個「感覺對不對」的決定，仍然得有人做。**現在稀缺的不是把東西做出來的能力，是知道什麼值得做、以及分辨它是否有做對。**"
    ),

    divider(),
    block("結論"),
    paragraph(
      "Fable 讓我有機會把一個概念型專案快速落地，能生在這個技術奇異點的時代真的很有趣。但真正讓這個專案成立的，是把素材變成程式碼的那個決定，還有前面那些看起來很慢的 wireframe 和 spike。"
    ),
    paragraph("希望這篇對你有一點啟發！"),
    paragraph(
      "如果你正在想做一個互動敘事網站、品牌體驗的網頁，歡迎找我聊聊～"
    ),
  ],

  // ─── English ───
  title: "Rewrite Your Life! How I Built an Interactive Storytelling Site in Two Weeks",
  excerpt:
    "Life is like a video game, and you have been holding the controller all along. This is the story of how I built Re:write, an interactive storytelling website, in just two weeks with help from AI, and how the decision to turn my assets into code changed everything.",
  body: [
    block("Re:write, You Are the Main Character of This Game Called Life!"),
    blockquote("Life is like a video game, and you have been holding the controller all along"),
    paragraph(
      `That is the idea Re:write hopes to leave you with. In this post I will break down how, with help from AI, I built and shipped this project in just two weeks. If you have not experienced Re:write yet, feel free to [go play it first](${PLAY_URL})!`
    ),
    video(DEMO_VIDEO, "Re:write Demo Video"),

    divider(),
    block("Where the Idea Came From"),
    paragraph(
      "It all started with an Instagram reel about how life is just like a game. Everyone has control, but most people do not realize the controller is already in their hands. That reel really resonated with me. I had been wanting to build a storytelling website with three.js for a long time, so I decided it was finally time to do it!"
    ),

    divider(),
    block("Structure and Ideation"),
    paragraph(
      "I started by drawing wireframes to think through where the sentences should break, what counts as a scene, where the story needs a turning point, and which moments should be highlights."
    ),
    paragraph(
      "But even with the wireframes done and a rough direction in my head, I still was not sure how much of it I could actually pull off. So I decided to build a spike first. That means using placeholders for everything, just to work out what layers there would be, how the text would appear, how the character would move, and how the transition effects would play out."
    ),
    paragraph(
      "The visual I wanted was an interactive 2.5D scene. Moving the mouse creates parallax, the character moves as you scroll, and text shows up along with the character and the background. The main goal at this stage was to confirm that the picture in my head was technically possible."
    ),
    video(SPIKE_VIDEO, "Re:write spike video"),
    paragraph(
      "Even though the spike proved the tech could work, the transitions between scenes mattered just as much. So I also built a small transition lab, applying post-processing effects to see how they would actually feel on screen."
    ),
    video(LAB_VIDEO, "Re:write lab video"),

    divider(),
    block("Building It for Real"),
    paragraph(
      "Once the spike and the transition experiments wrapped up, I did one more round of prep before mass-producing content. I wrote the data model down as a spec, so adding a scene later would just mean filling in a table instead of rewriting the architecture every time. I also defined one axis for the whole site: the entire storyline is a single progress value from 0 to 1, and every scene, every line of text, and every animation hangs off that number. On top of that, I made sure scroll updates would not trigger React re-renders, so performance would not fall apart."
    ),
    paragraph(
      "With the prep done, it was time to face the assets. This was the part I felt least confident about. I wanted a hand-drawn style, but I was worried my drawing skills were not good enough to make it look right. After designing the little ghost main character and locking in the style, I half gave up, thinking that producing all the assets by hand would take forever. Then I discovered that Claude Fable could actually write a program to generate the images!"
    ),

    divider(),
    block("The Key to Shipping in Two Weeks: My Assets Are Code"),
    paragraph(
      "Fable first wrote itself a set of hand-drawn brushes, then wrote a function for each scene that combines those brushes. So **my assets are not image files, they are code, and changing a picture does not mean redrawing it!**"
    ),
    paragraph(
      "For example, if I want to change the main character, I just give it a prompt like: add little hands to the ghost. It tweaks a few lines of code, reruns the script, and out comes the new image. That is the key to iteration speed. If every asset had to be drawn one by one, there is no way this could have been finished so fast."
    ),
    paragraph(
      "Also, Fable had just come out at the time and was supposedly only available for a few days, so one day I pushed 54 commits and generated all the main assets in a single day. Only after finishing did I find out Fable had reset, so I could have taken my time after all..."
    ),

    divider(),
    block("Wrapping Up"),
    paragraph(
      "Even though the main assets were done in a day, the finishing work still went on for about another week. The most demanding part was mobile. The mouse wheel experience is a completely different story on a touch screen, so after some thought I rebuilt it with gesture buttons and a progress UI. I also had to deal with autoplay restrictions in mobile browsers, so that once you turn on the audio, the sound effects still play even in silent mode."
    ),
    paragraph(
      "Finally, I added reduced-motion support. If someone has reduce motion turned on in their system settings, the background animation switches off automatically when they visit. And with that, the project was pretty much done."
    ),

    divider(),
    block("My Workflow"),
    paragraph("The flow of this project is as follow:"),
    numbered(
      "Ask what problem we are solving first (concept comes before picking effects)."
    ),
    numbered(
      "Know whether the tech will hold up before committing, by running a spike first."
    ),
    numbered(
      "Write the architecture down as a spec, so the content after it can be mass-produced, handed over, and changed."
    ),
    numbered(
      "Care about performance and real users. Mobile, accessibility, and browser quirks are all part of the deliverable."
    ),
    paragraph(
      "AI changed the speed of execution, but the concept, the story, the art direction, and the thousands of does-this-feel-right decisions still need a human. **What is scarce now is not the ability to build things. It is knowing what is worth building, and being able to tell whether it turned out right.**"
    ),

    divider(),
    block("Final Thoughts"),
    paragraph(
      "Fable gave me the chance to take a concept-driven project and land it fast, and being alive at this technological singularity is genuinely fun. But what really made this project work was the decision to turn assets into code, plus all those wireframes and spikes earlier that looked slow at the time."
    ),
    paragraph("I hope this post gives you a little inspiration!"),
    paragraph(
      "If you are thinking about building an interactive storytelling site or a brand experience on the web, feel free to reach out and chat with me~"
    ),
  ],
};

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) env var is required.\n" +
        "Get one at: https://www.sanity.io/manage/project/z4kjle0n/api#tokens\n" +
        "Then run: SANITY_WRITE_TOKEN=your_token node scripts/create-rewrite-week-build.mjs"
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
