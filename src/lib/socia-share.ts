  export function free52WeekShare(platform: string,userId:string,tggUrl:string,title:string) {
    const url = `${tggUrl}/free-52-weeks?refererId=${userId}`;
    const text = `Hi! I just learned: ${title} for FREE — join me on this course for free!`;
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