import React from "react"
import styled from "styled-components"
import {
  ConvertDateFormat,
  PercentageConvertation,
  truncate
} from "../../functions/cleaningData"
import DatePickerForm from "../forms/datepickerForm"
import DescriptionBoxTextArea from "../forms/descriptionProjectForm"
import DurationForm from "../forms/durationForm"
import EditForm from "../forms/editprojectnameform"
import CircleProgressContent from "./CircleProgressContent"
import {
  MilestoneDateContentContanier,
  MilestoneDateContentLabel,
  MilestoneDateDataContent
} from "./ConstantUi"
import LinearProgressBar from "./LinearProgressBar"
export interface MilestoneEditComponentProps {
  isOpened: boolean
  data: any[]
  callbackFunction: () => void
  projectdata: any[]
  goalachivevalue: any
}

const MilestoneEditContainer = styled.div<{ isOpened: boolean }>`
  display: flex;
  flex-basis: ${p => (p.isOpened ? "30%" : "0%")};
  min-width: ${p => (p.isOpened ? "30%" : "0%")};
  max-width: 802px;
  flex-grow: 0;
  margin-left: 2px;
  border-radius: 10px;
  opacity: ${p => (p.isOpened ? "1" : "0")};
  transition: opacity 5s linear;
  z-index: 999;
  min-height: 100%;
  visibility: ${p => (p.isOpened ? "visible" : "hidden")};
  flex-direction: column;
  justify-content: space-between;
`
const MilestoneEditHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 310px;
  flex-direction: column;
`
const MilestoneEditBody = styled.div`
  display: flex;
  height: 40%;
  flex-direction: column;
  justify-content: space-between;
`
const MilestoneEditBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
`
const MilestoneEditStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
const MilestoneEditCircleProgressContainer = styled.div`
  display: flex;
  flex-basis: 10%;
  min-width: 10%;
`
const MilestoneEditLinearProgressContanier = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 80%;
  min-width: 20%;
`
const MilestoneEditDatasContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: space-between;
`
const MilestoneEditDatasTop = styled.div`
  display: flex;
  width: 45%;
  flex-direction: row;
  justify-content: space-between;
`
const MilestoneEditDatasBottom = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
`
const MilestoneEditDataTopItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const MilestoneEditComponent: React.FC<MilestoneEditComponentProps> = props => {
  return (
    <MilestoneEditContainer isOpened={props.isOpened}>
      {props.data.map(elm => {
        {
          console.log(elm.goal.length)
        }
        return (
          <>
            <MilestoneEditHeader>
              <EditForm
                callbackFunction={props.callbackFunction}
                issmall={true}
                defaultValue={
                  elm.goal.length > 41
                    ? truncate(elm.goal, 26, 41)
                    : truncate(elm.goal, 36, 41)
                }
                ismilestoneedit={true}
                milestoneid={elm.id}
              ></EditForm>
            </MilestoneEditHeader>
            <MilestoneEditBody>
              <MilestoneEditStatusContainer>
                <MilestoneEditCircleProgressContainer>
                  <CircleProgressContent
                    smallSize
                    mediumSize={true}
                    progressvalue={props.goalachivevalue}
                  ></CircleProgressContent>
                </MilestoneEditCircleProgressContainer>
                <MilestoneEditLinearProgressContanier>
                  <LinearProgressBar
                    value={props.projectdata}
                    smallSize
                    mediumSize
                  ></LinearProgressBar>
                </MilestoneEditLinearProgressContanier>
              </MilestoneEditStatusContainer>
              <MilestoneEditDatasContainer>
                <MilestoneEditDatasTop>
                  <MilestoneEditDataTopItem>
                    <MilestoneDateContentLabel>
                      Start Date
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      {ConvertDateFormat(elm.startDate)}
                    </MilestoneDateDataContent>
                  </MilestoneEditDataTopItem>
                  <MilestoneEditDataTopItem>
                    <MilestoneDateContentLabel>
                      Duration
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      <DurationForm
                        defaultValue={elm.duration}
                        callbackFunction={props.callbackFunction}
                        milestoneid={elm.id}
                      ></DurationForm>
                    </MilestoneDateDataContent>
                  </MilestoneEditDataTopItem>
                </MilestoneEditDatasTop>
                <MilestoneEditDatasBottom>
                  <MilestoneEditDataTopItem>
                    <MilestoneDateContentLabel>
                      End Date
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      <DatePickerForm
                        defaultStartData={elm.startDate}
                        defaultPlannedEndData={elm.dueDate}
                        ismilestone
                        callbackFunction={props.callbackFunction}
                        id={elm.id}
                      ></DatePickerForm>
                      {/* {ConvertDateFormat(elm.dueDate)} */}
                    </MilestoneDateDataContent>
                  </MilestoneEditDataTopItem>
                  <MilestoneEditDataTopItem>
                    <MilestoneDateContentLabel>
                      Progress
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      {Math.ceil(PercentageConvertation(elm.progress))}%
                    </MilestoneDateDataContent>
                  </MilestoneEditDataTopItem>
                  <MilestoneEditDataTopItem>
                    <MilestoneDateContentLabel>
                      Relative Progress
                    </MilestoneDateContentLabel>
                    <MilestoneDateDataContent>
                      {Math.ceil(PercentageConvertation(elm.relativeProgress))}%
                    </MilestoneDateDataContent>
                  </MilestoneEditDataTopItem>
                </MilestoneEditDatasBottom>
              </MilestoneEditDatasContainer>
              {/* DescriptionBox */}
            </MilestoneEditBody>
            <MilestoneEditBottom>
              <DescriptionBoxTextArea
                typemilestone
                milestoneid={elm.id}
                firstTimeChange={!elm.description ? true : false}
                defaultValue={elm.description ? elm.description : ""}
                callbackFunction={props.callbackFunction}
              ></DescriptionBoxTextArea>
            </MilestoneEditBottom>
          </>
        )
      })}
    </MilestoneEditContainer>
  )
}

export default MilestoneEditComponent
