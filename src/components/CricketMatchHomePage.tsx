import React, { useState } from "react";
import { useFetchMatchesBySeason } from "./../hooks/espn-cricinfo-hooks/useFetchMatchesBySeason";
import { CricketMatch } from "./CricketMatch";
import { CricketFormat } from "./../models/enums/CricketFormat";
import $ from "jquery";
import { AudioPlayer } from "./common/ReactAudioPlayer";
import { TestCricketMatch } from "./TestCricketMatch";

interface CricketMatchHomePageProps {
  format: CricketFormat;
}

export const CricketMatchHomePage: React.FC<CricketMatchHomePageProps> = ({
  format,
}) => {
  const { allLoaded, cricketMatchesAll } = useFetchMatchesBySeason(format, [
    2023,
  ]);

  const allMatches = cricketMatchesAll[0]?.matchDetails;

  const [selectedMatchIndex, setSelectedMatchIndex] = useState(166);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [isDisplayInfo, setDisplayInfo] = useState(false);

  // // Press => for next player & <= for previous player.
  $(document).on({
    keydown: (event) => {
      if (
        event.originalEvent?.key === "ArrowRight" &&
        selectedScreenIndex < 15
      ) {
        selectedScreenIndex !== 100
          ? setSelectedScreenIndex(selectedScreenIndex + 1)
          : setSelectedScreenIndex(selectedScreenIndex + 2);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "ArrowLeft" && selectedScreenIndex > 0) {
        setSelectedScreenIndex(selectedScreenIndex - 1);
        event.preventDefault();
      }
      if (
        event.originalEvent?.key === "ArrowUp" &&
        selectedMatchIndex < allMatches.length
      ) {
        setSelectedMatchIndex(selectedMatchIndex + 1);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "ArrowDown" && selectedMatchIndex > 0) {
        setSelectedMatchIndex(selectedMatchIndex - 1);
        event.preventDefault();
      }
      if (event.originalEvent?.key === "d" && selectedMatchIndex > 0) {
        setDisplayInfo(true);
      }
    },
  });
  return (
    <>
      {isDisplayInfo && allLoaded && format === CricketFormat.Test && (
        <TestCricketMatch
          selectedMatchUrl={allMatches[selectedMatchIndex]?.href}
          selectedScreenIndex={selectedScreenIndex}
        />
      )}
      {isDisplayInfo &&
        allLoaded &&
        (format === CricketFormat.ODI || format === CricketFormat.T20I) && (
          <CricketMatch
            selectedMatchUrl={allMatches[selectedMatchIndex]?.href}
            selectedScreenIndex={selectedScreenIndex}
            format={format}
          />
        )}
    </>
  );
};
