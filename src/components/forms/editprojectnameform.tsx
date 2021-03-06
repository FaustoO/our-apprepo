import { TextField } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"
import axios from "../../functions/axios"
import { truncate } from "../../functions/cleaningData"
import { useDispatch } from "react-redux"
import { UpdateSingleProjectOrMilestoneUpdate } from "../redux/project/projectActions"
export interface EditFormProjectProps {
  id?: number
  user?: string
  typeofproject?: string
  defaultValue?: any
  isnamechanged?: boolean
  callbackFunction?: any
  ismilestoneedit?: boolean
  issmall?: boolean
  milestoneid?: string
}

export const SubmitButton = styled.button`
  display: none;
  width: 0;
  opacity: 0;
  height: 0;
  cursor: none;
  z-index: -9999;
`
export const ProjectGoalLabel = styled.span<{ isFocused?: boolean }>`
  color: rgba(228, 220, 0, 1);
  font-size: 18px;
  position: relative;
  top: ${p => (p.isFocused ? "15px" : "20px")};
  transition: top 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`
const EditForm: React.FC<EditFormProjectProps> = props => {
  const projectnameinputref = React.useRef<any>()
  const editformref = React.useRef<React.MutableRefObject<any> | any>()
  const dispatch = useDispatch()
  const [activeProjectName, setActiveProjectName] = React.useState<
    string | any
  >(props.defaultValue)
  const SubmitButtonRef = React.useRef<React.MutableRefObject<any> | any>()

  const [isFocus, setisFocus] = React.useState<boolean>(false)
  const handleProjectNameSubmit = (e: any) => {
    e.preventDefault()
    if (
      activeProjectName.length < 70 &&
      activeProjectName !== "" &&
      activeProjectName !== props.defaultValue
    ) {
      setisFocus(false)
      console.log("LOOKUPHERE", props.id, props.typeofproject)
      projectnameinputref.current.blur()
      dispatch(
        UpdateSingleProjectOrMilestoneUpdate(
          String(props.id),
          [
            {
              goal:
                activeProjectName.charAt(0).toUpperCase() +
                activeProjectName.slice(1)
            }
          ],

          false
        )
      )
      // axios
      //   .put(`project/detail/${props.id}`, {
      //     user: props.user,
      //     typeofproject: props.typeofproject,
      //     goal:
      //       activeProjectName.charAt(0).toUpperCase() +
      //       activeProjectName.slice(1),
      //     isnamechanged: true
      //   })
      //   .then(res => {
      //     props.callbackFunction()
      //   })
      //   .catch(err => prompt(err))
    }
    //  else if (
    //   activeProjectName.length < 70 &&
    //   props.defaultValue !== "" &&
    //   activeProjectName !== props.defaultValue
    // ) {
    //   axios
    //     .put(`project/detail/${props.id}`, {
    //       user: props.user,
    //       typeofproject: props.typeofproject,
    //       goal: null,
    //       isnamechanged: true
    //     })
    //     .then(res => {
    //       props.callbackFunction()
    //     })
    //     .catch(err => prompt(err))
    // }
  }
  const handleMilestoneNameSubmit = async (e: any) => {
    e.preventDefault()
    if (
      activeProjectName.length < 70 &&
      activeProjectName !== "" &&
      activeProjectName !== props.defaultValue
    ) {
      console.log("LOOKUPHERE", props.milestoneid, props.typeofproject)
      projectnameinputref.current.blur()
      dispatch(
        UpdateSingleProjectOrMilestoneUpdate(
          String(props.milestoneid),
          [
            {
              goal:
                activeProjectName.charAt(0).toUpperCase() +
                activeProjectName.slice(1)
            }
          ],

          true
        )
      )
      // if (
      //   activeProjectName.length < 70 &&
      //   activeProjectName !== "" &&
      //   activeProjectName !== props.defaultValue
      // ) {
      //   await axios
      //     .put(`project/detail/milestones/${props.milestoneid}`, {
      //       goal:
      //         activeProjectName.charAt(0).toUpperCase() +
      //         activeProjectName.slice(1)
      //     })
      //     .then(res => {
      //       props.callbackFunction()
      //     })
      //     .catch(err => prompt(err))
      // } else if (
      //   activeProjectName.length < 70 &&
      //   props.defaultValue !== "" &&
      //   activeProjectName !== props.defaultValue
      // ) {
      //   await axios
      //     .put(`project/detail/milestones/${props.milestoneid}`, {
      //       goal: null
      //     })
      //     .then(res => {
      //       props.callbackFunction()
      //     })
      //     .catch(err => prompt(err))
      // }
    }
  }
  return (
    <>
      <ProjectGoalLabel style={{ marginBottom: "10px" }} isFocused={isFocus}>
        {props.ismilestoneedit ? "Goal" : "Project Goal"}
      </ProjectGoalLabel>
      <form
        method="put"
        id="projectgoalform"
        onSubmit={
          props.ismilestoneedit
            ? handleMilestoneNameSubmit
            : handleProjectNameSubmit
        }
        ref={editformref}
        style={{
          display: "flex",
          width: "100%"
        }}
      >
        <TextField
          onChange={e => {
            setActiveProjectName(e.currentTarget.value)
          }}
          error={activeProjectName.length > 69}
          helperText={
            activeProjectName.length > 69
              ? props.ismilestoneedit
                ? "The milestone goal name cannot contain more than 70 characters."
                : "The project name cannot contain more than 70 characters."
              : null
          }
          inputRef={projectnameinputref}
          fullWidth
          InputLabelProps={{
            shrink: false,
            style: {
              color: "rgba(240, 240, 255, 1)",
              fontSize: props.issmall ? "18px" : "24px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: props.issmall ? "21.6px" : "25px",
              letterSpacing: "0em",
              textAlign: "left"
            }
          }}
          onFocus={() => {
            setisFocus(true)
          }}
          onBlur={() => {
            setisFocus(false)
            SubmitButtonRef.current.click()
          }}
          name="Project name here"
          // placeholder={props.isnamechanged ? " " : props.defaultValue}
          defaultValue={activeProjectName !== "" ? activeProjectName : null}
          placeholder={
            activeProjectName === ""
              ? props.ismilestoneedit
                ? "Type your milestone goal here..."
                : "Type your project name here..."
              : activeProjectName
          }
          inputProps={{ maxLength: 70 }}
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(240, 240, 255, 1)",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "29px",
              letterSpacing: "0em",
              textAlign: "left"
            }
          }}
        />
        <SubmitButton ref={SubmitButtonRef} type="submit"></SubmitButton>
      </form>
      <span
        style={{
          display: "flex;",
          boxSizing: "border-box",
          fill: "rgba(240, 240, 255, 1)",
          maxHeight: "1px",
          minHeight: "1px",
          borderRadius: "5px",
          backgroundColor: " rgba(240, 240, 255, 1)"
        }}
      ></span>
    </>
  )
}

export default EditForm
