import { FlickElement } from "./core";

// --- Main Root ---
/** Creates a `<html>` element. */
export const html = () => new FlickElement("html");
/** Creates a `<head>` element. */
export const head = () => new FlickElement("head");
/** Creates a `<body>` element. */
export const body = () => new FlickElement("body");

// --- Document Metadata (Mainly for <head>) ---
/** Creates a `<title>` element. */
export const title = () => new FlickElement("title");
/** Creates a `<base>` element. */
export const base = () => new FlickElement("base");
/** Creates a `<link>` element. */
export const link = () => new FlickElement("link");
/** Creates a `<meta>` element. */
export const meta = () => new FlickElement("meta");
/** Creates a `<style>` element. */
export const style = () => new FlickElement("style");
/** Creates a `<script>` element. */
export const script = () => new FlickElement("script");
/** Creates a `<noscript>` element. */
export const noscript = () => new FlickElement("noscript");

// --- Sectioning Root ---
/** Creates a `<main>` element. */
export const main = () => new FlickElement("main");

// --- Content Sectioning ---
/** Creates a `<section>` element. */
export const section = () => new FlickElement("section");
/** Creates a `<article>` element. */
export const article = () => new FlickElement("article");
/** Creates an `<aside>` element. */
export const aside = () => new FlickElement("aside");
/** Creates a `<header>` element. */
export const header = () => new FlickElement("header");
/** Creates a `<footer>` element. */
export const footer = () => new FlickElement("footer");
/** Creates a `<nav>` element. */
export const nav = () => new FlickElement("nav");
/** Creates an `<address>` element. */
export const address = () => new FlickElement("address");
/** Creates an `<h1>` element. */
export const h1 = () => new FlickElement("h1");
/** Creates an `<h2>` element. */
export const h2 = () => new FlickElement("h2");
/** Creates an `<h3>` element. */
export const h3 = () => new FlickElement("h3");
/** Creates an `<h4>` element. */
export const h4 = () => new FlickElement("h4");
/** Creates an `<h5>` element. */
export const h5 = () => new FlickElement("h5");
/** Creates an `<h6>` element. */
export const h6 = () => new FlickElement("h6");

// --- Text Content ---
/** Creates a `<p>` element. */
export const p = () => new FlickElement("p");
/** Creates an `<a>` (anchor) element. */
export const a = () => new FlickElement("a");
/** Creates a `<span>` element. */
export const span = () => new FlickElement("span");
/** Creates an `<em>` (emphasis) element. */
export const em = () => new FlickElement("em");
/** Creates a `<strong>` element. */
export const strong = () => new FlickElement("strong");
/** Creates a `<small>` element. */
export const small = () => new FlickElement("small");
/** Creates an `<s>` (strikethrough) element. */
export const s = () => new FlickElement("s");
/** Creates a `<cite>` element. */
export const cite = () => new FlickElement("cite");
/** Creates a `<q>` (inline quote) element. */
export const q = () => new FlickElement("q");
/** Creates a `<blockquote>` element. */
export const blockquote = () => new FlickElement("blockquote");
/** Creates an `<i>` (italic) element. */
export const i = () => new FlickElement("i");
/** Creates a `<b>` (bold) element. */
export const b = () => new FlickElement("b");
/** Creates a `<u>` (underline) element. */
export const u = () => new FlickElement("u");
/** Creates a `<sub>` (subscript) element. */
export const sub = () => new FlickElement("sub");
/** Creates a `<sup>` (superscript) element. */
export const sup = () => new FlickElement("sup");
/** Creates a `<code>` element. */
export const code = () => new FlickElement("code");
/** Creates a `<pre>` (preformatted text) element. */
export const pre = () => new FlickElement("pre");
/** Creates a `<br>` (line break) element. */
export const br = () => new FlickElement("br");
/** Creates an `<hr>` (horizontal rule) element. */
export const hr = () => new FlickElement("hr");
/** Creates a `<div>` element. */
export const div = () => new FlickElement("div");
/** Creates a `<time>` element. */
export const time = () => new FlickElement("time");
/** Creates a `<data>` element. */
export const data = () => new FlickElement("data");
/** Creates a `<mark>` element. */
export const mark = () => new FlickElement("mark");
/** Creates a `<ruby>` element. */
export const ruby = () => new FlickElement("ruby");
/** Creates an `<rt>` (ruby text) element. */
export const rt = () => new FlickElement("rt");
/** Creates an `<rp>` (ruby parenthesis) element. */
export const rp = () => new FlickElement("rp");
/** Creates a `<bdi>` (bi-directional isolation) element. */
export const bdi = () => new FlickElement("bdi");
/** Creates a `<bdo>` (bi-directional override) element. */
export const bdo = () => new FlickElement("bdo");
/** Creates a `<wbr>` (word break opportunity) element. */
export const wbr = () => new FlickElement("wbr");

