import { useState } from "react"
import validator from 'validator'
import Select from 'react-select'

const countryOptions = [
  { value: "asgard", label: "Asgard" },
  { value: "scotland", label: "Scotland" },
  { value: "usa", label: "USA" }]

export const UserForm = ({ onSave, user = {} }) => {

  const [userData, setUserData] = useState(user)
  const [errors, setErrors] = useState({})

  const { name, email, website, country } = userData

  const validateData = () => {
    let errors = {}
    if (!name) {
      errors.name = "Name is required"
    }
    if (!validator.isURL(website)) {
      errors.website = "A valid web address is required"
    }

    return errors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (option) => {
    setUserData(prevData => ({ ...prevData, country: option }))
  }

  const handleSave = () => {
    const errors = validateData()
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    setErrors({})
    console.log(userData)
    onSave(userData)
  }

  return (<>
    <div>
      <div>
        <p>Name</p>
        <input name="name" value={name} onChange={handleChange} />
        <div>{errors.name}</div>
      </div>
      <div>
        <p>Email</p>
        <input name="email" value={email} onChange={handleChange} />
        <div>{errors.email}</div>
      </div>
      <div>
        <p>Website</p>
        <input name="website" value={website} onChange={handleChange} />
        <div>{errors.website}</div>
      </div>

      <div>
        <p>Country</p>
        <Select
          value={countryOptions.find(({ value }) => value === country)}
          onChange={handleSelectChange}
          options={countryOptions} />
      </div>

      <div>
        <button onClick={handleSave}>Save</button>
      </div>



    </div>
    <h2>UserForm</h2></>)
}