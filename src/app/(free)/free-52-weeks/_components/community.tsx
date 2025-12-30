
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Image from "next/image";
// import { UserDp } from "@/components/user-dp";
// import { Button } from "@/components/ui/button";
// import { Download, Share2 } from "lucide-react";
// import { free52WeekShare } from "@/lib/socia-share";
 import Badges from "./badges";
import { getISOWeek, startOfISOWeek, endOfISOWeek } from "@/lib/isoWeek";
// import CommunityLeaders from "./community-leaders";
 import { getUser } from "../../../../../actions/getUser";
// import { getDescendants } from "../../../../../actions/getDescendants";
// import { hasCompletedASession } from "../../../../../actions/hasCompletedASession";
import { getRefereesLeaderBoardsWithinAPeriod } from "../../../../../actions/getRefereesLeaderBoardWithinAPeriod";
// import { getRefereesLeaderBoards } from "../../../../../actions/getRefereesLeaderBoards";
 import StudentDetails from "./student-details";
// import { getDescendants } from "../../../../../actions/getDescendants";
// import { hasCompletedASession } from "../../../../../actions/hasCompletedASession";
import CompLeaderBoard from "./comp-leaderboard";
import { getRefereesWithinAPeriod } from "../../../../../actions/getRefereesWithinAPeriod";
import { getRefereesWithASession } from "../../../../../actions/getRefereesWithASession";

async function CommunityAside() {

 const { user } = await getUser();
  const tggUrl = process.env.WEB_URL!;


  // let descs = await getDescendants(user?.id || "")
  // const descendantsCompletedAWeek = await Promise.all(descs.map(async(d) =>{
  //   const completedASession = await hasCompletedASession(d.userId)

  //   if(completedASession) return d
  // }))

  // descs = descendantsCompletedAWeek.filter( d => !!d)

  // const {referees} = await getRefereesWithinAPeriod(startOfISOWeek(),endOfISOWeek())
  const {refereesWithASession} = await getRefereesWithASession()
  // const sortedCompLeaderBoards = compLeaders.slice(0,11).sort((a,b) => b.points - a.points)

  // const {leaderBoards} = await getRefereesLeaderBoards()

  // const communityLeaders = leaderBoards.slice(0,11).sort((a,b) => b.points - a.points)

  return (
    <div className="flex flex-col xl:flex-row">
      <aside className="w-full xl:w-1/2">
     <StudentDetails user={user!} tggUrl={tggUrl}/>
        <Badges refereesWithASession={refereesWithASession.length} />
        {/* <Card className="mt-4">
              <CardHeader>
                <h5 className="text-sm font-medium">Quick Analytics</h5>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Client-side: watch events, quiz events. Pro tip: connect
                  server analytics for cohort insights and retention funnels.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <h5 className="text-sm font-medium">Extras</h5>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Planned: SCORM/xAPI export, SSO (OAuth), subtitle
                  auto-generation, SCORM packaging, offline video (PWA & service
                  worker).
                </div>
              </CardContent>
            </Card> */}
      </aside>
      <aside className="w-full xl:w-1/2">
        {/* <Card >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">CommunityAside</h4>
                <Users className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                Invite friends, create study groups, or open cohort chats
                (integrate with a chat provider like Pusher or Firebase for
                scale).
              </div>
              <div className="mt-4 flex xl:flex-col gap-2">
                <Button 
                // onClick={() => share("wa")}
                    >Invite on WhatsApp</Button>
                <Button
                //   onClick={() => {
                //     navigator.clipboard?.writeText(window.location.href);
                //     showToast("Link copied");
                //   }}
                >
                  Copy invite link
                </Button>
              </div>
            </CardContent>
          </Card> */}

       {/* <CompLeaderBoard sortedCompLeaderBoards={sortedCompLeaderBoards} userName={user?.userName!}/> */}
       {/*  <CommunityLeaders leaderBoard={communityLeaders} userName={user?.userName!}/> */}
      </aside>
    </div>
  );
}

export default CommunityAside;
