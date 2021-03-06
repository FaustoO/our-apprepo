import Checkbox from "../ui/Checkbox"
import React from "react"
import styled from "styled-components"
import { Button } from "@material-ui/core"
import axios from "../../functions/axios"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { backendDateConverter, getToday } from "../../functions/cleaningData"
import { createProjectMiddleWare } from "../redux/project/projectActions"
import { frontendDatePlus } from "../../functions/cleaningData"
export interface CreateProjectRadioInputFormsProps {
  ActualClickHandle: any
}
const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 52px;
`
const CreateProjectRadioInputSubmitButton = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(99, 99, 128, 0.1);
  align-self: flex-end;
  width: 163px;
  height: 43px;
  border-radius: 5px;
  fontweight: 400;
  border: 3px solid #484862;
`

const CreateProjectRadioInputForms: React.FC<CreateProjectRadioInputFormsProps> = props => {
  const [value, setValue] = React.useState("S")
  const dispatch = useDispatch()
  const history = useHistory()
  const handleChange = (event: any) => {
    setValue(event.target.value)
  }
  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    const name = "Fatih"
    const goalname = ""
    const newvalue = value
    const today = getToday()
    const plannedEndDate = backendDateConverter(
      frontendDatePlus(String(today), 7)
    )
    console.log("planned", plannedEndDate)

    dispatch(
      createProjectMiddleWare(name, newvalue, goalname, today, plannedEndDate)
    )

    // history.push(`/project/detail/${res.data.id}`)
    // axios
    //   .post("project/all/", {
    //     user: name,
    //     typeofproject: newvalue,
    //     goal: goalname,
    //     startDate: today,
    //     plannedEndDate: null
    //   })
    //   .then(res => {
    //     history.push(`/project/detail/${res.data.id}`)
    //   })
    //   .catch(err => prompt(err))
  }

  return (
    <>
      <Form method="post" onSubmit={handleFormSubmit}>
        <Checkbox value={value} setvalue={handleChange} />
        <CreateProjectRadioInputSubmitButton>
          <Button
            type="submit"
            style={{
              color: "white",
              width: "100%",
              height: "100%",
              fontWeight: "inherit",
              fontFamily: "Aileron"
            }}
            onClick={props.ActualClickHandle}
          >
            Create Project
          </Button>
        </CreateProjectRadioInputSubmitButton>
      </Form>
    </>
  )
}
export default CreateProjectRadioInputForms
