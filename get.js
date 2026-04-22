/*==============================================

    Get original poster date by glenthemes
       [ feel free to study the code ]
        [ please credit if you use ]

==============================================*/

window.originalPosterDate = (options) => {
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
    
    let originalPosterDateInit = () => {
        for(let piece of document.querySelectorAll("[data-original-poster][data-original-post-link]:not([data-original-poster=''][data-original-post-link=''].fetched)")){
            // get username and post url separately
            let name = piece.dataset.originalPoster.trim(),
                url = piece.dataset.originalPostLink.trim(),
                OGPostID
            
            // if: dashboard-only view
            // post ID resides immediately after the username
            if(url.includes(`//www.tumblr.com/${ name }/`)){
                OGPostID = url.split(`//www.tumblr.com/${ name }/`)[1]
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
                };
                
                // fetch user's API for the original post only
                // will only work if:
                // 1. blog has "Visibility" > "Hide {Name} from people without an account" turned OFF
                // 2. blog is active (i.e. NOT deactivated)
                (async() => {
                    try {
                        // fetch with axios bc tumblr doesn't obey normal fetch() sometimes
                        let rez = await axios.get(`https://${ name }.tumblr.com/api/read/json?id=${ OGPostID }`);
                        let res = rez.data
                        
                        // on post API retrieval, focus only on the timestamp
                        let timestamp = Number(res.split(`"unix-timestamp":`)[1].split(",")[0])
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
                                    day = `${ day }${ suffix }`
                                }
                            }
                            
                            // the final output
                            // e.g. January 27th, 2016
                            let formatted = `${ month } ${ day }, ${ yr }`
                            piece.textContent = formatted
                            piece.classList.add("fetched","fetch-ok")
                        }
                    } catch(err){
                        piece.classList.add("fetched","fetch-failed")
                    }
                })();//end fetch
                
            }//end: has validpost ID
            else {
                piece.classList.add("fetched","fetch-failed")
            }
        }//end forEach
    }//end originalPosterDateInit
    
    document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", () => originalPosterDateInit(options)) : originalPosterDateInit(options);
}//end originalPosterDate func