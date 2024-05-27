import React, { useEffect, useState } from "react";
import { MatchBasicInfo } from "./screens/MatchBasicInfo";
import { Playing11ScoreInfo } from "./screens/Playing11ScoreInfo";
import { MatchFinalInfo } from "./screens/MatchFinalInfo";
import {
  Batsman,
  Bowler,
  TeamSquadInfo,
} from "./../models/espn-cricinfo-models/CricketMatchModels";
import { useFetchMatchByUrl } from "./../hooks/espn-cricinfo-hooks/useFetchMatchByUrl";
import { H2HMatchRecords } from "./screens/H2HMatchRecords";
import { CricketFormat } from "./../models/enums/CricketFormat";
import { MomentCaptures } from "./screens/elements/MomentCaptures";
import { useGeneratePDFForMatch } from "./../hooks/espn-cricinfo-hooks/useGeneratePdfForMatch";
import { Playing11Info } from "./screens/Playing11Info";
import { Top5Players } from "./screens/Top5Players";
import { PointsTable } from "./screens/PointsTable";
import { MatchSummary } from "./screens/MatchSummary";
import { config, matchBasicInfoProfiles } from "../configs";
import { ChannelIntroVideo } from "./screens/ChannelIntroVideo";
import { ChannelExitPage } from "./screens/ChannelExitPage";
import { YoutubePlanner } from "./screens/YoutubePlanner";
import { TeamLogoCube } from "./screens/elements-dev/TeamLogoCube";
import ReactPlayer from "react-player";
import { ThumbnailRender } from "./screens/elements-dev/ThumbnailRender";

interface CricketMatchProps {
  selectedMatchUrl: string;
  selectedScreenIndex: number;
  format: CricketFormat;
}

