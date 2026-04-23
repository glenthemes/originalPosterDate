/*==============================================

     Get original poster date by glenthemes
    github.com/glenthemes/originalPosterDate
        [ please credit if you use ]

==============================================*/

window.originalPosterDate = async (options) => {
  // get options
  let locale = options.langLocaleCode ?? "en"
  let dayWithZero = options.dayWithZero ?? false
  let dayWithSuffix = options.dayWithSuffix ?? false
  let shortMonth = options.shortMonth ?? false
  let shortYear = options.shortYear ?? false
  
  // day of month suffixes
  // from: xjavascript.com/blog/javascript-new-date-ordinal-st-nd-rd-th/#step-2-implement-the-code
  function getSuffix(day){
    if(day >= 11 && day <= 13) return "th"
    let lastDigit = day % 10
    switch (lastDigit) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }

  let originalPosterDateInit = async () => {
    let promises = []
    let items = document.querySelectorAll("[data-original-poster][data-original-post-link]:not([data-original-poster=''][data-original-post-link=''].fetched)")
    for(let piece of items){
      // get username and post url separately
      let name = piece.dataset.originalPoster.trim(),
          url = piece.dataset.originalPostLink.trim(),
          OGPostID
      
      // if: dashboard-only view
      // post ID resides immediately after the username
      if(url.includes(`//www.tumblr.com/${name}/`)){
        OGPostID = url.split(`//www.tumblr.com/${name}/`)[1]
      }
      
      // if: blog has custom theme
      // post ID resides after "/post/"
      else if(url.includes("/post/") && !url.endsWith("/post/")){
        OGPostID = url.split("/post/")[1]
      }
      
      if(typeof OGPostID !== "undefined"){
        // clean post ID: remove caption/slug (if there is one)
        if(OGPostID.indexOf("/") > -1){
          OGPostID = OGPostID.split("/")[0]
        }

        let API_link = `https://${name}.tumblr.com/api/read/json?id=${OGPostID}`
        
        // fetch user's API for the original post only
        // will only work if:
        // 1. blog has "Visibility" > "Hide {Name} from people without an account" turned OFF
        // 2. blog is active (i.e. NOT deactivated)
        promises.push((async () => {
          try {
            // fetch with axios bc tumblr doesn't obey normal fetch() sometimes
            let rez = await axios.get(API_link)
            let res = rez.data.trim()

            // read the fetched result as a JSON object after ensuring that "var tumblr_api_read" exists
            let is_tumblr = res.match(/var\s+tumblr_api_read\s*=\s*([\s\S]*?)[;]?\s*$/)
            if(is_tumblr && res.endsWith("};")){
              let string = res.replace("var tumblr_api_read = ","").slice(0,-1)
              let obj
              try {
                let x = JSON.parse(string)
                obj = x && typeof x === "object" && !Array.isArray(x) ? x : undefined
              } catch {}

              // on post API retrieval, focus only on the timestamp
              let timestamp = obj.posts[0]["unix-timestamp"]
              if(!isNaN(timestamp)){
                let parseDate = new Date(timestamp * 1000)
                
                // get year
                let yr = parseDate.getFullYear()
                yr = shortYear ? String.fromCharCode(8216) + yr.toString().slice(-2) : yr
                
                // get month
                let month = parseDate.toLocaleString(locale, { month: shortMonth ? "short" : "long" })
                
                // get day of month
                let day = parseDate.getDate()
                
                // [optional] DayOfMonthWithZero (if single digit)
                day = dayWithZero ? day.toString().padStart(2,"0") : day
                
                // [optional] add day of month suffix (only if language is set to English)
                if(locale.startsWith("en")){
                  if(dayWithSuffix){
                    let suffix = getSuffix(day.toString().startsWith("0") ? Number(day.slice(1)) : day)
                    day = `${day}${suffix}`
                  }
                }
                
                // the final output
                // e.g. January 27th, 2016
                let formatted = `${month} ${day}, ${yr}`
                piece.dataset.timestamp = timestamp * 1000 // records e.g. [data-timestamp="1770581273"]
                piece.dataset.postApiLink = API_link
                piece.textContent = formatted
                piece.classList.add("fetched","fetch-ok")
              }
            }//end: is tumblr
          } catch(err){
            piece.classList.add("fetched","fetch-failed")
          }
        })());//end fetch + add to array
          
      }//end: has validpost ID
      else {
        piece.classList.add("fetched","fetch-failed")
      }
    }//end forEach

    await Promise.all(promises)
    return items
  }//end init func

  await (document.readyState === "loading"
  ? new Promise(ok => document.addEventListener("DOMContentLoaded", ok, { once: true }))
  : Promise.resolve())
  return await originalPosterDateInit()
}//end originalPosterDate func