### 🗓️ originalPosterDate plugin

![Preview of a photo posted by gregorsams from November 27th 2013. The post has been reblogged by glen-px on April 21st 2026, indicating the time difference betweenthe original posting date and the date at which the current reblog took place.](https://glenthemes.github.io/originalPosterDate/banner-r.png)

###### ✦ Written by **@⁠glenthemes** [2026]<br/>✦ **Last updated:** 2026/04/21 8:42PM [PST]

---

#### Table of Contents:
- 💭 [About](#about)
- 📝 [Important notes](#important-notes)
- 🧪 [Example theme code](#example-theme-code)
- 🚀 [How to install](#how-to-install)
- 💖 [Attribution](#attribution)
- 🙋 [Questions?](#questions)

---

### 💭 About:

A plugin that shows the original post's date (in `{Month} {DayOfMonthWithZero}{DayOfMonthSuffix}, {Year}` format) by adding `data-original-poster="{ReblogRootName}" data-original-post-link="{ReblogRootURL}"` to an element within a `{block:RebloggedFrom}` context.

💡 Basic HTML knowledge and [Tumblr docs](https://www.tumblr.com/docs/en/custom_themes) knowledge is recommended.

### 📝 Important notes:
* Only works if the original poster's blog has "**Visibility**" > **"Hide {Name} from people without an account"** turned *off* (gray).
![Screenshot of a blog’s Tumblr settings with “Hide your blog name from people without an account” disabled such that the toggle turns gray.](https://glenthemes.github.io/originalPosterDate/vis.png)
* Will not work if the original poster's blog has been deleted/deactivated.
* Does not work in the customize page view (works fine if you visit your blog directly!).

### 🧪 Example theme code:
A barebones theme example with this plugin installed:  
[glenthemes.github.io/originalPosterDate/example-theme-code.txt](https://glenthemes.github.io/originalPosterDate/example-theme-code.txt)

**Credits:**
* [axios](https://axios-http.com) for [Tumblr API v1](https://www.tumblr.com/docs/en/api/v1) fetching.
* Photo in preview by [gregorsams](https://gregorsams.tumblr.com/post/68296679771)

---

### 🚀 How to install:

♦️ **Step 1:** Add the after `<head>` in your theme:
```html
<script src="//cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-----  originalPosterDate by glenthemes  ----->
<!-- github.com/glenthemes/originalPosterDate -->
<script src="//glenthemes.github.io/originalPosterDate/get.js"></script>
<script>
originalPosterDate({
    langLocaleCode: "en", // language (locale) code
    shortMonth: false, // true for "Feb", false for "February"
    dayWithZero: true, // true for 09, false for 9
    dayWithSuffix: true, // true for 21st, false for 21
    shortYear: false // true for ‘26, false for 2026
})
</script>
```

| Option name | Details |
| --- | --- |
| `langLocaleCode` | The output date's language/local code. Some examples can be found [here](https://developer.atlassian.com/platform/forge/manifest-reference/forge-supported-locale-codes/). |
| `shortMonth` | &#x29BF; `true` for the short form of the month (e.g. **Feb**)<br/>&#x29BF; `false` for regular month text (e.g. **February**) |
| `dayWithZero` | &#x29BF; `true` adds `0` to single-digit days (e.g. **09**)<br/>&#x29BF; `false` for regular days (e.g. **9**) |
| `dayWithSuffix` | &#x29BF; `true` adds suffixes to days (English only) (e.g. **9th**, **1st**, **3rd**)<br/>&#x29BF; `false` does not add suffixes (e.g. **9**, **1**, **3**) |
| `shortYear` | &#x29BF; `true` for the short form of the year (e.g. **‘26**)<br/>&#x29BF; `false` for regular year number (e.g. **2026**) |

♦️ **Step 2:** Pinpoint where you'd like to display the original post's date. A common location would be the post's footer bar, but there's no rule of thumb as long as it resides within the following blocks/context:
* `{block:Posts}`
* `{block:Date}`
* `{block:RebloggedFrom}`

Example:
```html
{block:Posts}
<article class="posts">
    {block:Date}
    {block:RebloggedFrom}
    <footer class="date-bar"> ... </footer>
    {/block:RebloggedFrom}
    {/block:Date}
</article>
{/block:Posts}
```

If you're puzzled about the structure, you can check out the [🧪 Example theme code](#example-theme-code) if it helps!

♦️ **Step 3:** Using that location, add the following:
```html
<span data-original-poster="{ReblogRootName}" data-original-post-link="{ReblogRootURL}"></span>
```

Using the above HTML markup's example, it would now look something like this:
```html
{block:Posts}
<article class="posts">
    {block:Date}
    {block:RebloggedFrom}
    <footer class="date-bar">
        <span data-original-poster="{ReblogRootName}" data-original-post-link="{ReblogRootURL}"></span>
    </footer>
    {/block:RebloggedFrom}
    {/block:Date}
</article>
{/block:Posts}
```

And done! If nothing is showing up, please read the [📝 Important notes](#important-notes) section.

---

### 💖 Attribution:

If you are a theme maker, please include a link to either [this repository](https://github.com/glenthemes/originalPosterDate) or [my Tumblr blog](https://glenthemes.tumblr.com) on your theme's post or credits page! Thank you.

---

### 🙋 Questions?

If you run into any issues or need help, please reach out to me via my [Discord](https://discord.gg/RcMKnwz).

Checklist of things to include when asking for help:
- A link to your blog, e.g. `https://glen-px.tumblr.com`
- Send your **full** theme code (tutorial: [glenthemes.notion.site/dpaste-tutorial](https://glenthemes.notion.site/dpaste-tutorial))!