// --- List Content ---
/** Creates a `<ul>` (unordered list) element. */
export const ul = () => new FlickElement("ul");
/** Creates an `<ol>` (ordered list) element. */
export const ol = () => new FlickElement("ol");
/** Creates an `<li>` (list item) element. */
export const li = () => new FlickElement("li");
/** Creates a `<dl>` (description list) element. */
export const dl = () => new FlickElement("dl");
/** Creates a `<dt>` (description term) element. */
export const dt = () => new FlickElement("dt");
/** Creates a `<dd>` (description details) element. */
export const dd = () => new FlickElement("dd");

// --- Form Content ---
/** Creates a `<form>` element. */
export const form = () => new FlickElement("form");
/** Creates an `<input>` element. */
export const input = () => new FlickElement("input");
/** Creates a `<textarea>` element. */
export const textarea = () => new FlickElement("textarea");
/** Creates a `<button>` element. */
export const button = () => new FlickElement("button");
/** Creates a `<label>` element. */
export const label = () => new FlickElement("label");
/** Creates a `<select>` element. */
export const select = () => new FlickElement("select");
/** Creates an `<option>` element. */
export const option = () => new FlickElement("option");
/** Creates an `<optgroup>` element. */
export const optgroup = () => new FlickElement("optgroup");
/** Creates a `<fieldset>` element. */
export const fieldset = () => new FlickElement("fieldset");
/** Creates a `<legend>` element. */
export const legend = () => new FlickElement("legend");
/** Creates a `<datalist>` element. */
export const datalist = () => new FlickElement("datalist");
/** Creates an `<output>` element. */
export const output = () => new FlickElement("output");
/** Creates a `<progress>` element. */
export const progress = () => new FlickElement("progress");
/** Creates a `<meter>` element. */
export const meter = () => new FlickElement("meter");

// --- Embedded Content & Media ---
/** Creates an `<img>` (image) element. */
export const img = () => new FlickElement("img");
/** Creates a `<video>` element. */
export const video = () => new FlickElement("video");
/** Creates an `<audio>` element. */
export const audio = () => new FlickElement("audio");
/** Creates a `<source>` element. */
export const source = () => new FlickElement("source");
/** Creates a `<track>` element. */
export const track = () => new FlickElement("track");
/** Creates a `<map>` element. */
export const map = () => new FlickElement("map");
/** Creates an `<area>` element. */
export const area = () => new FlickElement("area");
/** Creates an `<iframe>` element. */
export const iframe = () => new FlickElement("iframe");
/** Creates an `<embed>` element. */
export const embed = () => new FlickElement("embed");
/** Creates an `<object>` element. */
export const object = () => new FlickElement("object");
/** Creates a `<param>` element. */
export const param = () => new FlickElement("param");
/** Creates a `<picture>` element. */
export const picture = () => new FlickElement("picture");
/** Creates a `<canvas>` element. */
export const canvas = () => new FlickElement("canvas");

// --- Table Content ---
/** Creates a `<table>` element. */
export const table = () => new FlickElement("table");
/** Creates a `<thead>` element. */
export const thead = () => new FlickElement("thead");
/** Creates a `<tbody>` element. */
export const tbody = () => new FlickElement("tbody");
/** Creates a `<tfoot>` element. */
export const tfoot = () => new FlickElement("tfoot");
/** Creates a `<tr>` (table row) element. */
export const tr = () => new FlickElement("tr");
/** Creates a `<th>` (table header) element. */
export const th = () => new FlickElement("th");
/** Creates a `<td>` (table data) element. */
export const td = () => new FlickElement("td");
/** Creates a `<caption>` element. */
export const caption = () => new FlickElement("caption");
/** Creates a `<col>` (table column) element. */
export const col = () => new FlickElement("col");
/** Creates a `<colgroup>` element. */
export const colgroup = () => new FlickElement("colgroup");

// --- Interactive Elements ---
/** Creates a `<details>` element. */
export const details = () => new FlickElement("details");
/** Creates a `<summary>` element. */
export const summary = () => new FlickElement("summary");
/** Creates a `<dialog>` element. */
export const dialog = () => new FlickElement("dialog");
/** Creates a `<menu>` element. */
export const menu = () => new FlickElement("menu");

// --- Web Components ---
/** Creates a `<slot>` element. */
export const slot = () => new FlickElement("slot");
/** Creates a `<template>` element. */
export const template = () => new FlickElement("template");
