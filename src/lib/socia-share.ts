  type ShareParamsType = {
    platform: string,userId:string,tggUrl:string,text:string
  }
  
  export function free52WeekShare({userId,tggUrl,text,platform}:ShareParamsType) {
    const url = `${tggUrl}free-52-weeks?refererId=${userId}`;
    if (navigator.share) {
      navigator
        .share({
          title: `Free 52-Week Web Development and Python Course. Start your Tech career for Free`,
          text,
          url,
        })
        .catch(() => {});
      return;
    }
    let shareUrl = "";
    if (platform === "wa")
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    if (shareUrl) window.open(shareUrl, "_blank");
    //showToast("Share opened");
  }