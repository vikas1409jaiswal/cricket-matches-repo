export const config = {
  basicInfoProfile: 1,
  espnMatchUrl:
    "/series/west-indies-vs-south-africa-2024-1433350/west-indies-vs-south-africa-3rd-t20i-1433364",
  language: "eng",
  muteSpeech: false,
  pageSize: {
    height: 880,
    width: 1540,
  },
  showBGVideo: true,
};

export const matchBasicInfoProfiles = [
  {
    customMatchNumber:
      config.language === "hindi" ? "मैच संख्या 19" : "Match Number 24",
    matchBrief: config.language === "hindi" ? "19वां मैच" : "24th Match",
    venueCountry: config.language === "hindi" ? "(भारत)" : "(India)",
    matchSpeech:
      config.language === "hindi"
        ? "इंडियन प्रीमियर लीग 2024, मैच संख्या 19"
        : "Indian premier league, Match Number 24",
  },
  {
    matchBrief: "3rd T20I Match",
    venueCountry: "",
    matchSpeech: "3rd T twenty international match of 3 match series",
  },
  {
    customMatchNumber: "Match Number 30",
    matchBrief: "30th T20 Match",
    venueCountry: "(Bangladesh)",
    matchSpeech: "Bangladesh premier league 2024, match number 30",
  },
  {
    matchBrief: "1st T20I Match",
    venueCountry: "(UAE)",
    matchSpeech: "1st t twenty international of 3 match series",
  },
  {
    matchBrief: "3rd ODI Match",
    venueCountry: "(Bangladesh)",
    matchSpeech: "3rd one-day international of 3 match series",
  },
  {
    matchBrief: "2nd T20I Match",
    venueCountry: "(Australia)",
    matchSpeech: "2nd t twenty international of 3 match series",
  },
  {
    matchBrief: "Final",
    venueCountry: "(Nepal)",
    matchSpeech: "Nepal tri-nations series 2024, Final",
  },
  {
    matchBrief: "1st ODI Match",
    venueCountry: "(Nepal)",
    matchSpeech: "ICC men's cricket world cup league 2, Match number 7",
  },
];