export const CricketMatch: React.FC<CricketMatchProps> = ({
  selectedMatchUrl,
  selectedScreenIndex,
  format,
}) => {
  const cricketMatch = useFetchMatchByUrl(
    `${config.espnMatchUrl}/full-scorecard`
  );

  const {
    matchNo,
    matchTitle,
    matchDays,
    result,
    venue,
    series,
    seriesResult,
    tossWinner,
    tossDecision,
    matchSquad,
    pointsTable,
    team1,
    team2,
    playerOfTheMatch,
  } = cricketMatch;

  const generatePDFForMatch = useGeneratePDFForMatch(cricketMatch);
  const [isPlayingBG, setPlayingBG] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "d" || event.key === "D") {
        generatePDFForMatch(cricketMatch);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [generatePDFForMatch]);

  useEffect(() => {
    setPlayingBG(true);
  }, [setPlayingBG, selectedScreenIndex, isPlayingBG]);

  const screenIndexes = {
    channelIntro: 0,
    matchBasicInfo: 1,
    headToHead: 2,
    playing11Info: 3,
    inning1Scores: 4,
    inning2Scores: 5,
    matchResultInfo: 6,
    channelExit: 7,
    pointsTable: 8,
    top5Player: 9,
    matchSummary: 10,
    matchPhotos: 16,
    demoPage: 11,
    ytPlanner: 12,
  };

  // screenIndexes.channelIntro = 1;
  // screenIndexes.matchBasicInfo = 2;
  // screenIndexes.headToHead = 0;
  // screenIndexes.top5Player = 7;
  // screenIndexes.channelExit = 9;

  // screenIndexes.channelIntro = 1;
  // screenIndexes.matchBasicInfo = 2;
  // screenIndexes.headToHead = 0;

  const tournaments = {
    ipl: {
      url: "indian-premier-league-2024-15940",
      name:
        config.language === "hindi"
          ? "इंडियन प्रीमियर लीग 2024"
          : "Indian premier league 2024",
    },
  };

  const getMatchBasicInfo = () => {
    type MatchParam = {
      customMatchNumber?: string;
      matchBrief: string;
      venueCountry: string;
      matchSpeech: string;
    };
    const matchParams: MatchParam[] = matchBasicInfoProfiles;

    const selectedIndex = config.basicInfoProfile;
    return (
      <MatchBasicInfo
        href={selectedMatchUrl}
        matchNumber={matchNo}
        customMatchNumber={matchParams[selectedIndex].customMatchNumber}
        matchTitle={matchTitle}
        matchDate={matchDays}
        matchVenue={venue}
        matchSeries={series}
        tossWinner={tossWinner}
        tossResult={tossDecision?.split(", ")[1]}
        matchBrief={matchParams[selectedIndex].matchBrief}
        venueCountry={matchParams[selectedIndex].venueCountry}
        matchSpeech={matchParams[selectedIndex].matchSpeech}
        team1LogoUrl={team1.team.logoUrl}
        team2LogoUrl={team2.team.logoUrl}
      />
    );
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {selectedScreenIndex === screenIndexes.ytPlanner && (
        <YoutubePlanner matchInfo={cricketMatch} />
      )}
      {selectedScreenIndex === screenIndexes.channelIntro && (
        <ChannelIntroVideo
          src={`http://localhost:3012/videos/intro/channelIntro.mp4`}
          height={config.pageSize.height}
          width={config.pageSize.width}
        />
      )}
      {selectedScreenIndex === screenIndexes.channelExit && <ChannelExitPage />}
      {selectedScreenIndex === screenIndexes.matchSummary && (
        <MatchSummary cricketMatch={cricketMatch} />
      )}
      {selectedScreenIndex === screenIndexes.matchBasicInfo &&
        getMatchBasicInfo()}
      {[screenIndexes.inning1Scores, screenIndexes.inning2Scores].includes(
        selectedScreenIndex
      ) && (
        <Playing11ScoreInfo
          team1={team1}
          team2={team2}
          selectedIndex={selectedScreenIndex}
        />
      )}
      {selectedScreenIndex === screenIndexes.matchResultInfo && (
        <MatchFinalInfo
          matchResult={result}
          playerOfTheMatch={playerOfTheMatch.playerName || "Jan Frylinck"}
          potmBattingStats={[
            team1.battingScorecard
              .concat(team2.battingScorecard)
              .find(
                (x) =>
                  x.playerName.href ===
                  (playerOfTheMatch.href || "/cricketers/jan-frylinck-482478")
              ) as Batsman,
          ]}
          potmBowlingStats={[
            team1.bowlingScorecard
              .concat(team2.bowlingScorecard)
              .find(
                (x) =>
                  x.playerName.href ===
                  (playerOfTheMatch.href || "/cricketers/jan-frylinck-482478")
              ) as Bowler,
          ]}
          potmTeamName={playerOfTheMatch.teamName}
          seriesResult={seriesResult}
        />
      )}
      {selectedScreenIndex === screenIndexes.headToHead && (
        <H2HMatchRecords
          team1SquadInfo={matchSquad?.team1SquadInfo as TeamSquadInfo}
          team2SquadInfo={matchSquad?.team2SquadInfo as TeamSquadInfo}
          format={format}
        />
      )}
      {selectedScreenIndex === screenIndexes.top5Player && (
        <Top5Players
          tournamentId={tournaments.ipl.url}
          tournamentName={`${tournaments.ipl.name},`}
        />
      )}
      {selectedScreenIndex === screenIndexes.matchPhotos && <MomentCaptures />}
      {selectedScreenIndex === screenIndexes.playing11Info && matchSquad && (
        <Playing11Info matchSquad={matchSquad} />
      )}
      {selectedScreenIndex === screenIndexes.pointsTable &&
        pointsTable.length > 0 && (
          <PointsTable
            pointsTableRows={pointsTable}
            fontSize={30}
            tdHeight={65}
          />
        )}
      {/* {selectedScreenIndex === 11 && <TeamLogoCube />} */}
      {/* {selectedScreenIndex === 18 && <FireWorks />} */}
      {selectedScreenIndex === 18 && (
        <ThumbnailRender
          matchTitle={matchTitle}
          team1SquadInfo={matchSquad?.team1SquadInfo as TeamSquadInfo}
          team2SquadInfo={matchSquad?.team2SquadInfo as TeamSquadInfo}
        />
      )}
      {config.showBGVideo && (
        <div
          style={{
            position: "relative",
            zIndex: -1,
            marginTop: -config.pageSize.height - 20,
            overflow: "hidden",
            opacity: selectedScreenIndex !== screenIndexes.channelIntro ? 1 : 0,
          }}
        >
          <ReactPlayer
            url={`http://localhost:3012/videos/fireworks/fireWorks.mp4`}
            height={config.pageSize.height + 20}
            width={config.pageSize.width}
            playing={isPlayingBG}
            volume={0}
          />
        </div>
      )}
    </div>
  );
};
