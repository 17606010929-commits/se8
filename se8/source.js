const BASE = "https://se8.us";

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });
  const text = await res.text();
  return HTML.parse(text);
}

async function getMangaList(page = 1) {
  const url = `${BASE}/page/${page}`;
  const $ = await fetchHtml(url);
  return $(".novellist li").map(el => ({
    id: $(el).find("a").attr("href"),
    title: $(el).find("h3").text(),
    cover: $(el).find("img").attr("src")
  }));
}

async function getMangaDetails(id) {
  const $ = await fetchHtml(id);
  return {
    title: $("h1").text(),
    description: $(".intro").text(),
    cover: $(".detail img").attr("src"),
    status: "ONGOING"
  };
}

async function getChapters(id) {
  const $ = await fetchHtml(id);
  return $(".chapter_list li").map(el => ({
    id: $(el).find("a").attr("href"),
    title: $(el).find("a").text()
  }));
}

async function getChapterPages(id) {
  const $ = await fetchHtml(id);
  return $("img.img-responsive").map(img => $(img).attr("src"));
}

async function searchManga(query, page = 1) {
  const url = `${BASE}/search?keyword=${encodeURIComponent(query)}&page=${page}`;
  const $ = await fetchHtml(url);
  return $(".novellist li").map(el => ({
    id: $(el).find("a").attr("href"),
    title: $(el).find("h3").text(),
    cover: $(el).find("img").attr("src")
  }));
}

export default {
  getMangaList,
  getMangaDetails,
  getChapters,
  getChapterPages,
  searchManga
};
