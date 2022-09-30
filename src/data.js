export const formatData = async (callback) => {
  const jsonFilePrograms = await window.api.showJsonFile();
  const programsPropotion = [0, 0]; // first office, secound regular programms
  let percentage; // contains percentage of office programms compared to total running programms

  window.api.returnStoredOfficePrograms((data) => {
    returnPropotionBetweenOfficeAndNormal(data);
  });

  const returnPropotionBetweenOfficeAndNormal = (data) => {
    const officeProgramms = [];
    data.forEach((element, index) => {
      officeProgramms[index] = element.name;
    });
    jsonFilePrograms.forEach((element) => {
      const checkIfItsOfficeProgram = officeProgramms.find(
        (el) => el == element.programName
      );
      if (checkIfItsOfficeProgram != undefined) {
        programsPropotion[0] += element.runningTime;
      } else {
        programsPropotion[1] += element.runningTime;
      }
    });
    const finalData = {
      labels: ["Pracował", "Nie pracował"],
      datasets: [
        {
          data: programsPropotion,
          backgroundColor: ["#51557E", "#1B2430"],
          hoverBackgroundColor: ["", ""],
        },
      ],
    };
    callback(finalData);
  };
};
