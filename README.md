### 🗓️ originalPosterDate plugin

![Preview of a photo posted by gregorsams from November 27th 2013. The post has been reblogged by glen-px on April 21st 2026, indicating the time difference betweenthe original posting date and the date at which the current reblog took place.](https://glenthemes.github.io/originalPosterDate/banner-r.png)

###### ✦ Written by **@⁠glenthemes** [2026]<br/>✦ **Last updated:** 2026/04/22 4:59PM [PST]

---

#### Table of Contents:
- 💭 [About](#about)
- 📝 [Important notes](#important-notes)
- 👁️ [Demos + Previews](#%EF%B8%8Fdemos--previews)
- 🚀 [How to install](#how-to-install)
- 🧨 [Further usage](#further-usage)
- 💖 [Attribution](#attribution)
- 🙋 [Questions?](#questions)

---

### 💭 About:

A plugin that shows the original post's date (in `{Month} {DayOfMonthWithZero}{DayOfMonthSuffix}, {Year}` format) by adding the poster's username and post link as custom data attributes to an element within a `{block:NotReblog}` or `{block:RebloggedFrom}` context. **Works for original posts and as well as reblogs!**

![Screenshot of a post consisting of the original post and two additional reblogs with comments. The first entry (the original post) shows that it was posted on September 04th 2021. The first reblog (so the second entry overall) shows that it was reblogged on September 27th 2021. The second reblog (so the third entry overall) shows that it was reblogged on March 18th 2026](https://glenthemes.github.io/originalPosterDate/reblog-trails-450-r.png)

**How it works:**
1. We set a custom attribute (`data-original-poster`) for the original poster's username, and another custom attribute (`data-original-post-link`) for the original post's link.
2. Fetches the original poster's [Tumblr blog API](https://www.tumblr.com/docs/en/api/v1), parses the variable it returns as a [JSON object](https://www.w3schools.com/whatis/whatis_json.asp)
3. Finds `unix-timestamp` value within the object
4. Formats the unix timestamp into something that's human readable

**Credits:**
* [axios](https://axios-http.com) for [Tumblr API v1](https://www.tumblr.com/docs/en/api/v1) fetching
* [ordinal suffixes for dates in JS](https://xjavascript.com/blog/javascript-new-date-ordinal-st-nd-rd-th/#step-2-implement-the-code)
* Photo in preview by [gregorsams](https://gregorsams.tumblr.com/post/68296679771)

---

### 📝 Important notes:
* Only works if the original poster's blog has "**Visibility**" > **"Hide {Name} from people without an account"** turned *off* (gray).
![Screenshot of a blog’s Tumblr settings with “Hide your blog name from people without an account” disabled such that the toggle turns gray.](https://glenthemes.github.io/originalPosterDate/vis.png)
* Will not work if the original poster's blog has been deleted/deactivated.
* Will not work if the original poster deleted the post (even if their blog is still active).
* Does not work in the customize page view (works fine if you visit your blog directly).

💡 Basic HTML knowledge and [Tumblr docs](https://www.tumblr.com/docs/en/custom_themes) knowledge is recommended.

---

### 👁️ Demos + Previews:
| Context | Demo | Code |
| --- | --- | --- |
| Dates on **each reblog** (modern captions) | [view](https://glenthemes.github.io/originalPosterDate/demos/reblogs) | [example theme code](https://glenthemes.github.io/originalPosterDate/theme-code/reblogs.txt) |
| Dates on **original poster only** | [view](https://glenthemes.github.io/originalPosterDate/demos/original-poster-only) | [example theme code](https://glenthemes.github.io/originalPosterDate/theme-code/original-poster-only.txt) |

---

### 🚀 How to install:

The following instructions are for showing the original poster's date only. You are welcome to view the [example theme code for reblogs](https://glenthemes.github.io/originalPosterDate/theme-code/reblogs.txt), just bear in mind that it uses modern captions and not old/legacy ones.

♦️ **Step 1:** Add the after `<head>` in your theme:
```html
<script src="//cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-----  originalPosterDate by glenthemes  ----->
<!-- github.com/glenthemes/originalPosterDate -->
<script src="//glenthemes.github.io/originalPosterDate/dates.js"></script>
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
| `langLocaleCode` | The output date's language/locale code. Some examples can be found [here](https://developer.atlassian.com/platform/forge/manifest-reference/forge-supported-locale-codes/). |
| `shortMonth` | &#x29BF; `true` for the short form of the month (e.g. **Feb**)<br/>&#x29BF; `false` for regular month text (e.g. **February**) |
| `dayWithZero` | &#x29BF; `true` adds `0` to single-digit days (e.g. **09**)<br/>&#x29BF; `false` for regular days (e.g. **9**) |
| `dayWithSuffix` | &#x29BF; `true` adds suffixes to days (English only) (e.g. **9th**, **1st**, **3rd**)<br/>&#x29BF; `false` does not add suffixes (e.g. **9**, **1**, **3**) |
| `shortYear` | &#x29BF; `true` for the short form of the year (e.g. **‘26**)<br/>&#x29BF; `false` for regular year number (e.g. **2026**) |

♦️ **Step 2:** Pinpoint where you'd like to display the original post's date. A common location would be the post's footer bar, but there's no rule of thumb as long as it resides within the following blocks/context:
* `{block:Posts}`
* `{block:Date}`

Example:
```html
{block:Posts}
<article class="posts">
    {block:Date}
    <footer class="date-bar"> ... </footer>
    {/block:Date}
</article>
{/block:Posts}
```

If you're puzzled about the structure, you can check out the theme codes provided in [👁️ Demos + Previews](#%EF%B8%8Fdemos--previews)!

♦️ **Step 3:** Using that location, add the following:
```html
<span data-original-poster="{block:NotReblog}{Name}{/block:NotReblog}{block:RebloggedFrom}{ReblogRootName}{/block:RebloggedFrom}" data-original-post-link="{block:NotReblog}{Permalink}{/block:NotReblog}{block:RebloggedFrom}{ReblogRootURL}{/block:RebloggedFrom}"></span>
```

Using the above HTML markup's example, it would now look something like this:
```html
{block:Posts}
<article class="posts">
    {block:Date}
    <footer class="date-bar">
        <span data-original-poster="{block:NotReblog}{Name}{/block:NotReblog}{block:RebloggedFrom}{ReblogRootName}{/block:RebloggedFrom}" data-original-post-link="{block:NotReblog}{Permalink}{/block:NotReblog}{block:RebloggedFrom}{ReblogRootURL}{/block:RebloggedFrom}"></span>
    </footer>
    {/block:Date}
</article>
{/block:Posts}
```

And done! If nothing is showing up, please read the [📝 Important notes](#important-notes) section.

---

### 🧨 Further usage:

**Note:** JavaScript knowledge required.

If you'd just like to retrieve the timestamp and process it yourself (e.g. show `05` instead of `May`), you can edit the function call like this:
```javascript
originalPosterDate({
    // your options as normal
})
.then(elements => {
    elements?.forEach(el => {
        let date = new Date(Number(el.dataset.timestamp)) // gets the timestamp from the [data-timestamp] attribute
        let monthNumber = date.getMonth() // e.g. get the month number
        console.log(monthNumber) // e.g. do something with the month number
    })
})
```

[Here's](https://www.w3schools.com/jsref/jsref_obj_date.asp) a resource about parsing date & time if you're interested.

---

### 💖 Attribution:

If you are a theme maker, please include a link to either [this repository](https://github.com/glenthemes/originalPosterDate), [my Tumblr post](https://glenthemes.tumblr.com/post/814647006208360448/originalposterdate) or [my Tumblr blog](https://glenthemes.tumblr.com) on your theme's post or credits page! Thank you.

---

### 🙋 Questions?

If you run into any issues or need help, please reach out to me via my [Discord](https://discord.gg/RcMKnwz).

Checklist of things to include when asking for help:
- A link to your blog, e.g. `https://glen-px.tumblr.com`
- Send your **full** theme code (tutorial: [glenthemes.notion.site/dpaste-tutorial](https://glenthemes.notion.site/dpaste-tutorial))!