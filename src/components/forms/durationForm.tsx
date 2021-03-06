import { TextField, Typography } from "@material-ui/core"
import React, { Component } from "react"
import { inherits } from "util"
import axios from "../../functions/axios"
import { SubmitButton } from "./editprojectnameform"
import { withStyles } from "@material-ui/core/styles"
import { useStyles } from "@material-ui/pickers/views/Calendar/Day"
import { durationUpdate } from "../../functions/process"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../redux/project/projectReducer"
export interface DurationFormProps {
  defaultValue: number
  milestoneid: string
  callbackFunction?: any
  milestones: any
  projectid: any
}

// import { withStyles } from "@material-ui/core/styles"

// const styles = theme => ({
//   number: {
//     "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//       "-webkit-appearance": "none",
//       margin: 0
//     }
//   },
//   input: {
//     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//       "-webkit-appearance": "none",
//       margin: 0
//     }
//   }
// })
const DurationForm: React.FC<DurationFormProps> = props => {
  const dispatch = useDispatch()
  const project: any = useSelector((state: RootStore) =>
    state.projects.find(project => project.id == props.projectid)
  )
  const plannedEndDate = project.plannedEndDate
  const handleDurationEdit = async e => {
    e.preventDefault()
    await durationUpdate(
      Number(activeProjectName),
      props.callbackFunction,
      props.milestoneid,
      props.milestones,
      props.projectid,
      plannedEndDate
    )
    // await store.dispatch(getTotalUpdateForMilestone(props.projectid))
    // dispatch(getTotalUpdateForMilestone())
    // await getTotals(props.projectid, props.callbackFunction)
  }
  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()
  const [activeProjectName, setActiveProjectName] = React.useState("")

  const editformref = React.useRef<React.MutableRefObject<any> | any>()

  return (
    <>
      <form ref={editformref} onSubmit={handleDurationEdit}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            style={{ width: "30%" }}
            onFocus={() => {
              setisFocus(true)
            }}
            onChange={e => {
              setActiveProjectName(e.currentTarget.value)
            }}
            onBlur={() => {
              setisFocus(false)

              SubmitButtonRef.current.click()
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "inherit",
                fontSize: "inherit",
                fontStyle: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
                textAlign: "center"
              }
            }}
            variant="filled"
            type="number"
            inputProps={{
              style: { padding: 0, textAlign: "right" },
              min: 1,
              inputMode: "numeric"
            }}
            defaultValue={props.defaultValue}
          >
            {" "}
          </TextField>
          <SubmitButton
            ref={SubmitButtonRef}
            disabled={!activeProjectName}
            type="submit"
          ></SubmitButton>
          <Typography style={{ marginLeft: "5px" }}>
            {props.defaultValue > 1 ? "Days" : "Day"}
          </Typography>
        </div>
      </form>

      <span
        style={{
          display: "flex;",
          boxSizing: "border-box",
          fill: "rgba(240, 240, 255, 1)",
          maxHeight: "1px",
          minHeight: "1px",
          borderRadius: "5px",
          width: "30%",
          backgroundColor: " rgba(240, 240, 255, 1)"
        }}
      ></span>
    </>
  )
}

export default DurationForm
