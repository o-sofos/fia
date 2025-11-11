import { FlickElement } from "./core";

// --- Main Root ---
/** Creates a `<div>` element. */
export const html = () => new FlickElement("html");
/** Creates a `<head>` element. */
export const head = () => new FlickElement("head");
/** Creates a `<body>` element. */
export const body = () => new FlickElement("body");

// --- Document Metadata (Mainly for <head>) ---
export const title = () => new FlickElement("title");
export const base = () => new FlickElement("base");
export const link = () => new FlickElement("link");
export const meta = () => new FlickElement("meta");
export const style = () => new FlickElement("style");
export const script = () => new FlickElement("script");
export const noscript = () => new FlickElement("noscript");

// --- Sectioning Root ---
export const main = () => new FlickElement("main");

// --- Content Sectioning ---
export const section = () => new FlickElement("section");
export const article = () => new FlickElement("article");
export const aside = () => new FlickElement("aside");
export const header = () => new FlickElement("header");
export const footer = () => new FlickElement("footer");
export const nav = () => new FlickElement("nav");
export const address = () => new FlickElement("address");
export const h1 = () => new FlickElement("h1");
export const h2 = () => new FlickElement("h2");
export const h3 = () => new FlickElement("h3");
export const h4 = () => new FlickElement("h4");
export const h5 = () => new FlickElement("h5");
export const h6 = () => new FlickElement("h6");

// --- Text Content ---
export const p = () => new FlickElement("p");
export const a = () => new FlickElement("a");
export const span = () => new FlickElement("span");
export const em = () => new FlickElement("em");
export const strong = () => new FlickElement("strong");
export const small = () => new FlickElement("small");
export const s = () => new FlickElement("s");
export const cite = () => new FlickElement("cite");
export const q = () => new FlickElement("q");
export const blockquote = () => new FlickElement("blockquote");
export const i = () => new FlickElement("i");
export const b = () => new FlickElement("b");
export const u = () => new FlickElement("u");
export const sub = () => new FlickElement("sub");
export const sup = () => new FlickElement("sup");
export const code = () => new FlickElement("code");
export const pre = () => new FlickElement("pre");
export const br = () => new FlickElement("br");
export const hr = () => new FlickElement("hr");
export const div = () => new FlickElement("div");
export const time = () => new FlickElement("time");
export const data = () => new FlickElement("data");
export const mark = () => new FlickElement("mark");
export const ruby = () => new FlickElement("ruby");
export const rt = () => new FlickElement("rt");
export const rp = () => new FlickElement("rp");
export const bdi = () => new FlickElement("bdi");
export const bdo = () => new FlickElement("bdo");
export const wbr = () => new FlickElement("wbr");

// --- List Content ---
export const ul = () => new FlickElement("ul");
export const ol = () => new FlickElement("ol");
export const li = () => new FlickElement("li");
export const dl = () => new FlickElement("dl");
export const dt = () => new FlickElement("dt");
export const dd = () => new FlickElement("dd");

// --- Form Content ---
export const form = () => new FlickElement("form");
export const input = () => new FlickElement("input");
export const textarea = () => new FlickElement("textarea");
export const button = () => new FlickElement("button");
export const label = () => new FlickElement("label");
export const select = () => new FlickElement("select");
export const option = () => new FlickElement("option");
export const optgroup = () => new FlickElement("optgroup");
export const fieldset = () => new FlickElement("fieldset");
export const legend = () => new FlickElement("legend");
export const datalist = () => new FlickElement("datalist");
export const output = () => new FlickElement("output");
export const progress = () => new FlickElement("progress");
export const meter = () => new FlickElement("meter");

// --- Embedded Content & Media ---
export const img = () => new FlickElement("img");
export const video = () => new FlickElement("video");
export const audio = () => new FlickElement("audio");
export const source = () => new FlickElement("source");
export const track = () => new FlickElement("track");
export const map = () => new FlickElement("map");
export const area = () => new FlickElement("area");
export const iframe = () => new FlickElement("iframe");
export const embed = () => new FlickElement("embed");
export const object = () => new FlickElement("object");
export const param = () => new FlickElement("param");
export const picture = () => new FlickElement("picture");
export const canvas = () => new FlickElement("canvas");

// --- Table Content ---
export const table = () => new FlickElement("table");
export const thead = () => new FlickElement("thead");
export const tbody = () => new FlickElement("tbody");
export const tfoot = () => new FlickElement("tfoot");
export const tr = () => new FlickElement("tr");
export const th = () => new FlickElement("th");
export const td = () => new FlickElement("td");
export const caption = () => new FlickElement("caption");
export const col = () => new FlickElement("col");
export const colgroup = () => new FlickElement("colgroup");

// --- Interactive Elements ---
export const details = () => new FlickElement("details");
export const summary = () => new FlickElement("summary");
export const dialog = () => new FlickElement("dialog");
export const menu = () => new FlickElement("menu");

// --- Web Components ---
export const slot = () => new FlickElement("slot");
export const template = () => new FlickElement("template");

// It's best to avoid these, but they can be included for completeness.
// export const acronym = () => new FlickElement('acronym');
// export const big = () => new FlickElement('big');
// export const center = () => new FlickElement('center');
// export const font = () => new FlickElement('font');
// export const frame = () => new FlickElement('frame');
// export const frameset = () => new FlickElement('frameset');
// export const marquee = () => new FlickElement('marquee');
// export const noframes = () => new FlickElement('noframes');
// export const strike = () => new FlickElement('strike');
// export const tt = () => new FlickElement('tt');
