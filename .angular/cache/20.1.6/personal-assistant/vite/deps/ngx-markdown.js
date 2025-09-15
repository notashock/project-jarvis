import {
  DomSanitizer
} from "./chunk-PDAONUIB.js";
import {
  HttpClient
} from "./chunk-VOMB4MRD.js";
import "./chunk-52HHFXQ3.js";
import {
  isPlatformBrowser
} from "./chunk-JBORNR6I.js";
import "./chunk-CZW6QYGI.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Pipe,
  RuntimeError,
  SecurityContext,
  Subject,
  ViewContainerRef,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  distinctUntilChanged,
  first,
  inject,
  map,
  mapTo,
  merge,
  of,
  setClassMetadata,
  shareReplay,
  signal,
  switchMap,
  takeUntil,
  timer,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵinject,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-YLOMPQSO.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, { equal });
  } else {
    state = signal({ kind: 1, value: options?.initialValue }, { equal });
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({ kind: 1, value }),
    error: (error) => {
      state.set({ kind: 2, error });
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, { equal: options?.equal });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b2) => a.kind === 1 && b2.kind === 1 && userEquality(a.value, b2.value);
}

// node_modules/marked/lib/marked.esm.js
function L() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var O = L();
function G(l3) {
  O = l3;
}
var E = { exec: () => null };
function h(l3, e = "") {
  let t = typeof l3 == "string" ? l3 : l3.source, n = { replace: (r, i) => {
    let s = typeof i == "string" ? i : i.source;
    return s = s.replace(m.caret, "$1"), t = t.replace(r, s), n;
  }, getRegex: () => new RegExp(t, e) };
  return n;
}
var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l3) => new RegExp(`^( {0,3}${l3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}#`), htmlBeginRegex: (l3) => new RegExp(`^ {0,${Math.min(3, l3 - 1)}}<(?:[a-z].*>|!--)`, "i") };
var xe = /^(?:[ \t]*(?:\n|$))+/;
var be = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Re = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var C = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Oe = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var j = /(?:[*+-]|\d{1,9}[.)])/;
var se = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var ie = h(se).replace(/bull/g, j).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var Te = h(se).replace(/bull/g, j).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var F = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var we = /^[^\n]+/;
var Q = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var ye = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Pe = h(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, j).getRegex();
var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var Se = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var oe = h(F).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var $e = h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex();
var K = { blockquote: $e, code: be, def: ye, fences: Re, heading: Oe, hr: C, html: Se, lheading: ie, list: Pe, newline: xe, paragraph: oe, table: E, text: we };
var re = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var _e = __spreadProps(__spreadValues({}, K), { lheading: Te, table: re, paragraph: h(F).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() });
var Le = __spreadProps(__spreadValues({}, K), { html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(F).replace("hr", C).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() });
var Me = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var ze = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var ae = /^( {2,}|\\)\n(?!\s*$)/;
var Ae = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var D = /[\p{P}\p{S}]/u;
var W = /[\s\p{P}\p{S}]/u;
var le = /[^\s\p{P}\p{S}]/u;
var Ee = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, W).getRegex();
var ue = /(?!~)[\p{P}\p{S}]/u;
var Ce = /(?!~)[\s\p{P}\p{S}]/u;
var Ie = /(?:[^\s\p{P}\p{S}]|~)/u;
var Be = /\[[^\[\]]*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g;
var pe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var qe = h(pe, "u").replace(/punct/g, D).getRegex();
var ve = h(pe, "u").replace(/punct/g, ue).getRegex();
var ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var De = h(ce, "gu").replace(/notPunctSpace/g, le).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var He = h(ce, "gu").replace(/notPunctSpace/g, Ie).replace(/punctSpace/g, Ce).replace(/punct/g, ue).getRegex();
var Ze = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, le).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ge = h(/\\(punct)/, "gu").replace(/punct/g, D).getRegex();
var Ne = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var je = h(U).replace("(?:-->|$)", "-->").getRegex();
var Fe = h("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", je).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`[^`]*`|[^\[\]\\`])*?/;
var Qe = h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var he = h(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", Q).getRegex();
var de = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q).getRegex();
var Ue = h("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", de).getRegex();
var X = { _backpedal: E, anyPunctuation: Ge, autolink: Ne, blockSkip: Be, br: ae, code: ze, del: E, emStrongLDelim: qe, emStrongRDelimAst: De, emStrongRDelimUnd: Ze, escape: Me, link: Qe, nolink: de, punctuation: Ee, reflink: he, reflinkSearch: Ue, tag: Fe, text: Ae, url: E };
var Ke = __spreadProps(__spreadValues({}, X), { link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() });
var N = __spreadProps(__spreadValues({}, X), { emStrongRDelimAst: He, emStrongLDelim: ve, url: h(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ });
var We = __spreadProps(__spreadValues({}, N), { br: h(ae).replace("{2,}", "*").getRegex(), text: h(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() });
var I = { normal: K, gfm: _e, pedantic: Le };
var M = { normal: X, gfm: N, breaks: We, pedantic: Ke };
var Xe = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var ke = (l3) => Xe[l3];
function w(l3, e) {
  if (e) {
    if (m.escapeTest.test(l3)) return l3.replace(m.escapeReplace, ke);
  } else if (m.escapeTestNoEncode.test(l3)) return l3.replace(m.escapeReplaceNoEncode, ke);
  return l3;
}
function J(l3) {
  try {
    l3 = encodeURI(l3).replace(m.percentDecode, "%");
  } catch {
    return null;
  }
  return l3;
}
function V(l3, e) {
  let t = l3.replace(m.findPipe, (i, s, o) => {
    let a = false, u = s;
    for (; --u >= 0 && o[u] === "\\"; ) a = !a;
    return a ? "|" : " |";
  }), n = t.split(m.splitPipe), r = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(m.slashPipe, "|");
  return n;
}
function z(l3, e, t) {
  let n = l3.length;
  if (n === 0) return "";
  let r = 0;
  for (; r < n; ) {
    let i = l3.charAt(n - r - 1);
    if (i === e && !t) r++;
    else if (i !== e && t) r++;
    else break;
  }
  return l3.slice(0, n - r);
}
function ge(l3, e) {
  if (l3.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < l3.length; n++) if (l3[n] === "\\") n++;
  else if (l3[n] === e[0]) t++;
  else if (l3[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function fe(l3, e, t, n, r) {
  let i = e.href, s = e.title || null, o = l3[1].replace(r.other.outputLinkReplace, "$1");
  n.state.inLink = true;
  let a = { type: l3[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: s, text: o, tokens: n.inlineTokens(o) };
  return n.state.inLink = false, a;
}
function Je(l3, e, t) {
  let n = l3.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  let r = n[1];
  return e.split(`
`).map((i) => {
    let s = i.match(t.other.beginningSpace);
    if (s === null) return i;
    let [o] = s;
    return o.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var y = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || O;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : z(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = Je(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = z(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: z(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = z(t[0], `
`).split(`
`), r = "", i = "", s = [];
      for (; n.length > 0; ) {
        let o = false, a = [], u;
        for (u = 0; u < n.length; u++) if (this.rules.other.blockquoteStart.test(n[u])) a.push(n[u]), o = true;
        else if (!o) a.push(n[u]);
        else break;
        n = n.slice(u);
        let p = a.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${p}` : p, i = i ? `${i}
${c}` : c;
        let f = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(c, s, true), this.lexer.state.top = f, n.length === 0) break;
        let k = s.at(-1);
        if (k?.type === "code") break;
        if (k?.type === "blockquote") {
          let x = k, g = x.raw + `
` + n.join(`
`), T = this.blockquote(g);
          s[s.length - 1] = T, r = r.substring(0, r.length - x.raw.length) + T.raw, i = i.substring(0, i.length - x.text.length) + T.text;
          break;
        } else if (k?.type === "list") {
          let x = k, g = x.raw + `
` + n.join(`
`), T = this.list(g);
          s[s.length - 1] = T, r = r.substring(0, r.length - k.raw.length) + T.raw, i = i.substring(0, i.length - x.raw.length) + T.raw, n = g.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: s, text: i };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim(), r = n.length > 1, i = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: false, items: [] };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      let s = this.rules.other.listItemRegex(n), o = false;
      for (; e; ) {
        let u = false, p = "", c = "";
        if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
        p = t[0], e = e.substring(p.length);
        let f = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (H) => " ".repeat(3 * H.length)), k = e.split(`
`, 1)[0], x = !f.trim(), g = 0;
        if (this.options.pedantic ? (g = 2, c = f.trimStart()) : x ? g = t[1].length + 1 : (g = t[2].search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, c = f.slice(g), g += t[1].length), x && this.rules.other.blankLine.test(k) && (p += k + `
`, e = e.substring(k.length + 1), u = true), !u) {
          let H = this.rules.other.nextBulletRegex(g), ee = this.rules.other.hrRegex(g), te = this.rules.other.fencesBeginRegex(g), ne = this.rules.other.headingBeginRegex(g), me = this.rules.other.htmlBeginRegex(g);
          for (; e; ) {
            let Z = e.split(`
`, 1)[0], A;
            if (k = Z, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), A = k) : A = k.replace(this.rules.other.tabCharGlobal, "    "), te.test(k) || ne.test(k) || me.test(k) || H.test(k) || ee.test(k)) break;
            if (A.search(this.rules.other.nonSpaceChar) >= g || !k.trim()) c += `
` + A.slice(g);
            else {
              if (x || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(f) || ne.test(f) || ee.test(f)) break;
              c += `
` + k;
            }
            !x && !k.trim() && (x = true), p += Z + `
`, e = e.substring(Z.length + 1), f = A.slice(g);
          }
        }
        i.loose || (o ? i.loose = true : this.rules.other.doubleBlankLine.test(p) && (o = true));
        let T = null, Y;
        this.options.gfm && (T = this.rules.other.listIsTask.exec(c), T && (Y = T[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: p, task: !!T, checked: Y, loose: false, text: c, tokens: [] }), i.raw += p;
      }
      let a = i.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let u = 0; u < i.items.length; u++) if (this.lexer.state.top = false, i.items[u].tokens = this.lexer.blockTokens(i.items[u].text, []), !i.loose) {
        let p = i.items[u].tokens.filter((f) => f.type === "space"), c = p.length > 0 && p.some((f) => this.rules.other.anyLine.test(f.raw));
        i.loose = c;
      }
      if (i.loose) for (let u = 0; u < i.items.length; u++) i.items[u].loose = true;
      return i;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) return { type: "html", block: true, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: t[0], href: r, title: i };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = V(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let o of r) this.rules.other.tableAlignRight.test(o) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? s.align.push("left") : s.align.push(null);
      for (let o = 0; o < n.length; o++) s.header.push({ text: n[o], tokens: this.lexer.inline(n[o]), header: true, align: s.align[o] });
      for (let o of i) s.rows.push(V(o, s.header.length).map((a, u) => ({ text: a, tokens: this.lexer.inline(a), header: false, align: s.align[u] })));
      return s;
    }
  }
  lheading(e) {
    let t = this.rules.block.lheading.exec(e);
    if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
  }
  paragraph(e) {
    let t = this.rules.block.paragraph.exec(e);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(e) {
    let t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
  }
  link(e) {
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let s = z(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = ge(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2], i = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], i = s[3]);
      } else i = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), fe(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
      if (!i) {
        let s = n[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return fe(n, i, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let s = [...r[0]].length - 1, o, a, u = s, p = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = c.exec(t)) != null; ) {
        if (o = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !o) continue;
        if (a = [...o].length, r[3] || r[4]) {
          u += a;
          continue;
        } else if ((r[5] || r[6]) && s % 3 && !((s + a) % 3)) {
          p += a;
          continue;
        }
        if (u -= a, u > 0) continue;
        a = Math.min(a, a + u + p);
        let f = [...r[0]][0].length, k = e.slice(0, s + r.index + f + a);
        if (Math.min(s, a) % 2) {
          let g = k.slice(1, -1);
          return { type: "em", raw: k, text: g, tokens: this.lexer.inlineTokens(g) };
        }
        let x = k.slice(2, -2);
        return { type: "strong", raw: k, text: x, tokens: this.lexer.inlineTokens(x) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e) {
    let t = this.rules.inline.del.exec(e);
    if (t) return { type: "del", raw: t[0], text: t[2], tokens: this.lexer.inlineTokens(t[2]) };
  }
  autolink(e) {
    let t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, r;
      if (t[2] === "@") n = t[0], r = "mailto:" + n;
      else {
        let i;
        do
          i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (i !== t[0]);
        n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
};
var b = class l {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || O, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t = { other: m, block: I.normal, inline: M.normal };
    this.options.pedantic ? (t.block = I.pedantic, t.inline = M.pedantic) : this.options.gfm && (t.block = I.gfm, this.options.breaks ? t.inline = M.breaks : t.inline = M.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: I, inline: M };
  }
  static lex(e, t) {
    return new l(t).lex(e);
  }
  static lexInline(e, t) {
    return new l(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = false) {
    for (this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e; ) {
      let r;
      if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      let i = e;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0, o = e.slice(1), a;
        this.options.extensions.startBlock.forEach((u) => {
          a = u.call({ lexer: this }, o), typeof a == "number" && a >= 0 && (s = Math.min(s, a));
        }), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(i))) {
        let s = t.at(-1);
        n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (e) {
        let s = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = true, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    let n = e, r = null;
    if (this.tokens.links) {
      let o = Object.keys(this.tokens.links);
      if (o.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) o.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
    let i = false, s = "";
    for (; e; ) {
      i || (s = ""), i = false;
      let o;
      if (this.options.extensions?.inline?.some((u) => (o = u.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false)) continue;
      if (o = this.tokenizer.escape(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.tag(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.link(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(o.raw.length);
        let u = t.at(-1);
        o.type === "text" && u?.type === "text" ? (u.raw += o.raw, u.text += o.text) : t.push(o);
        continue;
      }
      if (o = this.tokenizer.emStrong(e, n, s)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.codespan(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.br(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.del(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.autolink(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (!this.state.inLink && (o = this.tokenizer.url(e))) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      let a = e;
      if (this.options.extensions?.startInline) {
        let u = 1 / 0, p = e.slice(1), c;
        this.options.extensions.startInline.forEach((f) => {
          c = f.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (u = Math.min(u, c));
        }), u < 1 / 0 && u >= 0 && (a = e.substring(0, u + 1));
      }
      if (o = this.tokenizer.inlineText(a)) {
        e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (s = o.raw.slice(-1)), i = true;
        let u = t.at(-1);
        u?.type === "text" ? (u.raw += o.raw, u.text += o.text) : t.push(o);
        continue;
      }
      if (e) {
        let u = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else throw new Error(u);
      }
    }
    return t;
  }
};
var P = class {
  options;
  parser;
  constructor(e) {
    this.options = e || O;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + w(r) + '">' + (n ? i : w(i, true)) + `</code></pre>
` : "<pre><code>" + (n ? i : w(i, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let t = e.ordered, n = e.start, r = "";
    for (let o = 0; o < e.items.length; o++) {
      let a = e.items[o];
      r += this.listitem(a);
    }
    let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + i + s + `>
` + r + "</" + i + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      let n = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens[0]?.type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + w(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = true)) : e.tokens.unshift({ type: "text", raw: n + " ", text: n + " ", escaped: true }) : t += n + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let i = 0; i < e.rows.length; i++) {
      let s = e.rows[i];
      n = "";
      for (let o = 0; o < s.length; o++) n += this.tablecell(s[o]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${w(e, true)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), i = J(e);
    if (i === null) return r;
    e = i;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + w(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let i = J(e);
    if (i === null) return w(n);
    e = i;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${w(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : w(e.text);
  }
};
var $ = class {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
};
var R = class l2 {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || O, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $();
  }
  static parse(e, t) {
    return new l2(t).parse(e);
  }
  static parseInline(e, t) {
    return new l2(t).parseInline(e);
  }
  parse(e, t = true) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      let i = e[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = i, a = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o.type)) {
          n += a || "";
          continue;
        }
      }
      let s = i;
      switch (s.type) {
        case "space": {
          n += this.renderer.space(s);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(s);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(s);
          continue;
        }
        case "code": {
          n += this.renderer.code(s);
          continue;
        }
        case "table": {
          n += this.renderer.table(s);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(s);
          continue;
        }
        case "list": {
          n += this.renderer.list(s);
          continue;
        }
        case "html": {
          n += this.renderer.html(s);
          continue;
        }
        case "def": {
          n += this.renderer.def(s);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(s);
          continue;
        }
        case "text": {
          let o = s, a = this.renderer.text(o);
          for (; r + 1 < e.length && e[r + 1].type === "text"; ) o = e[++r], a += `
` + this.renderer.text(o);
          t ? n += this.renderer.paragraph({ type: "paragraph", raw: a, text: a, tokens: [{ type: "text", raw: a, text: a, escaped: true }] }) : n += a;
          continue;
        }
        default: {
          let o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
  parseInline(e, t = this.renderer) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      let i = e[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (o !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n += o || "";
          continue;
        }
      }
      let s = i;
      switch (s.type) {
        case "escape": {
          n += t.text(s);
          break;
        }
        case "html": {
          n += t.html(s);
          break;
        }
        case "link": {
          n += t.link(s);
          break;
        }
        case "image": {
          n += t.image(s);
          break;
        }
        case "strong": {
          n += t.strong(s);
          break;
        }
        case "em": {
          n += t.em(s);
          break;
        }
        case "codespan": {
          n += t.codespan(s);
          break;
        }
        case "br": {
          n += t.br(s);
          break;
        }
        case "del": {
          n += t.del(s);
          break;
        }
        case "text": {
          n += t.text(s);
          break;
        }
        default: {
          let o = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
};
var S = class {
  options;
  block;
  constructor(e) {
    this.options = e || O;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  emStrongMask(e) {
    return e;
  }
  provideLexer() {
    return this.block ? b.lex : b.lexInline;
  }
  provideParser() {
    return this.block ? R.parse : R.parseInline;
  }
};
var B = class {
  defaults = L();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = R;
  Renderer = P;
  TextRenderer = $;
  Lexer = b;
  Tokenizer = y;
  Hooks = S;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
      case "table": {
        let i = r;
        for (let s of i.header) n = n.concat(this.walkTokens(s.tokens, t));
        for (let s of i.rows) for (let o of s) n = n.concat(this.walkTokens(o.tokens, t));
        break;
      }
      case "list": {
        let i = r;
        n = n.concat(this.walkTokens(i.items, t));
        break;
      }
      default: {
        let i = r;
        this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s) => {
          let o = i[s].flat(1 / 0);
          n = n.concat(this.walkTokens(o, t));
        }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let r = __spreadValues({}, n);
      if (r.async = this.defaults.async || r.async || false, n.extensions && (n.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let s = t.renderers[i.name];
          s ? t.renderers[i.name] = function(...o) {
            let a = i.renderer.apply(this, o);
            return a === false && (a = s.apply(this, o)), a;
          } : t.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t[i.level];
          s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
      }), r.extensions = t), n.renderer) {
        let i = this.defaults.renderer || new P(this.defaults);
        for (let s in n.renderer) {
          if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let o = s, a = n.renderer[o], u = i[o];
          i[o] = (...p) => {
            let c = a.apply(i, p);
            return c === false && (c = u.apply(i, p)), c || "";
          };
        }
        r.renderer = i;
      }
      if (n.tokenizer) {
        let i = this.defaults.tokenizer || new y(this.defaults);
        for (let s in n.tokenizer) {
          if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let o = s, a = n.tokenizer[o], u = i[o];
          i[o] = (...p) => {
            let c = a.apply(i, p);
            return c === false && (c = u.apply(i, p)), c;
          };
        }
        r.tokenizer = i;
      }
      if (n.hooks) {
        let i = this.defaults.hooks || new S();
        for (let s in n.hooks) {
          if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let o = s, a = n.hooks[o], u = i[o];
          S.passThroughHooks.has(s) ? i[o] = (p) => {
            if (this.defaults.async && S.passThroughHooksRespectAsync.has(s)) return Promise.resolve(a.call(i, p)).then((f) => u.call(i, f));
            let c = a.call(i, p);
            return u.call(i, c);
          } : i[o] = (...p) => {
            let c = a.apply(i, p);
            return c === false && (c = u.apply(i, p)), c;
          };
        }
        r.hooks = i;
      }
      if (n.walkTokens) {
        let i = this.defaults.walkTokens, s = n.walkTokens;
        r.walkTokens = function(o) {
          let a = [];
          return a.push(s.call(this, o)), i && (a = a.concat(i.call(this, o))), a;
        };
      }
      this.defaults = __spreadValues(__spreadValues({}, this.defaults), r);
    }), this;
  }
  setOptions(e) {
    return this.defaults = __spreadValues(__spreadValues({}, this.defaults), e), this;
  }
  lexer(e, t) {
    return b.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return R.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, r) => {
      let i = __spreadValues({}, r), s = __spreadValues(__spreadValues({}, this.defaults), i), o = this.onError(!!s.silent, !!s.async);
      if (this.defaults.async === true && i.async === false) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null) return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      s.hooks && (s.hooks.options = s, s.hooks.block = e);
      let a = s.hooks ? s.hooks.provideLexer() : e ? b.lex : b.lexInline, u = s.hooks ? s.hooks.provideParser() : e ? R.parse : R.parseInline;
      if (s.async) return Promise.resolve(s.hooks ? s.hooks.preprocess(n) : n).then((p) => a(p, s)).then((p) => s.hooks ? s.hooks.processAllTokens(p) : p).then((p) => s.walkTokens ? Promise.all(this.walkTokens(p, s.walkTokens)).then(() => p) : p).then((p) => u(p, s)).then((p) => s.hooks ? s.hooks.postprocess(p) : p).catch(o);
      try {
        s.hooks && (n = s.hooks.preprocess(n));
        let p = a(n, s);
        s.hooks && (p = s.hooks.processAllTokens(p)), s.walkTokens && this.walkTokens(p, s.walkTokens);
        let c = u(p, s);
        return s.hooks && (c = s.hooks.postprocess(c)), c;
      } catch (p) {
        return o(p);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let r = "<p>An error occurred:</p><pre>" + w(n.message + "", true) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
};
var _ = new B();
function d(l3, e) {
  return _.parse(l3, e);
}
d.options = d.setOptions = function(l3) {
  return _.setOptions(l3), d.defaults = _.defaults, G(d.defaults), d;
};
d.getDefaults = L;
d.defaults = O;
d.use = function(...l3) {
  return _.use(...l3), d.defaults = _.defaults, G(d.defaults), d;
};
d.walkTokens = function(l3, e) {
  return _.walkTokens(l3, e);
};
d.parseInline = _.parseInline;
d.Parser = R;
d.parser = R.parse;
d.Renderer = P;
d.TextRenderer = $;
d.Lexer = b;
d.lexer = b.lex;
d.Tokenizer = y;
d.Hooks = S;
d.parse = d;
var Dt = d.options;
var Ht = d.setOptions;
var Zt = d.use;
var Gt = d.walkTokens;
var Nt = d.parseInline;
var Ft = R.parse;
var Qt = b.lex;

// node_modules/ngx-markdown/fesm2022/ngx-markdown.mjs
var _c0 = ["*"];
var BUTTON_TEXT_COPY = "Copy";
var BUTTON_TEXT_COPIED = "Copied";
var _ClipboardButtonComponent = class _ClipboardButtonComponent {
  constructor() {
    this._buttonClick$ = new Subject();
    this.copied = toSignal(this._buttonClick$.pipe(switchMap(() => merge(of(true), timer(3e3).pipe(mapTo(false)))), distinctUntilChanged(), shareReplay(1)));
    this.copiedText = computed(() => this.copied() ? BUTTON_TEXT_COPIED : BUTTON_TEXT_COPY);
  }
  onCopyToClipboardClick() {
    this._buttonClick$.next();
  }
};
_ClipboardButtonComponent.ɵfac = function ClipboardButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClipboardButtonComponent)();
};
_ClipboardButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: _ClipboardButtonComponent,
  selectors: [["markdown-clipboard"]],
  decls: 2,
  vars: 3,
  consts: [[1, "markdown-clipboard-button", 3, "click"]],
  template: function ClipboardButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵdomElementStart(0, "button", 0);
      ɵɵdomListener("click", function ClipboardButtonComponent_Template_button_click_0_listener() {
        return ctx.onCopyToClipboardClick();
      });
      ɵɵtext(1);
      ɵɵdomElementEnd();
    }
    if (rf & 2) {
      ɵɵclassProp("copied", ctx.copied());
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.copiedText());
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var ClipboardButtonComponent = _ClipboardButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClipboardButtonComponent, [{
    type: Component,
    args: [{
      selector: "markdown-clipboard",
      template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied()"
      (click)="onCopyToClipboardClick()"
    >{{ copiedText() }}</button>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var CLIPBOARD_OPTIONS = new InjectionToken("CLIPBOARD_OPTIONS");
var KatexSpecificOptions = class {
};
var _LanguagePipe = class _LanguagePipe {
  transform(value, language) {
    if (value == null) {
      value = "";
    }
    if (language == null) {
      language = "";
    }
    if (typeof value !== "string") {
      console.error(`LanguagePipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }
    if (typeof language !== "string") {
      console.error(`LanguagePipe has been invoked with an invalid parameter [${typeof language}]`);
      return value;
    }
    return "```" + language + "\n" + value + "\n```";
  }
};
_LanguagePipe.ɵfac = function LanguagePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LanguagePipe)();
};
_LanguagePipe.ɵpipe = ɵɵdefinePipe({
  name: "language",
  type: _LanguagePipe,
  pure: true
});
var LanguagePipe = _LanguagePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguagePipe, [{
    type: Pipe,
    args: [{
      name: "language"
    }]
  }], null, null);
})();
var PrismPlugin;
(function(PrismPlugin2) {
  PrismPlugin2["CommandLine"] = "command-line";
  PrismPlugin2["LineHighlight"] = "line-highlight";
  PrismPlugin2["LineNumbers"] = "line-numbers";
})(PrismPlugin || (PrismPlugin = {}));
var MARKED_EXTENSIONS = new InjectionToken("MARKED_EXTENSIONS");
var MARKED_OPTIONS = new InjectionToken("MARKED_OPTIONS");
var MERMAID_OPTIONS = new InjectionToken("MERMAID_OPTIONS");
var SANITIZE = new InjectionToken("SANITIZE");
function isSanitizeFunction(sanitize) {
  return typeof sanitize === "function";
}
var errorJoyPixelsNotLoaded = "[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information";
var errorKatexNotLoaded = "[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information";
var errorMermaidNotLoaded = "[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information";
var errorClipboardNotLoaded = "[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information";
var errorClipboardViewContainerRequired = "[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function";
var errorSrcWithoutHttpClient = "[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information";
var ExtendedRenderer = class extends P {
  constructor() {
    super(...arguments);
    this.ɵNgxMarkdownRendererExtendedForExtensions = false;
    this.ɵNgxMarkdownRendererExtendedForMermaid = false;
  }
};
var _MarkdownService = class _MarkdownService {
  get options() {
    return this._options;
  }
  set options(value) {
    this._options = __spreadValues(__spreadValues({}, this.DEFAULT_MARKED_OPTIONS), value);
  }
  get renderer() {
    return this.options.renderer;
  }
  set renderer(value) {
    this.options.renderer = value;
  }
  constructor(clipboardOptions, extensions, options, mermaidOptions, platform, sanitize, http, sanitizer) {
    this.clipboardOptions = clipboardOptions;
    this.extensions = extensions;
    this.mermaidOptions = mermaidOptions;
    this.platform = platform;
    this.sanitize = sanitize;
    this.http = http;
    this.sanitizer = sanitizer;
    this.DEFAULT_MARKED_OPTIONS = {
      renderer: new P()
    };
    this.DEFAULT_KATEX_OPTIONS = {
      delimiters: [{
        left: "$$",
        right: "$$",
        display: true
      }, {
        left: "$",
        right: "$",
        display: false
      }, {
        left: "\\(",
        right: "\\)",
        display: false
      }, {
        left: "\\begin{equation}",
        right: "\\end{equation}",
        display: true
      }, {
        left: "\\begin{align}",
        right: "\\end{align}",
        display: true
      }, {
        left: "\\begin{alignat}",
        right: "\\end{alignat}",
        display: true
      }, {
        left: "\\begin{gather}",
        right: "\\end{gather}",
        display: true
      }, {
        left: "\\begin{CD}",
        right: "\\end{CD}",
        display: true
      }, {
        left: "\\[",
        right: "\\]",
        display: true
      }]
    };
    this.DEFAULT_MERMAID_OPTIONS = {
      startOnLoad: false
    };
    this.DEFAULT_CLIPBOARD_OPTIONS = {
      buttonComponent: void 0
    };
    this.DEFAULT_PARSE_OPTIONS = {
      decodeHtml: false,
      inline: false,
      emoji: false,
      mermaid: false,
      markedOptions: void 0,
      disableSanitizer: false
    };
    this.DEFAULT_RENDER_OPTIONS = {
      clipboard: false,
      clipboardOptions: void 0,
      katex: false,
      katexOptions: void 0,
      mermaid: false,
      mermaidOptions: void 0
    };
    this._reload$ = new Subject();
    this.reload$ = this._reload$.asObservable();
    this.options = options;
  }
  parse(markdown, parseOptions = this.DEFAULT_PARSE_OPTIONS) {
    const {
      decodeHtml,
      inline,
      emoji,
      mermaid: mermaid2,
      disableSanitizer
    } = parseOptions;
    const markedOptions = __spreadValues(__spreadValues({}, this.options), parseOptions.markedOptions);
    const renderer = markedOptions.renderer || this.renderer || new P();
    if (this.extensions) {
      this.renderer = this.extendsRendererForExtensions(renderer);
    }
    if (mermaid2) {
      this.renderer = this.extendsRendererForMermaid(renderer);
    }
    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.parseEmoji(decoded) : decoded;
    const marked = this.parseMarked(emojified, markedOptions, inline);
    const sanitized = disableSanitizer ? marked : this.sanitizeHtml(marked);
    return sanitized;
  }
  render(element, options = this.DEFAULT_RENDER_OPTIONS, viewContainerRef) {
    const {
      clipboard,
      clipboardOptions,
      katex: katex2,
      katexOptions,
      mermaid: mermaid2,
      mermaidOptions
    } = options;
    if (katex2) {
      this.renderKatex(element, __spreadValues(__spreadValues({}, this.DEFAULT_KATEX_OPTIONS), katexOptions));
    }
    if (mermaid2) {
      this.renderMermaid(element, __spreadValues(__spreadValues(__spreadValues({}, this.DEFAULT_MERMAID_OPTIONS), this.mermaidOptions), mermaidOptions));
    }
    if (clipboard) {
      this.renderClipboard(element, viewContainerRef, __spreadValues(__spreadValues(__spreadValues({}, this.DEFAULT_CLIPBOARD_OPTIONS), this.clipboardOptions), clipboardOptions));
    }
    this.highlight(element);
  }
  reload() {
    this._reload$.next();
  }
  getSource(src) {
    if (!this.http) {
      throw new Error(errorSrcWithoutHttpClient);
    }
    return this.http.get(src, {
      responseType: "text"
    }).pipe(map((markdown) => this.handleExtension(src, markdown)));
  }
  highlight(element) {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof Prism === "undefined" || typeof Prism.highlightAllUnder === "undefined") {
      return;
    }
    if (!element) {
      element = document;
    }
    const noLanguageElements = element.querySelectorAll('pre code:not([class*="language-"])');
    Array.prototype.forEach.call(noLanguageElements, (x) => x.classList.add("language-none"));
    Prism.highlightAllUnder(element);
  }
  decodeHtml(html) {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }
  extendsRendererForExtensions(renderer) {
    const extendedRenderer = renderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtendedForExtensions === true) {
      return renderer;
    }
    if (this.extensions?.length > 0) {
      d.use(...this.extensions);
    }
    extendedRenderer.ɵNgxMarkdownRendererExtendedForExtensions = true;
    return renderer;
  }
  extendsRendererForMermaid(renderer) {
    const extendedRenderer = renderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtendedForMermaid === true) {
      return renderer;
    }
    const defaultCode = renderer.code;
    renderer.code = (token) => {
      return token.lang === "mermaid" ? `<div class="mermaid">${token.text}</div>` : defaultCode(token);
    };
    extendedRenderer.ɵNgxMarkdownRendererExtendedForMermaid = true;
    return renderer;
  }
  handleExtension(src, markdown) {
    const urlProtocolIndex = src.lastIndexOf("://");
    const urlWithoutProtocol = urlProtocolIndex > -1 ? src.substring(urlProtocolIndex + 4) : src;
    const lastSlashIndex = urlWithoutProtocol.lastIndexOf("/");
    const lastUrlSegment = lastSlashIndex > -1 ? urlWithoutProtocol.substring(lastSlashIndex + 1).split("?")[0] : "";
    const lastDotIndex = lastUrlSegment.lastIndexOf(".");
    const extension = lastDotIndex > -1 ? lastUrlSegment.substring(lastDotIndex + 1) : "";
    return !!extension && extension !== "md" ? "```" + extension + "\n" + markdown + "\n```" : markdown;
  }
  parseMarked(html, markedOptions, inline = false) {
    if (markedOptions.renderer) {
      const renderer = __spreadValues({}, markedOptions.renderer);
      delete renderer.ɵNgxMarkdownRendererExtendedForExtensions;
      delete renderer.ɵNgxMarkdownRendererExtendedForMermaid;
      delete markedOptions.renderer;
      d.use({
        renderer
      });
    }
    return inline ? d.parseInline(html, markedOptions) : d.parse(html, markedOptions);
  }
  parseEmoji(html) {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    if (typeof joypixels === "undefined" || typeof joypixels.shortnameToUnicode === "undefined") {
      throw new Error(errorJoyPixelsNotLoaded);
    }
    return joypixels.shortnameToUnicode(html);
  }
  renderKatex(element, options) {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof katex === "undefined" || typeof renderMathInElement === "undefined") {
      throw new Error(errorKatexNotLoaded);
    }
    renderMathInElement(element, options);
  }
  renderClipboard(element, viewContainerRef, options) {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof ClipboardJS === "undefined") {
      throw new Error(errorClipboardNotLoaded);
    }
    if (!viewContainerRef) {
      throw new Error(errorClipboardViewContainerRequired);
    }
    const {
      buttonComponent,
      buttonTemplate
    } = options;
    const preElements = element.querySelectorAll("pre");
    for (let i = 0; i < preElements.length; i++) {
      const preElement = preElements.item(i);
      const preWrapperElement = document.createElement("div");
      preWrapperElement.style.position = "relative";
      preElement.parentNode.insertBefore(preWrapperElement, preElement);
      preWrapperElement.appendChild(preElement);
      const toolbarWrapperElement = document.createElement("div");
      toolbarWrapperElement.classList.add("markdown-clipboard-toolbar");
      toolbarWrapperElement.style.position = "absolute";
      toolbarWrapperElement.style.top = ".5em";
      toolbarWrapperElement.style.right = ".5em";
      toolbarWrapperElement.style.zIndex = "1";
      preWrapperElement.insertAdjacentElement("beforeend", toolbarWrapperElement);
      preWrapperElement.onmouseenter = () => toolbarWrapperElement.classList.add("hover");
      preWrapperElement.onmouseleave = () => toolbarWrapperElement.classList.remove("hover");
      let embeddedViewRef;
      if (buttonComponent) {
        const componentRef = viewContainerRef.createComponent(buttonComponent);
        embeddedViewRef = componentRef.hostView;
        componentRef.changeDetectorRef.markForCheck();
      } else if (buttonTemplate) {
        embeddedViewRef = viewContainerRef.createEmbeddedView(buttonTemplate);
      } else {
        const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
        embeddedViewRef = componentRef.hostView;
        componentRef.changeDetectorRef.markForCheck();
      }
      let clipboardInstance;
      embeddedViewRef.rootNodes.forEach((node) => {
        toolbarWrapperElement.appendChild(node);
        clipboardInstance = new ClipboardJS(node, {
          text: () => preElement.innerText
        });
      });
      embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
    }
  }
  renderMermaid(element, options = this.DEFAULT_MERMAID_OPTIONS) {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof mermaid === "undefined" || typeof mermaid.initialize === "undefined") {
      throw new Error(errorMermaidNotLoaded);
    }
    const mermaidElements = element.querySelectorAll(".mermaid");
    if (mermaidElements.length === 0) {
      return;
    }
    mermaid.initialize(options);
    mermaid.run({
      nodes: mermaidElements
    });
  }
  trimIndentation(markdown) {
    if (!markdown) {
      return "";
    }
    let indentStart;
    return markdown.split("\n").map((line) => {
      let lineIdentStart = indentStart;
      if (line.length > 0) {
        lineIdentStart = isNaN(lineIdentStart) ? line.search(/\S|$/) : Math.min(line.search(/\S|$/), lineIdentStart);
      }
      if (isNaN(indentStart)) {
        indentStart = lineIdentStart;
      }
      return lineIdentStart ? line.substring(lineIdentStart) : line;
    }).join("\n");
  }
  async sanitizeHtml(html) {
    if (isSanitizeFunction(this.sanitize)) {
      return this.sanitize(await html);
    }
    if (this.sanitize !== SecurityContext.NONE) {
      return this.sanitizer.sanitize(this.sanitize, html) ?? "";
    }
    return html;
  }
};
_MarkdownService.ɵfac = function MarkdownService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MarkdownService)(ɵɵinject(CLIPBOARD_OPTIONS, 8), ɵɵinject(MARKED_EXTENSIONS, 8), ɵɵinject(MARKED_OPTIONS, 8), ɵɵinject(MERMAID_OPTIONS, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(SANITIZE), ɵɵinject(HttpClient, 8), ɵɵinject(DomSanitizer));
};
_MarkdownService.ɵprov = ɵɵdefineInjectable({
  token: _MarkdownService,
  factory: _MarkdownService.ɵfac
});
var MarkdownService = _MarkdownService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarkdownService, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [CLIPBOARD_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MARKED_EXTENSIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MARKED_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MERMAID_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [SANITIZE]
    }]
  }, {
    type: HttpClient,
    decorators: [{
      type: Optional
    }]
  }, {
    type: DomSanitizer
  }], null);
})();
var _MarkdownComponent = class _MarkdownComponent {
  get disableSanitizer() {
    return this._disableSanitizer;
  }
  set disableSanitizer(value) {
    this._disableSanitizer = this.coerceBooleanProperty(value);
  }
  get inline() {
    return this._inline;
  }
  set inline(value) {
    this._inline = this.coerceBooleanProperty(value);
  }
  // Plugin - clipboard
  get clipboard() {
    return this._clipboard;
  }
  set clipboard(value) {
    this._clipboard = this.coerceBooleanProperty(value);
  }
  // Plugin - emoji
  get emoji() {
    return this._emoji;
  }
  set emoji(value) {
    this._emoji = this.coerceBooleanProperty(value);
  }
  // Plugin - katex
  get katex() {
    return this._katex;
  }
  set katex(value) {
    this._katex = this.coerceBooleanProperty(value);
  }
  // Plugin - mermaid
  get mermaid() {
    return this._mermaid;
  }
  set mermaid(value) {
    this._mermaid = this.coerceBooleanProperty(value);
  }
  // Plugin - lineHighlight
  get lineHighlight() {
    return this._lineHighlight;
  }
  set lineHighlight(value) {
    this._lineHighlight = this.coerceBooleanProperty(value);
  }
  // Plugin - lineNumbers
  get lineNumbers() {
    return this._lineNumbers;
  }
  set lineNumbers(value) {
    this._lineNumbers = this.coerceBooleanProperty(value);
  }
  // Plugin - commandLine
  get commandLine() {
    return this._commandLine;
  }
  set commandLine(value) {
    this._commandLine = this.coerceBooleanProperty(value);
  }
  constructor(element, markdownService, viewContainerRef) {
    this.element = element;
    this.markdownService = markdownService;
    this.viewContainerRef = viewContainerRef;
    this.error = new EventEmitter();
    this.load = new EventEmitter();
    this.ready = new EventEmitter();
    this._clipboard = false;
    this._commandLine = false;
    this._disableSanitizer = false;
    this._emoji = false;
    this._inline = false;
    this._katex = false;
    this._lineHighlight = false;
    this._lineNumbers = false;
    this._mermaid = false;
    this.destroyed$ = new Subject();
  }
  ngOnChanges() {
    this.loadContent();
  }
  loadContent() {
    if (this.data != null) {
      this.handleData();
      return;
    }
    if (this.src != null) {
      this.handleSrc();
      return;
    }
  }
  ngAfterViewInit() {
    if (!this.data && !this.src) {
      this.handleTransclusion();
    }
    this.markdownService.reload$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.loadContent());
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  async render(markdown, decodeHtml = false) {
    const parsedOptions = {
      decodeHtml,
      inline: this.inline,
      emoji: this.emoji,
      mermaid: this.mermaid,
      disableSanitizer: this.disableSanitizer
    };
    const renderOptions = {
      clipboard: this.clipboard,
      clipboardOptions: this.getClipboardOptions(),
      katex: this.katex,
      katexOptions: this.katexOptions,
      mermaid: this.mermaid,
      mermaidOptions: this.mermaidOptions
    };
    const parsed = await this.markdownService.parse(markdown, parsedOptions);
    this.element.nativeElement.innerHTML = parsed;
    this.handlePlugins();
    this.markdownService.render(this.element.nativeElement, renderOptions, this.viewContainerRef);
    this.ready.emit();
  }
  coerceBooleanProperty(value) {
    return value != null && `${String(value)}` !== "false";
  }
  getClipboardOptions() {
    if (this.clipboardButtonComponent || this.clipboardButtonTemplate) {
      return {
        buttonComponent: this.clipboardButtonComponent,
        buttonTemplate: this.clipboardButtonTemplate
      };
    }
    return void 0;
  }
  handleData() {
    this.render(this.data);
  }
  handleSrc() {
    this.markdownService.getSource(this.src).subscribe({
      next: (markdown) => {
        this.render(markdown).then(() => {
          this.load.emit(markdown);
        });
      },
      error: (error) => this.error.emit(error)
    });
  }
  handleTransclusion() {
    this.render(this.element.nativeElement.innerHTML, true);
  }
  handlePlugins() {
    if (this.commandLine) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.CommandLine);
      this.setPluginOptions(this.element.nativeElement, {
        dataFilterOutput: this.filterOutput,
        dataHost: this.host,
        dataPrompt: this.prompt,
        dataOutput: this.output,
        dataUser: this.user
      });
    }
    if (this.lineHighlight) {
      this.setPluginOptions(this.element.nativeElement, {
        dataLine: this.line,
        dataLineOffset: this.lineOffset
      });
    }
    if (this.lineNumbers) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this.element.nativeElement, {
        dataStart: this.start
      });
    }
  }
  setPluginClass(element, plugin) {
    const preElements = element.querySelectorAll("pre");
    for (let i = 0; i < preElements.length; i++) {
      const classes = plugin instanceof Array ? plugin : [plugin];
      preElements.item(i).classList.add(...classes);
    }
  }
  setPluginOptions(element, options) {
    const preElements = element.querySelectorAll("pre");
    for (let i = 0; i < preElements.length; i++) {
      Object.keys(options).forEach((option) => {
        const attributeValue = options[option];
        if (attributeValue) {
          const attributeName = this.toLispCase(option);
          preElements.item(i).setAttribute(attributeName, attributeValue.toString());
        }
      });
    }
  }
  toLispCase(value) {
    const upperChars = value.match(/([A-Z])/g);
    if (!upperChars) {
      return value;
    }
    let str = value.toString();
    for (let i = 0, n = upperChars.length; i < n; i++) {
      str = str.replace(new RegExp(upperChars[i]), "-" + upperChars[i].toLowerCase());
    }
    if (str.slice(0, 1) === "-") {
      str = str.slice(1);
    }
    return str;
  }
};
_MarkdownComponent.ɵfac = function MarkdownComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MarkdownComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(MarkdownService), ɵɵdirectiveInject(ViewContainerRef));
};
_MarkdownComponent.ɵcmp = ɵɵdefineComponent({
  type: _MarkdownComponent,
  selectors: [["markdown"], ["", "markdown", ""]],
  inputs: {
    data: "data",
    src: "src",
    disableSanitizer: "disableSanitizer",
    inline: "inline",
    clipboard: "clipboard",
    clipboardButtonComponent: "clipboardButtonComponent",
    clipboardButtonTemplate: "clipboardButtonTemplate",
    emoji: "emoji",
    katex: "katex",
    katexOptions: "katexOptions",
    mermaid: "mermaid",
    mermaidOptions: "mermaidOptions",
    lineHighlight: "lineHighlight",
    line: "line",
    lineOffset: "lineOffset",
    lineNumbers: "lineNumbers",
    start: "start",
    commandLine: "commandLine",
    filterOutput: "filterOutput",
    host: "host",
    prompt: "prompt",
    output: "output",
    user: "user"
  },
  outputs: {
    error: "error",
    load: "load",
    ready: "ready"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function MarkdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2
});
var MarkdownComponent = _MarkdownComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarkdownComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "markdown, [markdown]",
      template: "<ng-content></ng-content>"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: MarkdownService
  }, {
    type: ViewContainerRef
  }], {
    data: [{
      type: Input
    }],
    src: [{
      type: Input
    }],
    disableSanitizer: [{
      type: Input
    }],
    inline: [{
      type: Input
    }],
    clipboard: [{
      type: Input
    }],
    clipboardButtonComponent: [{
      type: Input
    }],
    clipboardButtonTemplate: [{
      type: Input
    }],
    emoji: [{
      type: Input
    }],
    katex: [{
      type: Input
    }],
    katexOptions: [{
      type: Input
    }],
    mermaid: [{
      type: Input
    }],
    mermaidOptions: [{
      type: Input
    }],
    lineHighlight: [{
      type: Input
    }],
    line: [{
      type: Input
    }],
    lineOffset: [{
      type: Input
    }],
    lineNumbers: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    commandLine: [{
      type: Input
    }],
    filterOutput: [{
      type: Input
    }],
    host: [{
      type: Input
    }],
    prompt: [{
      type: Input
    }],
    output: [{
      type: Input
    }],
    user: [{
      type: Input
    }],
    error: [{
      type: Output
    }],
    load: [{
      type: Output
    }],
    ready: [{
      type: Output
    }]
  });
})();
var _MarkdownPipe = class _MarkdownPipe {
  constructor(domSanitizer, elementRef, markdownService, viewContainerRef, zone) {
    this.domSanitizer = domSanitizer;
    this.elementRef = elementRef;
    this.markdownService = markdownService;
    this.viewContainerRef = viewContainerRef;
    this.zone = zone;
  }
  async transform(value, options) {
    if (value == null) {
      return "";
    }
    if (typeof value !== "string") {
      console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }
    const markdown = await this.markdownService.parse(value, options);
    this.zone.onStable.pipe(first()).subscribe(() => this.markdownService.render(this.elementRef.nativeElement, options, this.viewContainerRef));
    return this.domSanitizer.bypassSecurityTrustHtml(markdown);
  }
};
_MarkdownPipe.ɵfac = function MarkdownPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MarkdownPipe)(ɵɵdirectiveInject(DomSanitizer, 16), ɵɵdirectiveInject(ElementRef, 16), ɵɵdirectiveInject(MarkdownService, 16), ɵɵdirectiveInject(ViewContainerRef, 16), ɵɵdirectiveInject(NgZone, 16));
};
_MarkdownPipe.ɵpipe = ɵɵdefinePipe({
  name: "markdown",
  type: _MarkdownPipe,
  pure: true
});
var MarkdownPipe = _MarkdownPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarkdownPipe, [{
    type: Pipe,
    args: [{
      name: "markdown"
    }]
  }], () => [{
    type: DomSanitizer
  }, {
    type: ElementRef
  }, {
    type: MarkdownService
  }, {
    type: ViewContainerRef
  }, {
    type: NgZone
  }], null);
})();
function provideMarkdown(markdownModuleConfig) {
  return [MarkdownService, markdownModuleConfig?.loader ?? [], markdownModuleConfig?.clipboardOptions ?? [], markdownModuleConfig?.markedOptions ?? [], markdownModuleConfig?.mermaidOptions ?? [], markdownModuleConfig?.markedExtensions ?? [], getSanitizeProvider(markdownModuleConfig?.sanitize) ?? []];
}
function isTypedProvider(provider) {
  return provider != null && provider.provide != null;
}
function getSanitizeProvider(sanitize) {
  return isTypedProvider(sanitize) ? sanitize : {
    provide: SANITIZE,
    useValue: sanitize ?? SecurityContext.HTML
  };
}
var sharedDeclarations = [ClipboardButtonComponent, LanguagePipe, MarkdownComponent, MarkdownPipe];
var _MarkdownModule = class _MarkdownModule {
  static forRoot(markdownModuleConfig) {
    return {
      ngModule: _MarkdownModule,
      providers: [provideMarkdown(markdownModuleConfig)]
    };
  }
  static forChild() {
    return {
      ngModule: _MarkdownModule
    };
  }
};
_MarkdownModule.ɵfac = function MarkdownModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MarkdownModule)();
};
_MarkdownModule.ɵmod = ɵɵdefineNgModule({
  type: _MarkdownModule,
  imports: [ClipboardButtonComponent, LanguagePipe, MarkdownComponent, MarkdownPipe],
  exports: [ClipboardButtonComponent, LanguagePipe, MarkdownComponent, MarkdownPipe]
});
_MarkdownModule.ɵinj = ɵɵdefineInjector({});
var MarkdownModule = _MarkdownModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarkdownModule, [{
    type: NgModule,
    args: [{
      imports: sharedDeclarations,
      exports: sharedDeclarations
    }]
  }], null, null);
})();
export {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  ExtendedRenderer,
  KatexSpecificOptions,
  LanguagePipe,
  MARKED_EXTENSIONS,
  MARKED_OPTIONS,
  MERMAID_OPTIONS,
  MarkdownComponent,
  MarkdownModule,
  MarkdownPipe,
  MarkdownService,
  P as MarkedRenderer,
  PrismPlugin,
  SANITIZE,
  errorClipboardNotLoaded,
  errorClipboardViewContainerRequired,
  errorJoyPixelsNotLoaded,
  errorKatexNotLoaded,
  errorMermaidNotLoaded,
  errorSrcWithoutHttpClient,
  getSanitizeProvider,
  isSanitizeFunction,
  isTypedProvider,
  provideMarkdown
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v20.3.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=ngx-markdown.js.map
